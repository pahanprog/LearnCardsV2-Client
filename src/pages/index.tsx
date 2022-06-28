import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function index() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header showLogo={true} index />
      <div className="w-full h-full bg-gray-100 px-4 grid place-items-center">
        <div className="relative w-full bg-blue flex md:flex-row flex-col items-center">
          <div className="md:w-2/3 md:mr-4 mb-6 w-full">
            <div className="text-xl font-semibold">
              Приложения для заучивания!
            </div>
            <div className="text-lg font-medium mb-2">
              LearnCards поможет вам быстро и надолго запомнить любую информацию
              которую можно представить в виде карточек
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <img
              src="https://1gai.ru/uploads/posts/2019-10/1570535600_re.jpg"
              alt=""
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
