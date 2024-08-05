import { registerUser } from '@/api';
import { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ fullname, email, password });
      // localStorage.setItem('token', response.data.token);
      onRegisterSuccess();
      setError(''); // Clear error message on successful registration
    } catch (error) {
      setError('Invalid Input');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 border-2 p-6 border-solid border-black rounded-lg">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border-2 p-1 border-solid border-black rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 p-1 border-solid border-black rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 p-1 border-solid border-black rounded-lg"
            />
          </div>

          <button type="submit" className="bg-black text-white p-2 font-bold rounded-lg">
            Register
          </button>
        </form>

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Register;
