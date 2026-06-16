import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import './styles.css';

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={store}><App /></Provider>);
