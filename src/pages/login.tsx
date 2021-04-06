import { Container } from "next/app";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useLoginMutation } from "../generated/graphql";

export default function login() {
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);

  const [usernameError, setUsernameError] = useState(String);
  const [passwordError, setPasswordError] = useState(String);

  const [{}, login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const result = await login(user);

    if (!result.data?.login.errors && result.data?.login.user) {
      setUsernameError("");
      setPasswordError("");
      window.location.href = "/dashboard";
    } else if (result.data?.login.errors) {
      result.data?.login.errors.forEach((error) => {
        if (error.field == "username") {
          setUsernameError(error.message);
        } else if (error.field == "password") {
          setUsernameError("");
          setPasswordError(error.message);
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen grid place-items-center relative overflow-hidden bg-gray-100">
      <div
        style={{
          width: "1150px",
          height: "1150px",
          left: "-400px",
          top: "-500px",
        }}
        className="bg-blue-300 rounded-full absolute"
      ></div>

      <div
        style={{
          width: "750px",
          height: "750px",
          right: "-300px",
          bottom: "-250px",
        }}
        className="bg-purple-800 rounded-full absolute"
      ></div>

      <div className="w-full max-w-md bg-white shadow-lg z-10 rounded-lg p-6">
        <div className="w-full grid place-items-center mb-4">
          <div className="flex items-center flex-col">
            <div className="text-2xl font-medium">Learn Cards</div>
            <div>Sign In</div>
          </div>
        </div>

        <form
          className="w-10/12 flex flex-col mx-auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-4">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError ? `${usernameError}` : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ? `${passwordError}` : null}
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              style={{ color: "purple" }}
              className="form-checkbox font-semibold"
              name="remember"
            />
            <label htmlFor="remember" className="ml-2 text-sm font-semibold">
              Remember me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-700 px-6 py-2 text-white rounded font-semibold"
            >
              Sign In
            </button>
            <Link href="reset-password">
              <a className="text-purple-700">Forgot password?</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
