import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import { url } from '../api';
// import login_picture from "../assets/pet3.jpg";


export default function Register() {
    const toast = useToast();
    const navigate = useNavigate();

    // Initialize useForm hook
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        // Check if password and confirmPassword match
        if (data.pass !== data.confirmPassword) {
            return toast({
                title: "Password and confirm password should be the same",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }

        try {
            const res = await axios.post(`${url}users/register`, data);
            toast({
                title: res.data.msg,
                status: "success",
                isClosable: true,
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            if (err.response && err.response.data) {
                toast({
                    title: err.response.data.err || "An error occurred",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <div className=" bg-gradient-to-r from-[#24243e] via-[#302b63] to-[#0f0c29]">
            <section>
                <div className="flex justify-center items-center text-center h-full bg-gradient-to-r from-[#664c92] to-[#f4a973]">
                    <div className="flex max-w-4xl w-full bg-white rounded-lg border border-gray-300">
                        <div className="col-1 p-12 flex-1 mt-10 ">
                            <h2 className="text-5xl font-bold">Sign Up</h2>
                            <span className="text-lg text-gray-500">Register and Enjoy</span>

                            <form
                                id="form"
                                className="flex flex-col max-w-md mx-auto mt-8"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    {...register('username', { required: 'Username is required' })}
                                    className="border border-gray-300 p-4 mb-4 rounded focus:outline-none"
                                />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="border border-gray-300 p-4 mb-4 rounded focus:outline-none"
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                                <input
                                    type="password"
                                    name="pass"
                                    placeholder="Password"
                                    {...register('pass', { required: 'Password is required' })}
                                    className="border border-gray-300 p-4 mb-4 rounded focus:outline-none"
                                />
                                {errors.pass && <p className="text-red-500">{errors.pass.message}</p>}

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    {...register('confirmPassword', { required: 'Confirm Password is required' })}
                                    className="border border-gray-300 p-4 mb-4 rounded focus:outline-none"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    {...register('age', { required: 'Age is required' })}
                                    className="border border-gray-300 p-4 mb-4 rounded focus:outline-none"
                                />
                                {errors.age && <p className="text-red-500">{errors.age.message}</p>}

                                <button
                                    type="submit"
                                    className="bg-[#003049] text-white py-3 rounded mt-4 text-lg cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                        <div className="col-2 hidden lg:block flex-1 relative">
                            <img
                                // src={login_picture}
                                alt="Pet"
                                className="w-full h-3/4 object-cover rounded-br-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
