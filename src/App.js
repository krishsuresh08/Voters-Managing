import './App.css';
import React, { useEffect } from 'react';
import Layout from './Components/Layout/Layout.js';
import "../src/Assets/CSS/style.css";
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== "/pdf_list"){
      localStorage.removeItem("pdf")
    }
  }, []);

  return (
    <Layout/>

  );
}

export default App;