import axios from "../utils/axios";
import { SignUpModel } from "../models/signUpModel";

const signUp = async (user: SignUpModel, data: FormData) => {
  try {
    console.log(user);
    console.log(data.get("nationalIdImage"));
    console.log(data.get("profileImage"));

    const response = await axios({
      method: "POST",
      url: "/api/auth/signUp",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
    console.log(response.data);
    if (response.data.status) {
      const insertImages = await axios({
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: `/api/auth/uploadNationalId/${user.code}`,
        data: {
          nationalIdImage: data.get("nationalIdImage"),
          profileImage: data.get("profileImage"),
        },
      });
      return insertImages.data;
    } else {
      console.log(response.data.data);
      return response.data;
    }
  } catch (error:any) {
    console.log(error);
    return error.response.data;

  }
};

export default signUp;
