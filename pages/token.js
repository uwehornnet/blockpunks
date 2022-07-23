import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../components/Loader";
import PriceChart from "../components/PriceChart";

const Token = () => {
	const router = useRouter();
	const [token, setToken] = useState(null);
	const fetchTokenAsync = async () => {
		try {
			const params = new URLSearchParams(window.location.search);
			const address = params.get("address");
			const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`).then((res) =>
				res.json()
			);
			setToken(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchTokenAsync();
	}, [router]);

	return (
		<main className=" w-full flex-1 text-white leading-6 relative mt-24 p-4">
			{token ? (
				<>
					<div className="max-w-[1024px] mx-auto rounded-xl p-2 text-white shadow-xl relative">
						<div className="flex items-center mb-16">
							<img src={token?.image.small} alt={`${token?.name} - ${token?.symbol}`} />
							<div className="ml-8">
								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									{token?.symbol}
								</small>
								<h1 className="text-4xl font-medium tracking-wider">{token?.name}</h1>
								<a
									rel="noreferrer"
									target="_blank"
									className="font-medium text-slate-600 text-xs"
									href={`https://etherscan.io/token/${token?.contract_address}`}
								>{`${token?.contract_address.slice(0, 4)}...${token?.contract_address.slice(-4)}`}</a>
							</div>
						</div>
						<div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 mb-16">
							<div className="col-span-1">
								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									ath
								</small>
								<p className="text-2xl mb-4">
									${token?.market_data.ath.usd}{" "}
									<span
										className={`text-sm ${
											token?.market_data.ath_change_percentage.usd < 0
												? "text-red-500"
												: "text-green-500"
										}`}
									>
										{token?.market_data.ath_change_percentage.usd}%
									</span>
								</p>

								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									atl
								</small>
								<p className="text-2xl mb-4">
									${token?.market_data.atl.usd}{" "}
									<span
										className={`text-sm ${
											token?.market_data.atl_change_percentage.usd < 0
												? "text-red-500"
												: "text-green-500"
										}`}
									>
										{token?.market_data.atl_change_percentage.usd}%
									</span>
								</p>

								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									current price
								</small>
								<p className="text-2xl">${token?.market_data.current_price.usd}</p>
							</div>
							<div className="col-span-1">
								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									marketcap rank
								</small>
								<p className="text-2xl mb-4">{token?.market_cap_rank}</p>
								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									public interest rank
								</small>
								<p className="text-2xl mb-4">{token?.public_interest_score}</p>
							</div>
							<div className="col-span-1">
								<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
									Categories
								</small>
								{token.categories.map((c, i) => (
									<p key={i}>{c}</p>
								))}
							</div>
						</div>
					</div>
					<div className="mx-auto max-w-[1024px]">
						{token ? <PriceChart ticker={token?.tickers} /> : null}
					</div>
					<div className="max-w-[1024px] mx-auto rounded-xl p-2 text-white shadow-xl relative">
						<div>
							<small className="font-medium text-slate-600 tracking-wider uppercase text-xs">
								Description
							</small>
							<div dangerouslySetInnerHTML={{ __html: token?.description.en }}></div>
						</div>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center my-16">
					<Loader />
				</div>
			)}
		</main>
	);
};

export default Token;
