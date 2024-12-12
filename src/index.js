import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectRouter from './ProjectRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={ProjectRouter}/>
);

