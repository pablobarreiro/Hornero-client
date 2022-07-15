import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert"

import { sendMailToFriend } from "../store/friends";
import useInput from "../hooks/useInput";

const SendMessage = ({ show, setShow, setSendMessage, mailTo }) => {
  const dispatch = useDispatch()
  const message = useInput();
  const user = useSelector(state => state.user)
  const darkMode = useSelector(state => state.darkMode)
  const [showGoodAlert, setShowGoodAlert] = useState(false)
  const [showBadAlert, setShowBadAlert] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const mail = {
      mailFrom: `${user.name} ${user.surname}`,
      mailTo: mailTo.email,
      mailBody: message.value,
    }
    if(message.value.length){
      dispatch(sendMailToFriend(mail))
      .then(()=>{
        setShowGoodAlert(true)
        setTimeout(()=>{
          setSendMessage({})
          setShowGoodAlert(false)
        },2000)
      })
    } else {
      setShowBadAlert(true)
      setTimeout(()=>{
        setShowBadAlert(false)
      },2500)
    }
  }

  return (
    <Modal show={show} onHide={() => {setShow(false);setSendMessage({})}} centered>
      <Modal.Header className={darkMode? "dark-mode": "light"}>
        <Modal.Title style={{ fontFamily: "heeboregular" }}>
          Mensaje para {mailTo.fullname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={darkMode? "dark-mode": "light"} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <form id="form1" onSubmit={handleSubmit}>
            <textarea  className={darkMode? "dark-mode-textarea": "light"}
              rows="6" 
              style={{width:"300px"}} 
              {...message} 
              type="text" 
              name='mail_to_friend' 
              placeholder="Qué quieres decirle a tu amigo" 
            />
        </form>
        <Alert variant="success" show={showGoodAlert}>
        Mensaje enviado!
        </Alert>
        <Alert variant="warning" show={showBadAlert}>
        Deberías escribirle algo.
        </Alert>
      </Modal.Body>
      <Modal.Footer className={darkMode? "dark-mode": "light"}>
        <button className={darkMode?"dark-mode-black-button":"main-button-black"} onClick={() => setSendMessage({})}>
          Volver
        </button>
        <button form="form1" className="main-button" onClick={handleSubmit}>
          Enviar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendMessage;
