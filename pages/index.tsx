import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
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

  // todo: this here will use the signUp Model
  //const [newUser, setNewUser] = useState<SignUpModel>({});

  // todo: this is the method for logging in the old user
  const handleOldLogin = async () => {
    const response = await loginUser(oldUserCode, oldUserPassword);
    if (response.status == 200) {
      console.log(response);
      setSignUpFlowOld(true);
      setOldUser(false);
    } else {
      alert("البيانات خطأ");
      setSignUpFlowOld(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-2 align-middle ">
      {!selectOption && (
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <Image src={logoShamamsa} alt="Logo" width={400} height={400} />
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
        <div className="flex flex-col items-center justify-center m-32 space-y-10 ">
          <Image src={logoShamamsa} alt="Logo" width={400} height={400} />
          <input
            type="number"
            placeholder="الكود"
            value={oldUserCode}
            onChange={(e) => setOldUserCode(Number(e.target.value))}
            className="px-4 py-2 text-right border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="كلمة السر"
            value={oldUserPassword}
            onChange={(e) => setOldUserPassword(e.target.value)}
            className="px-4 py-2 text-right border border-gray-300 rounded"
          />
          <button
            onClick={handleOldLogin}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            دخول
          </button>
        </div>
      )}
      {signUpFlowOld && (
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <FirstStage
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
