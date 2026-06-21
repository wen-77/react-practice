import { useState, useEffect } from 'react';
import { getData } from '../api/getApi.js';

export default function useFetch(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        getData(endpoint)
            .then((result) => {
                if (!isMounted) return;
                setData(result);
            })
            .catch((err) => {
                if (!isMounted) return;
                setError(err.message || '發生錯誤，請稍後再試。');
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [endpoint]);

    return { data, loading, error };
}

import { useState, useEffect } from 'react';
import { getData } from '../api/getApi.js';

export default function useFetch(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        getData(endpoint)
            .then((result) => {
                if (!isMounted) return;
                setData(result);
            })
            .catch((err) => {
                if (!isMounted) return;
                setError(err.message || '發生錯誤，請稍後再試。');
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [endpoint]);

    return { data, loading, error };
}
