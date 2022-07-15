import Image from "react-bootstrap/Image"
import Logo from "../images/Globant-Original.svg"
import LogoWhite from "../images/Globant-White-Green.svg"
import { useSelector } from "react-redux";

const Footer = () => {
  const darkMode = useSelector(state => state.darkMode)
  
  return (
    <div className="text-center" >
      <hr></hr>
      <Image src={darkMode? LogoWhite: Logo} alt='Globant' style={{ width: "30%", maxWidth:"200px" }} ></Image>
      <p>Desarrollado por Pablo Barreiro, Melisa Burgos, Fabian Lopez, Matias Nasif y Benjamin Becerra</p>
      <p> © 2022 - All rights reserved. </p>
    </div>

  );
};

export default Footer;
