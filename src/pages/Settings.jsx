import { Link } from "react-router-dom"
export function Settings() {
    return (
        <div>
            <Link to="/" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Home</Link>
            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">Settings</h3>
            <p>Page is not completed yet</p>
        </div>
    )
}