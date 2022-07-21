import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { NotificationContextProvider } from "../context";
import Layout from "../layout";

const { chains, provider } = configureChains(
	[chain.ropsten, chain.rinkeby, chain.mainnet, chain.hardhat],
	[alchemyProvider({ alchemyId: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "Blockpunks NFT",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<NotificationContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</NotificationContextProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
