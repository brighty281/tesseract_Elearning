import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { set_Authentication } from '../../Redux/authentication/AuthenticationSlice'

function Studentheader() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const logout=()=>{
    localStorage.clear()
    dispatch(
      set_Authentication({
        name:null,
        isAuthenticated:null,
        isAdmin:false,
      })
    )
    navigate('/')
  }

  const authentication_user=useSelector(state=> state.authentication_user)
  return (
    <div className='flex items-center h-24 max-w-[1240px] mx-auto px-4 justify-between'>
    <div className='flex-1'>
      <h1 className='text-5xl font-bold'>tesseract</h1>
    </div>
    <div className='flex-1 flex justify-center'>
    {authentication_user.isAuthenticated && 
      <ul className='flex space-x-4'>
        <Link to="/"><li className='p-4'>Home</li></Link>
        <Link to="/all_course" ><li className='p-4'>Courses</li></Link>
        <li className='p-4'>About</li>
        <li className='p-4'>Contact</li>
      </ul>
      }
    </div>
    
    <div className='flex-1 flex justify-end space-x-4'>
        {!authentication_user.isAuthenticated ? (
          <>
            <button onClick={() => navigate('/login')} className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
            <button onClick={() => navigate('/signup')} className='bg-green-500 text-white px-4 py-2 rounded'>Signup</button>
          </>
        ) : (
          <>
            <Link to="/profile" ><h3>{authentication_user.name}</h3></Link>
            <button onClick={logout} className='bg-yellow-500 text-black px-4 py-2 rounded'>Logout</button>
          </>
        )}
      </div>
  </div>
  )
}

export default Studentheader
