import React from "react";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  handleLogin,
  setView,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => setView("signup")}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Daftar
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
