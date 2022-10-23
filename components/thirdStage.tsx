import { TextField } from "@mui/material";
import React from "react";
import { getCitiesByCountryId, getManateqByCityId } from "../services/lookups";
import FourthStage from "./fourthStage";

function ThirdStage(props: any) {
  const AllCountries = props.countries;
  const AllChurches = props.churches;
  const [country, setCountry] = React.useState(0);
  const [city, setCity] = React.useState(0);
  const [manteqa, setManteqa] = React.useState(0);
  const [cities, setCities] = React.useState([]);
  const [manateq, setManateq] = React.useState([]);
  const [fourthStage, setFourthStage] = React.useState(false);

  // todo: this to handle when I change the country
  const handleCountryChange = async (event: any) => {
    setCountry(event.target.value);
    const getCities = await getCitiesByCountryId(Number(event.target.value));
    const getManateq = await getManateqByCityId(Number(event.target.value));
    setManateq(getManateq);
    setCities(getCities);
  };
  // todo: this one will handle when I change city
  const handleCityChange = async (event: any) => {
    setCity(event.target.value);
    const getManateq = await getManateqByCityId(Number(event.target.value));
    setManateq(getManateq);
  };

  return (
    <div className="flex flex-col justify-center space-y-10 align-middle">
      {!fourthStage && (
        <>
          <h1 className="text-2xl">ادخل تفاصيل العنوان</h1>
          <TextField
            id="outlined-basic"
            label="رقم الشقة"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="رقم العمارة"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="الشارع "
            variant="outlined"
            fullWidth
          />
          <div className="flex flex-row space-x-8">
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
            <label>البلد</label>
          </div>
          <div className="flex flex-row space-x-8">
            <select
              value={city}
              onChange={handleCityChange}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {cities.map((city: any) => (
                <option key={city.mohafza_id} value={city.mohafza_id}>
                  {city.mohafza_name_arabic}
                </option>
              ))}
            </select>
            <label>المحافظة</label>
          </div>
          <div className="flex flex-row space-x-8">
            <select
              defaultValue={manteqa}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {manateq.map((manateq: any) => (
                <option key={manateq.manteqa_id} value={manateq.manteqa_id}>
                  {manateq.manteqa_name_arabic}
                </option>
              ))}
            </select>
            <label>المنطقة</label>
          </div>

          <TextField
            id="outlined-basic"
            label="أقرب علامة "
            variant="outlined"
            fullWidth
          />
          <button
            onClick={() => setFourthStage(true)}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            التالي
          </button>
        </>
      )}
      {fourthStage && (
        <>
          <FourthStage churches={AllChurches} />
        </>
      )}
    </div>
  );
}

export default ThirdStage;
