import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { userLogin } from '../store/user';
import useInput from '../hooks/useInput';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert,setShowAlert] = useState(false)
  const darkMode = useSelector(state => state.darkMode)

  const email = useInput();
  const password = useInput();

  const user = localStorage.getItem('user')

  useEffect(()=>{
    if(user){
      if(location.pathname === "/"){
        navigate("/home")
      }
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    dispatch(userLogin({
      email: email.value,
      password: password.value,
    }))
      .then(() => {
        if(localStorage.getItem('user')) navigate("/home")
        else setShowAlert(true)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Card.Body style={{marginTop:'30px'}}>
        <Card.Title align="center">Iniciar sesión</Card.Title>
      </Card.Body>
      <Alert variant="warning" show={showAlert} onClose={() => ( setShowAlert(false))} dismissible>
        <Alert.Heading>¡Atención!</Alert.Heading>
        <p>
          E-mail o contraseña incorrectos
        </p>
      </Alert>
      <Form style={{marginTop:'30px'}} onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <input
          style={{width:"90%"}}
          className={darkMode?"dark-mode-input":"main-input"}
          {...email} 
          type="email" 
          placeholder="Ingrese su correo electrónico" 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <input
          style={{width:"90%"}}
          className={darkMode?"dark-mode-input":"main-input"}
          {...password} 
          type="password" 
          placeholder="Ingrese su contraseña" 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿No es un miembro? <Link to="/register">Crear una cuenta</Link>
          </Form.Text>
        </Form.Group>

        <button className="main-button" type="submit">
          Iniciar sesión
        </button>
      </Form>
    </>
  );
};

export default Login;
