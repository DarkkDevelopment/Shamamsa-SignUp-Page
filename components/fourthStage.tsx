import { TextField } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import { SignUpModel } from "../models/signUpModel";
import { MobileStage } from "./mobileStage";

function FourthStage(props: any) {
  const AllCountries = props.churches;
  const user: SignUpModel = props.user;
  const nationalImage = props.nationalImage;
  const studentImage = props.studentImage;
  const photos = props.photos;
  const [mobileStage, setMobileStage] = React.useState(false);
  const [confessChurch, setConfessChurch] = React.useState(0);
  const [fatherconfessChurch, setFatherconfessChurch] = React.useState(0);
  const [confessName, setConfessName] = React.useState("");
  const [confessMobile, setConfessMobile] = React.useState("");
  const [fatherConfessName, setFatherConfessName] = React.useState("");
  const [fatherConfessMobile, setFatherConfessMobile] = React.useState("");

  const handleFourthStage = () => {
    if (
      confessChurch == 0 ||
      fatherconfessChurch == 0 ||
      confessName == "" ||
      fatherConfessName == ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "برجاء ادخال البيانات بشكل صحيح",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setMobileStage(true);
      user.spritualData = {
        abE3trafName: confessName,
        abE3trafMobile: confessMobile,
        abE3trafChurchId: confessChurch,
        abElosraName: fatherConfessName,
        abElosraMobile: fatherConfessMobile,
        abElosraChurchId: fatherconfessChurch,
      };
    }
  };
  return (
    <div className="flex flex-col justify-center space-y-4 align-middle">
      {!mobileStage && (
        <>
          <h1 className="text-2xl font-semibold text-center ">
            بيانات أب الاعتراف
          </h1>
          <label className="text-sm font-medium text-right text-gray-700 ">
            اسم أب الاعتراف
          </label>
          <TextField
            id="outlined-basic"
            label="ادخل اسم أب الاعتراف  "
            variant="outlined"
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            fullWidth
            value={confessName}
            onChange={(e) => setConfessName(e.target.value)}
            error={confessName === ""}
          />
          <label className="text-sm font-medium text-right text-gray-700 ">
            رقم موبايل أب الاعتراف
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="رقم موبايل أب الاعتراف (اختياري)"
            variant="outlined"
            fullWidth
            value={confessMobile}
            onChange={(e) => setConfessMobile(e.target.value)}
          />
          <label className="text-sm font-medium text-right text-gray-700 ">
            كنيسة أب الاعتراف
          </label>
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
          <label className="text-sm font-medium text-right text-gray-700 ">
            اسم أب الأسرة
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="ادخل اسم أب الأسرة "
            variant="outlined"
            fullWidth
            value={fatherConfessName}
            onChange={(e) => setFatherConfessName(e.target.value)}
            error={fatherConfessName === ""}
          />
          <label className="text-sm font-medium text-right text-gray-700 ">
            رقم موبايل أب الأسرة
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="رقم موبايل أب  الأسرة (اختياري)"
            variant="outlined"
            fullWidth
            value={fatherConfessMobile}
            onChange={(e) => setFatherConfessMobile(e.target.value)}
          />
          <label className="text-sm font-medium text-right text-gray-700 ">
            كنيسة أب الأسرة
          </label>
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
            photos={photos}
          />
        </>
      )}
    </div>
  );
}

export default FourthStage;
