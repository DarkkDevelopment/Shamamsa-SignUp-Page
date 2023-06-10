import { Button, FormLabel, TextField } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import FirstStage from "../components/firstStage";
import { SignUpModel } from "../models/signUpModel";
import logoShamamsa from "../public/logo-deacon.jpg";
import loginUser from "../services/login";
import {
  getAllCountries,
  getAsakfaNames,
  getChurchNames,
  getmara7el,
  getRotab,
} from "../services/lookups";
import { validateNumbers } from "../utils/validateNumbers";

const Home: NextPage = (props: any) => {
  const allMara7el = props.mara7el;
  const allRotab = props.rotab;
  const allAsakfa = props.asakfaNames;
  const allChurch = props.churchNames;
  const allCountries = props.countries;

  const [oldUser, setOldUser] = useState(false);
  const [signUpFlowOld, setSignUpFlowOld] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [oldUserCode, setOldUserCode] = useState("");
  const [oldUserPassword, setOldUserPassword] = useState("");
  const [isOldUser, setIsOldUser] = useState(false);
  // todo: this is the method for logging in the old user
  const handleOldLogin = async () => {
    try {
      if (validateNumbers(oldUserCode)) {
        const response = await loginUser(Number(oldUserCode), oldUserPassword);
        if (response.status) {
          console.log(response);
          setSignUpFlowOld(true);
          setOldUser(false);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "برجاء ادخال البيانات بشكل صحيح",
            showConfirmButton: false,
            timer: 1500,
          });
          setSignUpFlowOld(false);
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "برجاء ادخال البيانات بشكل صحيح",
          showConfirmButton: false,
          timer: 1500,
        });
        setSignUpFlowOld(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex justify-center"
    >
      <div
      className="flex flex-col items-center justify-center p-16 m-auto space-y-8 "
      >
      <img 
      src="/logo-deacon.jpg"
      alt="Logo"
      width={200}
      height={200}
      />
            <p className="text-3xl font-bold text-center ">
      نعتذر
تم إغلاق التسجيل لنتمكن من توزيع الكورسات
 إذا لم تستطع التسجيل، فبرجاء متابعتنا علي صفحة الفيسبوك لمعرفه ميعاد التقديم الترم القادم
</p>
      </div>
      {/* {!selectOption && (
        <div className="flex flex-col items-center justify-center p-16 m-auto ">
          <Image
            style={{
              marginBottom: 10,
            }}
            src={logoShamamsa}
            alt="Logo"
            width={200}
            height={200}
          />
          <button
            onClick={() => {
              setSelectOption(true);
            }}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            ادخال البيانات
          </button>
        </div>
      )} */}
      {/* {!selectOption && (
        <div className="flex flex-col items-center justify-center p-16 m-auto space-y-8 ">
          <h1> 
            هل انت مسجل من قبل ؟
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <button
              onClick={() => {
                setOldUser(true);
                setSelectOption(true);
                setIsOldUser(true);
              }}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              نعم
            </button>
            <button
              onClick={() => {
                setSelectOption(true);
                setSignUpFlowOld(true);
                setIsOldUser(false);
              }}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              لا
            </button>
          </div>
        </div>
      )}
      {oldUser && (
        <div className="flex flex-col items-center justify-center p-16 m-auto space-y-8 ">
          <Image
            style={{
              marginBottom: 10,
            }}
            src={logoShamamsa}
            alt="Logo"
            width={200}
            height={200}
          />
          <FormLabel
            component="legend"
            style={{ fontSize: "0.8rem", fontWeight: "bold", marginBottom: 10 }}
          >
            برجاء ادخال الكود و كلمة السر
          </FormLabel>
          <TextField
            type="text"
            placeholder="الكود"
            label="الكود"
            value={oldUserCode}
            onChange={(e) => setOldUserCode(e.target.value)}
            className="w-full px-4 py-2 text-right border border-gray-300 rounded"
            error={oldUserCode.length < 1 || !validateNumbers(oldUserCode)}
          />
          <TextField
            type="password"
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            value={oldUserPassword}
            onChange={(e) => setOldUserPassword(e.target.value)}
            className="w-full text-right border border-gray-300 rounded"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#003AAD", color: "white" }}
            onClick={handleOldLogin}
            className="w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            دخول
          </Button>
        </div>
      )}
      {signUpFlowOld && (
        <div className="flex flex-col items-center justify-center p-2 space-y-10">
          <FirstStage
            code={Number(oldUserCode)}
            rotab={allRotab}
            mara7el={allMara7el}
            asakfa={allAsakfa}
            church={allChurch}
            countries={allCountries}
            old={isOldUser}
          />
        </div>
      )} */}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const AllMara7el = await getmara7el();
  const AllRotab = await getRotab();
  const AllAsakfaNames = await getAsakfaNames();
  const AllChurchNames = await getChurchNames();
  const AllCountries = await getAllCountries();
  return {
    props: {
      mara7el: AllMara7el,
      rotab: AllRotab,
      asakfaNames: AllAsakfaNames,
      churchNames: AllChurchNames,
      countries: AllCountries,
    },
  };
}

export default Home;
