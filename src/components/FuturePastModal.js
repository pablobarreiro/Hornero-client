import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsTrashFill, BsShareFill } from "react-icons/bs";

import ShareModal from "../commons/ShareModal";
import { cancelReservation } from "../store/reservations";
import { getUserReservationsFuturas } from "../store/userReservations";

const FuturePastModal = ({
  showReservas,
  setShowReservas,
  officeNameOk,
  setDate,
  handleFloorSelector,
}) => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user)
  const userReservations = useSelector((state) => state.userReservations);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCancelReserve = async (reserve) => {
    try {
      await dispatch(cancelReservation(reserve._id))
      await dispatch(getUserReservationsFuturas(user._id))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={showReservas} onHide={() => setShowReservas(false)} centered>
        <Modal.Header className={darkMode ? "dark-mode" : "light"} closeButton>
          <Modal.Title>
            {showReservas === "anteriores"
              ? "Reservas pasadas"
              : "Reservas futuras"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "dark-mode" : "light"}>
          <Table className={darkMode ? "dark-mode" : "light"}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Lugar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map((reserva, i) => {
                return (
                  <tr key={i}>
                    <td onClick={() => {
                      setDate(reserva.start.split("T")[0]);
                      setShowReservas(false);
                      handleFloorSelector(
                        reserva.booking.split("D")[0].slice(1),
                        reserva.office.name.replace(/\s+/g, "_").toLowerCase()
                      );
                    }}>{`${reserva.start.split("T")[0]} ${
                      reserva.start.split("T")[1]
                    }hs`}</td>
                    <td onClick={() => {
                      setDate(reserva.start.split("T")[0]);
                      setShowReservas(false);
                      handleFloorSelector(
                        reserva.booking.split("D")[0].slice(1),
                        reserva.office.name.replace(/\s+/g, "_").toLowerCase()
                      );
                    }}>{`${reserva.office.name} ${reserva.booking}`}</td>
                    {showReservas === "futuras" && (
                      <>
                        <td>
                          <BsShareFill
                            onClick={() =>
                              setShowShareModal({
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
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className={darkMode ? "dark-mode" : "light"}>
          <button
            className="main-button"
            onClick={() => setShowReservas(false)}
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

export default FuturePastModal;
