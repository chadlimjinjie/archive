import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DesktopLayout from './components/DesktopLayout';
import { ChakraProvider } from '@chakra-ui/react';
import MaintenancePage from './MaintenancePage';
import TrafficImagesPage from './TrafficImagesPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DesktopLayout Body={App} />,
  },
  {
    path: "/traffic-images",
    element: <DesktopLayout Body={TrafficImagesPage} />,
  },
  {
    path: "/maintenance",
    element: <DesktopLayout Body={MaintenancePage} />,
  },
  {
    path: "/desktop-layout",
    element: <DesktopLayout />,
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
