import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { editOffice, getOffices } from "../store/offices";

const EditOfficeModal = ({ office, admin, setAdmin }) => {
  const name = useInput();
  const address = useInput();
  const floors = useInput();

  const darkMode = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let nombre = name.value.length === 0 ? office.name : name.value;
    let dirección = address.value.length === 0 ? office.address : address.value;
    let pisos = floors.value.length === 0 ? office.floors : floors.value;

    dispatch(
      editOffice([
        {
          name: nombre,
          address: dirección,
          floors: pisos,
        },
        office._id,
      ])
    )
      .then(() => dispatch(getOffices()))
      .then(() => setAdmin(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal show={admin} onHide={() => setAdmin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar oficina</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Card.Body>
              <Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <input
                    className={darkMode ? "dark-mode-input" : "main-input"}
                    type="text"
                    placeholder={office ? office.name : ""}
                    onChange={name.onChange}
                  />
                  <Form.Label>Dirección</Form.Label>
                  <input
                    className={darkMode ? "dark-mode-input" : "main-input"}
                    type="text"
                    placeholder={office ? office.address : ""}
                    onChange={address.onChange}
                  />
                  <Form.Label>Pisos</Form.Label>
                  <input
                    className={darkMode ? "dark-mode-input" : "main-input"}
                    type="text"
                    placeholder={office ? office.floors : ""}
                    onChange={floors.onChange}
                  />
                </Form.Group>
              </Card.Title>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="main-button"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Guardar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditOfficeModal;
