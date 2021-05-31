import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useLoginMutation } from "../generated/graphql";

export default function login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [remember, setRemember] = useState(false);

  const [usernameOrEmailError, setUsernameOrEmailError] = useState(String);
  const [passwordError, setPasswordError] = useState(String);

  const [{}, login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      usernameOrEmail,
      password,
    };

    const result = await login(user);

    if (!result.data?.login.errors && result.data?.login.user) {
      setUsernameOrEmailError("");
      setPasswordError("");
      window.location.href = "/dashboard";
    } else if (result.data?.login.errors) {
      result.data?.login.errors.forEach((error) => {
        if (error.field == "usernameOrEmail") {
          setUsernameOrEmailError(error.message);
        } else if (error.field == "password") {
          setUsernameOrEmailError("");
          setPasswordError(error.message);
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen grid place-items-center relative overflow-hidden bg-gray-100">
      <div className="w-full max-w-md">
        <div className="w-full bg-white shadow-lg z-10 rounded-lg p-6">
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
                Username or email
              </label>
              <input
                type="text"
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                placeholder="Username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              {usernameOrEmailError ? `${usernameOrEmailError}` : null}
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
              <Switch.Group>
                <Switch
                  as="div"
                  className="flex items-center cursor-pointer focus:outline-none"
                  checked={remember}
                  onChange={setRemember}
                >
                  <div
                    className={`h-4 w-4 shadow mr-2 border rounded grid place-items-center ${
                      remember ? "bg-purple-200 border-purple-200" : null
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="sm"
                      className={`text-purple-900 ${
                        remember ? "block" : "hidden"
                      }`}
                    />
                  </div>
                  <Switch.Label className="cursor-pointer font-medium">
                    Remember me
                  </Switch.Label>
                  <span className="sr-only">Remember me</span>
                </Switch>
              </Switch.Group>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 font-medium inline-flex justify-center text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:focus:outline-none"
              >
                Sign In
              </button>
              <Link href="forgot-password">
                <a className="text-blue-600">Forgot password?</a>
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="register">
            <a className="text-blue-600">Don't have an account?</a>
          </Link>
        </div>
        <div className="absolute w-full text-gray-400 left-0 bottom-0 flex justify-center py-4">
          <div>&copy; pahanprog 2020-2021</div>
        </div>
      </div>
    </div>
  );
}
