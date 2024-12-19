import { useEffect,useState } from "react"
import { useContext } from "react"
import { userContext } from "../../../context/userContex"
import axios from "axios"

export function PagesRead() {
    const { jwt } = useContext(userContext)
    const [count, setCount] = useState()
   
    useEffect(() => {

        axios.get("http://localhost:3000/stats/pages?shelf_id=63d95bb2e6d2a0a1706cdc8b", { headers: { Authorization: `Bearer ${jwt}` } })
        .then(res => {
        setCount(res.data[0].total_pages)})
        .catch((err) => console.log(err))
       
    },[count])

    return (
        <div>
       {count==undefined ? <h4 className="header-4"> In total you read <strong>0</strong> pages. </h4> : <h4 className="header-4"> In total you read <strong>{count}</strong> pages </h4> }
        </div>
    )
}