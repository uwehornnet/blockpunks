import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton";
import SearchForm from "./SearchForm";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between px-4 py-2 fixed top-0 left-0 w-screen bg-black z-[90] border-b-[1px] border-solid border-slate-800">
			<Link href="/">
				<a className="flex items-center text-white">
					<img src="/images/favicon.svg" alt="blockpunks.nft" />
					<span className="hidden tablet:block font-medium tracking-wider uppercase ml-2">Blockpunks</span>
				</a>
			</Link>
			<SearchForm />
			<div className="flex items-center justify-end gap-8 text-sm">
				<Link href="/swap">
					<a className="text-white flex items-center justify-start gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
						<span className="font-medium tracking-wider">trade</span>
					</a>
				</Link>
				<WalletConnectButton />
			</div>
		</div>
	);
};

export default Navbar;
