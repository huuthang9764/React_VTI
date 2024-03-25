import Product from "../components/Product/Product";
import User from "../components/User/User";
import Dashboard from "../page/Dashboard/Dashboard";


const privateRoutes = [
    { path: "/admin", component: Dashboard, layout: "onlylayout" },
    { path: "/admin/users", component: User, layout: "onlylayout" },
    { path: "/admin/products", component: Product, layout: "onlylayout" },
  ];
export default privateRoutes;