// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	const host = req.headers.host;
	const { id } = req.query;

	const response = {
		name: `Blockpunks NFT #${id}`,
		description: "Blockpunks NFT is a collection of PFP NFT´s",
		image: `${host}/static/token/${id}.svg`,
	};
	res.status(200).json(response);
}
