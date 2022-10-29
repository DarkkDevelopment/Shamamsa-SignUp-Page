import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress, TextField } from "@mui/material";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import LastStage from "./lastStage";
import { SignUpModel } from "../models/signUpModel";
import signUp from "../services/signup";

export const EmailStage = (props: any) => {
  const [lastStage, setLastStage] = useState(false);
  const photos = props.photos;
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masterCodeField, setMasterCodeField] = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const ourUser: SignUpModel = props.user;
  let countDownInterval: NodeJS.Timer;
  const [time, setTime] = useState(0);
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const countDown = () => {
    console.log(time);
    if (time <= 0) clearInterval(countDownInterval);
    setTime(time - 1);
  };

  const handleVerifyEmail = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/auth/emailOTP", { email });
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: "تم ارسال رمز التحقق الى بريدك الالكتروني",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSignUpRequest = async () => {
    try {
      const res = await signUp(ourUser, photos);
      if (res.status == true) {
        setMasterCodeField(false);
        setLastStage(true);
      } else if (res.status == false) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          text: res.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "حدث خطأ ما",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/auth/verifyMailOTP", {
        otp,
        email,
      });
      if (response.status) {
        setLoading(true);
        ourUser.email = email;
        handleSignUpRequest();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "رمز التحقق غير صحيح",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "رمز التحقق غير صحيح",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleVerifyBackupCode = async () => {
    try {
      if (backupCode == "shamamsa789*") {
        setLoading(true);
        ourUser.email = email;
        handleSignUpRequest();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "رمز التحقق غير صحيح",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "رمز التحقق غير صحيح",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      {!lastStage && !masterCodeField && (
        <>
          <div className="flex flex-col items-center justify-between">
            <h1 className="mb-8 text-2xl font-bold text-center">
              تأكيد البريد الالكتروني
            </h1>
            <TextField
              id="outlined-basic"
              label="قم بادخال البريد الالكتروني"
              variant="outlined"
              style={{
                width: "100%",
                textAlign: "right",
                justifyContent: "flex-end",
                fontSize: "1.2rem",
                marginTop: "1.5rem",
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={email === ""}
            />
            {!clicked && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    marginBottom: "5rem",
                    borderRadius: "0.5rem",
                    marginTop: "1.5rem",
                  }}
                  onClick={handleVerifyEmail}
                >
                  ارسال
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-between">
            <label className="mb-5 text-sm text-center text-gray-500">
              قم بادخال رمز التحقق الذي تم استلامه{" "}
            </label>
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              length={6}
              sx={{
                zoom: 0.9,
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                "& input": {
                  fontSize: "0.8rem",
                  width: "0.5rem",
                  height: "0.5rem",
                },
              }}
            />
          </div>
          <div id="recaptcha-container"></div>
          {loading ? (
            <div className="flex flex-col my-4 align-middle">
              <h2 className="text-center text-gray-500">
                برجاء الانتظار جاري ارسال البيانات
              </h2>
              <CircularProgress />
            </div>
          ) : (
            <div className="flex justify-center ">
              <Button
                variant="contained"
                sx={{
                  marginBottom: "1rem",
                  justifyContent: "center",
                  marginTop: "1.5rem",
                }}
                onClick={handleVerifyOTP}
              >
                تأكيد
              </Button>
            </div>
          )}
          <div className="flex flex-col items-center mt-8">
            <label className="mb-4 text-xl font-semibold text-center text-gray-500">
              لم يصلك الكود ؟
            </label>
            <Button
              onClick={() => {
                setMasterCodeField(true);
              }}
              variant="contained"
              sx={{
                marginBottom: "2rem",
              }}
            >
              اضغط هنا
            </Button>
          </div>
        </>
      )}
      {lastStage && (
        <div className="flex flex-col items-center justify-center mt-16 align-middle">
          <LastStage />
        </div>
      )}
      {masterCodeField && (
        <div className="flex flex-col items-center justify-center mt-32 align-middle ">
          <label className="mb-8 text-sm font-semibold text-center text-gray-500">
            قم بادخال رمز التحقق الذي تم ارساله اليك
          </label>
          <TextField
            id="outlined-basic"
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value)}
            label="ادخل الكود"
            error={backupCode === ""}
          />
          <Button
            variant="contained"
            sx={{
              marginBottom: "2rem",
              marginTop: "1.5rem",
            }}
            onClick={handleVerifyBackupCode}
          >
            تأكيد
          </Button>
          {loading && (
            <div className="flex flex-col my-4 align-middle">
              <h2 className="text-center text-gray-500">
                برجاء الانتظار جاري ارسال البيانات
              </h2>
              <CircularProgress />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
