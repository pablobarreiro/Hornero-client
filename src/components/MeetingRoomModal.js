import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillShareFill, BsDashCircle, BsPlusCircle } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

import { getReservations, newReservation } from "../store/reservations";
import { getFavorites, removeFavorite, addFavorite } from "../store/favorites";
import ProfileModal from "../commons/ProfileModal"
import ShareModal from "../commons/ShareModal";


const MeetingRoomModal = ({
  Show,
  setShow,
  officeNameOk,
  handleCancelReserve,
  selectedOffice,
  date,
}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const darkMode = useSelector((state) => state.darkMode);
  const [hour, setHour] = useState("09:00")
  const [selectedHour, setSelectedHour] = useState(null)
  const [profile, setProfile] = useState({})
  const [showShareModal, setShowShareModal] = useState(false);
  const modules = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]

  useEffect(() => {
    setSelectedHour(Show.reserve.find(reserv => reserv.start === `${date}T${hour}`))
  }, [hour, Show])

  const handleRemoveFromFavorites = async (desk) => {
    await dispatch(removeFavorite(`${officeNameOk}:${desk}`));
    dispatch(getFavorites());
  };

  const handleAddToFavorites = async (desk) => {
    await dispatch(addFavorite(`${officeNameOk}:${desk}`));
    dispatch(getFavorites());
  };

  //confirmacion de la reserva
  const reserveConfirmation = async () => {
    try {
      const newReserv = await dispatch(
        newReservation({
          start: `${date}T${hour}`,
          end: `${modules[modules.indexOf(hour) + 1] ? modules[modules.indexOf(hour) + 1] : "18:00"}`,
          allDay: false,
          user: user._id,
          booking: Show.desk,
          office: selectedOffice._id,
        })
      );
      await dispatch(getReservations(selectedOffice._id));
      setShow({
        desk: Show.desk, meetingRoom: true, reserve: [...Show.reserve,{
          allDay: false,
          booking: Show.desk,
          end: `${modules[modules.indexOf(hour) + 1] ? modules[modules.indexOf(hour) + 1] : "18:00"}`,
          office: selectedOffice._id,
          start: `${date}T${hour}`,
          user: user,
          _id: newReserv.payload.data._id
        }]
      })
    } catch (error) {
      console.log(error);
    }
  };

  if (profile._id) return <ProfileModal profile={profile} setProfile={setProfile} />
  if (showShareModal) return <ShareModal showModal={showShareModal} setShowModal={setShowShareModal} officeNameOk={officeNameOk} />

  return (
    <Modal show={Show} onHide={() => setShow("")} centered>
      {Show.desk && (
        <Modal.Header className={darkMode ? "dark-mode" : "light"} closeButton>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-around' }}>
            <h2>{`Espacio ${Show.desk.split("D")[1]}`}</h2>

            {favorites.includes(`${officeNameOk}:${Show.desk}`) ? (
              <button
                style={{ marginBottom: "8px" }}
                className={darkMode? "mx-2 ml-10 dark-mode-black-button": "mx-2 ml-10 main-button-black"}
                onClick={() => handleRemoveFromFavorites(Show.desk)}
              >
                <BsDashCircle size={20} /> Favorito
              </button>
            ) : (
              <button
                style={{ marginBottom: "8px" }}
                className={"mx-2 ml-10 main-button"}
                onClick={() => handleAddToFavorites(Show.desk)}
              >
                <BsPlusCircle size={20} /> Favorito
              </button>
            )}
          </div>
        </Modal.Header>
      )}

      <Modal.Body className={darkMode ? "dark-mode text-center" : "light text-center"}>
        <p>Los Meeting Rooms se reservan de a módulos de 30 minutos.</p>
        <strong>seleccioná un módulo</strong>


        <div className="mw-100" >
          {modules.map((module, i) => (Show.reserve.find(reserv => reserv.start.split("T")[1] === module)) ? <button key={i} className="groupedButtonReserved" onClick={() => setHour(module)}>{module}</button> : <button key={i} className="groupedButton" onClick={() => setHour(module)}>{module}</button>
          )}
        </div>

        {selectedHour ? (
          <>
            <div className="mt-3"><strong > {`Módulo ${hour}`} </strong> </div>

            <p> Reservado por </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
              <img onClick={() => setProfile(selectedHour.user)} style={{ width: "20%", aspectRatio: "1/1", maxWidth: "80px", marginRight: "10px" }} className="profilePhoto" src={selectedHour.user.imgUrl}></img>
              <p onClick={() => setProfile(selectedHour.user)} style={{ margin: "0px" }}>
                <strong>{selectedHour.user.name} {selectedHour.user.surname}</strong>
              </p>
            </div>
            <span>
              Desde: <strong>{selectedHour.start.slice(-5)} hs</strong>
            </span>
            {" | "}
            <span>
              Hasta: <strong>{selectedHour.end} hs</strong>
            </span>
          </>

        ) : (
          <>
            <div className="mt-3"><strong > {`Módulo ${hour}`} </strong> </div>
            <p>
              {" "}
              Este módulo está <strong>libre</strong>.
            </p>{" "}
            <p>¡Hace tu reserva!</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={darkMode ? "dark-mode" : "light"}
      >

        {!selectedHour ? (
          <button
            className={"mx-2 main-button"}
            onClick={() => reserveConfirmation()}
          >
            Reservar
          </button>
        ) : (
          selectedHour.user._id === user._id && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button onClick={() => setShowShareModal({ desk: selectedHour.booking, reserve: { start: selectedHour.start } })} className={"main-button"}><BsFillShareFill /> Compartir</button>
              <button
                className={darkMode ? "mx-2 dark-mode-black-button" : "mx-2 main-button-black"}
                onClick={() => handleCancelReserve(selectedHour)}
              >
                Cancelar Reserva
              </button>
            </div>
          )
        )}
      </Modal.Footer>
    </Modal>
  )

}

export default MeetingRoomModal