import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const SettingsMenu = () => {
  return (
    <Menu as="div" className="relative grid place-items-center ">
      <Menu.Button className="focus:outline-none">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-put duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-0 w-56 mt-12 origin-top-righti bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 grid place-items-center">
            <Menu.Item>
              <a className="px-2 py-2">Profile</a>
            </Menu.Item>
            <Menu.Item>
              <span>Logout</span>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SettingsMenu;
