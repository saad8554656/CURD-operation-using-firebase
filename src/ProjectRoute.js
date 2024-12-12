import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login"
import Menu from "./components/Menu";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Showuser from "./components/Showuser";
import Edituser from "./components/Edituser";

const ProjectRouter = createBrowserRouter([
    {
        path:'',
        element:<Menu/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Registration/>
            },
            {
                path:'show-user',
                element:<Showuser/>
            },
            {
                path:'edit-user/:id',
                element:<Edituser/>
            }

        ]
    }
])

export default ProjectRouter;