import { useEffect, useState } from "react";
import { useConnect, useProvider, useSigner } from "wagmi";
import { Contract } from "ethers";
import BlockpunksNFT from "../BlockpunksNFT.json";

const MintForm = () => {
	const [loading, setLoading] = useState(true);
	const [stateMessage, setStateMessage] = useState("🚀 mint NFT");

	const [tokenAmount, setTokenAmount] = useState(0);
	const [tokenSupply, setTokenSupply] = useState(0);
	const [mintValue, setMintValue] = useState(5);

	const { isConnected } = useConnect();
	const provider = useProvider();
	const { data: signer } = useSigner();

	const listenToMintedToken = async () => {
		try {
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, provider);
			contract.on("TokenMinted", (_, tokenId) => {
				const tokenMinted = tokenId.toString();
				setTokenAmount(Number(tokenMinted) + 1);
				setStateMessage(`🎉 token minted`);
				setTimeout(() => {
					setStateMessage("🚀 mint NFT");
				}, 2000);
				setLoading(false);
			});
		} catch (err) {
			console.log(err);
			setStateMessage("🤯 Uppps, something went wrong");
		}
	};

	const fetchTokenAmountMintedAsync = async () => {
		try {
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, provider);
			const tokenAmountMinted = await contract._totalSupply();

			setTokenAmount(tokenAmountMinted.toString());
		} catch (error) {
			console.log(error);
			setStateMessage("🤯 Uppps, something went wrong");
		}
	};

	const fetchTokenSupplyAsync = async () => {
		try {
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, provider);
			const tokenSupply = await contract._tokenSupply();

			setTokenSupply(tokenSupply.toString());
		} catch (error) {
			console.log(error);
			setStateMessage("🤯 Uppps, something went wrong");
		}
	};

	const mintNFT = async () => {
		try {
			if (parseInt(mintValue) <= 0) return;
			setLoading(true);
			setStateMessage("🐿 minting ... ");
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			await contract.mint(mintValue);
		} catch (error) {
			console.log(error);
			setStateMessage("🤯 Uppps, something went wrong");
			setLoading(false);
		}
	};

	useEffect(() => {
		listenToMintedToken();
		fetchTokenAmountMintedAsync();
		fetchTokenSupplyAsync();
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	return (
		isConnected && (
			<>
				<div className="flex items-center gap-16 mb-8 mt-16">
					<div>
						<small>already minted</small>
						<p className="text-4xl">{tokenAmount}</p>
					</div>
					<p className="text-4xl">/</p>
					<div>
						<small>total supply</small>
						<p className="text-4xl">{tokenSupply}</p>
					</div>
				</div>
				<div className="flex gap-4 mb-24">
					<div className="flex items-center bg-white rounded-md p-2 text-black">
						<button
							className="disabled:cursor-not-allowed"
							disabled={mintValue == 1}
							onClick={() => setMintValue((val) => (val > 1 ? val - 1 : val))}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
							</svg>
						</button>
						<input
							type="text"
							className="text-center max-w-[40px]"
							value={mintValue}
							onChange={(e) => setMintValue(Number(e.target.value))}
						/>
						<button
							className="disabled:cursor-not-allowed"
							disabled={mintValue == 5}
							onClick={() => setMintValue((val) => (val < 5 ? val + 1 : val))}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</button>
					</div>
					<button
						disabled={loading}
						onClick={mintNFT}
						className="bg-violet-600 text-white font-medium tracking-wider rounded-md py-3 px-6"
					>
						{stateMessage}
					</button>
				</div>
			</>
		)
	);
};

export default MintForm;
