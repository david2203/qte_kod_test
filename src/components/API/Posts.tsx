import React, {useState, useEffect} from 'react'
import axios from 'axios';
import server from '../config/config'

function Posts() {
    const instance = axios.create({ baseURL: server })
    
    const useGetData = () => {
        const [dataArray, setDataArray] = useState([])
        const [loading, setLoading] = useState(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server}getPosts.php`)
                console.log(response)
                setDataArray(response.data)
            } catch (err) {
                console.log(err)
            }

            setLoading(false)


        }
        useEffect(() => {
            fetchData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return { dataArray, loading }

    }
    const { loading, dataArray } = useGetData()
  return (
    <>
     <button> {!loading && dataArray} </button>
    </>
  )
}

export default Posts