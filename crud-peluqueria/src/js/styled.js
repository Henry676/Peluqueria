import styled from 'styled-components';
import Fondo from '../img/Fondo_Home.jpg';

export const StyledApp = styled.div`
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(rgba(5, 7, 12, 0.75), rgba(5, 7, 12, 0.75)),
    url(${Fondo});
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  background-attachment: fixed;
  background-size: cover;

  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track{
      background-image: linear-gradient(to top, grey 0%, grey 1%, grey 31%, grey 75%, grey 100%);
      border-radius: 3em;
  }
  ::-webkit-scrollbar-thumb{
      background-image: linear-gradient(to top, black 0%, rgb(3, 3, 78) 100%);
      border-radius: 3em;
  }
`;

export const StyledNavBar = styled.div`
  background-color: black;
  overflow: hidden;

  a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }
`;

export const StyledHome = styled.div`
  h2{
    text-align: center;
    font-size: 250%;
    color: white;
  }
  p{
    text-align: center;
    font-size: 170%;
    color: white;
  }
`;
export const StyledBuscarCliente = styled.div`
  margin-bottom: 20px;
  text-align:center;
  color: white;
  select {
    background: transparent;
    border-radius: 8px;
    font-size: 16px;
    color:white;
    padding: 8px;
    font-size: 16px;
    margin-right: 10px;
  }

  input {
    color:white; 
    background: transparent;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
  }
`;

export const StyledListaClientes = styled.div`
  text-align: center;
  margin-top: 20px;
  color: white;
  table {
    width: 100%;
    border-collapse: collapse;
    border: none;
    th,
    td {
      border-radious: 5px;
      color:black;
      padding: 8px;
    }

    th {
      background-color: gray;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
  
  tbody{
    font-size: 80%;
    background-color: black;
    text-align: left;
  }
  input{
    color:white;
    border-top: none;
    border-left: none;
    border-right: none;
    background: transparent;
  }

  button {
    margin-left: 5px;
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    font-size: 14px;
  }

  button.btn-editar {
    background-color: #3498db;
    color: white;
  }

  button.btn-eliminar {
    background-color: #e74c3c;
    color: white;
  }

  button.btn-guardar {
    background-color: #4caf50;
    color: white;
  }

  button.btn-cancelar {
    background-color: #d9534f;
    margin-left: 10px;
  }

  button.btn-agregar {
    background-color: gray;
    color: black;
  }
  button:hover {
    background-color: white;
    color:black;
  }
`;

export const StyledRegistroUsuario = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;

  h2 {
    color:White;
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      color:White;
      margin-bottom: 8px;
    }

    input {
      width:280px;
      background:transparent;
      padding: 8px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      color: white; 
    }
    #id_corte, #peluquero_asignado{
      color:rgb(185, 185, 185);
      width: 300px;
      border-radius:10px;
      background:transparent;
    }

    button {
      background-color: black;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: white;
        color:black;
      }
    }
  }
`;
export const StyledUs = styled.div`
  h2, p{
    font-size: 200%;
    color: white;
  }
  #container{
    margin-right: 800px;
    max-width: 500px;
    margin-top: 100px;
  }
`;

export const StyledTable = styled.div`
ul li{
  display: inline-block;
  padding: 0px 5px;
  font-size: 150%;
}

table{
  width:700px;
  height: 400px;
  margin-left: auto;
  margin-right: 10px;
  margin-top: -400px;
  border-collapse: collapse;
}
.table, th, td{
  font-size: 150%;
  text-align:center;
  padding: 10px;
  color: white;
  border-collapse: collapse;
}
#border1{
  border-bottom-left-radius: 10px;
}
#border2{
  border-bottom-right-radius: 10px;
}
section.table{
  width: 100vh;
  background-color: #fff5;
  border-radius: 15px;
}
.table_header{
  font-size: 50%;
  width: 99.5%;
  height: 10%;
  background-color: grey;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  margin-left: 0%;
  padding: .8rem .125rem;
 
}

thead{
  font-size: 80%;
  width: 500px;
  background-color: rgb(68, 68, 68);
  text-align: center;
}
tbody{
  font-size: 80%;
  background-color: black;
  text-align: left;
}

`;

