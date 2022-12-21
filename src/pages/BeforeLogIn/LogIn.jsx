import { Link } from "react-router-dom"
export function LogIn(){
    return (
        <div>
         <Link to="/sign" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Sign in</Link>
        <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 ">Log In</h3>
        <p>Page is not completed yet</p>
        </div>
    )
}