import { useSelector } from "react-redux";


export const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || null;
  } catch (error) {
    return null;
  }
};