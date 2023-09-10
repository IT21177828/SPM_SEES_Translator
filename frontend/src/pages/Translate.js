import React, { useEffect, useState } from "react";
import TextBox from "../components/TextBox";
import Arrows from "../components/Arrows";
import Button from "../components/Button";
import FeedbackModal from "../components/FeedbackModal"; // Updated import
import Modal from "../components/Modal"; // Updated import
import TranslationHistory from "./history/TranslationHistory"; // Updated import
import TranslationSaved from "./savedWord/TranslationSaved"; // Updated import
import axios from "axios";
import Jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BadwordFeature from "./features/BadwordFeature";
import PremiumFeature from "./features/PremiumFeature";
import HistoryFeature from "./features/HistoryFeature";
import FavoriteFeatue from "./features/FavoriteFeatue";

export default function Translate() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showDropdownModal, setShowDropdownModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Sinhala");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [feedback, setFeedback] = useState({
    englishWord: "",
    sinhalaWord: "",
    feedbackText: "",
  }); // Updated state
  const [user, setUser] = useState({}); // Updated state
  const [isLogedIn, setIsLogedIn] = useState(false); // Updated state
  const [feature, setFeature] = useState(0); // Updated state
  const [banner, setBanner] = useState(false); // Updated state

  const getLanguages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/translate/languages"
      );
      setLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreashToken = async () => {
    try {
      const response = await axios.post("http://localhost:5050/user/refresh", {
        token: user.refreashToken,
      });

      console.log(response);

      setUser({
        ...user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = Jwt_decode(user.accessToken);
      console.log("PPPPPPPPPPP");
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("KKKKKKKKKKKKKK");
        const data = await refreashToken();
        config.headers["authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Function to fetch user information
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios
        .post("http://localhost:5050/user/details", null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
            setIsLogedIn(true);
          } else {
            setIsLogedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getLanguages();
    // Fetch user information when the component mounts
    fetchUserData();
  }, []);

  useEffect(() => {
    // Log the updated user state
    console.log(user.firstName);
  }, [user]); // Add user as a dependency

  const translate = async () => {
    const data = {
      textToTranslate,
      outputLanguage,
      inputLanguage,
      translatedText,
    };
    try {
      const response = await axios.get(
        "http://localhost:5050/translate/translation",
        {
          params: data,
        }
      );

      const name = "Suppa";

      const content = { name, textToTranslate };
      await axios.post("http://localhost:5050/bad/word", {
        params: content,
      });

      setTranslatedText(response.data);

      const dataToStore = { ...data, translatedText: response.data };

      storeTranslationData(dataToStore);
    } catch (error) {
      console.error("Error translating:", error);
    }
  };
  //Save History
  const storeTranslationData = async (data) => {
    try {
      await axios.post("http://localhost:5050/history/save", data);
      console.log("Translation data stored successfully");
    } catch (error) {
      console.error("Error storing translation data:", error);
    }
  };

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setTextToTranslate(translatedText);
    setTranslatedText("");
  };

  // Handle opening the feedback modal
  const handleFeedbackModalOpen = () => {
    setFeedback({
      ...feedback,
      englishWord: textToTranslate,
      sinhalaWord: translatedText,
    });
    setShowFeedbackModal(true);
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    try {
      // Send the feedback data to the backend
      const feedbackData = {
        englishWord: feedback.englishWord,
        sinhalaWord: feedback.sinhalaWord,
        feedbackText: feedback.feedbackText,
      };
      const response = await axios.post(
        "http://localhost:5050/feedback/translation",
        feedbackData
      ); // Update the URL as needed

      // Check if the submission was successful
      if (response.status === 201) {
        console.log("Feedback submitted successfully.");
        // Clear the feedback form
        setFeedback({ englishWord: "", sinhalaWord: "", feedbackText: "" });
        setShowModal(false); // Close the feedback modal
      } else {
        console.log("Feedback submission failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleFeature(e) {
    setBanner(true);
    console.log(e);
    setFeature(e);
  }

  function closeBanner() {
    setBanner(false);
  }

  return (
    <div className="flex flex-row">
      <div>
        <aside class="flex">
          <div class="flex h-screen w-16 flex-col items-center space-y-8 bg-white py-8 dark:border-gray-700 dark:bg-gray-900">
            <a href="#">
              <img
                class="h-6 w-auto"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(1);
              }}
              class="focus:outline-nones rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(2);
              }}
              class="rounded-lg bg-blue-100 p-1.5 text-blue-500 transition-colors duration-200 dark:bg-gray-800 dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(3);
              }}
              class="focus:outline-nones rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(4);
              }}
              class="focus:outline-nones rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(5);
              }}
              class="focus:outline-nones rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFeature(6);
              }}
              class="focus:outline-nones rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>

          {feature === 1 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              {" "}
              <div
                className="relative top-0 right-0"
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>{" "}
              <BadwordFeature />{" "}
            </div>
          ) : (
            ""
          )}
          {feature === 2 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              {" "}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <PremiumFeature />
            </div>
          ) : (
            ""
          )}
          {feature === 3 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              <BadwordFeature />{" "}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}
          {feature === 4 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              <HistoryFeature />{" "}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}
          {feature === 5 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              <FavoriteFeatue />{" "}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}
          {feature === 6 && banner ? (
            <div class="h-screen w-60 overflow-y-auto border-l border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900 sm:w-64">
              <BadwordFeature />{" "}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  closeBanner();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}
        </aside>
      </div>

      <div>
        <header className="bg-blue-500 p-4 flex justify-between items-center md:px-8">
          <div className="flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/translator-spm.appspot.com/o/userImg.png?alt=media&token=21e4bdb5-afe8-440d-a448-67edadb3b63a" // Replace with your user icon URL
              alt="User Icon"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-white font-semibold text-lg">
              {isLogedIn ? user.firstName + " " + user.lastName : ""}
            </span>
          </div>
          {!isLogedIn ? (
            <button
              className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          ) : (
            <button
              className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100"
              onClick={() => {
                console.log(isLogedIn);
                localStorage.removeItem("accessToken");
                navigate("/login");
              }}
            >
              Log out
            </button>
          )}
        </header>

        <div></div>
        <div className="app">
          {!showDropdownModal && (
            <>
              <TextBox
                style="input"
                setShowModal={setShowDropdownModal}
                selectedLanguage={inputLanguage}
                setTextToTranslate={setTextToTranslate}
                textToTranslate={textToTranslate}
                translatedText={translatedText}
                setTranslatedText={setTranslatedText}
              />
              <div className="arrow-container" onClick={handleClick}>
                <Arrows />
              </div>
              <TextBox
                style="output"
                setShowModal={setShowDropdownModal}
                selectedLanguage={outputLanguage}
                translatedText={translatedText}
              />
              <div className="button-container" onClick={translate}>
                <Button />
              </div>
              {/* Add a feedback button */}
              <button
                className="feedback-button"
                onClick={handleFeedbackModalOpen}
              >
                Provide Feedback
              </button>
              {/* Add a History button */}
              <div className="relative h-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded h-10 absolute bottom-0 right-10  mr-1"
                  onClick={() => setShowHistoryModal(true)}
                >
                  History
                </button>
              </div>
              <div className="relative h-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded h-10 absolute bottom-0 right-10  mr-16"
                  onClick={() => setShowSavedModal(true)}
                >
                  Favourite
                </button>
              </div>
            </>
          )}
          {showDropdownModal && (
            <Modal
              showModal={showDropdownModal}
              setShowModal={setShowDropdownModal}
              languages={languages}
              chosenLanguage={inputLanguage}
              setChosenInLanguage={setInputLanguage}
              setChosenOutLanguage={setOutputLanguage}
            />
          )}
          {showFeedbackModal && (
            <FeedbackModal
              handleFeedbackModel={setShowFeedbackModal}
              feedback={feedback}
              setFeedback={setFeedback}
              handleFeedbackSubmit={handleFeedbackSubmit}
            />
          )}
          {showHistoryModal && (
            <div className="history-modal ">
              <TranslationHistory
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
              />
            </div>
          )}
          {showSavedModal && (
            <div className="favourite-modal ">
              <TranslationSaved
                isOpen={showSavedModal}
                onClose={() => setShowSavedModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
