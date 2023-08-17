
import './App.css';
import Login from './component/account/Login';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Box from "@mui/material"
import DataProvider from './context/DataProvider';
import Home from './component/home/Home';
import Header from './component/header/Header';
import { useState } from 'react';
import CreatePost from './component/create/CreatePost';
import DetailsView from './component/details/DetailsView';
import Update from './component/create/Update';
import About from './component/about/about';
import Contact from './component/contact/contact';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    // outlet is used to see to go to child comp that is Home
    <>

      <Header />
      <Outlet />
    </> :
    <Navigate replace to="/login" />
}
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  return (
    <BrowserRouter>

      <div style={{ marginTop: 64 }}>
        <DataProvider>
          <Routes>
            <Route path='/login' element={<Login setisAuthenticated={setisAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailsView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>
            <Route path='/About' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/About' element={<About />} />
            </Route>
            <Route path='/Contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/Contact' element={<Contact />} />
            </Route>



          </Routes>
        </DataProvider >
      </div>
    </BrowserRouter>
  );
}

export default App;
