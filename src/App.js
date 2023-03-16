import * as React from "react";
import { Suspense } from "react";
import './App.scss';
import {Routes, Route} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";
const Catalog= React.lazy(()=> import ('./pages/Catalog'));
const Detail= React.lazy(()=>import ('./pages/detail/Detail'));
function App() {

  return (
    <div className='app'> 
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path ="/" element ={<Home />}/>
        <Route  path ="/:category" element ={<Catalog />}/>
        <Route path ="/:category/:id" element ={<Detail />}/>
        <Route path ="/:category/search/:keyword"  element={<Catalog />}/>
      </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App;
