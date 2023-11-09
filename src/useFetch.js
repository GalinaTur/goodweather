import { useEffect, useState } from 'react';

export const useFetch = (url, params, handleError, handlePending) => {
    const [data, setData] = useState(null);

    const path = params && url + params.toString();

    const fetchData = async (path) => {
        await fetch(path).then(response => {
            if (!response.ok) {
                throw Error("Sorry, can't get data. Please, try later");
            }
            return response.json();
        }).then(data => {
            setData(data);
            handlePending(false);
            handleError(null);
        }).catch(err => {
            handlePending(false);
            handleError(err);
        })
    }

    useEffect(() => {
        if (!params) return;
        fetchData(path);
    }, [path]);
    return [data, fetchData];
}