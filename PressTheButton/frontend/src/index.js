import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppContextProvider } from './AppContextProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* </Router> */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById('root')
);