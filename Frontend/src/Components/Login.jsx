import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid Email and Password");
    }
  };

  return (
    <div className="w-full h-screen p-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-sm border border-zinc-300 p-8 space-y-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="px-4 bg-zinc-200 py-3 w-full rounded-md outline-none"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="px-4 bg-zinc-200 py-3 w-full rounded-md outline-none"
          />
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="bg-blue-800 text-white py-3 rounded-md font-semibold w-full hover:bg-blue-900 transition"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
