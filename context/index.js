import { useEffect, useState, createContext } from "react";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [token, setToken] = useState([]);
	const [tokenpairs, setTokenpairs] = useState([]);

	const fetchTokenAsync = async () => {
		try {
			const response = await fetch(`https://gateway.ipfs.io/ipns/tokens.uniswap.org`);
			const json = await response.json();
			const tokenArray = Object.keys(json.tokens)
				.map((key) => json.tokens[key])
				.filter((token) => token.chainId == 1);

			setToken(tokenArray);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchTokenPairsAsync = async () => {
		try {
			const tokenPairs = await fetch(
				`https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json`
			)
				.then((res) => res.json())
				.then((res) => res.tokens.slice(0, 20));

			const token = await fetch(`https://gateway.ipfs.io/ipns/tokens.uniswap.org`).then((res) => res.json());
			const tokenArray = Object.keys(token.tokens).map((key) => token.tokens[key]);

			const pairs = tokenPairs
				.map((pair) => {
					const name = pair.name.split(" ")[pair.name.split(" ").length - 1];
					const tokens = name.split("/");
					const tokenA = tokenArray.find((token) => token.symbol == tokens[0]);
					const tokenB = tokenArray.find((token) => token.symbol == tokens[1]);
					return { tokenA, tokenB, data: pair };
				})
				.filter((pair) => pair.tokenA !== undefined && pair.tokenB !== undefined);

			setTokenpairs(pairs);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (notifications.length) {
			notifications.forEach((note, index) =>
				setTimeout(() => {
					setNotifications((oldMessages) => oldMessages.filter((oldMessage) => oldMessage !== note));
				}, 5000 + index * 5000)
			);
		}
	}, [notifications]);

	useEffect(() => {
		if (!token.length) {
			fetchTokenAsync();
		}

		if (!tokenpairs.length) {
			fetchTokenPairsAsync();
		}
	}, []);

	return (
		<NotificationContext.Provider value={{ notifications, setNotifications, token, tokenpairs }}>
			{children}
		</NotificationContext.Provider>
	);
};
