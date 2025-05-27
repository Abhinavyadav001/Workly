import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { setloading } from '../../redux/authslice'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [input, setinput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    file: '', // Changed from photo to file
    role: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading,user } = useSelector(store => store.auth)

  const inputchangehandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const filechangehandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] }) // Changed from photo to file
  }

  const formhandler = async (e) => {
    e.preventDefault()
    console.log('Form Data:', input)
    dispatch(setloading(true))

    const fromdata = new FormData()
    fromdata.append("fullname", input.fullname)
    fromdata.append("email", input.email)
    fromdata.append("phoneNumber", input.phoneNumber)
    fromdata.append("password", input.password)
    fromdata.append("role", input.role)
    if (input.file) {
      fromdata.append("file", input.file) // Changed from photo to file
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, fromdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      dispatch(setloading(false))
    }
  }
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })


  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={formhandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={inputchangehandler}
              placeholder='Enter full name'
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={inputchangehandler}
              placeholder='Enter mobile number(10 digits)'
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter your email'
              value={input.email}
              onChange={inputchangehandler}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder='*********'
              value={input.password}
              onChange={inputchangehandler}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={inputchangehandler}
                />
                Student
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={inputchangehandler}
                />
                Recruiter
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Photo</label>
            <input
              type="file"
              name="file" // Changed from 'photo' to 'file'
              accept="image/*"
              onChange={filechangehandler}
              className="w-full"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">Signup</Button>
          )}

          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default Signup
