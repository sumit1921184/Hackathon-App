import React, { useState, useEffect } from "react";
import home from "../assets/Home.webp";
import Carousal from "./Carousal";
import { Spinner } from "@chakra-ui/react"
import { FaSpinner } from 'react-icons/fa';
import { url } from "../api";

const Home = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        // Fetch live events, upcoming events, and past events
        const liveResponse = await fetch(`${url}createRouter/live`);
        const upcomingResponse = await fetch(`${url}createRouter/upcoming`);
        const pastResponse = await fetch(`${url}createRouter/past`);

        const liveData = await liveResponse.json();
        const upcomingData = await upcomingResponse.json();
        const pastData = await pastResponse.json();

        setLiveEvents(liveData);
        setUpcomingEvents(upcomingData);
        setPastEvents(pastData);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        className="relative flex items-center justify-center h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${home})`,
        }}
      >
        {/* Overlay for blur */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        {/* Text Content */}

        <div className="relative text-center">
          <p className="text-xl font-bold text-gray-200 mb-2">Welcome to</p>
          <p className="text-5xl font-extrabold text-white">CodeZilla</p>
        </div>
      </div>
      {loader ? <div className=" text-center mt-10" ><Spinner borderWidth="4px" /></div> : (
        <>
          {liveEvents.length > 0 && (<><div className="pl-9 pr-9 mt-10 flex justify-center">
            <p className="text-4xl text-blue-600 font-extrabold hover:underline transition-all delay-500 ease-in-out">
              Live Events
            </p>
          </div>
            <div className=" text-center mt-5"><Carousal cards={liveEvents} types="live" /></div></>)}

          {upcomingEvents.length > 0 && (<> <div className="pl-9 pr-9 mt-10 flex justify-center">
            <p className="text-4xl text-blue-600 font-extrabold hover:underline transition-all delay-500 ease-in-out">
              Upcoming Events
            </p>
          </div>
            <div className=" text-center mt-5" > <Carousal cards={upcomingEvents} types = "past"/></div></>)}

          {pastEvents.length > 0 && (<><div className="pl-9 pr-9 mt-10 flex justify-center">
            <p className="text-4xl text-blue-600 font-extrabold hover:underline transition-all delay-500 ease-in-out">
              Past Events
            </p>
          </div>
            <div className=" text-center mt-5" > <Carousal cards={pastEvents} types= "upcoming"/></div></>)}
        </>
      )}
    </div>
  );
};

export default Home;
