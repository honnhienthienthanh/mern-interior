import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux'
import { store } from './store/store';
import Admin from './pages/Admin/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
