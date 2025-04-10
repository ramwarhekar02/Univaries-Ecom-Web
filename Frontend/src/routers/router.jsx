import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "../App";
import Home from "../pages/home/Home";
import CategoriesPage from '../pages/Categories/CategoriesPage';
import Search from '../pages/search/Search';
import ShopPage from '../shop/ShopPage'
import SingleProduct from '../shop/productDetails/SingleProduct'
import Login from "../Components/Login"
import Register from '../Components/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "/", element: <Home/> },
            { path: "/search", element: <Search/> },
            { path: "/categories/:category", element: <CategoriesPage/>,},
            { path: "/shop", element: <ShopPage/>},
            { path: "/shop/:id", element: <SingleProduct/>},    
        ]
    }, 
    {
        path: "/login",
        element: <Login/>,
    },
    { 
        path: "/register",
        element: <Register/>
    }
]) 

export default router;