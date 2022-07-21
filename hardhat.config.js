require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

const INFURA_API_URL = process.env.INFURA_API_URL;
const INFURA_PRIVATE_KEY = process.env.INFURA_PRIVATE_KEY;

module.exports = {
	solidity: "0.8.4",
	networks: {
		hardhat: {},
		rinkeby: {
			url: ALCHEMY_API_KEY_URL,
			accounts: [RINKEBY_PRIVATE_KEY],
		},
		ropsten: {
			url: INFURA_API_URL,
			accounts: [INFURA_PRIVATE_KEY],
		},
	},
};
