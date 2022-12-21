import { Link } from "react-router-dom"
export function SignIn(){
    return (
        <div>
          <Link to="/login" className=' text-light-brown border border-brown rounded-lg p-1 hover:bg-yellow hover:text-light-brown' >Log in</Link>
        <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 ">Sign In</h3>
        <p>Page is not completed yet</p>
        </div>
    )
}