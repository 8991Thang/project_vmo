import axiosInstance from "./create-api";
export const apiDelete = api => axiosInstance.delete(api);
export const apiGet = api => axiosInstance.get(api);
export const apiPost = (api, dataInput) => axiosInstance.post(api, dataInput);
export const apiPut = (api, dataInput) => axiosInstance.put(api, dataInput);
