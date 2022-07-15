import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Placeholder from "react-bootstrap/Placeholder";
import { FaKey, FaUser } from "react-icons/fa";
import { AiOutlineUser, AiFillPieChart } from "react-icons/ai";
import { BsListCheck, BsFillTrashFill } from "react-icons/bs";

import ProfileModal from "../commons/ProfileModal";
import { promoteUserToAdmin, removeUserToAdmin, getAllUsers, deleteUser } from "../store/admin";
import { getAllReservations } from "../store/adminReservations";
import useInput from "../hooks/useInput";

import { PieChart, Pie, Label, Legend } from 'recharts';



const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUsers = useInput();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const allUsers = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user)
  const showedUsers = searchUsers.value.length >= 3 ? filteredUsers : allUsers;
  const darkMode = useSelector((state) => state.darkMode);
  const [profile, setProfile] = useState(false);
  const [utilidad, setUtilidad] = useState('')
  const adminReservations = useSelector(state => state.adminReservations)
  const offices = useSelector(state => state.offices)
  const office = useInput();
  const timeRange = useInput();
  const [showedReservations, setShowedReservations] = useState(adminReservations)
  const [totalDesks, setTotalDesks] = useState(0)
  const defaultValue = 'seleccionar oficina'
  const defaultTimeValue = 'seleccionar fecha'
  const allOffices = 'todas las oficinas'
  const timeList = [
    {name:'mañana',value:1},
    {name:'proxima semana', value:7},
    {name:'proximo mes', value:30},
    {name:'proximos 6 meses', value:180},
    {name:'proximo año',value:365},
    {name:'ayer',value:-1},
    {name:'ultima semana',value:-7},
    {name:'ultimo mes',value:-30},
    {name:'ultimos 6 meses',value:-180},
    {name:'ultimo año',value:-365},
  ]

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) navigate("/")
    else if (!JSON.parse(localStorage.getItem("user")).user.admin) navigate("/home");
  }, []);

  const handleSetAdmin = (id) => {
    dispatch(promoteUserToAdmin(id)).then(() => {
      dispatch(getAllUsers());
    });
  };

  const handleRemoveAdmin = (id) => {
    dispatch(removeUserToAdmin(id)).then(() => {
      dispatch(getAllUsers());
    });
  };

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllReservations())
  }, [])

  // buscar usuarios para agregar
  useEffect(() => {
    if (searchUsers.value.length >= 2) {
      let newUsersList = []
      let searchLowerCase = searchUsers.value.toLowerCase();
      allUsers.forEach((user) => {
        let fullName = `${user.name} ${user.surname}`
        return fullName.toLowerCase().includes(searchLowerCase)
          ||
          user.mainOffice.toLowerCase().includes(searchLowerCase)
          ? newUsersList.push(user) : null
      }
      )
      setFilteredUsers(newUsersList)
    }
  }, [searchUsers.value, allUsers]);
 

  //filtro de reservas por oficina seleccionada
  useEffect(() => {
    let filteredReservations = []
    const now = new Date()
    if(office.value !== defaultValue && timeRange.value !== defaultTimeValue && timeRange.value.length && office.value.length ){
      if(office.value === allOffices) filteredReservations = adminReservations
      else filteredReservations = adminReservations.filter(reserv => reserv.office.name === office.value)

      const finalFilter = filteredReservations.filter(reserv => {
        const finalRange = new Date()
        finalRange.setDate(finalRange.getDate() + Number(timeRange.value))
        const reservDay = new Date(`${reserv.start.slice(3,5)}-${reserv.start.slice(0,2)}-${reserv.start.slice(6,10)}`)
        const comparador = timeRange.value > 0 ? reservDay > now && reservDay < finalRange: reservDay < now && reservDay > finalRange
        return comparador
      })
      setShowedReservations(finalFilter)
      const selectedOffice = offices.find(element => element.name === office.value)
      
      if(selectedOffice) {
        setTotalDesks(selectedOffice.totalDesks*Math.abs(timeRange.value))
      }
      else {
        let desksArray = offices.reduce((pv,cv) => pv+cv.totalDesks,0)
        setTotalDesks(desksArray*Math.abs(timeRange.value))
      }
    }
  },[office.value, timeRange.value])


  const handledeleteUser = async (userId) => {
    await dispatch(deleteUser(userId))
    dispatch(getAllUsers())
  }

  if (profile) {
    return <ProfileModal profile={profile} setProfile={setProfile} />;
  }

  return (
    <>
      <div className="text-center" style={{ marginTop: "20%"}} >
      {user ? (
            <h5>Panel de administrador de {`${user.name} ${user.surname}`}</h5>
          ) : (
            <>
            <h5>Panel de administrador de </h5>
            <Placeholder as="p" animation="wave">
              <Placeholder xs={8} />
            </Placeholder>
            </>
          )}
        <button onClick={() => setUtilidad('admin')} className='main-button m-2'><BsListCheck size={20}/> Administrar Permisos</button>

        <button onClick={() => setUtilidad("reportes")} className='main-button m-2'><AiFillPieChart size={18}/> Reportes</button>
        <button onClick={() => navigate("/profile")} className='main-button m-2'> <AiOutlineUser size={18}/> Perfil</button>
      </div>

      {utilidad === "admin" &&
        <div style={{padding:"5%"}} >
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className={darkMode ? "dark-mode-input" : "main-input"}
              type="text"
              {...searchUsers}
              placeholder="Escribe el nombre y/o apellido"
            />
          </form>
          <Table
            style={{ fontFamily: "heeboregular", fontWeigth: 700 }}
            className={darkMode ? "dark-mode mt-2" : "light mt-2"}
            responsive
            size="sm"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Trabaja en</th>
              </tr>
            </thead>
            <tbody>
              {showedUsers[0] && showedUsers.map((lineUser, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td style={{cursor: "pointer"}}
                    onClick={() => setProfile(lineUser)}
                  >{`${lineUser.name} ${lineUser.surname}`}</td>
                  <td>{lineUser.mainOffice}</td>
                  {lineUser._id === user._id ? (
                    <>
                    <td />
                    <td />
                    </>
                  ) : (
                    <>
                    <td>
                      {lineUser.admin ?
                        <FaKey
                          style={{ cursor: "pointer" }}
                          size={24}
                          onClick={() => handleRemoveAdmin(lineUser._id)}
                        /> : <FaUser
                          style={{ cursor: "pointer" }}
                          size={24}
                          onClick={() => handleSetAdmin(lineUser._id)}
                        />}
                    </td>
                  <td><BsFillTrashFill onClick={() => handledeleteUser(lineUser._id)} size={24}/></td>
                  </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>}

      {(adminReservations[0] && utilidad === "reportes") &&
        <div style={{padding:"5%"}} className="text-center">
          <label>Oficina</label>
        <select
          className={
            darkMode ? "dark-mode-input round" : "main-input round"
          }
          onChange={office.onChange}
        >
          <option selected="selected" disabled>{defaultValue}</option>
          <option>{allOffices}</option>
          {offices[0] &&
            offices.map((office, i) => (
              <option key={i}>{office.name}</option>
            ))}
        </select>
          <label>Periodo</label>
        <select
          className={
            darkMode ? "dark-mode-input round" : "main-input round"
          }
          onChange={timeRange.onChange}
        >
          <option selected="selected" disabled>{defaultTimeValue}</option>
          {
            timeList.map((time, i) => (
              <option value={time.value} key={i}>{time.name}</option>
            ))}
        </select>
        
        {timeRange.value !== defaultTimeValue && timeRange.value.length && office.value !== defaultValue && office.value.length ?
        <div style={{padding: "4%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h3>Total de reservas:</h3>
              <PieChart width={300} height={200}>
                <Pie 
                  data={[
                    {"name": `Ocupado: ${showedReservations.length}`, "value": showedReservations.length, "fill":"#888888"},
                    {"name": `Libre: ${totalDesks-showedReservations.length}`, "value": totalDesks-showedReservations.length, "fill":"#63E3CF"}
                  ]} 
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  />
                  <Label />
                  <Legend />
              </PieChart>
        </div>:<></>
        }

        </div>
      }
    </>
  );
};

export default Admin;
    