import Link from "next/link";

const Footerbar = () => {
	return (
		<div className="flex items-center justify-between bg-black p-4 text-white text-sm">
			<p>Copyright by blckpnks.com - {new Date().getFullYear()}</p>

			<div className="flex items-center justify-end gap-8">
				<Link href="/profile">
					<a className="text-white">faq</a>
				</Link>
				<Link href="/profile">
					<a className="text-white">imprint</a>
				</Link>
			</div>
		</div>
	);
};

export default Footerbar;
