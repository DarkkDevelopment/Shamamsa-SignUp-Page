import axios from "../utils/axios";

const loginUser = async (code: number, password: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/validateOldSignUp",
      data: {
        code: code,
        password: password,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export default loginUser;
