import { TextField } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import { SignUpModel } from "../models/signUpModel";
import { getCitiesByCountryId, getManateqByCityId } from "../services/lookups";
import FourthStage from "./fourthStage";

function ThirdStage(props: any) {
  const AllCountries = props.countries;
  const AllChurches = props.churches;
  const user: SignUpModel = props.user;
  const nationalImage = props.nationalImage;
  const studentImage = props.studentImage;
  const photos = props.photos;
  const [cities, setCities] = React.useState([]);
  const [manateq, setManateq] = React.useState([]);
  const [fourthStage, setFourthStage] = React.useState(false);
  const [appartment, setAppartment] = React.useState(0);
  const [building, setBuilding] = React.useState(0);
  const [street, setStreet] = React.useState("");
  const [country, setCountry] = React.useState(0);
  const [city, setCity] = React.useState(0);
  const [manteqa, setManteqa] = React.useState(0);
  const [landMark, setLandMark] = React.useState("");

  // todo: this to handle when I change the country
  const handleCountryChange = async (event: any) => {
    setCountry(Number(event.target.value));
    const getCities = await getCitiesByCountryId(Number(event.target.value));
    const getManateq = await getManateqByCityId(Number(event.target.value));
    setManateq(getManateq);
    setCities(getCities);
    setCity(Number(getCities[0].mohafza_id));
    //@ts-ignore
    setManteqa(getManateq[0].manteqa_id);
  };
  // todo: this one will handle when I change city
  const handleCityChange = async (event: any) => {
    setCity(Number(event.target.value));
    const getManateq = await getManateqByCityId(Number(event.target.value));
    setManateq(getManateq);
    setManteqa(getManateq[0].manteqa_id);
  };

  // todo : this one will handle when I press next
  const handleThirdStage = () => {
    if (
      appartment == 0 ||
      building == 0 ||
      street == "" ||
      country == 0 ||
      city == 0 ||
      manteqa == 0 ||
      landMark == ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "من فضلك ادخل جميع البيانات",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setFourthStage(true);
      user.address = {
        apartmentNumber: appartment,
        buildingNumber: building,
        streetName: street,
        country: country,
        mohafza: city,
        manteqa: manteqa,
        landmark: landMark,
      };
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-4 align-middle">
      {!fourthStage && (
        <>
          <h1 className="text-2xl font-semibold text-center">
            {" "}
            تفاصيل العنوان
          </h1>
          <label className="block mb-2 text-sm font-medium text-right text-gray-700 ">
            رقم الشقة
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="رقم الشقة"
            variant="outlined"
            fullWidth
            value={appartment}
            onChange={(e) => setAppartment(Number(e.target.value))}
            error={appartment === 0}
          />
          <label className="block mb-2 text-sm font-medium text-right text-gray-700 ">
            رقم العمارة
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="رقم العمارة"
            variant="outlined"
            fullWidth
            value={building}
            onChange={(e) => setBuilding(Number(e.target.value))}
            error={building === 0}
          />
          <label className="block mb-2 text-sm font-medium text-right text-gray-700 ">
            اسم الشارع
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="الشارع "
            variant="outlined"
            fullWidth
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            error={street === ""}
          />
          <div className="flex flex-col space-y-4">
            <label>البلد</label>
            <select
              value={country}
              onChange={handleCountryChange}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="0">اختر الدولة</option>
              {AllCountries.map((country: any) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.country_name_arabic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4">
            <label>المحافظة</label>
            <select
              value={city}
              onChange={handleCityChange}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {cities.map((city: any) => (
                <option key={city.mohafza_id} value={Number(city.mohafza_id)}>
                  {city.mohafza_name_arabic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4">
            <label>المنطقة</label>
            <select
              value={manteqa}
              onChange={(e) => setManteqa(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {manateq.map((manateq: any) => (
                <option key={manateq.manteqa_id} value={manateq.manteqa_id}>
                  {manateq.manteqa_name_arabic}
                </option>
              ))}
            </select>
          </div>
          <label className="block mb-2 text-sm font-medium text-right text-gray-700 ">
            أقرب علامة
          </label>
          <TextField
            style={{
              textAlign: "right",
              direction: "rtl",
            }}
            id="outlined-basic"
            label="أقرب علامة "
            variant="outlined"
            fullWidth
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
            error={landMark === ""}
          />
          <button
            onClick={handleThirdStage}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            التالي
          </button>
        </>
      )}
      {fourthStage && (
        <>
          <FourthStage
            user={user}
            churches={AllChurches}
            nationalImage={nationalImage}
            studentImage={studentImage}
            photos={photos}
          />
        </>
      )}
    </div>
  );
}

export default ThirdStage;
