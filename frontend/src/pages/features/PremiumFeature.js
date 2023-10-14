import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function PremiumFeature() {

  const [membership , SetMembership] = useState ([])
//   const history = useHistory();
  const navigate = useNavigate();
  
  useEffect (() =>{
      axios.get('http://localhost:5050/membershipType/view')
      .then(result => SetMembership(result.data))
      .catch(err => console.log(err)) 
  },[])

//   const handleCardClick = (cardId) => {
//     // Find the selected card data based on the cardId
//     // const selectedCard = membership.find((card) => card.id === cardId);

//     // Navigate to the CardDetailPage and pass the card data as a URL parameter
//     // history.push(`/card-detail/${cardId}`, { cardData: selectedCard });
//   };



  return (
    <div className="text-white">
      <h2 className="px-20 text-lg font-medium text- text-white dark:text-white">
      Subscribe Today for Child-Safe Translation: The Ultimate Bad Word Protector.
      </h2>

      <div>
            <div class="min-h-screen bg-gray-100 overflow-auto">
                <div class="container mx-auto max-w-4xl">
                    <div class="mt-10 text-center">
                        <h1 class="text-4xl font-bold text-gray-800">Pricing plans</h1>
                        {/* <p class="text-lg mt-3 font-semibold">Every plan includes 30 day free trial</p> */}
                    </div>


                    <hr class="mt-10" />

                    <div class="flex space-x-10 pt-10">
                        <div class="flex space-x-10 pt-10">
                            {membership.map((plan, index) => (
                                <div key={index} class="py-12">
                                    <div class="bg-white pt-4 w-[300px] h-[300px] rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
                                    
                                        <div class="px-8 flex justify-between items-center">
                                            <h4 class="text-xl font-bold text-gray-800">
                                            {plan.name}
                                            </h4>

                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 text-gray-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            >
                                            {/* Add your SVG path here */}
                                            </svg>
                                        </div>

                                        <h1 class="text-4xl text-black text-center font-bold">${plan.price}</h1>

                                        <p class="px-4 text-center text-gray-400 text-sm">{plan.description}</p>

                                        <div class="text-center bg-blue-600">
                                            <button class="inline-block my-6 font-bold  text-white" onClick={() => navigate(`/checkout/${plan._id}`)}>
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
    </div>
  );
}
