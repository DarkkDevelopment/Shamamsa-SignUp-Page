import { MuiOtpInput } from "mui-one-time-password-input";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import { EmailStage } from "./EmailStage";
import { SignUpModel } from "../models/signUpModel";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const MobileStage = (props: any) => {
  const [emailStage, setEmailStage] = useState(false);
  const nationalImage = props.nationalImage;
  const studentImage = props.studentImage;
  const photos = props.photos;
  const app = initializeApp(firebaseConfig);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const ourUser: SignUpModel = props.user;

  const auth = getAuth();
  auth.languageCode = "ar";
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  let appVerifier: RecaptchaVerifier;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
      },
      auth
    );
  }, [auth])

  const onSignInSubmit = () => {
    if (!phoneNumber) {
      Swal.fire({
        icon: "error",
        text: "برجاء ادخال رقم هاتفك",
      });
      return;
    }
    let number = `+2${phoneNumber}`;
    // const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult: any) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmationResult(confirmationResult);
        setClicked(true);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "تم ارسال رمز التحقق بنجاح",
          showConfirmButton: false,
        });
        // ...
      })
      .catch((error: any) => {
        // Error; SMS not sent
        // ...
        Swal.fire({
          icon: "error",
          text: "حدث خطأ ما اثناء ارسال رمز التحقق برجاء المحاوله مره اخري بعد قليل",
        });
      });
  };
  return (
    <div>
      {!emailStage && (
        <>
          <div className="flex flex-col items-center justify-between">
            <TextField
              id="outlined-basic"
              label="رقم الهاتف"
              variant="outlined"
              style={{
                width: "100%",
                textAlign: "right",
                justifyContent: "flex-end",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              error={phoneNumber.length < 10}
            />
        <div id="recaptcha-container" className="my-4"></div>

            {
              !clicked && (
                <>
                  <Button
                    variant="contained"
                    id="sign-in-button"
                    onClick={onSignInSubmit}
                    sx={{ marginBottom: "1rem", borderRadius: "0.5rem" }}
                  >
                    ارسال رمز التحقق
                  </Button>
                </>
              )
            }
          </div>
          <div className="flex flex-col items-center justify-between">
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


            <Button
              variant="contained"
              sx={{ marginBottom: "1rem", borderRadius: "0.5rem" }}
              onClick={() => {
                confirmationResult
                  .confirm(otp)
                  .then((result: { user: any }) => {
                    // User signed in successfully.
                    const user = result.user;
                    // ...
                    console.log(user);
                    setEmailStage(true);
                    ourUser.mobileNumber = phoneNumber;
                  })
                  .catch((error: any) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                    console.log(error);
                  });
              }}
            >
              تأكيد
            </Button>
          </div>
        </>
      )}
      {emailStage && (
        <div>
          <EmailStage
            nationalImage={nationalImage}
            studentImage={studentImage}
            user={ourUser}
            photos={photos}
          />
        </div>
      )}
    </div>
  );
};
