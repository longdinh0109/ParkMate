import axiosClient from "./axiosClient";

const partnerApi = {
  registerPartner: (data) =>
    axiosClient.post("/v1/user-service/partner-registrations", data),
};

export default partnerApi;
