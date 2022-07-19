import { useEffect, useState } from "react";
import { useToken } from "../hooks/useProtocoll";
import { chain } from "wagmi";

const TokenModal = ({ visible, onChange, onClose, token }) => {
	const [filter, setFilter] = useState("");

	return visible ? (
		<div className="absolute inset-0 z-10 bg-[#1B1929] flex flex-col justify-start">
			<div className="p-4 flex border-b border-slate-700">
				<div className="flex-1">
					<input
						type="text"
						value={filter}
						placeholder="search for token"
						onChange={(e) => setFilter(e.target.value)}
						className="bg-transparent border-slate-600 border-solid w-full outline-none focus:ring-0"
					/>
				</div>
				<button onClick={onClose}>
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
			{token ? (
				<ul className="overflow-scroll">
					{token
						.filter((t) => {
							return (
								t.name.toLowerCase().includes(filter.toLowerCase()) ||
								t.symbol.toLowerCase().includes(filter.toLowerCase())
							);
						})
						.map((t, index) => (
							<li key={index} className="p-4">
								<button
									className="w-full flex items-center hover:bg-[#1B1929]"
									onClick={() => {
										onChange(t);
										onClose();
									}}
								>
									<img className="h-8 w-8 mr-4 rounded-full object-fill" src={t.logoURI} />

									<div>
										<small className="block text-left">{t.symbol}</small>
										<p className="block text-left">{t.name}</p>
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
	) : null;
};

export default TokenModal;
