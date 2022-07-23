import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { NotificationContext } from "../context/index";

const SearchForm = () => {
	const [value, setValue] = useState("");
	const { token } = useContext(NotificationContext);

	const router = useRouter();
	return (
		<div className="hidden laptop:block relative max-w-[400px] w-full laptop:ml-[80px]">
			<div className="flex items-center text-white border-slate-600 rounded-md border-solid border-2 px-2">
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
					className="block w-full bg-transparent py-2 px-4 outline-none ring-0 active:ring-0"
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Paste address or search symbols"
				/>
			</div>
			{value !== "" ? (
				<ul className="absolute w-full bg-black max-h-[400px] overflow-scroll">
					{token
						.filter(
							(t) =>
								t.symbol.toLowerCase().includes(value.toLowerCase()) ||
								t.address.toLowerCase().includes(value.toLowerCase())
						)
						.map((t, i) => (
							<li key={i} className="p-2">
								<button
									className="w-full flex items-center hover:bg-[#212230] p-2 rounded-lg"
									onClick={() => {
										router.push({
											pathname: "/token",
											query: {
												address: t.address,
											},
										});
										setValue("");
									}}
								>
									<img className="h-8 w-8 mr-4 rounded-full object-fill" src={t.logoURI} />

									<div>
										<small className="block text-left text-[12px] font-medium text-slate-600">
											{t.symbol}
										</small>
										<p className="block text-left text-[18px] font-medium text-white">{t.name}</p>
									</div>
								</button>
							</li>
						))}
				</ul>
			) : null}
		</div>
	);
};
export default SearchForm;
