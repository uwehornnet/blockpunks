import { useContext } from "react";

import { AppContext } from "../context";
import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between bg-transparent p-4">
			<Link href="/">
				<a className="flex items-center gap-2 text-white">
					<img src="/images/favicon.svg" alt="blockpunks.nft" />
					<span className="hidden tablet:block">Blockpunks</span>
				</a>
			</Link>

			<div className="flex items-center justify-end gap-8">
				<Link href="/swap">
					<a className="text-white">swap</a>
				</Link>
				<WalletConnectButton />
			</div>
		</div>
	);
};

export default Navbar;
