import React, { useState } from 'react';
import Webcam from "react-webcam"
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { AiFillCamera, AiOutlineUpload } from "react-icons/ai"

const ImageModal = ({ showModal, setShowModal, setImgUrl }) => {

  const darkMode = useSelector(state => state.darkMode)
  const [upload, setUpload] = useState('')
  const [image, setImage] = useState('')

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
    },
    [webcamRef]
  );

  var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            setImgUrl("data:image/jpeg;base64," + btoa(binaryString));
        };

        reader.readAsBinaryString(file);
    }
};


  return (

    <Modal show={showModal} className="text-center" centered>
      <Modal.Header className={darkMode? "dark-mode": "light"}>
        <Modal.Title>
          <button className="main-button m-2" onClick={() => setUpload("cam")}> <AiFillCamera /> Tomar foto </button>
          <button className="main-button" onClick={() => setUpload("file")}> <AiOutlineUpload /> Subir foto </button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={darkMode? "dark-mode": "light"}>


        {upload === "cam" ?
          <div>
            {image ?
              <>
                <img src={image} style={{maxWidth: "100%"}}></img>
                <button className="main-button m-2" onClick={() => setImage("")}>Tomar otra</button>
                <button className="main-button m-2" onClick={() => (setImgUrl(image), setShowModal(false))}>Aceptar</button>
              </>
              :
              <>
                <Webcam
                  audio={false}
                  height={"auto"}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={"100%"}
                />
                <button className="main-button" onClick={capture}><AiFillCamera /> </button>
              </>
            }
          </div>

          :
          ""}

        {upload === 'file' ?
            <>
            <input type="file" id="filePicker" name="filename" onChange={(e)=>handleFileSelect(e)} ></input>
            <button className="main-button m-2" onClick={() => setShowModal(false)}> Aceptar </button>
            </>

          : ""}

      </Modal.Body>
      <Modal.Footer className={darkMode? "dark-mode": "light"}>
        <button className={darkMode? "dark-mode-black-button" : "main-button-black"} onClick={() => setShowModal(false)} >
          Close
        </button>
      </Modal.Footer>
    </Modal>

  )


}

export default ImageModal