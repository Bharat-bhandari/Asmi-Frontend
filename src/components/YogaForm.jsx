import React, { useState, Fragment } from "react";
import BASE_URL from "../apis/Config";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const YogaForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const [physicalFitness, setPhysicalFitness] = useState(false);
  const [stressRelief, setStressRelief] = useState(false);
  const [spiritualGrowth, setSpiritualGrowth] = useState(false);

  // Handler function to update state when checkbox is clicked
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Update the corresponding state based on the checkbox name
    switch (name) {
      case "physicalFitness":
        setPhysicalFitness(checked);
        break;
      case "stressRelief":
        setStressRelief(checked);
        break;
      case "spiritualGrowth":
        setSpiritualGrowth(checked);
        break;
      default:
        break;
    }
  };

  const sendMail = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    const yogaData = new FormData();

    // Append personal information
    yogaData.append("firstName", firstName);
    yogaData.append("lastName", lastName);
    yogaData.append("email", email);
    yogaData.append("phoneNumber", phoneNumber);
    yogaData.append("country", country);

    // Append checkbox values
    yogaData.append("physicalFitness", physicalFitness.toString());
    yogaData.append("stressRelief", stressRelief.toString());
    yogaData.append("spiritualGrowth", spiritualGrowth.toString());

    try {
      const response = await fetch(`${BASE_URL}/send-yoga`, {
        method: "POST",

        body: yogaData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      navigate("/submission-successful");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setCountry("");
      setPhysicalFitness(false);
      setStressRelief(false);
      setSpiritualGrowth(false);
      // Reset input fields
    } catch (error) {
      console.error("Error sending mail:", error);
      // Handle error (e.g., display error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="m-8 sm:m-20">
        <div className="mt-[5rem]">
          <div className="text-3xl">Asmi - Yoga Form</div>

          <form onSubmit={sendMail}>
            <div className="mt-4 mb-2">
              <div className="text-xl">
                Asmi hosts free Yoga Sessions 6 times a day. Sessions will start
                from 1st February 2024. You can download the Asmi App from the
                website home page
              </div>
              <div className="piformelement formelement">
                <div className="mt-3 mb-1">
                  <label className="block text-[#374151] pr-8 pb-1">
                    FirstName*
                  </label>
                  <input
                    className="md:w-3/5 w-full pr-2 border p-2 rounded-sm border-[#d1d5db] w-max-[20rem]"
                    type="text"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-3 mb-1">
                  <label className="block text-[#374151] pr-8 pb-1">
                    LastName*
                  </label>
                  <input
                    className="md:w-3/5 w-full pr-2 border p-2 rounded-sm border-[#d1d5db] w-max-[20rem]"
                    type="text"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mt-3 mb-1">
                  <label className="block text-[#374151] pr-8 pb-1">
                    Email*
                  </label>
                  <input
                    className="md:w-3/5 w-full pr-2 border p-2 rounded-sm border-[#d1d5db] w-max-[20rem]"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-3 mb-1">
                  <label className="block text-[#374151] pr-8 pb-1">
                    Mobile No*
                  </label>
                  <PhoneInput
                    type="text"
                    value={phoneNumber}
                    country="in"
                    required
                    onChange={setPhoneNumber}
                  />
                </div>
                <div className="mt-3 mb-1">
                  <label className="block text-[#374151] pr-8 pb-1">
                    Country
                  </label>
                  <input
                    className="md:w-3/5 w-full pr-2 border p-2 rounded-sm border-[#d1d5db] w-max-[20rem]"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3 mb-1">
                  <fieldset>
                    <legend>
                      What is the primary goal you aim to achieve through
                      practicing yoga?
                    </legend>
                    <div>
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="physicalFitness"
                        checked={physicalFitness}
                        onChange={handleCheckboxChange}
                      />
                      <label className="text-[#374151] pr-8 pb-1">
                        Physical Fitness and Flexibility
                      </label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="stressRelief"
                        checked={stressRelief}
                        onChange={handleCheckboxChange}
                      />
                      <label className="text-[#374151] pr-8 pb-1">
                        Stress relief and relaxation
                      </label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="spiritualGrowth"
                        checked={spiritualGrowth}
                        onChange={handleCheckboxChange}
                      />
                      <label className="text-[#374151] pr-8 pb-1">
                        Spiritual growth and mindfulness
                      </label>
                    </div>

                    {/* Add other checkboxes as needed */}

                    {/* Example of an "All of the Above" checkbox */}
                    <div>
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="allOfTheAbove"
                        checked={
                          physicalFitness && stressRelief && spiritualGrowth
                        }
                        onChange={() => {
                          setPhysicalFitness(!physicalFitness);
                          setStressRelief(!stressRelief);
                          setSpiritualGrowth(!spiritualGrowth);
                        }}
                      />
                      <label className="text-[#374151] pr-8 pb-1">
                        All of the Above
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-8 mb-2">
              <div className="mt-3 mb-1">
                <input className="mr-2" type="checkbox" required />
                <label>
                  By submitting this Form I give consent to Asmi.life to use my
                  Email and Phone Number to send me notifications about the Yoga
                  &amp; other wellness lessons.
                </label>
              </div>
              <div className="mt-3 mb-1">
                <input className="mr-2" type="checkbox" required />
                <label>I agree to the Terms and Conditions of Asmi.life</label>
              </div>

              <input
                className="px-4 py-1 text-white rounded-md bg-primary03 hover:bg-primary05"
                type="submit"
                value={loading ? "Loading..." : "Submit"} // Change button text based on loading state
                disabled={loading} // Disable button when loading
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default YogaForm;
