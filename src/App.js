import './App.css';
import './Global.scss';
import './Response.scss';
// import "./App.scss";

import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Category from './pages/Category.jsx';
import Notfound from './pages/Notfound.jsx';

import Nav from './components/Nav.jsx';

import axios from "axios";
import { useState, useEffect } from "react";


import { createContext } from 'react';
const DataContext = createContext();

// function App( {children} ) { // https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
function App() { // https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
  const APIKEY = process.env.REACT_APP_API_KEY;

  const [loading,setLoading] = useState(true);
  const [data,setData] = useState([]);

  const getDB = async()=>{
    try {
      // const DB = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/{API_KEY}/COOKRCP01/json/1/몇개`)
      const {data} = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/${APIKEY}/COOKRCP01/json/1/100`);
      console.log(data.COOKRCP01.row);
      setData(data.COOKRCP01.row);
    } catch(err){ console.error(err); }
  }
  useEffect(()=>{
    getDB();
    setLoading(false);
  },[])

  const location = useLocation();
  useEffect(()=>{
    window.scrollTo({ top:0 })
  },[location])

  
  const [checkCate,setCheckCate] = useState(null); //+++상세페이지 카테고리 매치 / RCP_PAT2 상태


  return (
    <>
    <DataContext.Provider value={{ data,loading, checkCate,setCheckCate }}>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:category" element={<Category/>}></Route>
        <Route path="/recipe/:id" element={<RecipeDetail/>}></Route>
        <Route path="*" element={<Notfound/>}></Route>
        {/* <Route path="/category/:category" element={<Category/>}></Route> */}
      </Routes>
    </DataContext.Provider>
    </>
  );
}

export default App;
export {DataContext};
