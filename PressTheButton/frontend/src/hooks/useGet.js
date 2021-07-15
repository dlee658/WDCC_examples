import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(false);
    //get data
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        }
        fetchData();
    }, [url]);
    //update state
    function update(item) {
        return axios.put(`${url}/${item._id}`, item)
            .then(response => {
                setData(data.map(d => {
                    if (d._id === item._id) {
                        return { ...d, ...item };
                    }
                    else {
                        return d;
                    }
                }))
            })
            .catch(err => {
            });
    }
    //create state
    function create(item) {
        return axios.post(url, item)
            .then(response => {
                setData([...data, response.data]);
            })
            .catch(err => {
            });
    }
    return { data, isLoading, update,create };
}