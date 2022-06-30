import { faPlus, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useRouter } from "next/router";
import result from "postcss/lib/result";
import React, { Fragment, useState } from "react";
import { useCreateDeckMutation } from "../generated/graphql";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { ResponsiveSideMenuContext } from "../context/ResponsiveSideMenuProvider";

const createDeckSchema = yup.object().shape({
  title: yup.string().trim().required("Поле, обязательное для заполнения"),
  description: yup
    .string()
    .trim()
    .required("Поле, обязательное для заполнения"),
});

export default function CreateDeckBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const [{ data }, create] = useCreateDeckMutation();

  const router = useRouter();
  const { toggleMenu } = React.useContext(ResponsiveSideMenuContext);

  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    toggleMenu();
  };

  const closeModal = () => {
    setIsOpen(false);
    setLoading(false);
  };

  const handleSubmit = async (
    values: FormikValues,
    helpers: FormikHelpers<{
      title: string;
      description: string;
    }>
  ) => {
    setLoading(true);
    const deck = {
      title: values.title,
      description: values.description,
    };

    const result = await create(deck);

    // if (result.data?.createDeck) {
    //   setDecks([...decks, result.data.createDeck]);
    //   router.push(`/dashboard?deck=${result.data.createDeck.id}`, undefined, {
    //     shallow: true,
    //   });
    // }

    closeModal();
  };

  return (
    <div className="mt-2 grid place-items-center">
      <div className="cursor-pointer flex items-center" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} size="1x" />
        <span className="ml-4">Создать новую колоду</span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-full md:px-4 px-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md md:p-6 p-4 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Создать колоду
                </Dialog.Title>
                <Formik
                  initialValues={{ title: "", description: "" }}
                  validationSchema={createDeckSchema}
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
                    <Form className="md:mt-4 mt-2">
                      <div className="md:px-8 px-2">
                        <TextInput
                          label="Наименование"
                          placeholder="Наименование"
                          value={values.title}
                          name="title"
                          handleChange={(e) => {
                            if (touched.title) {
                              setFieldTouched("title", false);
                            }
                            setFieldValue("title", e.target.value);
                          }}
                          error={
                            errors.title && touched.title
                              ? `${errors.title}`
                              : undefined
                          }
                          onBlur={() => {
                            console.log("BLURED");
                            setFieldTouched("title");
                          }}
                        />
                        <TextInput
                          label="Описание"
                          placeholder="Описание"
                          value={values.description}
                          name="description"
                          handleChange={(e) => {
                            if (touched.description) {
                              setFieldTouched("description", false);
                            }
                            setFieldValue("description", e.target.value);
                          }}
                          error={
                            errors.description && touched.description
                              ? `${errors.description}`
                              : undefined
                          }
                          onBlur={() => {
                            console.log("BLURED");
                            setFieldTouched("description");
                          }}
                          style="mb-4"
                          multiline
                        />
                        <div className="w-full flex justify-around">
                          <Button
                            title="Отменить"
                            disabled={loading}
                            changeColorWhenDisabled={false}
                            onClick={closeModal}
                            submit={false}
                          />
                          <Button
                            title="Создать"
                            disabled={
                              loading
                                ? true
                                : (touched.title && errors.title) ||
                                  (touched.description && errors.description)
                                ? true
                                : false
                            }
                            changeColorWhenDisabled={!loading}
                            onClick={() => {
                              if (!isValid) {
                                if (errors.title || values.title === "") {
                                  setFieldTouched("title");
                                }
                                if (
                                  errors.description ||
                                  values.description === ""
                                ) {
                                  setFieldTouched("description");
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
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
