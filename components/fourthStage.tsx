import { TextField } from "@mui/material";
import React from "react";
import { SignUpModel } from "../models/signUpModel";
import { MobileStage } from "./mobileStage";

function FourthStage(props: any) {
  const AllCountries = props.churches;
  const user: SignUpModel = props.user;
  const nationalImage = props.nationalImage;
  const studentImage = props.studentImage;
  const [mobileStage, setMobileStage] = React.useState(false);
  const [confessChurch, setConfessChurch] = React.useState(0);
  const [fatherconfessChurch, setFatherconfessChurch] = React.useState(0);
  const [confessName, setConfessName] = React.useState("");
  const [confessMobile, setConfessMobile] = React.useState("");
  const [fatherConfessName, setFatherConfessName] = React.useState("");
  const [fatherConfessMobile, setFatherConfessMobile] = React.useState("");

  const handleFourthStage = () => {
    setMobileStage(true);
    user.spritualData = {
      abE3trafName: confessName,
      abE3trafMobile: confessMobile,
      abE3trafChurchId: confessChurch,
      abElosraName: fatherConfessName,
      abElosraMobile: fatherConfessMobile,
      abElosraChurchId: fatherconfessChurch,
    };
  };
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
            value={confessName}
            onChange={(e) => setConfessName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="رقم موبايل أب الاعتراف"
            variant="outlined"
            fullWidth
            value={confessMobile}
            onChange={(e) => setConfessMobile(e.target.value)}
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
            value={fatherConfessName}
            onChange={(e) => setFatherConfessName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="رقم موبايل أب اعتراف الأسرة"
            variant="outlined"
            fullWidth
            value={fatherConfessMobile}
            onChange={(e) => setFatherConfessMobile(e.target.value)}
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
            onClick={handleFourthStage}
          >
            التالي
          </button>
        </>
      )}
      {mobileStage && (
        <>
          <MobileStage
            nationalImage={nationalImage}
            studentImage={studentImage}
            user={user}
          />
        </>
      )}
    </div>
  );
}

export default FourthStage;
