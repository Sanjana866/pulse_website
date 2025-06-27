import { Route, Routes, useLocation } from "react-router"
import Homepage from "./pages/Homepage"
import About from "./pages/About"
import Register from "./pages/Register"
import Method from "./pages/Method"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Services from "./pages/Services"
import Contact from "./pages/Contact"

function App() {
    const location = useLocation();
    const hideNavbarRoutes = ['/register','/login', '/dashboard'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/register"element={<Register/>}/>
        <Route path="/method"element={<Method/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>

    </div>
  )
}

export default App
