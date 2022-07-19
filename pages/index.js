import MintForm from "../components/MintForm";

const Home = () => {
	
	return (
		<main className=" w-full flex-1 text-white leading-6 relative">
			<div className="absolute h-full w-full">
				<div className="container relative h-full opacity-30">
					<div className="absolute rounded-full h-[600px] w-[600px] bg-purple-500 right-0 top-[30%] blur-3xl"></div>
					<div className="absolute rounded-full h-[400px] w-[400px] bg-pink-500 right-[30%] top-[20%] blur-3xl"></div>
					<div className="absolute rounded-full h-[350px] w-[600px] bg-indigo-600 -right-[10%] top-[10%] blur-3xl"></div>
				</div>
			</div>
			<div className="container grid grid-cols-1 laptop:grid-cols-2 items-stretch pt-24 gap-16">
				<div className="flex flex-col laptop:justify-center order-2 laptop:order-1 z-30">
					<h1 className="text-4xl font-bolder mb-8">Blockpunks - Collection of 7500 ERC721 Token</h1>
					<p>
						Spacepunks NFT is inspired by leading Projects like @cryptopunksnft, @moonbirds and @nounsdao.
						This is a collection of 10.000 unique PFP NFT´s, where 100 are kept by the team and only 2400
						will be available for free minting.
					</p>

					<MintForm />
				</div>
				<div className="relative order-1 laptop:order-2 z-30 min-h-[300px] tablet:min-h-[50vh]">
					<img
						src="/images/card-1.png"
						className="absolute top-[51%] left-[50%] h-auto w-[240px] tablet:w-[360px] -translate-x-[50%] -translate-y-[50%] -rotate-[8deg]"
					/>
					<img
						src="/images/card-0.png"
						className="absolute top-[50%] left-[50%] h-auto w-[240px] tablet:w-[360px] -translate-x-[50%] -translate-y-[50%] rotate-[8deg]"
					/>
				</div>
			</div>
		</main>
	);
};

export default Home;
