import React, { useState } from "react";
import { useForm } from "react-hook-form";
import createBg from "../assets/login.jpg"
import { useModal } from "../ContextApi/Modal/ModalContext";
import { useToast } from "@chakra-ui/react";
import { url } from "../api";

const CreateEvent = () => {
  const [createData, setCreateData] = useState({});
  const { showModal } = useModal();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleCreateEvent = async (data) => {
    // console.log("createData-----",createData);
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };
    try {
      let jwt = JSON.parse(localStorage.getItem("token"));
      const res = await fetch(`${url}createRouter/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      const data = await res.json();
      console.log("data-========", data)

      if (res.status === 201) {
        toast({
          title: "Contest created successfully",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        reset();
      } else {
        toast({
          title: "Failed to create contest",
          description: data.error || "Something went wrong.",
          status: "error",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred",
        description: "Unable to create the contest. Please try again later.",
        status: "error",
        isClosable: true,
      });
    }
  };



  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    showModal({
      body: <p>Do you want to create this Event?</p>,
      onSave: () => handleCreateEvent(data),
    });
  };

  return (

    <div
      className="bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 mt-16 relative h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${createBg})`,
      }}
    >
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Create Coding Contest
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-900 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Enter hackathon name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-900 mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Describe the hackathon"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Start Date & Time */}
          <div>
            <label className="block text-gray-900 mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              {...register("startDate", { required: "Start date and time are required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date & Time */}
          <div>
            <label className="block text-gray-900 mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              {...register("endDate", { required: "End date and time are required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-gray-900 mb-1">Organizer</label>
            <input
              type="text"
              {...register("organizer", { required: "Organizer name is required" })}
              className="w-full px-4 py-2 border rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 focus:text-white"
              placeholder="Organizer name"
            />
            {errors.organizer && (
              <p className="text-red-500 text-sm">{errors.organizer.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateEvent;
