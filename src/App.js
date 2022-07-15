import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import './styles/general.css'
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Office from "./components/Office";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import NavigationBar from './components/Navbar';
import EditProfile from "./components/EditProfile";
import Admin from './components/Admin';


function App() {
  const darkMode = useSelector(state => state.darkMode)
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"100vh"}} className={darkMode ? "dark-mode" : "light"} >
      <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
      <NavigationBar />
      <Routes >
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/office/:officeName" element={<Office />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;