import { useEffect, useState, createContext } from "react";
import { useAccount, useProvider, useSigner, useConnect, useBalance } from "wagmi";
import { Contract, utils } from "ethers";

import BlockpunksNFT from "../BlockpunksNFT.json";

const apiBaseUrl = "https://api.1inch.io/v4.0/";
const tokenEndpoint = "1/tokens";
const quoteEndpoint = "1/quote";

const token1 = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const token2 = "0x4d224452801aced8b2f0aebe155379bb5d594381";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);

	const [token, setToken] = useState([]);
	const [fromTokenAmount, setFromTokenAmount] = useState(0);
	const [txCosts, setTxCosts] = useState(0);
	const [toTokenAmount, setToTokenAmount] = useState(0);
	const [swapToken, setSwapToken] = useState("");
	const [swapQuote, setSwapQuote] = useState(null);
	const [isTokenOwner, setIsTokenOwner] = useState(false);

	const { isConnected } = useConnect();
	const { data } = useAccount();
	const { data: balance } = useBalance({
		addressOrName: data?.address,
	});

	const mintNFT = async () => {
		try {
			setLoading(true);
			const signer = await getProviderOrSigner(true);
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			await contract.mint(mintValue);
		} catch (error) {
			console.log(error);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	const fetchTokenAmountMintedAsync = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const tokenAmountMinted = await contract._totalSupply();
			console.log({ tokenAmountMinted });
			setTokenAmount(tokenAmountMinted.toString());
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTokenSupplyAsync = async () => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const tokenSupply = await contract._tokenSupply();

			setTokenSupply(tokenSupply.toString());
		} catch (error) {
			console.log(error);
		}
	};

	const fetchToken = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}${tokenEndpoint}`);
			const json = await response.json();
			const tokenArray = Object.keys(json.tokens).map((key) => json.tokens[key]);
			setToken(tokenArray);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchQuote = async (token1) => {
		if (fromTokenAmount == 0) return;
		try {
			let amount = fromTokenAmount;

			if (!isTokenOwner) {
				amount = amount - amount * 0.01;
			}
			const response = await fetch(
				`${apiBaseUrl}${quoteEndpoint}?fromTokenAddress=${token1}&toTokenAddress=${
					swapToken.address
				}&amount=${utils.parseEther(amount.toString())}`
			);
			const json = await response.json();
			console.log({ amount: json.toTokenAmount });
			setSwapQuote(json);
			setToTokenAmount(utils.formatEther(json.toTokenAmount.toString()));
		} catch (err) {
			console.log(err);
		}
	};

	const getBalanaceOfAccount = async (address) => {
		try {
			const signer = await getProviderOrSigner();
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, signer);
			const balanceOf = await contract.balanceOf(address);
			setIsTokenOwner(balanceOf.toString() !== "0");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchToken();
		listenToMintedToken();
		fetchTokenSupplyAsync();
		fetchTokenAmountMintedAsync();
	}, []);

	useEffect(() => {
		if (!isConnected && !data?.address) return;
		setAccountDisplayName(`${data.address.slice(0, 4)}...${data.address.slice(data.address.length - 4)}`);
		getBalanaceOfAccount(data.address);
	}, [isConnected, data]);

	useEffect(() => {
		if (!swapToken && fromTokenAmount == 0) return;

		fetchQuote(token1, swapToken);
	}, [swapToken, fromTokenAmount, data]);

	return <NotificationContext.Provider value={{}}>{children}</NotificationContext.Provider>;
};
