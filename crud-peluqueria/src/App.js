import React from 'react';
import { StyledApp, StyledNavBar } from './styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './js/Home';
import AboutUs from './js/AboutUs';
import ClienteTable from './js/ClienteTable';


class App extends React.Component {
    render() {
        return (
            <Router>
                <StyledNavBar>
                    <Link to="/">Inicio</Link>
                    <Link to="/Nosotros">Nosotros</Link>
                    <Link to="/crud">CRUD</Link>
                </StyledNavBar>

                <StyledApp>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Nosotros" element={<AboutUs />}/>
                        <Route path="/crud" element={<ClienteTable />}/>
                    </Routes>
                </StyledApp>
            </Router>
        );
    }
}

export default App;
