import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useChangePasswordMutation } from "../../generated/graphql";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [newPassword, setNewPassword] = useState(String);
  const [error, setError] = useState(String);

  const [{}, changePassword] = useChangePasswordMutation();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      newPassword,
      token,
    };
    const result = await changePassword(values);
    if (result.data?.changePassword.errors) {
      result.data?.changePassword.errors.forEach((error) => {
        setError(error.message);
      });
    } else if (result.data?.changePassword.changed) {
      router.push("/login");
    }
  };

  return (
    <div className="w-full grid place-items-center px-4">
      <div className="text-2xl fonts-medium mb-6">Придумайте новый пароль</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="font-medium" htmlFor="">
          Новый пароль
        </label>
        <input
          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {error ? `${error}` : null}
        <div className="mt-2">
          <button
            type="submit"
            className="px-4 py-2 font-medium inline-flex justify-center text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:focus:outline-none"
          >
            Изменить пароль
          </button>
        </div>
      </form>
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
