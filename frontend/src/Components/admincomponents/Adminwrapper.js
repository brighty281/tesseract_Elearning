import React,{useEffect} from 'react'
import {Routes,Route} from'react-router-dom'
import AdminLogin from '../../Pages/adminpages/AdminLogin'
import AdminDashboard from '../../Pages/adminpages/AdminDashboard'
import Adminheader from './Adminheader'
import { useDispatch, useSelector } from 'react-redux'
import { set_Authentication } from '../../Redux/authentication/AuthenticationSlice'
import isAuthAdmin from '../../utlis/isAuthAdmin'
import AdminStudentlist from '../../Pages/adminpages/AdminStudentlist'
import AdminTeacherslist from '../../Pages/adminpages/AdminTeacherslist'
import AdminTeacherRequests from '../../Pages/adminpages/AdminTeacherRequests'
import AdminPrivateRoutes from '../PrivateRoutes/AdminPrivateRoutes';
function Adminwrapper() {
  const dispatch=useDispatch()
  const authentication_user=useSelector(state=>state.authentication_user)


  const checkAuthAndFetchUserData = async () => {

      const isAuthenticated = await isAuthAdmin();
      
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );


    }

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }

  },[]);

  

  return (
    <div>
        <Adminheader/>
        <Routes>
            <Route path="/" element={<AdminLogin/>}/>

            <Route path="/dashboard" element={<AdminPrivateRoutes><AdminDashboard/></AdminPrivateRoutes>}/>
            <Route path="/studentslist" element={<AdminPrivateRoutes><AdminStudentlist/></AdminPrivateRoutes>}/>
            <Route path="/teacherslist" element={<AdminPrivateRoutes><AdminTeacherslist/></AdminPrivateRoutes>}/>
            <Route path="/teachers_requests" element={<AdminPrivateRoutes><AdminTeacherRequests/></AdminPrivateRoutes>}/>
        </Routes>
      
    </div>
  )
}

export default Adminwrapper
