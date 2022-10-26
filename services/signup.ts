import axios from "../utils/axios";
import { SignUpModel } from "../models/signUpModel";

const signUp = async (user: SignUpModel, data: FormData) => {
  const response = await axios({
    method: "post",
    url: "/api/auth/signUp",
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  });
  console.log(response);
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
    if (insertImages.status === 200) {
      return insertImages.data;
    }
  }
};

export default signUp;
