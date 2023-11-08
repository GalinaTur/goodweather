import { useEffect, useState } from 'react';

export const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const path = params && url + params.toString();

    const fetchData = async (path) => {
        await fetch(path).then(response => {
            if (!response.ok) {
                throw Error("Sorry, can't get data. Please, try later");
            }
            return response.json();
        }).then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        }).catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }

    useEffect(() => {
        if (!params) return;
        fetchData(path);
    }, [path]);
    return [data, isPending, setIsPending, error, setError, fetchData];
}