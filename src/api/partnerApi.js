import axiosClient from "./axiosClient";

const partnerApi = {
  registerPartner: (data) =>
    axiosClient.post("/api/v1/user-service/partner-registrations", data),
};

export default partnerApi;
