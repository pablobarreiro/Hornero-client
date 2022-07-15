import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { FaUserFriends } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs"

import SendMessage from "../components/SendMessage"
import { addFriend, getFriends, removeFriend } from "../store/friends";

const ProfileModal = ({ profile, setProfile }) => {

  const [sendMessage, setSendMessage] = useState({})

   const friends = useSelector((state) => state.friends);


  const darkMode = useSelector(state => state.darkMode)
  const dispatch = useDispatch()

  const handleAddFriend = (id) => {
    dispatch(addFriend(id))
      .then(() => dispatch(getFriends()))
  }
  const handleDeleteFriend = (id) => {
    dispatch(removeFriend(id))
      .then(() => dispatch(getFriends()))
  }

  if (sendMessage.email) return <SendMessage show={profile} setShow={setProfile} setSendMessage={setSendMessage} mailTo={sendMessage} />

  return (
    <Modal show={profile} onHide={() => { setProfile(false) }} centered className="text-center">
      <Modal.Header className={darkMode ? "dark-mode" : "light"} closeButton>
      </Modal.Header>
      <Modal.Body className={darkMode ? "dark-mode" : "light"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "60%", aspectRatio: "1/1", maxWidth: "400px", margin: "0 auto" }}>
          <img className="profilePhoto" src={profile.imgUrl}></img>
        </div>

        <Card.Body className="w-100">
          <Card.Title>
            {`${profile.name} ${profile.surname}`}
          </Card.Title>

          <ListGroup>
            <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
              {profile.email}
            </ListGroup.Item>

            <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
              {profile.mainOffice}
            </ListGroup.Item>

            <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
              {profile.position}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Modal.Body>
      <Modal.Footer className={darkMode ? "dark-mode" : "light"}>
        {friends.find(friend => friend._id === profile._id) ?  
        <button
          className={darkMode ? "dark-mode-black-button" : "main-button-black"}
          onClick={() => handleDeleteFriend(profile._id)}
        >
          <FaUserFriends /> Eliminar
        </button>
        :
        <button
          className="main-button"
          onClick={() => handleAddFriend(profile._id)}
        >
          <FaUserFriends /> Agregar
        </button>
        }
        <button
          className="main-button"
          onClick={() => setSendMessage({ fullname: `${profile.name} ${profile.surname}`, email: profile.email })}
        >
          <BsFillChatTextFill /> Enviar mensaje
        </button>
      </Modal.Footer>
    </Modal>
  )

}

export default ProfileModal