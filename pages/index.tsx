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

const Home: NextPage = (props: any) => {
  const allMara7el = props.mara7el;
  const allRotab = props.rotab;
  const allAsakfa = props.asakfaNames;
  const allChurch = props.churchNames;
  const allCountries = props.countries;

  const [oldUser, setOldUser] = useState(false);
  const [signUpFlowOld, setSignUpFlowOld] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [oldUserCode, setOldUserCode] = useState(0);
  const [oldUserPassword, setOldUserPassword] = useState("");

  // todo: this is the method for logging in the old user
  const handleOldLogin = async () => {
    try {
      const response = await loginUser(oldUserCode, oldUserPassword);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-2 align-middle">
      {!selectOption && (
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <Image src={logoShamamsa} alt="Logo" width={150} height={150} />
          <button
            onClick={() => {
              setOldUser(true);
              setSelectOption(true);
            }}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            ادخال البيانات
          </button>
        </div>
      )}
      {oldUser && (
        <div className="flex flex-col p-10 space-y-4 text-right">
          <Image src={logoShamamsa} alt="Logo" width={400} height={400} />
          <FormLabel
            component="legend"
            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
          >
            برجاء ادخال الكود و كلمة السر
          </FormLabel>
          <TextField
            type="number"
            placeholder="الكود"
            label="الكود"
            value={oldUserCode}
            onChange={(e) => setOldUserCode(Number(e.target.value))}
            className="w-full px-4 py-2 text-right border border-gray-300 rounded"
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
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <FirstStage
            code={oldUserCode}
            rotab={allRotab}
            mara7el={allMara7el}
            asakfa={allAsakfa}
            church={allChurch}
            countries={allCountries}
            old={true}
          />
        </div>
      )}
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
