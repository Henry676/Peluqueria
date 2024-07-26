import React from 'react';
import { StyledHome } from './styled';
import peluqueriaGif from '../img/peluqueria_gif.gif';

const Home = () => {
    const imgStyle = {
        borderRadius: '20px',
        width: '400px',
        height: '290px',
        filter: 'grayscale(100%) brightness(0.8) contrast(1.2)',
    };
    

    return (
        <div>
            <StyledHome>
                <h2>Bienvenido a nuestra peluquería</h2>
                <p>Ofrecemos servicios de peluquería de alta calidad para hombres y mujeres. Ven y disfruta de nuestros profesionales estilistas.</p>
                <footer className="footer">
                    <center>
                        <img src={peluqueriaGif} alt="Peluquería GIF animado" style={imgStyle} />                    </center>
                    <p>Ceti &copy; 2023</p>
                </footer>
            </StyledHome>
        </div>
    );
};

export default Home;
