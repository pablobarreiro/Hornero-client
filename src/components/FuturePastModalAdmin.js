import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsTrashFill, BsShareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";


import ShareModal from "../commons/ShareModal";

const FuturePastModalAdmin = ({
  showAllReservas,
  setShowAllReservas,
  officeNameOk,
  setDate,
  handleFloorSelector,
  handleCancelReserve,
}) => {
  const darkMode = useSelector((state) => state.darkMode);
  const [showShareModal, setShowShareModal] = useState(false);

  const allReservations = useSelector((state) => state.reservations);
 const searchReservation = useInput();
  const [filteredUsers, setFilteredUsers] = useState([]);
 const showedUsers = searchReservation.value.length >= 3 ? filteredUsers : allReservations;

 useEffect(() => {
    if (searchReservation.value.length >= 2) {
      let newReservList = []
      let searchLowerCase = searchReservation.value.toLowerCase();

      allReservations.forEach((reserva) => {
      let fullName = `${reserva.user.name} ${reserva.user.surname}`
        return fullName.toLowerCase().includes(searchLowerCase) || 
        reserva.booking.toLowerCase().includes(searchLowerCase) ||
        reserva.start.toLowerCase().includes(searchLowerCase)
        ? newReservList.push(reserva) : null}
      )
      setFilteredUsers(newReservList)
    }
  }, [searchReservation.value, allReservations]);

  return (
    <>
      <Modal show={showAllReservas} onHide={() => setShowAllReservas(false)} centered>
        <Modal.Header className={darkMode ? "dark-mode" : "light"} closeButton>
          <Modal.Title>
            {showAllReservas === "anteriores"
              ? "Reservas pasadas"
              : "Reservas futuras"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "dark-mode" : "light"}>


        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className={darkMode ? "dark-mode-input" : "main-input"}
            type="text"
            {...searchReservation}
            placeholder="Escribe el nombre y/o apellido"
          />
        </form>

          <Table className={darkMode ? "dark-mode" : "light"}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Lugar</th>
                <th>Usuario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { showedUsers === null ? ("No hay reservas") : (
              showedUsers.map((reserva, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      setDate(reserva.start.split("T")[0]);
                      setShowAllReservas(false);
                      handleFloorSelector(
                        reserva.booking.split("D")[0].slice(1),
                        officeNameOk.replace(/\s+/g, "_").toLowerCase()
                      );
                    }}
                  >
                    <td>{`${reserva.start.split("T")[0]} ${
                      reserva.start.split("T")[1]
                    }hs`}</td>
                    <td>{reserva.booking}</td>
                    {reserva.user && <td>{`${reserva.user.name} ${reserva.user.surname}`}</td>}
                    {showAllReservas === "futuras" && (
                      <>
                        <td>
                          <BsShareFill
                            onClick={() =>
                              setShowShareModal(    {
                                desk: reserva.booking,
                                reserve: { start: reserva.start },
                              })
                            }
                          />
                        </td>
                        <td>
                          <BsTrashFill
                            onClick={() => handleCancelReserve(reserva)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              }))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className={darkMode ? "dark-mode" : "light"}>
          <button
            className="main-button"
            onClick={() => setShowAllReservas(false)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
      {showShareModal && (
        <ShareModal
          showModal={showShareModal}
          setShowModal={setShowShareModal}
          officeNameOk={officeNameOk}
        />
      )}
    </>
  );
};

export default FuturePastModalAdmin;
