import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import DeckSearchResult from "./DeckSearchResult";

const DeckSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [input, setInput] = useState(String);
  const [search, setSearch] = useState(String);
  const [result, setResult] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setInput("");
    setSearch("");
    setResult(false);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input != "") {
      setSearch(input);
      setResult(true);
    }
  };

  return (
    <>
      <div className="cursor-pointer flex items-center" onClick={openModal}>
        <FontAwesomeIcon icon={faSearch} size="lg" />
        <span className="ml-4 text-xl">Quick search for decks</span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Search for decks
                </Dialog.Title>
                <div className="mt-4">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="px-8">
                      <input
                        type="text"
                        name="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    {result ? (
                      <DeckSearchResult
                        title={search}
                        back={() => {
                          setResult(false);
                        }}
                        close={closeModal}
                      />
                    ) : null}
                    <div className="flex justify-around mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeckSearch;
