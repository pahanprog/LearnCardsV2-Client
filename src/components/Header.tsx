import React from "react";
import { useMeQuery } from "../generated/graphql";
import DeckSearch from "./DeckSearch";
import SettingsMenu from "./SettingsMenu";

const Header = () => {
  const [{ data }] = useMeQuery();

  return (
    <header className="text-gray-600">
      <div className="flex justify-between">
        <DeckSearch />
        <div className="flex items-center">
          <div className="mr-2">{data?.me?.username}</div>
          <div>
            <SettingsMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
