import axios from "../utils/axios";
import { SignUpModel } from "../models/signUpModel";

const signUp = async (
  user: SignUpModel,
  nationalIdImage: string,
  profileImage: string
) => {
  // todo: this will handle creating a new user and another request for saving the files of their pictures
  const response = await axios({
    method: "post",
    url: "/api/auth/signUp",
    data: {
      user,
    },
  });
  if (response) {
    const insertImages = await axios({
      method: "post",
      url: `/api/auth/uploadNationalId/${user.code}`,
      data: {
        nationalIdImage: nationalIdImage,
        profileImage: profileImage,
      },
    });
    if (insertImages) {
      return response;
    }
  }
};

export default signUp;
