import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { getsneen } from "../services/lookups";
import SecondStage from "./secondStage";
import ThirdStage from "./thirdStage";

function FirstStage(props: any) {
  const allMara7el = props.mara7el;
  const allRotab = props.rotab;
  const allAsakfa = props.asakfa;
  const allChurch = props.church;
  const [sneen, setSneen] = useState([]);
  const [mar7ala, setMara7ala] = useState(0);
  const [secondStage, setSecondStage] = useState(false);
  // todo: this to be changed
  const [isShamas, setIsShamas] = useState(false);

  const mara7elOptionsFromDatabase = allMara7el.map((mara7el: any) => {
    return (
      <option key={mara7el.id} value={mara7el.id}>
        {mara7el.name}
      </option>
    );
  });
  const mara7elOptions = [
    <option key={0} value={0}>
      اختر مرحلة
    </option>,
    ...mara7elOptionsFromDatabase,
  ];
  const sneenOptions = sneen.map((sneen: any) => {
    return (
      <option key={sneen.id} value={sneen.id}>
        {sneen.name}
      </option>
    );
  });
  const genderOptions = [
    <option key={0} value={0}>
      اختر جنس
    </option>,
    <option key={1} value={1}>
      ذكر
    </option>,
    <option key={2} value={2}>
      انثى
    </option>,
  ];
  const ShamasOptions = [
    <option key={0} value={0}>
      شماس ام لا
    </option>,
    <option key={1} value={1}>
      نعم
    </option>,
    <option key={2} value={2}>
      لا
    </option>,
  ];
  // todo: this one will handle when I change el mar7ala
  const handleChangeMar7ala = async (e: any) => {
    const mar7alaId = e.target.value;
    setMara7ala(mar7alaId);
    const response = await getsneen(mar7alaId);
    setSneen(response);
  };
  // todo: this one will handle when user finished first stage and then show hime the second stage
  const handleSubmitFirstStage = (e: any) => {
    e.preventDefault();
    setSecondStage(true);
  };
  return (
    <div>
      {!secondStage && (
        <div className="flex flex-col justify-center space-y-2 align-middle">
          <h2 className="mb-4 text-xl font-bold text-center ">
            برجاء ادخال البيانات
          </h2>
          <label className="block text-sm font-medium text-right text-gray-700">
            تاريخ الميلاد
          </label>
          <TextField
            id="outlined-basic"
            label="الاسم الاول"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
              fontSize: "1.2rem",
            }}
          />
          <TextField
            id="outlined-basic"
            label="الاسم التاني"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
            }}
          />
          <TextField
            id="outlined-basic"
            label="الاسم التالت"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
            }}
          />
          <TextField
            id="outlined-basic"
            label="الاسم الرابع"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
              fontSize: "1.2rem",
            }}
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            style={{
              width: "100%",
              border: "1px solid #ccc",
            }}
          />
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            {genderOptions}
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            {ShamasOptions}
          </select>
          <select
            value={mar7ala}
            onChange={handleChangeMar7ala}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {mara7elOptions}
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            {sneenOptions}
          </select>
          <TextField
            id="outlined-basic"
            label="الرقم القومي"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
              fontSize: "1.2rem",
            }}
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            صورة الرقم القومي
          </label>
          <input
            type="file"
            style={{
              width: "100%",
              border: "1px solid #ccc",
            }}
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            الصورة الشخصية
          </label>
          <input
            type="file"
            style={{
              width: "100%",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSubmitFirstStage}
            className="w-full px-4 py-2 mt-16 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            التالي
          </button>
        </div>
      )}
      {secondStage && isShamas && (
        <SecondStage rotab={allRotab} asakfa={allAsakfa} churches={allChurch} />
      )}
      {secondStage && !isShamas && <ThirdStage />}
    </div>
  );
}

export default FirstStage;
