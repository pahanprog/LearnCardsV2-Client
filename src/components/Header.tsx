import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ResponsiveSideMenuContext } from "../context/ResponsiveSideMenuProvider";
import { useMeQuery } from "../generated/graphql";
import { Button } from "./Button";
import SettingsMenu from "./SettingsMenu";

interface HeaderProps {
  showLogo?: boolean;
  index?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLogo, index }) => {
  const [{ data }] = useMeQuery({ requestPolicy: "network-only" });
  const router = useRouter();

  const { toggleMenu } = useContext(ResponsiveSideMenuContext);

  return (
    <header className="text-gray-600">
      <div
        className={`flex md:px-8 px-4 py-2 ${
          showLogo ? "justify-between border-b-2" : "justify-end"
        } items-center`}
      >
        <div
          className={`${
            index || showLogo ? "hidden" : "md:hidden"
          } mr-auto p-2`}
          onClick={() => {
            toggleMenu();
          }}
        >
          <div className="w-6 bg-black h-0.5 rounded" />
          <div className="w-6 bg-black h-0.5 rounded mt-1" />
          <div className="w-6 bg-black h-0.5 rounded mt-1" />
        </div>
        {showLogo && (
          <div
            className="text-xl md:text-3xl font-semibold cursor-pointer text-gray-800"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Learn Cards
          </div>
        )}
        {/* <DeckSearch /> */}
        {index ? (
          <>
            {data?.me?.id ? (
              <Link href={"/dashboard"}>
                <div className="px-2 py-1 rounded bg-green-200 mr-2 text-sm font-medium cursor-pointer">
                  Главная страница
                </div>
              </Link>
            ) : (
              <div className="flex flex-row items-center">
                <Link href={"/login"}>
                  <div className="px-2 py-1 rounded bg-green-200 mr-2 text-sm font-medium cursor-pointer">
                    Войти
                  </div>
                </Link>

                <Link href={"/register"}>
                  <div className="px-2 py-1 rounded bg-green-200 text-sm font-medium cursor-pointer">
                    Зарегистрироваться
                  </div>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <div className="text-xl mr-2">{data?.me?.username}</div>
            <div>
              <SettingsMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  showLogo: false,
  index: false,
};

export default Header;
