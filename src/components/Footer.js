export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<footer className="px-6 py-4 bg-neutral-300 relative">
				<p className="text-center text-xs">Copyright © {currentYear} by <a className="underline text-sky-900" href="https://github.com/wen-77">Wen-77</a>. All rights reserved.</p>
				<a className="absolute bottom-6 right-6 rounded-full bg-sky-900 text-sky-50 px-4 py-3" href="#top">
					Back to top
				</a>
			</footer>
		</>
	);
}