import Collection from './Collection.js';
import useFetch from '../hooks/useFetch.js';

export default function Collections() {
	const { data, loading, error } = useFetch('collections');

	if (loading) {
		return (
			<section className="py-8 px-6 max-w-5xl mx-auto">
				<h2 className="text-center font-bold text-3xl mb-6">故宮精選館藏</h2>
				<p className="text-center">載入中...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-8 px-6 max-w-5xl mx-auto">
				<h2 className="text-center font-bold text-3xl mb-6">故宮精選館藏</h2>
				<p className="text-center text-red-600">讀取失敗：{error}</p>
			</section>
		);
	}

	return (
		<section className="py-8 px-6 max-w-5xl mx-auto">
			<h2 className="text-center font-bold text-3xl mb-6">故宮精選館藏</h2>
			{Array.isArray(data) && data.length > 0 ? (
				data.map((item, index) => (
					<Collection
						key={item.id}
						data={item}
						reverse={index % 2 === 1}
					/>
				))
			) : (
				<p className="text-center">目前沒有可顯示的館藏資料。</p>
			)}
		</section>
	);
}