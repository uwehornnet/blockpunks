import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { erc20ABI } from "wagmi";

const rpcURL = "https://cloudflare-eth.com/";
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

const RecentTransactions = ({ currentToken }) => {
	const [transactions, setTransactions] = useState([]);
	const [height, setHeight] = useState(0);

	const listenToTransactions = async () => {
		const treshhold = 10 ** currentToken.decimals;

		const contract = new Contract(currentToken.address, erc20ABI, provider);
		contract.on("Transfer", (from, to, amount, data) => {
			if (Number(amount.toString()) > treshhold) {
				const newTx = { token: currentToken, data: data, amount };
				const newTxArray = [newTx, ...transactions];
				setTransactions([...newTxArray.filter((tx, i, self) => self.indexOf(tx) === i).slice(0, 10)]);
			}
		});
	};

	useEffect(() => {
		if (currentToken) {
			listenToTransactions();
		}
	}, [currentToken]);

	return (
		<div className=" mt-8">
			<div
				className="flex items-center justify-between py-2 cursor-pointer"
				onClick={() => setHeight((oldHeight) => (oldHeight == 0 ? 160 : 0))}
			>
				<span className="text-white font-medium tracking-wider block ml-2 text-sm">Recent Transactions</span>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<ul className="overflow-y-scroll transition-all duration-500 ease-in-out" style={{ height: `${height}px` }}>
				{transactions.map((tx, index) => (
					<li
						key={index}
						className="flex items-center justify-between py-2 border-solid border-b-[1px] border-neutral-800"
					>
						<div className="text-white ml-4 flex items-center">
							<img
								className="h-6 w-6 rounded-full object-fill bg-white border-[2px] border-solid border-white mr-4"
								src={tx.token.logoURI}
							/>
							<div>
								<span className="text-xs font-medium tracking-wider text-neutral-600">
									{tx.token.symbol}
								</span>
								<p className="text-xs font-medium">{tx.token.name}</p>
							</div>
						</div>

						<p className="text-sm font-medium">
							{currentToken &&
								parseFloat(Number(tx.amount.toString()) / 10 ** currentToken.decimals).toFixed(2)}
						</p>

						<a
							href={`https://etherscan.io/tx/${tx.data.transactionHash}`}
							target="_blank"
							rel="noreferrer"
							className="text-neutral-600 font-medium tracking-wider text-xs"
						>
							{`${tx.data.transactionHash.slice(0, 4)}...${tx.data.transactionHash.slice(-4)}`}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentTransactions;
