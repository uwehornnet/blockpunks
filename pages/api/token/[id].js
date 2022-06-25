// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	const referer = req.headers.referer;
	const id = referer.split("/").pop();
	const baseURI = referer.split("/").slice(0, 3).join("/");
	const image = baseURI + "/static/token/" + id + ".svg";

	console.log({
		id,
		baseURI,
		image,
	});
	const response = {
		name: "Blockpunks #" + id,
		description:
			"Blockpunks is a collection of enthusiasts in web3 space. Together we are building a decentralized web3 space.",
		image,
	};
	res.status(200).json(response);
}
