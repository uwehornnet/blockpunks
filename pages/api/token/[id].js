// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	const host = req.headers.host;
	const { id } = req.query;

	const response = {
		name: "Crypto Dev #1",
		description: "Crypto Dev is a collection of developers in crypto",
		image: `${host}/static/token/${id}.svg`,
	};
	res.status(200).json(response);
}
