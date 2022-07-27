import { useContext, useEffect, useState, useRef } from "react";
import { ethers, Contract } from "ethers";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { erc20ABI } from "wagmi";

import BlockpunksNFT from "../BlockpunksNFT.json";
import { NotificationContext } from "../context/index";

const Profile = () => {
	const { token } = useContext(NotificationContext);
	const tabs = useRef(null);

	const provider = useProvider();
	const { data: signer } = useSigner();
	const { data: account } = useAccount();

	const [balance, setBalance] = useState(null);
	const [profileNFT, setProfileNFT] = useState(null);
	const [tokenList, setTokenList] = useState([]);

	const fetchNFTBalanceAsync = async () => {
		try {
			const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/xhExO2OoyGOgmkQRq0t2gtseoNtjzBdW/getNFTs/`;
			const url = `${baseURL}?owner=${account.address}`;
			const nftsForOwner = await fetch(url).then((res) => res.json());
			setTokenList(nftsForOwner.ownedNfts);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTokenBalanceAsync = async () => {
		try {
			const tokenBalance = [];
			token.forEach(async (t) => {
				const contract = new Contract(t.address, erc20ABI, provider);
				const balanceOf = await contract.balanceOf("0xDb24edBE0D0d22e1B5b5A891C1f2429C61386c63");
				console.log({ balanceOf });
			});
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProfileAsync = async () => {
		try {
			const b = await provider.getBalance(account.address);
			const bFormated = ethers.utils.formatEther(b);
			setBalance(bFormated);

			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, provider);
			const token = await contract.tokenOfOwnerByIndex(account.address, 0);
			const tokenAddress = await contract.tokenURI(token);
			const nft = await fetch(tokenAddress).then((res) => res.json());

			setProfileNFT(nft.image);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (account.address) {
			fetchNFTBalanceAsync();
			fetchProfileAsync();
		}
	}, [account]);

	useEffect(() => {
		if (tabs.current) {
			const wrapper = tabs.current;
			const trigger = wrapper.querySelectorAll(".trigger");
			const shape = wrapper.querySelector(".shape");

			shape.style.width = trigger[0].scrollWidth + "px";
			shape.style.height = trigger[0].scrollHeight + "px";

			Array.from(trigger).forEach((t) =>
				t.addEventListener("mouseenter", () => {
					shape.style.width = t.scrollWidth + "px";
					shape.style.height = t.scrollHeight + "px";

					shape.style.left = t.offsetLeft + "px";
				})
			);
		}
	}, [tabs]);

	useEffect(() => {
		if (signer || provider) {
			//fetchTokenBalanceAsync();
		}
	}, [signer, provider]);

	return (
		<main className=" w-full flex-1 text-white leading-6 relative mt-24">
			<svg viewBox="0 0 94 90" width="0" height="0">
				<defs>
					<clipPath id="hexagon-shape-mask">
						<path
							d="M2.97296 56.4315C-0.990986 49.3577 -0.990987 40.6423 2.97296 33.5685L15.3777 11.4315C19.3417 4.35767 26.6673 1.39004e-06 34.5952 1.05342e-06L59.4048 0C67.3327 -3.36621e-07 74.6583 4.35768 78.6223 11.4315L91.027 33.5685C94.991 40.6423 94.991 49.3577 91.027 56.4315L78.6223 78.5685C74.6583 85.6423 67.3327 90 59.4048 90H34.5952C26.6673 90 19.3417 85.6423 15.3777 78.5685L2.97296 56.4315Z"
							fill="white"
						></path>
					</clipPath>
				</defs>
			</svg>

			<div className="mx-auto max-w-[800px]">
				<div className="flex items-center pt-16 pb-8">
					{account != undefined ? (
						<>
							{profileNFT && (
								<img
									src={profileNFT}
									style={{ clipPath: "url(#hexagon-shape-mask)", height: 100, width: 100 }}
									className="mr-8"
								/>
							)}
							<div>
								<small className="text-sm font-medium text-slate-600">
									{`${account?.address.slice(0, 4)}...${account?.address.slice(-4)}`}
								</small>
								<p className="text-4xl font-medium">{parseFloat(balance).toFixed(2)}eth</p>
							</div>
						</>
					) : null}
				</div>
				<div className="flex items-center justify-between relative gap-24 my-8" ref={tabs}>
					<div className="flex-1 text-center cursor-pointer uppercase text-sm font-medium trigger p-2 z-50">
						NFT
					</div>
					<div className="flex-1 text-center cursor-pointer uppercase text-sm font-medium trigger p-2 z-50">
						Token
					</div>

					<div className="absolute bg-slate-600 rounded-xl shape opacity-20 transition-all duration-500 ease-out"></div>
				</div>

				<div className="grid grid-cols-3 gap-8">
					{tokenList &&
						tokenList?.map((token, index) => (
							<div className="col-span-1" key={index}>
								<img src={token.media[0].thumbnail} alt="" className="rounded-md mb-2" />
								<p className="font-medium">{token.metadata.name}</p>
							</div>
						))}
				</div>
			</div>
		</main>
	);
};

export default Profile;
