import { useEffect, useState, useRef } from "react";
import { useAccount, useContract, useProvider, useSigner, useConnect } from "wagmi";
import { Contract, providers, utils } from "ethers";

import BlockpunksNFT from "../BlockpunksNFT.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader } from "./Loader";

// rinkeby: 4
// localhost: 31337
let currentChain = 4;

export const CustomConnectButton = () => {
	const [loading, setloading] = useState(true);

	const provider = useProvider();
	const { data: signer } = useSigner();
	const { isConnected } = useConnect();

	const [active, setActive] = useState(false);
	const [value, setValue] = useState(5);
	const [availableSupply, setAvailableSupply] = useState(0);
	const [totalSupply, setTotalSupply] = useState(0);

	const mintNFT = async () => {
		try {
			setloading(true);
			const signer = await getProviderOrSigner(true);
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			await contract.mintNFT(value);
		} catch (error) {
			console.log(error);
			setTimeout(() => {
				setloading(false);
			}, 1000);
		}
	};

	const listenToContractStateChanges = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			contract.on("StateChange", (state) => {
				setActive(state);
			});
			setloading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const listenToMintedToken = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			contract.on("Minted", (_, tokenId) => {
				const tokenMinted = tokenId.toString();
				setAvailableSupply(tokenMinted);
				setloading(false);
			});
			setloading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchTokenMinted = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const supply = await contract.tokenId();
			const tokenMinted = supply.toString();
			setAvailableSupply(tokenMinted);
		} catch (error) {
			console.log(error);
		}
	};

	const getCurrentContractState = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const isActive = await contract.isActive();

			setActive(isActive);
			setloading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getTokenSupply = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const supply = await contract.tokenSupply();
			setTotalSupply(supply.toString());
		} catch (error) {
			console.log(error);
		}
	};

	const activateContract = async () => {
		try {
			setloading(true);
			const signer = await getProviderOrSigner(true);
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			await contract.activate();
		} catch (error) {
			console.log(error);
		}
	};

	const getProviderOrSigner = async (needSigner = false) => {
		return needSigner ? await signer : await provider;
	};

	useEffect(() => {
		if (isConnected) {
			getTokenSupply();
			fetchTokenMinted();
			getCurrentContractState();
			listenToContractStateChanges();
		}
	}, [isConnected, provider]);

	useEffect(() => {
		if (active) {
			listenToMintedToken();
		}
	}, [active]);

	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
				return (
					<div
						{...(!mounted && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<button
										onClick={openConnectModal}
										type="button"
										className="bg-[#4F1BBF] flex items-center justify-center text-center h-[80px] rounded-md w-full"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 mr-4"
										>
											<path
												d="M3 10H21H3ZM7 15H8H7ZM12 15H13H12ZM6 19H18C18.7956 19 19.5587 18.6839 20.1213 18.1213C20.6839 17.5587 21 16.7956 21 16V8C21 7.20435 20.6839 6.44129 20.1213 5.87868C19.5587 5.31607 18.7956 5 18 5H6C5.20435 5 4.44129 5.31607 3.87868 5.87868C3.31607 6.44129 3 7.20435 3 8V16C3 16.7956 3.31607 17.5587 3.87868 18.1213C4.44129 18.6839 5.20435 19 6 19Z"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										connect wallet
									</button>
								);
							}
							if (chain.unsupported || currentChain !== chain.id) {
								return (
									<button
										onClick={openChainModal}
										type="button"
										className="bg-[#4F1BBF] flex items-center justify-center text-center h-[80px] rounded-md w-full"
									>
										Wrong network
									</button>
								);
							}
							return (
								<div>
									<div className="flex gap-8 my-8">
										<div>
											<small className="uppercase text-sm">Already Minted</small>
											<p className="text-4xl">{availableSupply}</p>
										</div>
										<div className="border-r border-1 rotate-6 border-white"></div>
										<div>
											<small className="uppercase text-sm">Available</small>
											<p className="text-4xl">{totalSupply}</p>
										</div>
									</div>
									<div style={{ display: "flex", gap: 12 }}>
										<button
											onClick={openChainModal}
											style={{ display: "flex", alignItems: "center" }}
											type="button"
										>
											{chain?.hasIcon && (
												<div
													style={{
														background: chain.iconBackground,
														width: 12,
														height: 12,
														borderRadius: 999,
														overflow: "hidden",
														marginRight: 4,
													}}
												>
													{chain?.iconUrl && (
														<img
															alt={chain.name ?? "Chain icon"}
															src={chain.iconUrl}
															style={{ width: 12, height: 12 }}
														/>
													)}
												</div>
											)}
											{chain.name}
										</button>
										<button onClick={openAccountModal} type="button">
											{account.displayName}
											{account.displayBalance ? ` (${account.displayBalance})` : ""}
										</button>
									</div>
									{loading ? (
										<div className="flex items-center justify-center p-8">
											<Loader />
										</div>
									) : active ? (
										<div className="flex items-center gap-4 my-8">
											<div className="flex items-center bg-white rounded-md h-[80px]">
												<button className="text-black px-4 text-4xl">-</button>
												<input
													type="number"
													max="5"
													value={value}
													onChange={(e) => setValue(e.target.value)}
													className="max-w-[80px] outline-none ring-0 text-black text-center"
												/>
												<button className="text-black px-4 text-4xl">+</button>
											</div>
											<button className="bg-[#BF1B4C] grow rounded-md h-[80px]" onClick={mintNFT}>
												🚀 mint your NFT
											</button>
										</div>
									) : (
										<button
											onClick={activateContract}
											type="button"
											className="bg-[#4F1BBF] flex items-center justify-center text-center h-[80px] rounded-md w-full my-8"
										>
											🚀 activate Contract
										</button>
									)}
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};
