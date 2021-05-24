import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useRegisterMutation } from "../generated/graphql";

export default function register() {
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const [remember, setRemember] = useState(false);

  const [usernameError, setUsernameError] = useState(String);
  const [passwordError, setPasswordError] = useState(String);

  const [{}, register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const result = await register(user);

    if (!result.data?.register.errors && result.data?.register.user) {
      setUsernameError("");
      setPasswordError("");
      window.location.href = "/dashboard";
    } else if (result.data?.register.errors) {
      result.data?.register.errors.forEach((error) => {
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
      <div className="w-full max-w-md">
        <div className="w-full bg-white shadow-lg z-10 rounded-lg p-6">
          <div className="w-full grid place-items-center mb-4">
            <div className="flex items-center flex-col">
              <div className="text-2xl font-medium">Learn Cards</div>
              <div>Sign Up</div>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="login">
            <a className="text-blue-600">Already have an account?</a>
          </Link>
        </div>
        <div className="absolute w-full text-gray-400 left-0 bottom-0 flex justify-center py-4">
          <div>&copy; pahanprog 2020-2021</div>
        </div>
      </div>
    </div>
  );
}
