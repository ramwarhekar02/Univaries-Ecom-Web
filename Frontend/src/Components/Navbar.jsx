import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import CardModal from "../shop/CardModal";
import avatar from "../assets/images/avatar.png";
import { logout, setUser } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products) || [];

  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Failed to Logout", error);
    }
  };

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/" },
    { label: "Manage Items", path: "/" },
    { label: "All Orders", path: "/" },
    { label: "Add New Post", path: "/" },
  ];

  const userDropDownMenus = [
    { label: "Dashboard", path: "/" },
    { label: "Profile", path: "/" },
    { label: "Payments", path: "/" },
    { label: "Orders", path: "/" },
  ];

  const dropDownMenus = user?.role === "admin" ? adminDropDownMenus : userDropDownMenus;

  return (
    <>
      <div className="w-full py-5 max-w-[1260px] px-4 mx-auto">
        <nav className="flex items-center justify-between">
          <h1 className="font-[Slackey] text-[#B6011F] md:text-3xl text-xl">Univaries</h1>

          <ul className="hidden sm:flex gap-5 text-base font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>

          <div className="relative flex gap-4 items-center">
            <Link to="/search" className="hover:text-orange-800">
              <FiSearch size={22} />
            </Link>

            <button onClick={handleCartToggle} className="relative hover:text-orange-800">
              <IoCartOutline size={22} />
              <sup className="absolute -top-2 -right-2 text-white px-1 bg-red-500 rounded-full text-xs">
                {products.length}
              </sup>
            </button>

            {user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.image || avatar}
                  className="size-6 rounded-full cursor-pointer"
                  alt="User Avatar"
                />
                {isDropDownOpen && (
                  <div className="absolute w-40 z-50 right-0 shadow-md rounded-md bg-white mt-2">
                    <ul>
                      {dropDownMenus.map((menu, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-zinc-200">
                          <Link
                            to={menu.path}
                            className="block"
                            onClick={() => setIsDropDownOpen(false)}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li className="px-4 py-2 hover:bg-zinc-200">
                        <button
                          className="w-full text-left"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-orange-800">
                <FaRegUser />
              </Link>
            )}
          </div>
        </nav>
        {isCartOpen && <CardModal isOpen={isCartOpen} products={products} onClose={handleCartToggle} />}
      </div>
    </>
  );
};

export default Navbar;
