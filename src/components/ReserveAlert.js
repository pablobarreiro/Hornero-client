import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { BsFillShareFill, BsDashCircle, BsPlusCircle } from "react-icons/bs";

import ShareModal from "../commons/ShareModal";
import ProfileModal from "../commons/ProfileModal"
import { getReservations, newReservation } from "../store/reservations";
import { getFavorites, removeFavorite, addFavorite } from "../store/favorites";

const ReserveAlert = ({
  Show,
  setShow,
  officeNameOk,
  handleCancelReserve,
  officeId,
  date,
  hour,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const reservations = useSelector((state) => state.reservations);
  const [showShareModal, setShowShareModal] = useState(false);
  const [profile, setProfile] = useState({})

 const userAdmin = JSON.parse(localStorage.getItem("user")).user.admin

  const handleRemoveFromFavorites = async (desk) => {
    try {
      await dispatch(removeFavorite(`${officeNameOk}:${desk}`));
      await dispatch(getFavorites());
    } catch(err) {
      console.log(err)
    }
  };

  const handleAddToFavorites = async (desk) => {
    try {
      await dispatch(addFavorite(`${officeNameOk}:${desk}`));
      await dispatch(getFavorites());
    } catch(err) {
      console.log(err)
  }
  };
 
  //confirmacion de la reserva
  const reserveConfirmation = async () => {
    try {
      const newReserv = await dispatch(
        newReservation({
          start: `${date}T${hour}`,
          user: user._id,
          booking: Show.desk,
          office: officeId,
        }),
      );
      await dispatch(getReservations(officeId));
      setShow({
        desk: Show.desk, meetingRoom: false, reserve: [{
          allDay: true,
          booking: Show.desk,
          end: "18:00",
          office: officeId,
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

  return (
    <Alert variant="info" show={Show} onClose={() => setShow("")} dismissible>
      {Show.desk && (
        <Alert.Heading>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>{`Escritorio ${Show.desk.split("D")[1]}`}</h2>

            {favorites.includes(`${officeNameOk}:${Show.desk}`) ? (
              <button
                style={{ marginBottom: "8px" }}
                className={darkMode ? "dark-mode-black-button" : "main-button-black"}
                onClick={() => handleRemoveFromFavorites(Show.desk)}
              >
                <BsDashCircle size={20} /> Favorito
              </button>
            ) : (
              <button
                style={{ marginBottom: "8px" }}
                className="main-button"
                onClick={() => handleAddToFavorites(Show.desk)}
              >
                <BsPlusCircle size={20} /> Favorito
              </button>
            )}
          </div>
        </Alert.Heading>
      )}
      <hr />
      {Show.reserve[0] ? (
        <>
          <p> Reservado por </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
            <img onClick={() => setProfile(Show.reserve[0].user)} style={{ width: "20%", aspectRatio: "1/1", maxWidth: "80px", marginRight: "10px" }} className="profilePhoto" src={Show.reserve[0].user.imgUrl}></img>
            <p onClick={() => setProfile(Show.reserve[0].user)} style={{ margin: "0px" }}>
              <strong>{Show.reserve[0].user.name} {Show.reserve[0].user.surname}</strong>
            </p>
          </div>
          <span>
            Desde: <strong>{Show.reserve[0].start.slice(-5)} hs</strong>
          </span>
          {" | "}
          <span>
            Hasta: <strong>{Show.reserve[0].end} hs</strong>
          </span>
        </>
      ) : (
        <>
          <p>
            {" "}
            Este escritorio está <strong>libre</strong>.
          </p>{" "}
          <p>¡Hace tu reserva!</p>
        </>
      )}

      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {!Show.reserve[0] ? (
          <button
            className={"mx-2 main-button"}
            onClick={() => reserveConfirmation()}
          >
            Reservar
          </button>
        ) : (
          ((Show.reserve[0].user._id === user._id ||
          userAdmin) && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                className={"main-button"}
                onClick={() => setShowShareModal({desk:Show.desk,reserve:Show.reserve[0]})}
              >
                <BsFillShareFill /> Compartir
              </button>
              <button
                className={darkMode ? "mx-2 dark-mode-black-button" : "mx-2 main-button-black"}
                onClick={() => handleCancelReserve(Show.reserve[0])}
              >
                Cancelar Reserva
              </button>
            </div>
          ))
        )}
      </div>
      {showShareModal && Show.reserve && (
        <ShareModal
          showModal={showShareModal}
          setShowModal={setShowShareModal}
          officeNameOk={officeNameOk}
        />
      )}
    </Alert>
  );
};

export default ReserveAlert;
