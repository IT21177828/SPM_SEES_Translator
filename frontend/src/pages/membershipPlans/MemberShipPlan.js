import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MemberShipPlan(){


    const [membership , SetMembership] = useState ([])
  
    useEffect (() =>{
        axios.get('http://localhost:5050/membershipType/view')
        .then(result => SetMembership(result.data))
        .catch(err => console.log(err)) 
    },[])




  return (
        <div>
            <div className="min-h-screen bg-gray-100 overflow-auto">
                <div className="container mx-auto max-w-4xl">
                    <div className="mt-10 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Pricing plans</h1>
                        {/* <p className="text-lg mt-3 font-semibold">Every plan includes 30 day free trial</p> */}
                    </div>


                    <hr className="mt-10" />

                    <div className="flex space-x-10 pt-10">
                        <div className="flex space-x-10 pt-10">
                            {membership.map((plan, index) => (
                                <div key={index} className="py-12">
                                    <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
                                    
                                        <div className="px-8 flex justify-between items-center">
                                            <h4 className="text-xl font-bold text-gray-800">
                                            {plan.name}
                                            </h4>

                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            >
                                            {/* Add your SVG path here */}
                                            </svg>
                                        </div>

                                        <h1 className="text-4xl text-center font-bold">${plan.price}</h1>

                                        <p className="px-4 text-center text-sm">{plan.description}</p>

                                        <div className="text-center bg-pink-600">
                                            <button className="inline-block my-6 font-bold  text-white">
                                            Get started today
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );


}
