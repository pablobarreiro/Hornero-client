import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image"
import Placeholder from 'react-bootstrap/Placeholder';
import { FaRegShareSquare } from "react-icons/fa"
import { MdOutlineWorkOutline } from "react-icons/md"
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai"
import Logo from "../images/Globant-Original.svg"
import LogoWhite from "../images/Globant-White-Green.svg"

const Home = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const darkMode = useSelector(state => state.darkMode)
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  // si no hay nadie conectado te manda al login
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/')
  },[])

  useEffect(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    setIsReadyForInstall(true);
  });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <>
    <div className="text-center" style={{marginTop: "20%"}}>
      <h5>Hola {user ? user.name : 
          <Placeholder as="p" animation="wave">
            <Placeholder xs={3} />
          </Placeholder>} !</h5>

      <h1>Bienvenido a Hornero</h1>
      <h5 className="d-flex align-items-center justify-content-center">una app de  <Image src={darkMode? LogoWhite: Logo} alt='Globant' style={{ width: "30%", maxWidth:"200px" }} ></Image></h5>
      <hr></hr>
      <div style={{ height: "50vh", width: "100vw", display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: 'center' }}>
        <div style={{ width: "75px" }}> <strong>Buscá</strong> </div>
        <div style={{ width: "75px" }}> <AiOutlineSearch /> </div>
        <hr className="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Reservá</strong> </div>
        <div style={{ width: "75px" }}> <AiOutlineEdit /> </div>
        <hr className="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Compartí</strong> </div>
        <div style={{ width: "75px" }}> <FaRegShareSquare /> </div>
        <hr className="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Trabajá</strong> </div>
        <div style={{ width: "75px" }}> <MdOutlineWorkOutline /> </div>
        <hr className="w-100"></hr>
        <h5>Todo en la palma de tu mano</h5>
      </div>
      <hr className="w-100"></hr>
        <div style={{ width: "75px" }}> </div>
      <div className="text-center" style={{ paddingBottom: "10px" }}>
        { isReadyForInstall && <button className="main-button" onClick={downloadApp} >Descarga</button> }      
      </div>
    </div>
      </>
  );
};

export default Home;
