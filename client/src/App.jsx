import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import Homepage from "./pages/Homepage"
import UserManagement from "./pages/UserManagement"
import AllUsers from "./pages/AllUsers"
import Menu from "./pages/Menu"
import EditUser from "./pages/EditUser"
import AddUser from "./pages/AddUser"
import Movies from "./pages/Movies"
import AllMovies from "./pages/AllMovies"
import AddMovie from "./pages/AddMovie"
import EditMovie from "./pages/EditMovie"
import Subscriptions from "./pages/Subscriptions"
import AllMembers from "./pages/AllMembers"
import AddMember from "./pages/AddMember"
import EditMember from "./pages/EditMember"
import Movie from "./pages/Movie"
import Member from "./pages/Member"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import Unauthorized from './pages/Unauthorized'

const USERS_URL = 'http://localhost:3001/users'
const MOVIES_URL = 'http://localhost:3000/movies'
const MEMBERS_URL = 'http://localhost:3000/members'
const SUBSCRIPTIONS_URL = 'http://localhost:3000/subscriptions'

function App() {

  const accessToken = sessionStorage['accessToken'];

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        const { data: users } = await axios.get(USERS_URL, { headers: { 'x-access-token': accessToken } })
        const { data: movies } = await axios.get(MOVIES_URL, { headers: { 'x-access-token': accessToken } })
        const { data: members } = await axios.get(MEMBERS_URL, { headers: { 'x-access-token': accessToken } })
        const { data: subscriptions } = await axios.get(SUBSCRIPTIONS_URL, { headers: { 'x-access-token': accessToken } })
        dispatch({ type: 'INIT_STORE', payload: { users, movies, members, subscriptions } });
      }
      fetchData()
    }
  }, [])


  return (
    <>
      <h1>Movies - Subscriptions Web Site</h1>
      {
        accessToken &&
        <Menu />
      }

      <br />
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/create-account' element={<CreateAccount />} /> */}


        <Route path='/homepage' element={<Homepage />} />

        <Route path='/user-management' element={<UserManagement />}>
          <Route path='/user-management/users' element={<AllUsers />} />
          <Route path='/user-management/edit-user' element={<EditUser />} />
          <Route path='/user-management/add-user' element={<AddUser />} />
        </Route>

        <Route path='/movies' element={<Movies />}>
          <Route path='/movies/all-movies' element={<AllMovies />} />
          <Route path='/movies/add-movie' element={<AddMovie />} />
          <Route path='/movies/edit-movie/:id' element={<EditMovie />} />
          <Route path='/movies/:id' element={<Movie />} />
        </Route>

        <Route path='/members' element={<Subscriptions />}>
          <Route path='/members/all-members' element={<AllMembers />} />
          <Route path='/members/add-member' element={<AddMember />} />
          <Route path='/members/edit-member/:id' element={<EditMember />} />
          <Route path='/members/:id' element={<Member />} />
        </Route>

        <Route path='/unauthorized' element={<Unauthorized />} />

      </Routes>
    </>
  )
}

export default App
