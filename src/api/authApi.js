import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => axiosClient.post("/auth/login", data),
  register: (data) => axiosClient.post("/auth/register", data),
  resendEmail: (email) => axiosClient.post("/auth/resend-confirm", { email }),
};

export default authApi;
