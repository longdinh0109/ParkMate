import axiosClient from "./axiosClient";

const parkingLotApi = {
  getParkingLots: () => axiosClient.get("/parkinglots"),
  registerParkingLot: (data) => axiosClient.post("/parkinglots", data),
};

export default parkingLotApi;


// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

// // Lấy danh sách parking lots
// export const getParkingLots = async () => {
//   return API.get("/parkinglots");  
// };

// // Đăng ký parking lot mới
// export const registerParkingLot = async (data) => {
//   return API.post("/parkinglots", data);
// };