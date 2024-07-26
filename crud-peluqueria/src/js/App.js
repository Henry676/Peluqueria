import React from 'react';
import { StyledApp, StyledNavBar } from './styled';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import ClienteTable from './ClienteTable';
import RegistroUsuario from './RegistroUsuario';

class App extends React.Component {
    render() {
        return (
            <Router>
                <StyledNavBar>
                    <Link to="/">Inicio</Link>
                    <Link to="/Nosotros">Nosotros</Link>
                    <Link to="/Tabla">Clientes</Link>
                    <Link to="/Registro">Registro</Link>
                </StyledNavBar>

                <StyledApp>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Nosotros" element={<AboutUs />} />
                        <Route path="/Tabla" element={<ClienteTable />} />
                        <Route path="/Registro" element={<RegistroUsuario />} />
                    </Routes>
                </StyledApp>
            </Router>
        );
    }
}

export default App;
