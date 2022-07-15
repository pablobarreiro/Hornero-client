import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import { sendMailToFriend } from "../store/friends";

const ShareModal = ({ showModal, setShowModal, officeNameOk }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const friends = useSelector((state) => state.friends);
  const user = useSelector((state) => state.user);
  const [showBadAlert, setShowBadAlert] = useState(false);
  const [showOkAlert, setShowOkAlert] = useState(false);

  const office = officeNameOk;
  const floor = showModal.desk.split("D")[0].slice(1);
  const desk = showModal.desk.split("D")[1];
  const date = showModal.reserve.start.split("T")[0];
  const time = showModal.reserve.start.split("T")[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = document.getElementsByName("shareCheckbox");
    const checkedUsers = [];
    users.forEach((user) =>
      user.checked ? checkedUsers.push(user.value) : null
    );
    if (!checkedUsers[0]) {
      setShowBadAlert(true);
      setTimeout(() => setShowBadAlert(false), 2500);
    } else {
      setShowOkAlert(true);
      checkedUsers.forEach((checkedUser) => {
        const mail = {
          mailFrom: `${user.name} ${user.surname}`,
          mailTo: checkedUser,
          mailBody: `Reserve en ${office} piso ${floor} escritorio ${desk} el dia ${date} a las ${time}hs.`,
        };
        dispatch(sendMailToFriend(mail));
      });
      setTimeout(() => {
        setShowModal(false);
        setShowOkAlert(false);
      }, 2000);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className={darkMode? 'dark-mode':'light'}>Comparti tu reserva con amigos</Modal.Header>
      <Modal.Body className={darkMode? 'dark-mode':'light'}>
        <form id="shareForm" onSubmit={handleSubmit}>
          <Table className={darkMode? 'dark-mode':'light'}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre y Apellido</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((friend, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{`${friend.name} ${friend.surname}`}</td>
                  <td>
                    <input
                      name="shareCheckbox"
                      type="checkbox"
                      value={friend.email}
                      style={{ minWidth: "18px", minHeight: "18px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </form>
      <Alert show={showOkAlert} variant="success">
        Reserva compartida con tus amigos!
      </Alert>
      <Alert show={showBadAlert} variant="warning">
        Debes elegir al menos 1 amigo para compartir tu reserva
      </Alert>
      </Modal.Body>
      <Modal.Footer className={darkMode? 'dark-mode':'light'}>
        <button
          className={darkMode ? "dark-mode-black-button" : "main-button-black"}
          onClick={() => setShowModal(false)}
        >
          Cancelar
        </button>
        <button type="submit" form="shareForm" className="main-button">
          Compartir
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
