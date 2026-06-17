import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#0b0b10',
            border: '1px solid #2a2a35',
            color: '#f5f5f7',
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);
