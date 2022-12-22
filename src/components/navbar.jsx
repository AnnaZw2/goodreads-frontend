import { Link } from "react-router-dom";

export function Navbar() {
    return (

        <nav className="bg-beige flex flex-row align-top justify-between">
            <div className="flex  flex-row ">
                <Link
                    to="/"
                    className="flex  justify-start text-black  p-3  hover:bg-black hover:text-white w-fit"
                >
                    Home
                </Link>
                <Link
                    to="/mybooks"
                    className="flex justify-center text-black p-3  w-fit hover:bg-black hover:text-white"
                >
                    My Books
                </Link>

                <Link
                    to="/explore"
                    className="flex justify-center text-black p-3  w-fit hover:bg-black hover:text-white"
                >
                    Explore
                </Link>

            </div>
            <div className="flex flex-row align-center    self-center">

                <input type="search" placeholder="Search books" className="flex  sm:h-9  p-4  rounded-md w-80 border border-brown 
"></input>
            </div>


            {/* CHANGE ALL OF IT TO DROPDOWN MENU */}
            <div className="flex flex-row  ">
                {/* in settings there will be option to change name/username/email/password, delete your account, import to file your account info, maybe to add some description to your profile */}
                <Link
                    to="/settings"
                    className=" text-black   w-fit p-3 hover:bg-black hover:text-beige"
                >
                    Settings
                </Link>

                {/* TO be added feature that signs out and ridarects to log in page */}
                <button className=" hover:bg-black p-3 hover:text-white">Sign Out</button>
            </div>
        </nav>

    );
}
