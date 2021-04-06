import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DeckSearchResult from "./DeckSearchResult";
import Modal from "./Modal";

export default function DeckSearchButton() {
  const [search, setSearch] = useState(String);
  const [open, setOpen] = useState(false);

  const [result, setResult] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setResult(false);
    setSearch("");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search != "") {
      setResult(true);
    }
  };

  return (
    <>
      <div
        className="w-9 h-9 rounded-full bg-white cursor-pointer ml-2 grid place-items-center"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </div>
      <Modal show={open} close={closeModal} title="Search for a Deck title">
        {result ? (
          <DeckSearchResult
            title={search}
            back={() => {
              setResult(false);
            }}
            close={closeModal}
          />
        ) : (
          <form
            className="w-full flex-1 flex flex-col"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex-1">
              <label htmlFor="decktitle">Deck title</label>
              <input
                type="text"
                id="decktitle"
                name="decktitle"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full border-2 border-gray-300 p-2 rounded-md rounded-md focus:outline-none"
              />
            </div>

            <div className="w-full flex mt-6">
              <div className="flex-1 flex justify-end mr-2">
                <span className="underline cursor-pointer" onClick={closeModal}>
                  Cancel
                </span>
              </div>
              <div className="flex-1 flex justify-start ml-2">
                <button
                  type="submit"
                  className="bg-purple-700 px-4 py-1 text-white rounded font-semibold"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
