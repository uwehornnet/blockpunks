// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	const response = {
		name: "Crypto Dev #1",
		description: "Crypto Dev is a collection of developers in crypto",
		image: req.headers.referer + ".svg",
	};
	res.status(200).json({ name: "John Doe" });
}
