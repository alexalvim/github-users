import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './pages/Home/index.tsx';
import { UserInfo } from './pages/UserInfo/index.tsx';
import { UserRepos } from './pages/UserRepos/index.tsx';
import { Repo } from './pages/Repo/index.tsx';
import { NotFound } from './pages/NotFound/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/users/:login",
    element: <UserInfo/>,
  },
  {
    path: "/users/:login/repos",
    element: <UserRepos/>,
  },
  {
    path: "/repos/:login/:repo",
    element: <Repo/>,
  },
  {
    path: "/*",
    element: <NotFound/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
