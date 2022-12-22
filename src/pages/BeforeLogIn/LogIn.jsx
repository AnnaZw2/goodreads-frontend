import { Link } from "react-router-dom"
export function LogIn(){
    return (
        <div>
         <Link to="/sign" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Sign in</Link>
        <h3 className="header-3">Log In</h3>
        <p>Page is not completed yet</p>
        </div>
    )
}