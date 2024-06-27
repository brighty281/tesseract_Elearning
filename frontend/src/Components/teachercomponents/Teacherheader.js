import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { set_Authentication } from '../../Redux/authentication/AuthenticationSlice'
function Teacherheader() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const authentication_user=useSelector(state=> state.authentication_user)

  const logout=()=>{
    localStorage.clear()
    dispatch(
      set_Authentication({
        name:null,
        isAuthenticated:null,
        isAdmin:false,
      })
    )
    navigate('/teacher')
  }
  
  return (
    <div>
       <div className='flex items-center h-24 max-w-[1240px] mx-auto px-4 justify-between'>
    <div className='flex-1'>
      <h1 className='text-5xl font-bold'>tesseract</h1>
    </div>
    <div className='flex-1 flex justify-center'>
      <ul className='flex space-x-4'>
      {authentication_user.isAuthenticated &&
      <>
        <Link to="/teacher/home"><li className='p-4'>Home</li></Link>
        <Link to="/teacher/course_list"><li className='p-4'>My Courses</li></Link> 
        <Link ><li className='p-4'>Students</li></Link>
        <Link><li className='p-4'>Chat</li></Link>
      </>
       }
      </ul>
    </div>
    
    <div className='flex-1 flex justify-end space-x-4'>
        {!authentication_user.isAuthenticated ? (
          <>
            <button onClick={()=>navigate('/teacher/login')}  className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
            <button onClick={()=>navigate('/teacher/signup')}  className='bg-green-500 text-white px-4 py-2 rounded'>Signup</button>
          </>
        ) : (
          <>
            <Link to="/teacher/profile"><h3>{authentication_user.name}</h3></Link> 
            <button onClick={logout} className='bg-yellow-500 text-black px-4 py-2 rounded'>Logout</button>
          </>
        )}
      </div>
  </div>
    </div>
  )
}

export default Teacherheader
