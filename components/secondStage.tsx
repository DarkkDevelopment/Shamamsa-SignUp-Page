import React, { useState } from "react";
import { SignUpModel } from "../models/signUpModel";
import ThirdStage from "./thirdStage";

function SecondStage(props: any) {
  const allRotab = props.rotab;
  const allAsakfa = props.asakfa;
  const allChurch = props.churches;
  const allCountries = props.countries;
  const user: SignUpModel = props.user;
  const [thirdStage, setThirdStage] = useState(false);
  const [rotba, setRotba] = useState(0);
  const [oskof, setOskof] = useState(0);
  const [resamaYear, setResamaYear] = useState(new Date());
  const [resamaChurch, setResamaChurch] = useState(0);
  const handleSecondStage = () => {
    setThirdStage(true);
    user.ShammasData = {
      studentRotbaShamasyalId: rotba,
      oskofElResamaId: oskof,
      resamaYear: resamaYear.getFullYear(),
      studentResamaChuruchId: resamaChurch,
    };
  };
  return (
    <div className="flex flex-col justify-center space-y-10 align-middle">
      {!thirdStage && (
        <>
          <h1 className="text-2xl">برجاء ادخال بيانات الشماس</h1>
          <div className="flex flex-row space-x-8">
            <select
              value={rotba}
              onChange={(e) => setRotba(Number(e.target.value))}
              className="w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allRotab.map((rotab: any) => (
                <option key={rotab.id} value={rotab.id}>
                  {rotab.name}
                </option>
              ))}
            </select>
            <label>رتبة الشماس</label>
          </div>
          <div className="flex flex-row space-x-8">
            <select
              value={oskof}
              onChange={(e) => setOskof(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allAsakfa.map((asakfa: any) => (
                <option key={asakfa.id} value={asakfa.id}>
                  {asakfa.name}
                </option>
              ))}
            </select>
            <label>اسم أسقف الرسامة</label>
          </div>
          <div className="flex flex-row space-x-8">
            <input
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="date"
              value={resamaYear.toString()}
              onChange={(e) => setResamaYear(new Date(e.target.value))}
            />
            <label>سنة الرسامة</label>
          </div>
          <div className="flex flex-row space-x-8">
            <select
              value={resamaChurch}
              onChange={(e) => setResamaChurch(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allChurch.map((church: any) => (
                <option key={church.id} value={church.id}>
                  {church.name}
                </option>
              ))}
            </select>
            <label>اسم الكنيسة</label>
          </div>
          <button
            onClick={handleSecondStage}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            التالي
          </button>
        </>
      )}
      {thirdStage && (
        <ThirdStage user={user} churches={allChurch} countries={allCountries} />
      )}
    </div>
  );
}

export default SecondStage;
