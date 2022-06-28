import { useRouter } from "next/router";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useCalculateStatsMutation } from "../generated/graphql";

export const ResponsiveSideMenuContext = createContext<{
  menuOpen: boolean;
  toggleMenu: () => void;
}>({
  menuOpen: false,
  toggleMenu: () => {},
});

export const ResponsiveSideMenuProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ResponsiveSideMenuContext.Provider
      value={{
        menuOpen,
        toggleMenu: () => {
          setMenuOpen((oldValue) => !oldValue);
        },
      }}
    >
      {children}
    </ResponsiveSideMenuContext.Provider>
  );
};
