import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = { username, email, password };

    try {
      await registerUser(data).unwrap();
      alert('Registration Successful');
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full h-screen p-2 flex items-center justify-center">
      <div className="w-full max-w-sm border-2 border-zinc-300 p-10 space-y-7 rounded-md">
        <h1 className="text-xl font-bold">Please Register</h1>
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="px-4 bg-zinc-200 py-3 w-full rounded-md outline-0 border-0"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="px-4 bg-zinc-200 py-3 w-full rounded-md outline-0 border-0"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="px-4 bg-zinc-200 py-3 w-full rounded-md outline-0 border-0"
          />

          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-800 text-white py-2 rounded-md font-bold w-full"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <h3 className="italic text-center text-zinc-500">
          Already have an account?{' '}
          <span className="text-red-500 underline">
            <Link to="/login">Login</Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Register;
