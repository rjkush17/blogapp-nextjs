import { jwtDecode } from "jwt-decode";

const useDecodeJWT = (token) => {

  if (!token) {
    console.log("No token available");
    return null;
  }else{
    const decoded = jwtDecode(token);
    return decoded;
  }
};

export default useDecodeJWT;
