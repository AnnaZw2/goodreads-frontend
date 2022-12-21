import { Link } from "react-router-dom";
export function Navbar() {
    return (
        <div className="bg-beige">
            <nav className="flex align-top justify-between ">
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


                {/* CHANGE ALL OF IT TO DROPDOWN MENU */}
                <div className="flex">
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
        </div>
    );
}
