import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import nasa from "../assets/nasa.png";

function Home() {
  let navigate = useNavigate();
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  function isValidDate(dateString) {
    dateString = dateString.replace(/\s/g, '');

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const dateNum = date.getTime();
    if (!dateNum && dateNum !== 0) return false;
    return date.toISOString().slice(0, 10) === dateString;
  }

  const handleInputChange = (e) => {
    let inputDate = e.target.value;
    inputDate = inputDate.replace(/\D/g, "");
    let formattedDate = "";

    if (inputDate.length >= 4) {
      formattedDate += inputDate.slice(0, 4) + " - ";
      if (inputDate.length >= 6) {
        formattedDate += inputDate.slice(4, 6) + " - ";
        if (inputDate.length >= 8) {
          formattedDate += inputDate.slice(6, 8);
        } else {
          formattedDate += inputDate.slice(6);
        }
      } else {
        formattedDate += inputDate.slice(4);
      }
    } else {
      formattedDate += inputDate;
    }
    setDate(formattedDate);
  };


  const handleAPOD = (e) => {
    e.preventDefault();
    if (isValidDate(date)) {
      navigate(`/day/${date}`);
      setError("");
    } else {
      setError("Please, input a date with the specified format.");
    }
  };

  return (
    <>
      <div className="min-h-screen overflow-auto max-h-screen w-full bg-space p-6 lg:p-16 no-scrollbar">
        <section className="top-section w-full flex justify-between">
          <div>
            <img src={nasa} className="w-[90px]" />
          </div>
          <div>
            <h1 className="font-kanit text-[40px] text-white">APOD</h1>
          </div>
        </section>
        <div className="lg:mt-0 mt-12 flex flex-col items-center animate-slideInUp">
          <section className="font-roboto">
            <h1 className="text-white text-center font-light text-4xl lg:text-[55px] mt-6 mb-8">
              Find the astronomy
              <br /> picture of the day
            </h1>
            <p className="text-center lg:text-[20px] text-white">
              Input your desired date and marvel at the incredible picture taken
              by NASA, note that the oldest
              <br /> record available is on June 16, 1995
            </p>
          </section>
          <section className="mt-12">
            <form className="flex flex-col" onSubmit={handleAPOD}>
              <input
                type="text"
                value={date}
                onChange={handleInputChange}
                placeholder="YYYY - MM - DD"
                className="bg-transparent border border-white rounded-xl h-[65px] lg:w-[940px] text-center text-white"
              />
              <button className="lg:hidden mt-8 py-2 text-white hover:text-black hover:bg-white px-4 border border-white rounded" type="submit">
                Find
              </button>
            </form>
          </section>
          {error && (
              <h1 className="text-white font-light font-roboto text-xl mt-4">{error}</h1>
            )}
        </div>
      </div>
    </>
  );
}

export default Home;
