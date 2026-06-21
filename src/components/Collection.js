export default function Collection({ data, reverse }) {
	const { name, period, material, description, imageUrl } = data;

	return (
		<>
			<div className={`md:gap-6 flex flex-col items-center mb-8 gap-y-6 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
				<div className="md:w-6/12 px-8">
					<div>
						<h3 className="font-bold text-2xl mb-4">{name}</h3>
						<p className="text-xs mb-2">{period} • {material}</p>
					</div>
					<p>
						{description}
					</p>
				</div>
				<div className="md:w-6/12">
					<img className="max-w-full h-auto aspect-video object-contain" src={`./${imageUrl}`} alt={name} />
				</div>
			</div >
		</>
	);
}