import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { userRegister } from "../store/user";
import { getOffices } from "../store/offices";
import useInput from "../hooks/useInput";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const name = useInput();
  const surname = useInput();
  const email = useInput();
  const password = useInput();
  const [position, setPosition] = useState("");
  const [mainOffice, setMainOffice] = useState("");
  const [show,setShow] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"));
  const offices = useSelector((state) => state.offices);
  const darkMode = useSelector((state) => state.darkMode);

  const defaultPosition = 'Seleccione su rol'
  const defaultMainOffice = 'Seleccione su oficina principal'

  useEffect(() => {
    if (user) {
      if (location.pathname === "/register") {
        navigate("/home");
      }
    }
    dispatch(getOffices());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(position === '') return setShow('Debes seleccionar un rol')
    if(mainOffice === '') return setShow('Debes seleccionar una oficina')
    dispatch(
      userRegister({
        name: name.value[0].toUpperCase() + name.value.toLowerCase().slice(1),
        surname: surname.value[0].toUpperCase() + name.value.toLowerCase().slice(1),
        email: email.value,
        password: password.value,
        position: position,
        mainOffice: mainOffice,
      })
    ).then((regUser) => {
      if(regUser.error){
        if(regUser.error.message === 'Request failed with status code 409') setShow('El correo electrónico ya existe')
      }
      else navigate("/")
    })
    .catch(err => console.log("CATCH",err));
  };

  const roles = [
    "Development and Coding",
    "Project Management",
    "Project Design",
    "Marketing and Communication",
    "Human Resources",
    "Financial Management",
  ];
  return (
    <>
      <Card.Body style={{ marginTop: "30px" }}>
        <Card.Title align="center">Registrarse</Card.Title>
      </Card.Body>
      <Form onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicTextFirstName">
          <Form.Label>Nombre</Form.Label>
          <br></br>
          <input
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            {...name}
            type="text"
            placeholder="Ingrese su Nombre"
            required
            minLength="3"
            maxLength="20"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextLastName">
          <Form.Label>Apellido</Form.Label>
          <br></br>
          <input
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            {...surname}
            type="text"
            placeholder="Ingrese su Apellido"
            required
            minLength="3"
            maxLength="30"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextRol">
          <Form.Label>Rol</Form.Label>
          <br></br>
          <select
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            required
            onChange={(e) => setPosition(e.target.value)}
          >
            <option selected="selected" disabled>{defaultPosition}</option>
            {roles.map((rol, i) => (
              <option key={i} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextMainOffice">
          <Form.Label>Oficina Principal</Form.Label>
          <br></br>
          <select
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            required
            onChange={(e) => setMainOffice(e.target.value)}
          >
            <option selected="selected" disabled>{defaultMainOffice}</option>
            {Object.values(offices).map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <br></br>
          <input
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            {...email}
            type="email"
            placeholder="Ingrese su correo electrónico"
            required
          />
          <Form.Text className="text-muted">
            <br></br>
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <br></br>
          <input
            style={{width:'90%'}}
            className={darkMode?"dark-mode-input":"main-input"}
            {...password}
            type="password"
            placeholder="Ingrese su contraseña"
            required
            minLength="6"
            maxLength="30"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿Ya eres usuario? <Link to="/">&nbsp;Iniciar Sesión</Link>
          </Form.Text>
        </Form.Group>
        <Alert variant="warning" show={show} onClose={()=>setShow(false)} dismissible>
        {show}
        </Alert>
        <button className="main-button" type="submit">
          Enviar
        </button>
      </Form>
    </>
  );
};

export default Register;
