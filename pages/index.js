import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NotificationContext } from "../context/index";

const Home = () => {
	const { tokenpairs } = useContext(NotificationContext);
	const router = useRouter();
	return (
		<main className=" w-full flex-1 text-white leading-6 relative flex flex-col justify-start mt-24 px-4">
			<div className="mx-auto max-w-[480px] h-full flex-1 flex flex-col justify-start">
				<div className="pt-8">
					<h1 className="text-6xl text-center font-medium mb-8">Trading made super easy</h1>
					<p className="text-center text-[24px] leading-snug">
						Trade any ERC20 token on any chain at the best possible rates, fastest routes and without any
						transaction fees.
					</p>

					<div className="mt-8">
						<Link href="/swap">
							<a className="rounded-md bg-violet-600 text-white py-4 px-6 cursor-pointer font-medium tracking-wider flex items-center justify-center text-center max-w-[90%] mx-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								swap token
							</a>
						</Link>
					</div>
				</div>
				<div className="flex-1 relative">
					<p className="mt-16 font-medium text-center ">trending token pairs</p>
					<div className="relative">
						<div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-black z-50"></div>
						<ul className="py-4">
							{tokenpairs.map((pair, index) => (
								<li key={index} className="grid grid-cols-2 gap-8 items-center mb-2 p-4">
									<span className="flex items-center">
										<img
											src={pair.tokenA.logoURI}
											alt={pair.tokenA.name}
											className="w-8 h-8 rounded-full mr-4 cursor-pointer"
											onClick={() => {
												router.push({
													pathname: "/token",
													query: {
														address: pair.tokenA.address,
													},
												});
											}}
										/>
										<span>
											<small className="text-xs text-slate-600 font-medium tracking-wider">
												{pair.tokenA.symbol}
											</small>
											<p>{pair.tokenA.name}</p>
										</span>
									</span>
									<span className="flex items-center">
										<img
											src={pair.tokenB.logoURI}
											alt={pair.tokenB.name}
											className="w-8 h-8 rounded-full mr-4 cursor-pointer"
											onClick={() => {
												router.push({
													pathname: "/token",
													query: {
														address: pair.tokenB.address,
													},
												});
											}}
										/>
										<span>
											<small className="text-xs text-slate-600 font-medium tracking-wider">
												{pair.tokenB.symbol}
											</small>
											<p>{pair.tokenB.name}</p>
										</span>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
