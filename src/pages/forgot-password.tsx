import { FormEvent, useState } from "react";
import { useForgotPasswordMutation } from "../generated/graphql";

function ForgotPassword() {
  const [email, setEmail] = useState(String);
  const [complete, setComplete] = useState(Boolean);
  const [{}, forgot] = useForgotPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { email };
    const result = await forgot(values);
    if (result.data?.forgotPassword && !result.error) {
      alert("We sent you an email with a link to reset your password");
    }
  };
  return (
    <div className="w-screen grid place-items-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-2">
          <button
            type="submit"
            className="px-4 py-2 font-medium inline-flex justify-center text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:focus:outline-none"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
