import { TextField } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { SignUpModel } from "../models/signUpModel";
import convertDate from "../utils/convertDate";
import ThirdStage from "./thirdStage";

function SecondStage(props: any) {
  const startYear = 1950;
  const endYear = new Date().getFullYear();
  let i = 0;
  const years = [];
  for (i = startYear; i <= endYear; i++) {
    years.push({
      name: i,
      value: i,
    });
  }
  const allRotab = props.rotab;
  const allAsakfa = props.asakfa;
  const allChurch = props.churches;
  const allCountries = props.countries;
  const images = props.photos;
  const user: SignUpModel = props.user;
  const [thirdStage, setThirdStage] = useState(false);
  const [rotba, setRotba] = useState(props.rotab[0].id);
  const [oskof, setOskof] = useState(props.asakfa[0].id);
  const [resamaYear, setResamaYear] = useState(years[0].value);
  const [resamaChurch, setResamaChurch] = useState(props.churches[0].id);

  // todo : this one will handle when I press next
  const handleSecondStage = () => {
    console.log(rotba);
    console.log(oskof);
    console.log(resamaYear);
    console.log(resamaChurch);
    if (rotba && oskof && resamaYear && resamaChurch) {
      setThirdStage(true);
      user.ShammasData = {
        studentRotbaShamasyalId: rotba,
        oskofElResamaId: oskof,
        resamaYear: resamaYear,
        studentResamaChuruchId: resamaChurch,
      };
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "من فضلك ادخل جميع البيانات",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-8 ">
      {!thirdStage && (
        <>
          <h1 className="text-lg font-semibold text-right">
            برجاء ادخال بيانات اخر رسامة
          </h1>
          <div className="flex flex-col space-y-4 text-right ">
            <label className="">رتبة الشماس</label>
            <select
              value={rotba}
              onChange={(e) => setRotba(Number(e.target.value))}
              className="w-full text-right border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allRotab.map((rotab: any) => (
                <option key={rotab.id} value={rotab.id}>
                  {rotab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4 text-right">
            <label>اسم الأسقف القائم بالرسامة</label>
            <select
              value={oskof}
              onChange={(e) => setOskof(Number(e.target.value))}
              className="w-full text-right border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allAsakfa.map((asakfa: any) => (
                <option key={asakfa.id} value={asakfa.id}>
                  {asakfa.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4 text-right">
            <label>سنة الرسامة</label>
            <select
              className="w-full text-right border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={resamaYear}
              onChange={(e) => setResamaYear(Number(e.target.value))}
            >
              {years.map((year: any) => (
                <option key={year.value} value={year.value}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4 text-right">
            <label>اسم كنيسة الرسامة</label>
            <select
              value={resamaChurch}
              onChange={(e) => setResamaChurch(Number(e.target.value))}
              className="w-full text-right border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {allChurch.map((church: any) => (
                <option key={church.id} value={church.id}>
                  {church.name}
                </option>
              ))}
            </select>
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
        <ThirdStage
          user={user}
          churches={allChurch}
          countries={allCountries}
          photos={images}
        />
      )}
    </div>
  );
}

export default SecondStage;
