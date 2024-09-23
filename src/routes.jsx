import Home from "./pages/home/Home"
import Panel from "./pages/panel/Panel"
import Intresteds from "./pages/intresteds/Intresteds"
import Explore from "./pages/explore/Explore"
import Login from "./pages/form/Login"
import Registration from "./pages/form/Registration"
import PrivateRoute from "./components/private route/PrivateRoute"
import Post from "./pages/post/Post"

let routes = [
    {path: "/", element: <Home/>},
    {path: "/explore", element: <PrivateRoute><Explore/></PrivateRoute>},
    {path: "/intresteds", element: <PrivateRoute><Intresteds/></PrivateRoute>},
    {path: "/panel", element: <PrivateRoute><Panel/></PrivateRoute>},
    {path: "/login", element: <Login/>},
    {path: "/registration", element: <Registration/>},
    {path: "/works/:id", element: <Post/>},
]

export default routes