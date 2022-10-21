import axios from "axios";

// this will add baseUrl to all requests
//http://localhost:3000/

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
});

export default instance;
