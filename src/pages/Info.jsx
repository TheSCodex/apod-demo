import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nasa from "../assets/nasa.png";

function Info() {
  let navigate = useNavigate();
  let { date } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  date = date.replace(/\s/g, "");

  const [year, month, day] = date.split("-");
  const monthName = months[parseInt(month, 10) - 1];

  useEffect(() => {
    if (date) {
      const handleFetchAPOD = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${
              import.meta.env.VITE_APOD_APIKEY
            }&date=${date}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const apod = await response.json();
          setData(apod);
          setError(""); // Clear any previous errors
        } catch (error) {
          console.error(error);
          setError("An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };

      handleFetchAPOD();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min:h-screen w-full bg-space p-6 lg:p-16">
      <section className="top-section w-full flex justify-between">
        <div>
          <img src={nasa} className="w-[90px]" />
        </div>
        <div>
          <h1 className="font-kanit text-[40px] text-white">APOD</h1>
        </div>
      </section>
      {loading ? (
        <div className="text-white flex flex-col items-center mt-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            baseProfile="basic"
            viewBox="0 0 64 64"
            width="256"
            height="256"
            fill="white"
            className="animate-blink"
          >
            <path d="M20.586,45.585l2.828,2.829C21.68,50.148,18.296,52,14,52c-1.104,0-2-0.896-2-2c0-4.298,1.853-7.682,3.586-9.415 l2.828,2.829c-0.197,0.197-0.715,1.606-0.715,2.886C18.975,46.301,20.389,45.783,20.586,45.585z" />
            <path d="M37.43,41.465l4-0.027c0.002,0.219,0.007,5.413-3.308,9.259c-3.349,3.888-8.763,4.284-8.991,4.299 C29.087,54.999,29.043,55,29,55c-0.541,0-1.061-0.219-1.438-0.61c-0.408-0.423-0.61-1.004-0.552-1.589l0.9-9l3.98,0.398 l-0.629,6.284c1.251-0.411,2.743-1.135,3.83-2.397C37.406,45.4,37.43,41.504,37.43,41.465z" />
            <path d="M22.535,26.571c-0.045,0-3.938,0.024-6.621,2.336c-1.26,1.085-1.983,2.579-2.396,3.831l6.282-0.628l0.398,3.98l-9,0.9 C11.133,36.997,11.066,37,11,37c-0.516,0-1.015-0.2-1.39-0.562c-0.423-0.408-0.645-0.982-0.606-1.569 c0.016-0.229,0.412-5.642,4.299-8.992c3.847-3.314,9.023-3.31,9.26-3.306L22.535,26.571z" />
            <path d="M44,24c0,2.209-1.791,4-4,4s-4-1.791-4-4s1.791-4,4-4S44,21.791,44,24z" />
            <path d="M53,9c1.104,0,2,0.896,2,2c0,3.093-0.51,19.031-10.582,29.101C37.752,46.768,28.361,47,27.093,47 c-0.065,0-0.109,0-0.13-0.001c-0.518-0.009-1.011-0.219-1.377-0.585l-8-8C17.22,38.048,17.01,37.555,17,37.037 c-0.008-0.423-0.111-10.445,6.898-17.456C33.971,9.51,49.907,9,53,9z M41.59,37.273c7.581-7.581,9.07-19.134,9.349-24.212 c-5.077,0.279-16.63,1.768-24.212,9.349c-4.774,4.775-5.569,11.527-5.701,13.788l6.777,6.777 C30.063,42.843,36.815,42.048,41.59,37.273z" />
          </svg>
          <h1 className="font-roboto text-2xl animate-blink">Loading...</h1>
        </div>
      ) : error ? (
        <div className="text-white flex flex-col items-center mt-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Glyph"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
            xmlSpace="preserve"
            width="256"
            height="256"
            fill="white"
          >
            <g>
              <path d="M42,51H22c-1.10455,0-2,0.89539-2,2v1c0,0.55225,0.44769,1,1,1h22c0.55231,0,1-0.44775,1-1v-1   C44,51.89539,43.10455,51,42,51z" />
              <polygon points="24.65289,46 24.15289,49 39.84711,49 39.34711,46  " />
              <path d="M54,9H10c-1.65686,0-3,1.34314-3,3v29c0,1.65686,1.34314,3,3,3h44c1.65686,0,3-1.34314,3-3V12C57,10.34314,55.65686,9,54,9   z M33,41h-2c-0.55225,0-1-0.44727-1-1s0.44775-1,1-1h2c0.55273,0,1,0.44727,1,1S33.55273,41,33,41z M54,35c0,0.55273-0.44727,1-1,1   H11c-0.55225,0-1-0.44727-1-1V13c0-0.55225,0.44775-1,1-1h42c0.55273,0,1,0.44775,1,1V35z" />
              <path d="M12,34h40V14H12V34z M34.2002,18.60028c-0.33203-0.44189-0.24219-1.06885,0.2002-1.3999   c0.44141-0.33301,1.06836-0.2417,1.39941,0.19971L36.5,18.33368l0.7002-0.93359c0.33105-0.44092,0.95801-0.53174,1.39941-0.19971   c0.44238,0.33105,0.53223,0.95801,0.2002,1.3999l-1.04993,1.3999l1.04993,1.3999c0.33203,0.44189,0.24219,1.06885-0.2002,1.3999   c-0.43475,0.32727-1.07172,0.23724-1.39941-0.19971C37.19928,22.59906,36.5,21.66669,36.5,21.66669l-0.7002,0.93359   c-0.32654,0.43536-0.98895,0.5069-1.39941,0.19971c-0.44238-0.33124-0.53217-0.95807-0.2002-1.3999l1.04993-1.3999   L34.2002,18.60028z M25.2002,18.60028c-0.33203-0.44189-0.24219-1.06885,0.2002-1.3999   c0.44141-0.33301,1.06738-0.2417,1.39941,0.19971L27.5,18.33368l0.7002-0.93359c0.33203-0.44092,0.95801-0.53174,1.39941-0.19971   c0.44238,0.33105,0.53223,0.95801,0.2002,1.3999l-1.04993,1.3999l1.04993,1.3999c0.33203,0.44189,0.24219,1.06885-0.2002,1.3999   c-0.42865,0.32263-1.09894,0.20093-1.39941-0.19971C28.198,22.59735,27.5,21.66669,27.5,21.66669l-0.7002,0.93359   c-0.33527,0.44702-0.97974,0.51373-1.39941,0.19971c-0.44238-0.33112-0.53223-0.95801-0.2002-1.3999l1.04993-1.3999   L25.2002,18.60028z M25.21191,29.38495c1.67871-2.15088,4.15332-3.38477,6.78809-3.38477s5.10938,1.23389,6.78809,3.38477   c0.33984,0.43555,0.2627,1.06396-0.17285,1.40332c-0.42413,0.33228-1.0708,0.25293-1.40344-0.17297   c-1.29785-1.66205-3.1972-2.61511-5.21179-2.61511c-2.01465,0-3.91406,0.95312-5.21191,2.61523   c-0.33984,0.43408-0.96875,0.51416-1.40332,0.17285C24.94922,30.44891,24.87207,29.8205,25.21191,29.38495z" />
            </g>
          </svg>
          <h1 className="text-white font-roboto text-2xl font-light">{error}</h1>
        </div>
      ) : (
        <section className="flex lg:flex-row flex-col justify-center lg:justify-evenly mt-16 animate-slideIn">
          <div className="bg-white/25 lg:min-w-[400px] max-w-[400px] max-h-[475px] lg:min-h-[475px] rounded-xl p-8 flex justify-center items-center">
            <section>
              <img src={data.url} />
            </section>
          </div>
          <div className="w-full lg:mt-0 mt-6 lg:w-[40%] text-white relative">
            <h1 className="lg:text-right text-5xl font-light mb-8">
              The picture of
              <br /> {monthName} {day}, {year}{" "}
            </h1>
            <p className="lg:text-right">{data.explanation}</p>
            <button
              onClick={handleBackHome}
              className="absolute top-[7rem] lg:top-0 lg:right-0 right-[3rem] lg:left-[9.8rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <g clipPath="url(#clip0_54_30)">
                  <path
                    d="M9.16663 22H34.8333"
                    stroke="white"
                    strokeWidth="1.83333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16663 22L16.5 29.3333"
                    stroke="white"
                    strokeWidth="1.83333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16663 22L16.5 14.6667"
                    stroke="white"
                    strokeWidth="1.83333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_54_30">
                    <rect width="44" height="44" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Info;
