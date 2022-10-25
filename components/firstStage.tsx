import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { SignUpModel } from "../models/signUpModel";
import { getsneen } from "../services/lookups";
import { sendImages } from "../services/sendImages";
import convertDate from "../utils/convertDate";
import validateTextArabic from "../utils/vaildateArabic";
import { validateNationalID } from "../utils/validateNationalID";
import SecondStage from "./secondStage";
import ThirdStage from "./thirdStage";

function FirstStage(props: any) {
  const [newUser, setNewUser] = useState<SignUpModel>({
    code: props.code,
    status: "OLD",
    mobileNumber: "",
    email: "",
    fixedData: {
      nationalId: "",
      firstName: "",
      secondName: "",
      thirdName: "",
      fourthName: "",
      dob: new Date(),
      gender: 0,
    },
    learningAndStatus: {
      mar7la: 0,
      sana: 0,
    },
    address: {
      apartmentNumber: 0,
      buildingNumber: 0,
      streetName: "",
      mohafza: 0,
      manteqa: 0,
      country: 0,
      landmark: "",
    },
    spritualData: {
      abE3trafChurchId: 0,
      abE3trafMobile: "",
      abE3trafName: "",
      abElosraChurchId: 0,
      abElosraMobile: "",
      abElosraName: "",
    },
  });
  const allMara7el = props.mara7el;
  const allRotab = props.rotab;
  const allAsakfa = props.asakfa;
  const allChurch = props.church;
  const allCountries = props.countries;
  const [sneen, setSneen] = useState([]);
  const [secondStage, setSecondStage] = useState(false);
  const [isShamas, setIsShamas] = useState(2);
  const [dateOfBirth, setDateOfBirth] = useState(convertDate(new Date()));
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [fourthName, setFourthName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState(0);
  const [mar7ala, setMara7ala] = useState(0);
  const [sana, setSana] = useState(0);
  // todo: those are the two images to be sent
  const [nationalIdImage, setNationalIdImage] = useState<File | null>(null);
  const [studentImage, setStudentImage] = useState<File | null>(null);
  const [ourFormData, setOurFormData] = useState(new FormData());

  // todo : this is the options we used in the first stage
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
    setMara7ala(Number(mar7alaId));
    const response = await getsneen(mar7alaId);
    setSneen(response);
  };
  // todo: this one will handle when user finished first stage and then show hime the second stage
  // todo : this will also handle adding the data inserted into our model
  const handleSubmitFirstStage = async (e: any) => {
    e.preventDefault();
    // todo : this one is to be done at the end of the flow
    // const response = await sendImages(ourFormData, Number(newUser.code));
    // todo original
    setNewUser({
      ...newUser,
      fixedData: {
        ...newUser.fixedData,
        firstName: firstName,
        secondName: secondName,
        thirdName: thirdName,
        fourthName: fourthName,
        nationalId: nationalId,
        dob: new Date(dateOfBirth),
        gender: gender,
      },
      learningAndStatus: {
        ...newUser.learningAndStatus,
        mar7la: mar7ala,
        sana: sana,
      },
    });
    setSecondStage(true);
  };
  const handleNationalImageChange = (e: any) => {
    setNationalIdImage(e.target.files[0].name);
    setOurFormData((prev) => {
      prev.append("nationalIdImage", e.target.files[0]);
      return prev;
    });
  };
  const handleStudentImageChange = (e: any) => {
    setStudentImage(e.target.files[0].name);
    setOurFormData((prev) => {
      prev.append("profileImage", e.target.files[0]);
      return prev;
    });
  };
  return (
    <div>
      {!secondStage && (
        <div className="flex flex-col justify-center space-y-2 align-middle">
          <h2 className="mb-4 text-xl font-bold text-center ">
            برجاء ادخال البيانات
          </h2>
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstName === "" || !validateTextArabic(firstName)}
            helperText={
              firstName === "" || !validateTextArabic(firstName)
                ? "الاسم الاول مطلوب و باللغة العربية"
                : ""
            }
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
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            error={secondName === "" || !validateTextArabic(secondName)}
            helperText={
              secondName === "" || !validateTextArabic(secondName)
                ? "الاسم التاني مطلوب و باللغة العربية"
                : ""
            }
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
            value={thirdName}
            onChange={(e) => setThirdName(e.target.value)}
            error={thirdName === "" || !validateTextArabic(thirdName)}
            helperText={
              thirdName === "" || !validateTextArabic(thirdName)
                ? "الاسم التالت مطلوب و باللغة العربية"
                : ""
            }
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
            value={fourthName}
            onChange={(e) => setFourthName(e.target.value)}
            error={fourthName === "" || !validateTextArabic(fourthName)}
            helperText={
              fourthName === "" || !validateTextArabic(fourthName)
                ? "الاسم الرابع مطلوب و باللغة العربية"
                : ""
            }
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            تاريخ الميلاد
          </label>
          <TextField
            type="date"
            value={dateOfBirth.toString()}
            onChange={(e) => setDateOfBirth(e.target.value)}
            error={dateOfBirth === ""}
          />
          <select
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {genderOptions}
          </select>
          <select
            value={isShamas}
            onChange={(e) => setIsShamas(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {ShamasOptions}
          </select>
          <select
            value={mar7ala}
            onChange={handleChangeMar7ala}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {mara7elOptions}
          </select>
          <select
            value={sana}
            onChange={(e) => setSana(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
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
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            error={nationalId === "" || !validateNationalID(nationalId)}
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            صورة الرقم القومي
          </label>
          <TextField
            type="file"
            value={nationalIdImage ? nationalIdImage.name : ""}
            onChange={handleNationalImageChange}
          />
          <label className="block text-sm font-medium text-right text-gray-700">
            الصورة الشخصية
          </label>
          <TextField
            type="file"
            value={studentImage ? studentImage.name : ""}
            onChange={handleStudentImageChange}
          />
          <button
            onClick={handleSubmitFirstStage}
            className="w-full px-4 py-2 mt-16 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            التالي
          </button>
        </div>
      )}
      {secondStage && isShamas === 1 && (
        <SecondStage
          countries={allCountries}
          rotab={allRotab}
          asakfa={allAsakfa}
          churches={allChurch}
          user={newUser}
          nationalImage={nationalIdImage}
          studentImage={studentImage}
          photos={ourFormData}
        />
      )}
      {secondStage && isShamas === 2 && (
        <ThirdStage
          user={newUser}
          churches={allChurch}
          countries={allCountries}
          nationalImage={nationalIdImage}
          studentImage={studentImage}
          photos={ourFormData}
        />
      )}
    </div>
  );
}

export default FirstStage;
