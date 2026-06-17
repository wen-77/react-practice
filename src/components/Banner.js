import useFetch from '../hooks/useFetch.js';

export default function Banner() {
    const { data, loading, error } = useFetch('featuredEvent');

    if (loading) {
        return (
            <div className="bg-sky-50 px-6 py-12 text-center">
                <p>載入中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-sky-50 px-6 py-12 text-center text-red-600">
                <p>讀取失敗：{error}</p>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="bg-sky-50 px-6 py-12 text-center">
            {data.title && <h1 className="md:text-4xl text-2xl font-bold mb-4">{data.title}</h1>}
            {data.description && <p className="md:text-lg text-base mb-2 max-w-2xl mx-auto">{data.description}</p>}
            {data.location && <p className="md:text-sm text-xs">地點：{data.location}</p>}
        </div>
    );
}