import { useEffect, useState } from "react";
import { useProvider, useSigner, useAccount } from "wagmi";
import { Contract, utils } from "ethers";

import BlockpunksNFT from "../BlockpunksNFT.json";

export const useBlockpunks = ({ needSigner = false }) => {
	const [isTokenOwner, setIsTokenOwner] = useState(false);

	const provider = useProvider();
	const { data: signer } = useSigner();
	const { data: account } = useAccount();

	const getBalanaceOfAccount = async () => {
		try {
			const contractSigner = needSigner ? signer : provider;
			const contract = new Contract(BlockpunksNFT.address, BlockpunksNFT.abi, contractSigner);
			const balanceOf = await contract.balanceOf(account.address);
			setIsTokenOwner(balanceOf.toString() !== "0");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!account && !provider && !signer) return;
		getBalanaceOfAccount();
	}, []);

	return {
		isTokenOwner,
		signerOrProvider: needSigner ? signer : provider,
	};
};
