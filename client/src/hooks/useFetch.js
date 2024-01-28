import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    //const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await fetch(url);
            const resultData = await response.json();
            setData(resultData.data);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetch = () => {
        fetchData();
    };
    
    return { isLoading, data, refetch};

};

export default useFetch;