import axios from "../utils/axios";

export const sendImages = async (data: FormData, userCode: number) => {
  console.log(data);
  const insertImages = await axios({
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `/api/auth/uploadNationalId/${userCode}`,
    data: {
      nationalIdImage: data.get("nationalIdImage"),
      profileImage: data.get("profileImage"),
    },
  });
  if (insertImages.status === 200) {
    return insertImages.data;
  }
};
