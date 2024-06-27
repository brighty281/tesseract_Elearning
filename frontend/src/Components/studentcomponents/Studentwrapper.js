import React ,{useEffect} from 'react'
import Studentheader from './Studentheader'
import Homepage from '../../Pages/studentpages/Homepage'
import Mylandingpage from '../../Pages/studentpages/Mylandingpage'
import { Routes,Route } from 'react-router-dom'
import LoginPage from '../../Pages/studentpages/LoginPage'
import Registrationpage from '../../Pages/studentpages/Registrationpage'
import { set_Authentication } from '../../Redux/authentication/AuthenticationSlice'
import isAuthUser from '../../utlis/isAuthUser'
import { useDispatch ,useSelector } from 'react-redux'
import StudentOtp from '../../Pages/studentpages/StudentOtp'
import ForgotPassword from '../../Pages/studentpages/ForgotPassword'
import FPotp from '../../Pages/studentpages/FPotp'
import F_enterpassword from '../../Pages/studentpages/F_enterpassword'
import StudentPrivateRoutes from '../PrivateRoutes/StudentPrivateRoutes'
import StudentProfile from '../../Pages/studentpages/profile/StudentProfile'
import ProfileEdit from '../../Pages/studentpages/profile/ProfileEdit'
import All_courses from '../../Pages/studentpages/course/All_courses'
import Coursedetail from '../../Pages/studentpages/course/Coursedetail'

function Studentwrapper() {
  const dispatch=useDispatch();
  const authentication_user = useSelector(state => state.authentication_user)


  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();

    dispatch(
      set_Authentication({
        userid:isAuthenticated.userid,
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
        isTeacher:isAuthenticated.isTeacher
      })
    );
  };

  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }

  }, [])


  return (
      <>

        <Studentheader/>
        <Routes>
            <Route path="/" element={<Mylandingpage/>}/>
            <Route path="login" element={<LoginPage/>} />
            
            <Route path="signup" element={<Registrationpage/>} />
            <Route path="otp" element={<StudentOtp/>} />
            <Route path="fpassword" element={<ForgotPassword/>}/>
            <Route path="FPotp" element={<FPotp/>}/>
            <Route path="Fenterpassword/:id" element={<F_enterpassword/>} />

            {/*  pages protected using private routes */}
            <Route path="home" element={<StudentPrivateRoutes><Homepage/></StudentPrivateRoutes>}/>
            <Route path="profile" element={<StudentPrivateRoutes><StudentProfile/></StudentPrivateRoutes>}/>
            <Route path="profile_edit" element={<ProfileEdit/>}/>

            {/* course view */}
            <Route path="/all_course" element={<StudentPrivateRoutes><All_courses/></StudentPrivateRoutes>}/>
            <Route path="course_view/:id" element={<StudentPrivateRoutes><Coursedetail/></StudentPrivateRoutes>}/>

        </Routes>

      </>
    
  )
}

export default Studentwrapper
