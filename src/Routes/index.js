import LayoutDefault from "../Layout";
import Home from "../Pages/Home";
import PrivateRouter from "../Components/PrivateRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Answer from "../Pages/Answers";
import Quizz from "../Pages/Quizz";
import Result from "../Pages/Results";
import Topic from "../Pages/Topic";
import Logout from "../Pages/Logout";

export const routes = [
    {
        path: "/",
        element:<LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/Login",
                element: <Login/>
            },
            {
                path: "/Logout",
                element: <Logout/>
            },
            {
                path: "/Register",
                element: <Register/>
            },
            {
                path: "/",
                element: <Home/>
            },
        
            {
                element: <PrivateRouter/>,
                children:[
                    {
                        path: "/answers",
                        element: <Answer/>
                    },
                    {
                        path: "/quizz/:id",
                        element: <Quizz/>
                    },
                    {
                        path: "/results/:id",
                        element: <Result/>
                    },
                    {
                        path: "/topics",
                        element: <Topic/>
                    }
                ]
            }
          
        ]
    }
];

