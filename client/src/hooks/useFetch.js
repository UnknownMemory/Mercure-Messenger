import {useState, useRef} from 'react';

const useFetch = () => {
    const BASE_URL = "http://localhost:1234"

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const status = useRef(null);

    const request = async (method, url, body = null, headers = {}) => {
        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL+url, {body, headers: headers, method: method});
            const data = await res.json();
            status.current = res;
            return data;
        } catch(error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const HTTPMethod = {
        get: (url, body = null, headers = {}) => request('GET', url, body, headers),
        post: (url, body = null, headers = {}) => request('POST', url, body, headers),
        patch: (url, body = null, headers = {}) => request('PATCH', url, body, headers),
        del: (url, body = null, headers = {}) => request('DELETE', url, body, headers),
    }

    return {...HTTPMethod, isLoading, status, error}
};

export default useFetch;