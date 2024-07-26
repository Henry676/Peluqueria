import React from 'react';
import { StyledTable, StyledUs } from './styled';

const AboutUs = () => {
    return (
        <div>
            <StyledUs>
                <div id='container'>
                    <h2>Nosotros</h2>
                    <p>Somos un equipo apasionado de estilistas con <br/>
                        años de experiencia en la industria de la belleza. <br/> 
                        Nuestro objetivo es proporcionar servicios excepcionales <br/> 
                        y satisfacer las necesidades de nuestros clientes.</p>
                </div>
            </StyledUs>
            <StyledTable>
            <section class="table_body">
                    <table>
                        <thead>
                            <tr>
                                <th>No. empleado</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Especialidad</th>
                                <th>Área</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="number">1</td>
                                <td>Henry</td>
                                <td>Hernández</td>
                                <td>22</td>
                                <td>Corte de pelo</td>
                                <td>Cortes</td>
                            </tr>
                            <tr>
                                <td class="number">2</td>
                                <td>Pedro</td>
                                <td>Espejo</td>
                                <td>22</td>
                                <td>Decoración de uñas</td>
                                <td>Manicure</td>
                            </tr>
                            <tr>
                                <td class="number">3</td>
                                <td>Teodoro</td>
                                <td>Casados</td>
                                <td>29</td>
                                <td>Teñir cabello</td>
                                <td>Tintura de cabello</td>
                            </tr>
                            <tr>
                                <td class="number" id="border1">4</td>
                                <td>Miguel</td>
                                <td>Martinez</td>
                                <td>35</td>
                                <td>Rasurado</td>
                                <td id="border2">Barbería</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </StyledTable>
        </div>
        
    );
};

export default AboutUs;

