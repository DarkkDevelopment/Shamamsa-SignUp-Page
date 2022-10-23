import { TextField } from "@mui/material";
import React from "react";
import LastStage from "./lastStage";
import { MobileStage } from "./mobileStage";

function FourthStage(props: any) {
  const AllCountries = props.churches;
  const [mobileStage, setMobileStage] = React.useState(false);
  const [confessChurch, setConfessChurch] = React.useState(0);
  const [fatherconfessChurch, setFatherconfessChurch] = React.useState(0);
  return (
    <div className="flex flex-col justify-center space-y-10 align-middle">
      {!mobileStage && (
        <>
          <h1 className="text-2xl text-center ">بيانات أب الاعتراف</h1>
          <TextField
            id="outlined-basic"
            label="أب الاعتراف"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="رقم موبايل أب الاعتراف"
            variant="outlined"
            fullWidth
          />
          <select
            value={confessChurch}
            onChange={(e) => setConfessChurch(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="0">اختر الكنيسة</option>
            {AllCountries.map((country: any) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <TextField
            id="outlined-basic"
            label="أب اعتراف الأسرة"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="رقم موبايل أب اعتراف الأسرة"
            variant="outlined"
            fullWidth
          />
          <select
            value={fatherconfessChurch}
            onChange={(e) => setFatherconfessChurch(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="0">اختر الكنيسة</option>
            {AllCountries.map((country: any) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => setMobileStage(true)}
          >
            التالي
          </button>
        </>
      )}
      {mobileStage && (
        <>
          <MobileStage />
        </>
      )}
    </div>
  );
}

export default FourthStage;
