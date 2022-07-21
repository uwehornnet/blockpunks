import { ConnectButton } from "@rainbow-me/rainbowkit";

const currentChain = () => {
	const chainIDs = {
		ropsten: 3,
		rinkeby: 4,
		localhost: 31337,
	};

	return chainIDs["ropsten"];
};

const WalletConnectButton = () => {
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
										className="font-medium flex items-center justify-center text-center rounded-md py-2 px-4 text-white"
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
							if (chain.unsupported || currentChain() !== chain.id) {
								return (
									<button
										onClick={openChainModal}
										type="button"
										className="bg-[#4F1BBF] flex items-center justify-center text-center rounded-md py-3 px-6 uppercase text-white text-sm"
									>
										Wrong network
									</button>
								);
							}
							return (
								<div>
									<div
										style={{ display: "flex", gap: 12 }}
										className="rounded-md bg-[#1B1929] text-white px-4 py-2 cursor-pointer"
									>
										<button
											onClick={openChainModal}
											style={{ display: "flex", alignItems: "center" }}
											type="button"
										>
											{chain?.hasIcon && (
												<div
													style={{
														background: chain.iconBackground,
														width: 18,
														height: 18,
														borderRadius: 999,
														overflow: "hidden",
														marginRight: 4,
													}}
												>
													{chain?.iconUrl && (
														<img
															alt={chain.name ?? "Chain icon"}
															src={chain.iconUrl}
															style={{ width: 18, height: 18 }}
														/>
													)}
												</div>
											)}
											{chain.name}
										</button>
										<button onClick={openAccountModal} type="button">
											{account?.displayName}
										</button>
									</div>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default WalletConnectButton;
