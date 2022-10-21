import { FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React from "react";

function FirstStage(props: any) {
  return (
    <div className="flex flex-col justify-center space-y-2 align-middle">
      <h2 className="mb-4 text-xl font-bold text-center ">
        برجاء ادخال البيانات
      </h2>
      <FormLabel component="legend">الاسم الرباعي</FormLabel>
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
      <FormLabel component="legend">تاريخ الميلاد </FormLabel>
      <input
        type="date"
        style={{
          width: "100%",
          border: "1px solid #ccc",
        }}
      />
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{
            textAlign: "right",
            justifyContent: "flex-end",
            fontSize: "1.2rem",
          }}
        >
          الجنس
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={1}
          name="radio-buttons-group"
        >
          <FormControlLabel value={2} control={<Radio />} label="أنثي" />
          <FormControlLabel value={1} control={<Radio />} label="ذكر" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{
            textAlign: "right",
            justifyContent: "flex-end",
            fontSize: "1.2rem",
          }}
        >
          شماس
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={true}
          name="radio-buttons-group"
        >
          <FormControlLabel value={true} control={<Radio />} label="نعم" />
          <FormControlLabel value={false} control={<Radio />} label="لا" />
        </RadioGroup>
      </FormControl>
      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
        <option value="volvo">ابتدائي</option>
      </select>
      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
        <option value="volvo">أولي</option>
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
      <label>صورة الرقم القومي</label>
      <input
        type="file"
        style={{
          width: "100%",
          border: "1px solid #ccc",
        }}
      />
      <label>الصورة الشخصية</label>
      <input
        type="file"
        style={{
          width: "100%",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default FirstStage;
