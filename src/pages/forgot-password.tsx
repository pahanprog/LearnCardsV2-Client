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
      alert(
        "Мы отправили на вашу почту сообщение с ссылкой для смены пароля (ссылка действует 24 часа)"
      );
    }
  };
  return (
    <div className="w-full grid place-items-center  px-4">
      <div className="text-2xl fonts-medium mb-2">Восстановление пароля</div>
      <div className="text-md fonts-medium mb-6 md:w-1/2 w-full text-center">
        Для восстановления пароля введите свой адрес электронной почты, мы
        отправим на него сообщение с ссылкой на смену пароля
      </div>
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
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
