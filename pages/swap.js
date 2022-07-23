import { useEffect, useState, useContext } from "react";
import { Contract, BigNumber } from "ethers";
import { useAccount, useProvider, useSigner, useConnect } from "wagmi";
import TokenModal from "../components/TokenModal";
import SwapDetails from "../components/SwapDetails";
import WalletConnectButton from "../components/WalletConnectButton";
import RecentTransactions from "../components/RecentTransactions";
import BlockpunksNFT from "../BlockpunksNFT.json";
import { erc20ABI } from "wagmi";
import { NotificationContext } from "../context/index";

const Swap = () => {
	const { token } = useContext(NotificationContext);

	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("Loading...");
	const [buttonMessage, setButtonMessage] = useState("swap token");

	const { isConnected } = useConnect();
	const provider = useProvider();
	const { data: signer } = useSigner();
	const { data: account } = useAccount();

	const [isTokenOwner, setIsTokenOwner] = useState(false);
	const [showTokenModal, setShowTokenModal] = useState(false);
	const [buyToken, setBuyToken] = useState(null);
	const [inputValue, setInputValue] = useState(0.0);
	const [sellToken, setSellToken] = useState(token.find((t) => t.symbol === "WETH"));
	const [sellTokenAmount, setSellTokenAmount] = useState(0);
	const [swapPrice, setSwapPrice] = useState(null);
	const [stablePrice, setStablePrice] = useState(null);

	const getBalanaceOfAccount = async (needSigner = false) => {
		try {
			const contractSigner = needSigner ? signer : provider;
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, contractSigner);
			const balanceOf = await contract.balanceOf(account.address);
			setIsTokenOwner(balanceOf.toString() !== "0");
		} catch (error) {
			console.log(error);
		}
	};

	const fetchStablePrice = async (amount) => {
		if (!sellToken || amount == 0) return;

		const stableParams = {
			buyToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			sellToken: sellToken.address,
			sellAmount: Number(amount * 10 ** sellToken.decimals),
		};

		const stableResponse = await fetch(
			`https://api.0x.org/swap/v1/price?${new URLSearchParams(stableParams).toString()}`
		);
		const stableJson = await stableResponse.json();
		setStablePrice(stableJson);
	};

	const fetchPriceAsync = async () => {
		try {
			if (sellTokenAmount == 0) return;
			setLoading(true);
			setLoadingMessage("... fetching the best price");
			let params = {
				buyToken: buyToken.address,
				sellToken: sellToken.address,
				sellAmount: Number(sellTokenAmount * 10 ** sellToken.decimals),
				affiliateAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				feeRecipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				buyTokenPercentageFee: isTokenOwner ? 0 : 1.0,
			};

			let endpoint = new URLSearchParams(params).toString();

			const response = await fetch(`https://api.0x.org/swap/v1/price?${endpoint}`);
			const json = await response.json();

			setSwapPrice(json);
			setLoading(false);
			setLoadingMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	const fetchQuoteAsync = async () => {
		try {
			let params = {
				buyToken: buyToken.address,
				sellToken: sellToken.address,
				sellAmount: Number(sellTokenAmount * 10 ** sellToken.decimals),
				affiliateAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				feeRecipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				buyTokenPercentageFee: isTokenOwner ? 0 : 1.0,
				//takerAddress: account.address,
				//takerAddress: "0x41E8dD9926fC0DB7759F2899660a470D3D48A1d0",
			};

			let endpoint = new URLSearchParams(params).toString();

			const response = await fetch(`https://api.0x.org/swap/v1/quote?${endpoint}`);
			return await response.json();
		} catch (err) {
			console.log(err);
		}
	};

	const swapToken = async () => {
		try {
			if (buttonDisabled) return;
			setButtonDisabled(true);
			setButtonMessage("... swapping tokens");
			const quote = await fetchQuoteAsync();
			console.log({ quote });

			const contract = new Contract(sellToken.address, erc20ABI, signer);
			console.log({ contract });

			const maxApproval = BigNumber.from(quote.sellAmount);
			const approval = await contract.approve(quote.allowanceTarget, maxApproval);

			console.log({ approval });

			setButtonMessage("done");
			setTimeout(() => {
				setSellTokenAmount(0);
				setInputValue(0);
				setBuyToken(null);
				setSellToken(null);
				setSwapPrice(null);
				setStablePrice(null);
				setButtonMessage("swap Token");
				setButtonDisabled(false);
			}, 2000);
		} catch (err) {
			console.log(err);
			setButtonMessage("🤯 transaction failed");
		}
	};

	useEffect(() => {
		if (!isConnected && !account && !provider && !signer) return;
		getBalanaceOfAccount();
	}, [account, provider, signer]);

	useEffect(() => {
		if (sellToken !== null && buyToken !== null && sellTokenAmount !== 0) {
			fetchPriceAsync();
			setButtonDisabled(false);
		}

		if (sellToken !== null && sellTokenAmount !== 0) {
			fetchStablePrice(sellTokenAmount);
		}
	}, [sellToken, buyToken, sellTokenAmount, isTokenOwner]);

	return (
		<main className="bg-black w-screen flex-1 mt-24 tablet:pt-24 h-full relative">
			<div className="container z-50 relative">
				<div className="max-w-[400px] mx-auto rounded-xl tablet:bg-[#13121D] p-2 text-white shadow-xl relative">
					<TokenModal
						token={token}
						visible={showTokenModal}
						onChange={({ type, token }) => {
							if (type == "from") {
								setSellToken(token);
							} else {
								setBuyToken(token);
							}
						}}
						onClose={() => setShowTokenModal(false)}
					/>
					<h2 className="text-xl text-center mb-8 font-medium">Token Swap</h2>

					<div className="p-2 tablet:p-4 bg-[#212230] rounded-xl mb-2">
						<strong className="text-[12px] block mb-6 text-white font-medium tracking-wider">
							you sell
						</strong>
						<div className="grid grid-cols-2 tablet:grid-cols-5 gap-8 items-center">
							<div className="tablet:col-span-3">
								<input
									type="number"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onBlur={() => {
										setSellTokenAmount(inputValue);
										fetchStablePrice(inputValue);
									}}
									className="block text-left bg-transparent border-none outline-none text-[18px] w-full"
									placeholder="0.001"
								/>
								<span className="block text-left text-slate-400 text-sm">
									~$
									{stablePrice
										? parseFloat(parseFloat(stablePrice.price) * sellTokenAmount).toFixed(2)
										: parseFloat(0).toFixed(2)}
								</span>
							</div>
							<div className="tablet:col-span-2">
								<span
									onClick={() => setShowTokenModal("from")}
									className="block rounded-lg cursor-pointer"
								>
									{sellToken ? (
										<span className="flex gap-2 items-center justify-between">
											<span className="flex gap-2 items-center">
												<img
													className="h-6 w-6 rounded-full object-fill bg-white border-[2px] border-solid border-white"
													src={sellToken.logoURI}
												/>
												<p className=" text-[18px]">{sellToken.symbol}</p>
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
									) : (
										<span className="text-sm px-3 py-1 bg-violet-600 rounded-md font-medium">
											select token
										</span>
									)}
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-xl bg-[#212230] p-2 tablet:p-4">
						<strong className="text-[12px] block mb-6 text-white font-medium tracking-wider">
							you buy
						</strong>
						<div className="grid grid-cols-2 tablet:grid-cols-5 gap-8 items-end">
							<div className="tablet:col-span-3 overflow-x-auto no-scroolbar">
								<span className="block text-left text-[18px]">
									{swapPrice !== null
										? parseFloat(swapPrice.buyAmount / 10 ** buyToken.decimals).toFixed(2)
										: parseFloat(0).toFixed(2)}
								</span>
							</div>
							<div className="tablet:col-span-2">
								<span
									onClick={() => setShowTokenModal("to")}
									className="block rounded-lg cursor-pointer"
								>
									{buyToken ? (
										<span className="flex gap-2 items-center  justify-between">
											<span className="flex gap-2 items-center">
												<img
													className="h-6 w-6 rounded-full object-fill bg-white border-[2px] border-solid border-white"
													src={buyToken.logoURI}
												/>
												<p className=" text-[18px]">{buyToken.symbol}</p>
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
									) : (
										<span className="text-sm px-3 py-1 bg-violet-600 rounded-md font-medium">
											select token
										</span>
									)}
								</span>
							</div>
						</div>
					</div>
					{loading && <span className="text-xs">{loadingMessage}</span>}
					{swapPrice && <SwapDetails {...swapPrice} isTokenOwner={isTokenOwner} buyToken={buyToken} />}
					<div className="mt-8">
						{isConnected ? (
							<button
								disabled={buttonDisabled}
								onClick={swapToken}
								className="rounded-md bg-violet-600 disabled:bg-[#212230] disabled:cursor-not-allowed text-white text-center block w-full py-4 px-6 cursor-pointer font-medium tracking-wider"
							>
								{buttonMessage}
							</button>
						) : (
							<span className="rounded-md bg-violet-600 flex justify-center w-full py-4 px-6 cursor-pointer font-medium tracking-wider text-lg">
								<WalletConnectButton />
							</span>
						)}
					</div>
					<RecentTransactions token={token} currentToken={sellToken} />
				</div>

				<p className="text-center text-xs text-slate-400 mt-4 font-medium tracking-wider">powered by 0x Swap</p>
			</div>
		</main>
	);
};
export default Swap;
