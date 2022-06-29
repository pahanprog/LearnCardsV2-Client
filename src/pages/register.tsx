import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import * as yup from "yup";
import { TextInput } from "../components/TextInput";
import { SlowBuffer } from "buffer";
import { Button } from "../components/Button";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Неверный формат электронной почты")
    .required("Поле, обязательное для заполнения"),
  username: yup
    .string()
    .min(6, "Должно быть не менее 6 символов")
    .required("Поле, обязательное для заполнения"),
  password: yup
    .string()
    .min(6, "Должно быть не менее 6 символов")
    .required("Поле, обязательное для заполнения"),
});

export default function register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<{
      email: string;
      username: string;
      password: string;
    }>
  ) => {
    setLoading(true);
    console.log("VALUES ", values);

    const user = {
      email: values.email,
      username: values.username,
      password: values.password,
    };

    const result = await axios({
      method: "POST",
      url: "/auth/register",
      data: JSON.stringify(user),
    });

    if (result.data.errors) {
      result.data.errors.forEach((error: any) => {
        if (error.field == "email") {
          helpers.setFieldError("email", error.message);
        } else if (error.field == "username") {
          helpers.setFieldError("username", error.message);
        } else if (error.field == "password") {
          helpers.setFieldError("password", error.message);
        }
      });

      setLoading(false);
      return null;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify({ token: result.data.token })
      );
    }
    router.push(`/dashboard`, "", {});
  };

  return (
    <div className="w-full h-full grid place-items-center relative overflow-hidden bg-gray-100">
      <div className="w-full md:max-w-md sm: px-2">
        <div className="w-full bg-white shadow-lg z-10 md:rounded-lg md:p-6 rounded p-2">
          <div className="w-full grid place-items-center md:mb-4 mb-2">
            <div className="flex items-center flex-col">
              <div className="md:text-2xl text-lg font-medium">Learn Cards</div>
              <div className="md:text-xl text-md">Регистрация</div>
            </div>
          </div>

          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              setFieldTouched,
              submitForm,
              isValid,
              handleChange,
            }) => (
              <Form
                className="md:w-10/12 w-full flex flex-col mx-auto"
                autoComplete="off"
              >
                <div className="md:mb-6 mb-4">
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    handleChange={(e) => {
                      if (touched.email) {
                        setFieldTouched("email", false);
                      }
                      setFieldValue("email", e.target.value);
                    }}
                    error={
                      errors.email && touched.email
                        ? `${errors.email}`
                        : undefined
                    }
                    onBlur={() => {
                      console.log("BLURED");
                      setFieldTouched("email");
                    }}
                  />
                  <TextInput
                    label="Логин"
                    placeholder="Логин"
                    value={values.username}
                    name="username"
                    handleChange={(e) => {
                      if (touched.username) {
                        setFieldTouched("username", false);
                      }
                      setFieldValue("username", e.target.value);
                    }}
                    error={
                      errors.username && touched.username
                        ? `${errors.username}`
                        : undefined
                    }
                    onBlur={() => setFieldTouched("username")}
                  />
                  <TextInput
                    label="Пароль"
                    placeholder="Пароль"
                    value={values.password}
                    name="password"
                    handleChange={(e) => {
                      if (touched.password) {
                        setFieldTouched("password", false);
                      }
                      setFieldValue("password", e.target.value);
                    }}
                    error={
                      errors.password && touched.password
                        ? `${errors.password}`
                        : undefined
                    }
                    type="password"
                    style="mb-0"
                    onBlur={() => setFieldTouched("password")}
                  />
                </div>
                <Button
                  title="Зарегистрироваться"
                  disabled={
                    loading
                      ? true
                      : (touched.email && errors.email) ||
                        (touched.password && errors.password) ||
                        (touched.username && errors.username)
                      ? true
                      : false
                  }
                  changeColorWhenDisabled={!loading}
                  onClick={() => {
                    if (!isValid) {
                      if (errors.email || values.email === "") {
                        setFieldTouched("email");
                      }
                      if (errors.password || values.password === "") {
                        setFieldTouched("email");
                      }
                      if (errors.username || values.username === "") {
                        setFieldTouched("email");
                      }

                      return;
                    }
                  }}
                  icon={
                    loading && (
                      <div style={{ height: "24px" }}>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          size="lg"
                          style={{ width: "24px", height: "24px" }}
                          className="animate-spin"
                        />
                      </div>
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/login">
            <a className="text-blue-600">Уже есть профиль?</a>
          </Link>
        </div>
        <div className="absolute w-full text-gray-400 left-0 bottom-0 flex justify-center py-4">
          <div>&copy; pahanprog 2020-2021</div>
        </div>
      </div>
    </div>
  );
}
