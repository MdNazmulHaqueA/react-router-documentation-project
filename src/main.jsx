import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { deleteContactAction, editContactAction, createContactAction as rootAction } from "./actions/contactActions";
import "./index.css";
import { getContactLoader, getContactsLoader as rootLoader } from './loaders/contactsLoader';
import Index from './routes';
import EditContact from './routes/EditContact';
import Contact from './routes/contact';
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: getContactLoader
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: getContactLoader,
        action: editContactAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteContactAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
