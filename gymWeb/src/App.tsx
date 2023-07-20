import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';
import Login from './components/Login/Login';
import Contacto from './components/Contacto/Contacto';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/admin' element={<Admin />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
