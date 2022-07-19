import { utils } from "ethers";

const SwapDetails = ({ estimatedGas, isTokenOwner, buyAmount, buyToken }) => {
	return (
		<>
			<div className="flex items-center justify-between text-xs px-4 mt-8">
				<span className="flex items-center text-white">
					<svg viewBox="0 0 296.114 296.114" fill="currentcolor" className="h-3 w-3 mr-2">
						<path
							d="M277.66,20.815c-5.436,0-9.845,4.409-9.845,9.844V41.66c-1.312-0.381-2.667-0.647-4.104-0.647
	c-8.156,0-14.765,6.608-14.765,14.764v36.091c0,4.359,1.923,8.232,4.922,10.933v94.065c0,5.426-4.417,9.844-9.844,9.844
	c-5.427,0-9.843-4.418-9.843-9.844v-36.911c0-15.443-11.953-28.008-27.068-29.281V29.531C207.113,13.246,193.867,0,177.583,0H38.142
	C21.86,0,8.612,13.246,8.612,29.531v237.054c0,16.284,13.248,29.529,29.53,29.529h139.44c16.284,0,29.53-13.245,29.53-29.529
	V150.609c4.205,1.116,7.383,4.791,7.383,9.345v36.911c0,16.284,13.244,29.529,29.528,29.529c16.284,0,29.529-13.245,29.529-29.529
	V102.8c2.999-2.7,4.923-6.573,4.923-10.933v-15.75c5.031-0.437,9.026-4.532,9.026-9.68V30.659
	C287.503,25.225,283.094,20.815,277.66,20.815z M176.427,115.093H39.298V31.864h137.129V115.093z"
						/>
					</svg>
					est gas
				</span>
				<span className="text-right">{estimatedGas}</span>
			</div>

			{!isTokenOwner ? (
				<div className="px-4 mt-2">
					<div className="flex items-center justify-between mb-4 text-xs">
						<span>Tx costs 1%</span>
						<span>
							{`${utils.formatEther(isTokenOwner ? "0" : `${buyAmount * 0.01}`).toString()}
						${buyToken?.symbol}`}
						</span>
					</div>
					<p className="text-xs text-slate-600">
						If you dont own a Blockpunk NFT, we charge you 1% transaction fee.
					</p>
				</div>
			) : null}
		</>
	);
};

export default SwapDetails;