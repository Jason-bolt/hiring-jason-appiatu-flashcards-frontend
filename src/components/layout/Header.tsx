import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type headerProps = {
  page: string;
};

const Header = ({ page }: headerProps) => {
  const { isLoggedIn, logoutUser } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [loginRegisterButton, setloginRegisterButton] = useState(
    <Link className={`hover:text-blue-500 hover:cursor-pointer`} to="/signin">
      Sign In
    </Link>
  );

  const navigate = useNavigate();

  function toggleMenu(): void {
    setShowMenu(!showMenu);
  }

  function logout(): void {
    if (confirm("You will be logged out!")) {
      logoutUser();
      navigate("/");
    }
  }

  let menuButton: React.JSX.Element;
  if (showMenu) {
    menuButton = (
      <IoCloseSharp
        className="text-3xl text-blue-500 hover:cursor-pointer sm:hidden"
        onClick={toggleMenu}
      />
    );
  } else {
    menuButton = (
      <HiOutlineMenuAlt3
        className="text-3xl text-blue-500 hover:cursor-pointer sm:hidden"
        onClick={toggleMenu}
      />
    );
  }

  useEffect(() => {
    if (isLoggedIn()) {
      setloginRegisterButton(
        <button
          className={`hover:text-blue-500 hover:cursor-pointer`}
          onClick={logout}
        >
          Sign Out
        </button>
      );
    } else {
      setloginRegisterButton(
        <Link className={`hover:text-blue-500 hover:cursor-pointer`}
        to="/signin">
          Sign in
        </Link>
        
      );
    }
  }, [isLoggedIn()]);

  return (
    <section className="w-full py-8 border border-b-1">
      <div className="px-5 flex flex-row justify-between md:px-14">
        <h1 className="text-3xl text-blue-600 font-black">
          <Link to="/">
            FLASH
          </Link>
          
        </h1>
        <div className="flex flex-row">
          {menuButton}
          <ul className="hidden flex-row gap-5 sm:flex">
            <li>

              <Link
                className={`hover:text-blue-500 hover:cursor-pointer ${
                  page === "cards" ? "text-blue-500 underline" : ""
                }`}
                to="/cards"
              >
                Cards
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-blue-500 hover:cursor-pointer ${
                  page === "portal" ? "text-blue-500 underline" : ""
                }`}
                to="/portal"
              >
                Portal
              </Link>
            </li>
            <li>{loginRegisterButton}</li>
          </ul>
        </div>
      </div>
      {/* Mobile view */}
      {showMenu && (
        <div className="px-5 mt-4">
          <ul className="flex flex-col">
            <li>
              <Link
                className={`hover:text-blue-500 hover:cursor-pointer ${
                  page === "cards" ? "text-blue-500 underline" : ""
                }`}
                to="/cards"
              >
                Cards
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-blue-500 hover:cursor-pointer ${
                  page === "portal" ? "text-blue-500 underline" : ""
                }`}
                to="/portal"
              >
                Portal
              </Link>
            </li>
            <li>
              <Link
                className={`hover:text-blue-500 hover:cursor-pointer ${
                  page === "signin" ? "text-blue-500 underline" : ""
                }`}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Header;
