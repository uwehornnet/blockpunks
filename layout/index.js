import Head from "next/head";
import Navbar from "../components/Navbar";
import Footerbar from "../components/Footerbar";
import Notification from "../components/Notification";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Blockpunks.nft</title>
				<link rel="icon" href="/images/favicon.svg" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
			</Head>

			<div className="bg-black flex flex-col justify-start min-h-[100vh] overflow-hidden antialiased relative">
				<Notification />
				<Navbar />
				{children}
				<Footerbar />
			</div>
		</>
	);
};

export default Layout;
