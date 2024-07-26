import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './js/App';
import reportWebVitals from './js/reportWebVitals';

const root = document.getElementById('root');
const rootInstance = createRoot(root);

rootInstance.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();

