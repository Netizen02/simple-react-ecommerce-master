import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
//import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
//import useAuth from "../hooks/useAuth";
//import { FaUser } from "react-icons/fa";
//import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Product } from "../models/Product";


const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  //const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  //const { requireAuth } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, []);

  const handleProductClick = useCallback((productId: number) => {
    clearSearch();
    navigate(`/product/${productId}`);
  }, [clearSearch, navigate]);



  // const showCart = () => {
  //   requireAuth(() => dispatch(setCartState(true)));
  // };
  const showCart = () => {
    dispatch(setCartState(true));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
          >
            Shopify
          </Link>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div
              className="bg-blue-500 text-white text-[26px] grid place-items-center px-4 cursor-pointer"
              onClick={handleSearch}
            >
              <BsSearch />
            </div>

          </div>
          <div className="hidden lg:flex gap-4 md:gap-8 items-center dark:text-white">
            <Link
              to="/products"
              className="text-xl font-bold"
              data-test="main-products"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-xl font-bold"
              data-test="main-categories"
            >
              Categories
            </Link>
            <Link
              to="/wishlist"
              className="text-xl font-bold"
              data-test="main-wishlist"
            >
              Wishlist
            </Link>
            {/* <div className="flex items-center gap-2">
             {username !== "" ? (
                <img
                  src="https://robohash.org/Terry.png?set=set4"
                  alt="avatar"
                  className="w-6"
                />
              ) : (
                <FaUser className="text-gray-500 text-2xl dark:text-white" />
              )}
              <div className="text-gray-500 text-2xl">
                {username !== "" ? (
                  <CustomPopup />
                ) : (
                  <span
                    className="cursor-pointer hover:opacity-85 dark:text-white"
                    onClick={() => dispatch(updateModal(true))}
                    data-test="login-btn"
                  >
                    Login
                  </span>
                )} 
            </div> */}
          </div>
          <div
            className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
            onClick={showCart}
            data-test="cart-btn"
          >
            <AiOutlineShoppingCart className="dark:text-white" />
            <div
              className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
              data-test="cart-item-count"
            >
              {cartCount}
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(updateDarkMode(!isDarkMode));
              document.body.classList.toggle("dark");
            }}
          >
            {isDarkMode ? (
              <MdOutlineLightMode className="cursor-pointer" size={30} />
            ) : (
              <MdOutlineDarkMode className="cursor-pointer" size={30} />
            )}
          </div>
        </div>
        <div className="lg:hidden flex items-center gap-4">
          {/* <div
            className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
            onClick={showCart}
            data-test="cart-btn"
          >
            <AiOutlineShoppingCart className="dark:text-white" />
            <div
              className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
              data-test="cart-item-count"
            >
              {cartCount}
            </div>
          </div> */}
          <AiOutlineMenu
            className="text-gray-500 dark:text-white text-3xl cursor-pointer"
            onClick={toggleDrawer}
          />
        </div>
      </div>
      {/* Mobile Drawer */ }
  <div
    className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="p-4">
      <div className="flex justify-end">
        <button
          onClick={toggleDrawer}
          className="text-gray-500 dark:text-white text-2xl"
        >
          &times;
        </button>
      </div>
      {/* Add search input to mobile drawer */}
      <div className="mt-4 mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for a product..."
            className="border-2 border-blue-500 px-3 py-2 w-full text-sm dark:text-white dark:bg-slate-700"
          />
          <button className="bg-blue-500 text-white px-3 py-2">
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <Link
          to="/products"
          className="text-xl font-bold dark:text-white"
          data-test="main-products"
          onClick={toggleDrawer}
        >
          Products
        </Link>
        <Link
          to="/categories"
          className="text-xl font-bold dark:text-white"
          data-test="main-categories"
          onClick={toggleDrawer}
        >
          Categories
        </Link>
        <Link
          to="/wishlist"
          className="text-xl font-bold dark:text-white"
          data-test="main-wishlist"
          onClick={toggleDrawer}
        >
          Wishlist
        </Link>
        {/* <div className="flex items-center gap-2">
          {username !== "" ? (
            <img
              src="https://robohash.org/Terry.png?set=set4"
              alt="avatar"
              className="w-6"
            />
          ) : (
            <FaUser className="text-gray-500 text-2xl dark:text-white" />
          )}
          <div className="text-gray-500 text-2xl">
            {username !== "" ? (
              <CustomPopup />
            ) : (
              <span
                className="cursor-pointer hover:opacity-85 dark:text-white"
                onClick={() => {
                  dispatch(updateModal(true));
                  toggleDrawer();
                }}
                data-test="login-btn"
              >
                Login
              </span>
            )}
          </div>
        </div> */}
        <div
          onClick={() => {
            dispatch(updateDarkMode(!isDarkMode));
            document.body.classList.toggle("dark");
          }}
        >
          {isDarkMode ? (
            <MdOutlineLightMode className="cursor-pointer" size={30} />
          ) : (
            <MdOutlineDarkMode className="cursor-pointer" size={30} />
          )}
        </div>
      </div>
    </div>
  </div>
  {/* Display search results */ }
  {
    searchResults.length > 0 && (
      <div className="container mx-auto px-4 mt-4">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">Search Results:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="border p-4 rounded dark:bg-slate-700 dark:text-white hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <h3 className="font-bold">{product.title}</h3>
              <p className="line-clamp-2">{product.description}</p>
              <p className="font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
    </div>
  );
};

export default Navbar;