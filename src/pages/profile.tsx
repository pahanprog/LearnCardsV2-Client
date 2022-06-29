import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { TextInput } from "../components/TextInput";
import {
  useDiscoverQuery,
  useForgotPasswordMutation,
  useMeQuery,
  useStartLearningMutation,
} from "../generated/graphql";

export default function profile() {
  const [{ data, fetching, error }] = useMeQuery();
  const [{}, forgot] = useForgotPasswordMutation();

  useEffect(() => {
    if (error) {
      alert(`Ошибка при запросе информации профиля ${error}`);
    }
  }, [fetching]);

  return (
    <div className="w-full h-full flex flex-col">
      <Header showLogo />
      <div className="flex-1 bg-gray-100 flex flex-col overflow-y-scroll">
        <div className="flex-1 p-6 ">
          <div className="flex items-center">
            <div className="text-lg">Ваш логин: </div>
            <div className="ml-2 text-lg font-semibold text-purple-700">
              {data?.me?.username}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="text-lg">Ваш email: </div>
            <div className="ml-2 text-lg font-semibold text-purple-700">
              {data?.me?.email}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Button
              title="Сменить пароль"
              type="s"
              onClick={async () => {
                const result = await forgot({
                  email: data?.me?.email ? data?.me?.email : "",
                });
                if (result.data?.forgotPassword && !result.error) {
                  alert(
                    "Мы отправили на вашу почту сообщение с ссылкой для смены пароля (ссылка действует 24 часа)"
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
