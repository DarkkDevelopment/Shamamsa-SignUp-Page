import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import LastStage from "./lastStage";
type Props = {};

export const EmailStage = (props: Props) => {
  const [lastStage, setLastStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
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

  const handleVerifyOTP = async () => {
    const response = await axios.post("/api/auth/verifyMailOTP", {
      otp,
      email,
    });
    if (response.status === 200) {
      console.log(response.data);
      // todo: we should here send the post request with all the data
    } else {
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
    <div className="flex flex-col items-center justify-between">
      {!lastStage && (
        <>
          <TextField
            id="outlined-basic"
            label="الايميل"
            variant="outlined"
            style={{
              width: "100%",
              textAlign: "right",
              justifyContent: "flex-end",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            onClick={handleVerifyEmail}
          >
            ارسال
          </Button>
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
          <div id="recaptcha-container"></div>
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            onClick={handleVerifyOTP}
          >
            تأكيد
          </Button>
        </>
      )}
      {lastStage && <LastStage />}
    </div>
  );
};
