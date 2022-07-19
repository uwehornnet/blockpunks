import { useEffect, useState } from "react";
import { Contract, utils } from "ethers";
import { useAccount, useProvider, useSigner, useConnect, useBalance } from "wagmi";
import { useQuote, swapToken } from "../hooks/useProtocoll";
import TokenModal from "../components/TokenModal";
import SwapDetails from "../components/SwapDetails";
import WalletConnectButton from "../components/WalletConnectButton";
import BlockpunksNFT from "../BlockpunksNFT.json";

const Swap = ({ token }) => {
	const { isConnected } = useConnect();
	const provider = useProvider();
	const { data: signer } = useSigner();
	const { data: account } = useAccount();
	const { data: balance } = useBalance({
		addressOrName: account?.address,
	});

	const [isTokenOwner, setIsTokenOwner] = useState(false);
	const [showTokenModal, setShowTokenModal] = useState(false);
	const [buyToken, setBuyToken] = useState(null);
	const [inputValue, setInputValue] = useState(0);
	const [sellTokenAmount, setSellTokenAmount] = useState(0);

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

	const { quote, loading, error } = useQuote({
		buyToken,
		sellTokenAmount,
		isTokenOwner,
	});

	useEffect(() => {
		if (!account && !provider && !signer) return;
		getBalanaceOfAccount();
	}, [account, provider, signer]);

	return (
		<main className="bg-black w-screen flex-1 pt-24 h-full">
			<div className="container z-50 relative">
				<div className="max-w-[480px] mx-auto rounded-lg bg-[#1B1929] p-4 text-white shadow-xl relative">
					<TokenModal
						token={token}
						visible={showTokenModal}
						onChange={(token) => setBuyToken(token)}
						onClose={() => setShowTokenModal(false)}
					/>
					<div className="flex justify-between items-center">
						<h2 className="text-xl my-6 uppercase">Token Swap</h2>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
								/>
							</svg>
						</span>
					</div>

					<div className="p-4 border-[1px] border-slate-600 border-solid rounded-md mb-4">
						<strong className="text-[12px] block mb-6 text-white">you sell</strong>
						<div className="flex items-start justify-start">
							<div className="flex-1">
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onBlur={() => {
										if (balance && Number(balance?.formatted) < Number(inputValue)) {
											setSellTokenAmount(0);
											setInputValue(0);
										} else {
											setSellTokenAmount(inputValue);
										}
									}}
									className="block text-left bg-transparent border-none outline-none text-[24px] w-full"
									placeholder="0.001"
								/>
								<span className="block text-left text-slate-600 text-sm">
									balance: {balance ? balance?.formatted.slice(0, 8) : 0}
								</span>
							</div>
							<div className="flex items-center gap-4">
								<img src="/images/eth.webp" alt="eth" className="h-8 w-8" />
								<span className="block text-[24px]">eth</span>
							</div>
						</div>
					</div>

					<div className="rounded-md">
						<strong className="text-[12px] block mb-3 pl-4 text-white">you buy</strong>
						<div className="flex items-center justify-between">
							<div className="flex-1 overflow-x-auto pl-4 no-scroolbar">
								<span className="block text-left text-[24px]">
									{quote ? utils.formatEther(`${quote.buyAmount}`).toString().slice(0, 10) : 0}
								</span>
							</div>
							<div>
								<span
									onClick={() => setShowTokenModal(true)}
									className="block  px-4 py-2 rounded-lg cursor-pointer"
								>
									{buyToken ? (
										<span className="flex gap-2 items-center">
											<img
												className="h-8 w-8 mr-4 rounded-full object-fill"
												src={buyToken.logoURI}
											/>
											<p className=" text-[24px]">{buyToken.symbol}</p>
										</span>
									) : (
										<span className="text-xs px-4 py-2 bg-violet-600 rounded-md">select token</span>
									)}
								</span>
							</div>
						</div>
					</div>
					{quote && <SwapDetails {...quote} isTokenOwner={isTokenOwner} buyToken={buyToken} />}
					<div className="mt-8">
						{isConnected ? (
							<button
								disabled={false}
								onClick={swapToken}
								className="rounded-md bg-violet-600 text-white text-center block w-full py-4 px-6 cursor-pointer"
							>
								swap token
							</button>
						) : (
							<WalletConnectButton />
						)}
					</div>
				</div>
			</div>
		</main>
	);
};
export default Swap;

export const getStaticProps = async (ctx) => {
	try {
		const response = await fetch(`https://gateway.ipfs.io/ipns/tokens.uniswap.org`);
		const json = await response.json();
		const tokenArray = Object.keys(json.tokens)
			.map((key) => json.tokens[key])
			.filter((token) => token.chainId == 1);

		return {
			props: {
				token: tokenArray,
			},
		};
	} catch (err) {
		console.log(err);
	}
};
