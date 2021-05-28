import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';

function App() {  

  return (
    <div className="App">
      <Sidebar
       />
      <Dashboard />
    </div>
  );
}

export default App;
