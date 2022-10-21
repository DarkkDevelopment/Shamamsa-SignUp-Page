import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import FirstStage from "../components/firstStage";
import { SignUpModel } from "../models/signUpModel";
import logoShamamsa from "../public/logo-deacon.jpg";
import loginUser from "../services/login";

const Home: NextPage = () => {
  const [oldUser, setOldUser] = useState(false);
  const [signUpFlowNew, setSignUpFlowNew] = useState(false);
  const [signUpFlowOld, setSignUpFlowOld] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [oldUserCode, setOldUserCode] = useState(0);
  const [oldUserPassword, setOldUserPassword] = useState("");
  const router = useRouter();

  // todo: this here will use the signUp Model
  //const [newUser, setNewUser] = useState<SignUpModel>({});

  // todo: this is the method for logging in the old user
  const handleOldLogin = async () => {
    const response = await loginUser(oldUserCode, oldUserPassword);
    if (response) {
      console.log(response);
      setSignUpFlowOld(true);
      setOldUser(false);
    } else {
      alert("البيانات خطأ");
      setSignUpFlowOld(false);
    }
  };
  return (
    <div className="container">
      {!selectOption && (
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <Image src={logoShamamsa} alt="Logo" width={400} height={400} />
          <button
            onClick={() => {
              setOldUser(true);
              setSignUpFlowNew(false);
              setSelectOption(true);
            }}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            كنت في مدرسة الشمامسة
          </button>
          <button
            onClick={() => {
              setSignUpFlowNew(true);
              setOldUser(false);
              setSelectOption(true);
            }}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            جديد في مدرسة الشمامسة
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
          <FirstStage old={true}></FirstStage>
        </div>
      )}

      {signUpFlowNew && (
        <div className="flex flex-col items-center justify-center m-32 space-y-10">
          <FirstStage old={false}></FirstStage>
        </div>
      )}
    </div>
  );
};

export default Home;
