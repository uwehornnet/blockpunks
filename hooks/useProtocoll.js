import { useEffect, useState } from "react";
import { ethers, utils } from "ethers";

const apiBaseUrl = "https://api.1inch.io/v4.0/";
const tokenEndpoint = "1/tokens";
const quoteEndpoint = "1/quote";
const swapEndpoint = "1/swap";

const sellToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const useToken = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [token, setToken] = useState([]);

	const fetchTokenAsync = async () => {
		try {
			const response = await fetch(`https://tokens.coingecko.com/uniswap/all.json`);
			const json = await response.json();
			const tokenArray = Object.keys(json.tokens).map((key) => json.tokens[key]);
			setToken(tokenArray);
			setLoading(false);
		} catch (err) {
			setError(err);
			console.log(err);
		}
	};

	useEffect(() => {
		fetchTokenAsync();
	}, []);

	return { token, loading, error };
};

export const useQuote = ({ buyToken, sellTokenAmount, isTokenOwner }) => {
	const [quote, setQuote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchQuoteAsync = async () => {
		try {
			let params = {
				buyToken: buyToken.address,
				sellToken: sellToken,
				sellAmount: utils.parseEther(sellTokenAmount),
				affiliateAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				feeRecipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
				buyTokenPercentageFee: isTokenOwner ? 0 : 1.0,
			};

			let endpoint = new URLSearchParams(params).toString();
			console.log(endpoint);

			const response = await fetch(`https://api.0x.org/swap/v1/quote?${endpoint}`);
			const json = await response.json();
			setQuote(json);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setError(err);
		}
	};

	useEffect(() => {
		if (sellTokenAmount == 0 && !buyToken && !isTokenOwner) return;
		fetchQuoteAsync();
	}, [buyToken, sellTokenAmount]);

	return { quote, loading, error };
};

export const swapToken = async ({ fromTokenAmount, toToken, isTokenOwner, account, signer, provider }) => {
	try {
	} catch (err) {
		console.log(err);
	}
};
