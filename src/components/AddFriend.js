import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsPlusCircle } from "react-icons/bs";

import ProfileModal from "../commons/ProfileModal";
import { addFriend, getFriends, searchFriends } from "../store/friends";
import useInput from "../hooks/useInput";

const AddFriend = ({ show, setShow, setAddFriend, friends }) => {
    const dispatch = useDispatch()
    const searchUsers = useInput()
    const [filteredUsers, setFilteredUsers] = useState([])
    const showedUsers = (searchUsers.value.length>=3) ? filteredUsers : []
    const friendIds = friends.map(friend => friend._id)
    const darkMode = useSelector(state => state.darkMode)
    const [hideButton, setHideButton] = useState(false)
    const [profile, setProfile] = useState(false)


    const handleAddFriend = (id)=>{
        setHideButton(true)
        dispatch(addFriend(id))
        .then(()=>dispatch(getFriends()))
        .then(()=>setHideButton(false))
    }

    // buscar usuarios para agregar
    useEffect(()=>{
        if(searchUsers.value.length >= 3) {
            dispatch(searchFriends(searchUsers.value))
            .then((users)=>{
                setFilteredUsers(users.payload)
            })
        }
    },[searchUsers.value])

    if(profile){return(<ProfileModal profile={profile} setProfile={setProfile}/>)}

    return (<Modal show={show} onHide={()=>{setShow(false);setAddFriend(false)}} centered>
        <Modal.Header className={darkMode? "dark-mode": "light"}>
            <Modal.Title style={{fontFamily:"heeboregular"}}>Agregar Amigos</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode? "dark-mode": "light"}>
            <form onSubmit={(e) => e.preventDefault()}>
            <input className={darkMode?"dark-mode-input":"main-input"} type="text" {...searchUsers} placeholder="Escribe el nombre y/o apellido" />
            </form>
            <Table style={{fontFamily:"heeboregular",fontWeigth:700}} className={darkMode? "dark-mode": "light"}  responsive hover size="sm">
            {searchUsers.value.length>=3 && <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Trabaja en</th>
                </tr>
            </thead>}
            <tbody>
                {showedUsers.map((user, i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td onClick={()=>setProfile(user)}>{`${user.name} ${user.surname}`}</td>
                    <td>{user.mainOffice}</td>
                    {(friendIds.includes(user._id) || hideButton) ? <td/> : <td><BsPlusCircle style={{cursor:"pointer"}} size={28} onClick={()=>handleAddFriend(user._id)}/></td>}
                </tr>
                ))}
            </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer className={darkMode? "dark-mode": "light"}>
            <button 
            className={darkMode?"dark-mode-black-button":"main-button-black"}
            onClick={()=>setAddFriend(false)}
            >
            Volver
            </button>
            <button 
            className={darkMode?"dark-mode-black-button":"main-button-black"}
            onClick={()=>{setShow(false);setAddFriend(false)}}
            >
            Cerrar
            </button>
        </Modal.Footer>
    </Modal>)
};

export default AddFriend;
