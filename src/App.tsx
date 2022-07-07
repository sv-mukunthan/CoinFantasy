import React, { Suspense } from 'react';
import './App.scss';
import Test from 'screens/test/test.screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'common_components/hoc/main.hoc';
import Login from 'screens/login/login.screen';
import Home from 'screens/home/home.screen';
import Coins from 'screens/coins/coins.screen';

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coin" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
