import { useState, useEffect } from 'react';
import axios, { AxiosHeaders } from 'axios';

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = <H extends AxiosHeaders, B>(url: string, method: Method, headers?: H, body?: B) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        setLoading(true)
        const source = axios.CancelToken.source();
        const intervalId = setInterval(async () => {
            setLoading(true)
            axios(url, {
                method: method,
                cancelToken: source.token,
                headers: headers,
                data: body
            })
                .then(res => {
                    setLoading(false);
                    res.data && setData(res.data);
                })
                .catch(err => {
                    setLoading(false)
                    setError(err)
                });
           
        }, 2 * 60 * 1000);
        return () => {
            source.cancel();
            clearInterval(intervalId);
        }
    }, [body, headers, method, url]);
    return { data, loading, error }
}

export default useFetch;