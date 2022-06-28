import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { SearchResult } from "../components/SearchResult";
import { TextInput } from "../components/TextInput";
import { useDeckSearchQuery } from "../generated/graphql";

export default function search() {
  const [keywords, setKeywords] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchKeywords(keywords);
      // Send Axios request here
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keywords]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header showLogo />
      <div className="flex-1 bg-gray-100 flex flex-col overflow-scroll">
        <div>
          <Formik initialValues={{ keyWords: "" }} onSubmit={() => {}}>
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
              <Form className="bg-white border-b-2">
                <div className="w-full px-4 py-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    style={{}}
                    className=""
                  />
                  <TextInput
                    label="Поиск"
                    placeholder="Поиск"
                    value={keywords}
                    name="keyWords"
                    handleChange={(e) => {
                      setKeywords(e.target.value);
                    }}
                    // error={
                    //   errors.title && touched.title
                    //     ? `${errors.title}`
                    //     : undefined
                    // }
                    onBlur={() => {}}
                    showLabel={false}
                    showBorder={false}
                    style="none"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <SearchResult keywords={searchKeywords} />
      </div>
    </div>
  );
}
