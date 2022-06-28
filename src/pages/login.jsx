import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  Formik,
} from "formik";
import * as yup from "yup";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

const loginSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .trim()
    .required("Поле, обязательное для заполнения"),
  password: yup
    .string()
    .min(6, "Должно быть не менее 6 символов")
    .required("Поле, обязательное для заполнения"),
});

export default function login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values,
    helpers
  ) => {
    setLoading(true);
    console.log("VALUES ", values);

    const user = {
      usernameOrEmail: values.usernameOrEmail,
      password: values.password,
    };

    const result = await axios({
      method: "POST",
      url: "/auth/login",
      data: JSON.stringify(user),
    });

    await new Promise((r) => setTimeout(r, 2000));

    if (result.data.errors) {
      result.data.errors.forEach((error) => {
        if (error.field == "usernameOrEmail") {
          helpers.setFieldError("usernameOrEmail", error.message);
        } else if (error.field == "username") {
          helpers.setFieldError("usernameOrEmail", error.message);
        } else if (error.field == "email") {
          helpers.setFieldError("usernameOrEmail", error.message);
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
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-screen h-screen grid place-items-center relative overflow-hidden bg-gray-100">
      <div className="w-full md:max-w-md sm: px-2">
        <div className="w-full bg-white shadow-lg z-10 md:rounded-lg md:p-6 rounded p-2">
          <div className="w-full grid place-items-center md:mb-4 mb-2">
            <div className="flex items-center flex-col">
              <div className="md:text-2xl text-lg font-medium">Learn Cards</div>
              <div className="md:text-xl text-md">Авторизация</div>
            </div>
          </div>

          <Formik
            initialValues={{
              usernameOrEmail: "",
              password: "",
              remember: false,
            }}
            validationSchema={loginSchema}
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
                    label="Логин или email"
                    placeholder="Логин или email"
                    value={values.usernameOrEmail}
                    name="usernameOrEmail"
                    handleChange={(e) => {
                      if (touched.usernameOrEmail) {
                        setFieldTouched("usernameOrEmail", false);
                      }
                      setFieldValue("usernameOrEmail", e.target.value);
                    }}
                    error={
                      errors.usernameOrEmail && touched.usernameOrEmail
                        ? `${errors.usernameOrEmail}`
                        : undefined
                    }
                    onBlur={() => {
                      console.log("BLURED");
                      setFieldTouched("usernameOrEmail");
                    }}
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
                <div className="flex items-center justify-between">
                  <Button
                    title="Войти"
                    disabled={
                      loading
                        ? true
                        : (touched.usernameOrEmail && errors.usernameOrEmail) ||
                          (touched.password && errors.password)
                        ? true
                        : false
                    }
                    changeColorWhenDisabled={!loading}
                    onClick={() => {
                      if (!isValid) {
                        if (
                          errors.usernameOrEmail ||
                          values.usernameOrEmail === ""
                        ) {
                          setFieldTouched("email");
                        }
                        if (errors.password || values.password === "") {
                          setFieldTouched("password");
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
                  <Link href="/forgot-password">
                    <a className="text-blue-600">Забыли пароль?</a>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/register">
            <a className="text-blue-600">Еще не зарегестрированы?</a>
          </Link>
        </div>
        <div
          style={{ height: "1px" }}
          className="relative w-full bg-gray-500 my-4 rounded grid place-items-center"
        >
          <div className="absolute text-sm py-1 px-2 bg-gray-100">или</div>
        </div>
        <div className="w-2/3 shadow mx-auto self-center flex justify-center items-center py-1 bg-white">
          <div style={{width: 26, height:26}} className="mr-4">
            {/* <Image src={mypic} width={26} height={26}/> */}
            <img src="https://staffordonline.org/wp-content/uploads/2019/01/Google.jpg" alt="" width={26} height={26} />
          </div>
          <div className="font-medium">Войти с Google</div>
        </div>
        <div className="absolute w-full text-gray-400 left-0 bottom-0 flex justify-center py-4">
          <div>&copy; pahanprog 2020-2021</div>
        </div>
      </div>
    </div>
  );
}
