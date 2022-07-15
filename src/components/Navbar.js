import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai";
import { BsList, BsToggleOff, BsToggleOn } from "react-icons/bs"
import { FaKey } from "react-icons/fa"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container"

import Friends from './Friends'
import Favorites from './Favorites';
import { getUser, userLogout } from '../store/user';
import { getOffices } from "../store/offices";
import { setDarkMode } from '../store/darkMode';
import { getFriends } from '../store/friends';
import { getFavorites } from '../store/favorites';
import { selectedFloor } from '../store/selectedFloor';
import favouriteDeleter from "../hooks/favouriteDeleter"

const NavigationBar = () => {

  const [checked, setChecked] = useState(false);

  const [showFriends, setShowFriends] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  favouriteDeleter(location)

  const user = JSON.parse(localStorage.getItem('user'))
  const offices = useSelector((state) => state.offices)
  const Floor = useSelector((state) => state.selectedFloor)


  const handleClick = (office) => {
    let officeName = office.name.replace(/\s+/g, '_').toLowerCase();

    if (office.floors.includes(Floor)) {
      navigate(`/office/${officeName}`)
    }
    else {
      dispatch(selectedFloor(`${officeName}F${office.floors[0]}`))
      navigate(`/office/${officeName}`)
    }
  }

  useEffect(() => {
    dispatch(getUser())
    dispatch(getOffices())
    if (location.pathname.slice(1, 7) === 'office') navigate('/home')
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getFriends())
      dispatch(getFavorites())
    }
  }, [user])

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => {
        localStorage.removeItem('user')
      })
      .then(() => navigate("/"))
  }

  const darkMode = useSelector(state => state.darkMode)
  const handleChangeTheme = () => {
    dispatch(setDarkMode(!darkMode))
    localStorage.setItem('darkMode', !darkMode)
  }

  if (!user) return <></>


  return (
    <>
      {user &&
        <Navbar expand="md" fixed="top" style={{ backgroundColor: darkMode ? "#444444" : "white", boxShadow: "0 2px 2px gray" }}>
          <Container>

          {!user.user.admin ? (
            <Link to="/profile">
            <Button
              id="bs-button"
              variant={darkMode ? "outline-light" : "outline-secondary"}
              onClick={() => setChecked(!checked)}> <AiOutlineUser /> </Button>
          </Link>
          ) : (
             <Link to="/admin">
            <Button 
            onClick={()=> setChecked(!checked)} 
            variant={darkMode ? "outline-light" : "outline-secondary"}><FaKey/></Button>
            </Link>
          )}


            <NavDropdown align="center" title="Oficinas" id={darkMode ? "dark-nav-dropdown" : "nav-dropdown"}>
              <NavDropdown.Item onClick={() => setShowFavs(true)} >Oficinas Favoritas</NavDropdown.Item>
              <NavDropdown.Divider />
              { 
                Object.values(offices).map((e, i) => (<>
                  <NavDropdown.Item onClick={() => handleClick(e)} key={i} >{e.name}
                   </NavDropdown.Item>
               </> ))}
            </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id={darkMode ? "dark-burger" : "white-burger"}>
              <BsList size={24} id={darkMode ? "dark-burger" : "white-burger"} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className={darkMode ? "me-auto dark-mode" : "me-auto light"}>
                <Nav.Link className={darkMode ? "dark-mode" : "light"}>
                  <MdOutlineLightMode /> {darkMode ? <BsToggleOn size={28} onClick={handleChangeTheme} />
                    : <BsToggleOff size={28} onClick={handleChangeTheme} />} <MdOutlineDarkMode />
                </Nav.Link>

                <Nav.Link className={darkMode ? "dark-mode" : "light"} onClick={() => navigate('/home')}>Home</Nav.Link>
                <Nav.Link className={darkMode ? "dark-mode" : "light"} onClick={() => setShowFriends(true)}>Amigos</Nav.Link>
                <Nav.Link className={darkMode ? "dark-mode" : "light"} onClick={handleLogout}>Log Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>

          </Container>
          <Friends show={showFriends} setShow={setShowFriends} />
          <Favorites show={showFavs} setShow={setShowFavs} />
        </Navbar>}
    </>
  )
}

export default NavigationBar