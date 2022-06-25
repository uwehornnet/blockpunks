import { useEffect, useRef } from "react";
import Head from "next/head";

import { CustomConnectButton } from "../components/CustomConnectButton";
import BlockpunksNFT from "../BlockpunksNFT.json";
const Home = () => {
	const imageContainer = useRef(null);
	let i = 30;
	function loopImages() {
		imageContainer.current.src = `/static/token/${i}.svg`;
		i++;
		if (i === 50) {
			i = 30;
		}

		setTimeout(loopImages, 400);
	}

	useEffect(() => {
		if (imageContainer.current) {
			setTimeout(loopImages, 400);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Blockpunks.nft</title>
				<link rel="icon" href="/images/favicon.svg" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
			</Head>

			<main className="bg-[#030516] w-full min-h-screen text-white leading-6">
				<div className="container grid grid-cols-1 laptop:grid-cols-5 laptop:gap-16">
					<div className="col-span-1 laptop:col-span-3 laptop:sticky top-0 self-start laptop:h-screen py-4 laptop:py-16 ">
						<img
							ref={imageContainer}
							src="/static/token/1.svg"
							alt="blockpunks.nft"
							className="rounded-2xl object-cover h-full"
						/>
					</div>
					<div className="col-span-1  laptop:col-span-2">
						<div className="pt-16">
							<h1 className="flex items-center text-[#FAFF00] text-4xl mb-4">
								<img src="/images/favicon.svg" alt="blockpunks.nft" className="mr-4" />
								Blockpunks NFT
							</h1>

							<div className="flex items-center gap-4">
								<a
									href={`https://rinkeby.etherscan.io/address/${BlockpunksNFT.address}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src="/images/etherscan.png" alt="Blockpunks on therscan" />
								</a>

								<a
									href="https://testnets.opensea.io/collection/blockpunksnft"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src="/images/opensea.png" alt="Blockpunks on Opensea" />
								</a>

								<img src="/images/twitter.png" alt="Blockpunks on Twitter" />
							</div>

							<h2 className="text-2xl mt-16 mb-8">
								<span className="text-[#FAFF00]">Blockpunks</span> – to develop and educate a strong
								community, is just the beginning.
							</h2>

							<p>
								Spacepunks NFT is inspired by leading Projects like{" "}
								<a
									href="https://twitter.com/cryptopunksnfts"
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-[#4F1BBF]"
								>
									@cryptopunksnft
								</a>
								,{" "}
								<a
									href="https://twitter.com/moonbirds"
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-[#4F1BBF]"
								>
									@moonbirds
								</a>{" "}
								and{" "}
								<a
									href="https://twitter.com/nounsdao"
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-[#4F1BBF]"
								>
									@nounsdao
								</a>
								. This is a collection of 10.000 unique PFP NFT´s, where 100 are kept by the team and
								only 2400 will be available for free minting.
							</p>

							<div className="mt-16">
								<CustomConnectButton />
							</div>

							<div className="my-24">
								<h2 className="text-[#FE1F68] text-4xl">Blockpunks Team</h2>

								<div className="flex items-start justify-between gap-8 overflow-x-scroll py-16">
									<div className="max-w-[240px] min-w-[160px]">
										<img
											src="/images/user1.png"
											alt="blockpunks user 1"
											className="mx-auto max-w-[160px]"
										/>
										<small className="block text-center mt-8 text-slate-500">0xcB...3f9B5</small>
										<p className="text-center text-xl max-w-[160px]">Founder & Web3.0 Punk</p>
									</div>
									<div className="max-w-[240px] min-w-[160px]">
										<img
											src="/images/user2.png"
											alt="blockpunks user 1"
											className="mx-auto max-w-[160px]"
										/>
										<small className="block text-center mt-8 text-slate-500">0xcB...3f9B5</small>
										<p className="text-center text-xl max-w-[160px]">Co Founder & Developer</p>
									</div>
									<div className="max-w-[240px] min-w-[160px]">
										<img
											src="/images/user3.png"
											alt="blockpunks user 1"
											className="mx-auto max-w-[160px]"
										/>
										<small className="block text-center mt-8 text-slate-500">0xcB...3f9B5</small>
										<p className="text-center text-xl max-w-[160px]">Marketing</p>
									</div>
								</div>
							</div>

							<div className="my-16">
								<h2 className="text-[#FE1F68] text-4xl mb-4">FAQ</h2>
								<ul>
									<li className="mb-8">
										<h3 className="text-[#24BA9C]">How much NFTs does this collection contain?</h3>
										<p>
											This Collection has a 10.000 total supply. But only 2400 will be available
											for free minting. 100 will be taken by the team, and 7500 will be available
											for auction.
										</p>
									</li>
									<li className="mb-8">
										<h3 className="text-[#24BA9C]">How much does one NFT costs?</h3>
										<p>2400 NFTs will be free minting, the rest will be auctioned.</p>
									</li>
									<li className="mb-8">
										<h3 className="text-[#24BA9C]">Will there be a discord channel?</h3>
										<p>
											No. We do not plan any discord channel, due to the lack of qualified
											content. We have a Twitter Account where we publish new announcements,
											updates and upcomming events.
										</p>
									</li>
									<li className="mb-8">
										<h3 className="text-[#24BA9C]">Any future plans?</h3>
										<p>
											YES. We have future plans. Our goal is to develop and educate a web3 and NFT
											community. To do so, we are currently working on a Spacepunks DAO. We will
											announce more Details as soon we are sold out.
										</p>
									</li>
								</ul>
							</div>

							<div className="flex items-center justify-between text-sm mb-4">
								<p>Copyright by blockpunks.nft - 2022</p>
								<span>Imprint</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
