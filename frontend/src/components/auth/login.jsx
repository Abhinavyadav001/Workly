import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '../../redux/authslice'; // ✅ added setUser import
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setinput] = useState({
    email: '',
    password: '',
    role: ''
  });

  const { loading, user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputchangehandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const formhandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setloading(false));
    }
  };
 useEffect(() => {
  if (user) {
    navigate('/');
  }
});


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={formhandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={inputchangehandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={input.password}
              onChange={inputchangehandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={inputchangehandler}
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-sm">
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
            {
              loading ? (
                <Button className="w-full bg-blue-600 text-white py-2" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">Login</Button>
              )
            }
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 font-medium hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
