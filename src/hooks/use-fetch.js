import React, {useCallback, useState} from 'react';

const useFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendReq = useCallback(async (requestConfig, applyDataFn) => {
        setIsLoading(true);
        setError(null);
        try {
            const res =  await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                }
            );

            if (!res.ok) {
                throw new Error('Request failed!');
            }

            const data = await res.json();

            applyDataFn(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);// nothing external used*, no dependencies. *The setTasks state does not change so it is not added

    return {
        isLoading,
        error,
        sendReq
    };
}

export default useFetch;