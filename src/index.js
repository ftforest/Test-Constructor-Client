import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from "./components/bootstrap/StateProvider"
import Routery from "./RouterList";
import Menu from "./components/bootstrap/Menu";
import "./index.css"
import QuestionProvider from "./hooks/question-hooks";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <StateProvider>
              <Menu/>
              <Routery/>
          </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
