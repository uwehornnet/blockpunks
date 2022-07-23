import { useState } from "react";

const TokenModal = ({ visible, onChange, onClose, token }) => {
	const [filter, setFilter] = useState("");

	return visible ? (
		<div className="absolute inset-0 z-10 bg-black tablet:bg-[#13121D] flex flex-col justify-start rounded-xl">
			<div className="p-4 flex">
				<span className="text-center text-white text-lg tracking-wider font-medium flex-1">Select Token</span>
				<button
					onClick={() => {
						setFilter("");
						onClose();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div className="overflow-scroll">
				<div className="px-2 ">
					<div className="bg-[#212230] rounded-lg flex items-center justify-start p-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							type="text"
							value={filter}
							placeholder="search for token"
							onChange={(e) => setFilter(e.target.value)}
							className="bg-transparent flex-1 w-full ml-4 outline-none focus:ring-0 font-medium tracking-wider"
						/>
					</div>
				</div>
				{token ? (
					<ul>
						{token
							.filter((t) => {
								return (
									t.name.toLowerCase().includes(filter.toLowerCase()) ||
									t.symbol.toLowerCase().includes(filter.toLowerCase()) ||
									t.address.toLowerCase().includes(filter.toLowerCase())
								);
							})
							.map((t, index) => (
								<li key={index} className="p-2">
									<button
										className="w-full flex items-center hover:bg-[#212230] p-2 rounded-lg"
										onClick={() => {
											onChange({ type: visible, token: t });
											setFilter("");
											onClose();
										}}
									>
										<img className="h-8 w-8 mr-4 rounded-full object-fill" src={t.logoURI} />

										<div>
											<small className="block text-left text-[12px] font-medium text-slate-600">
												{t.symbol}
											</small>
											<p className="block text-left text-[18px] font-medium">{t.name}</p>
										</div>
									</button>
								</li>
							))}
					</ul>
				) : (
					<ul className="px-4 py-8">
						{[1, 2, 3, 4, 5, 6].map((_, index) => (
							<li key={index} className="flex items-center justify-start mb-3">
								<span className="block h-12 w-12 mr-8 rounded-full bg-slate-50/10 relative animate-pulse"></span>
								<span className="block h-6 flex-1 rounded-sm bg-slate-50/10 relative animate-pulse"></span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	) : null;
};

export default TokenModal;
