import axios, { AxiosError, AxiosResponse } from "axios";

const permToken = process.env.TOKEN as string;
const phoneID = process.env.USA_PHONE_ID as string;
const facebookAxios = axios.create({
  baseURL: "https://graph.facebook.com/v15.0/" + phoneID + "/messages",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${permToken}`
  }
});

// Step-2: Create request, response & error handlers
// const requestHandler = request => {
//     // Token will be dynamic so we can use any app-specific way to always
//     // fetch the new token before making the call
//     request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwibmFtZSI6IlNhbXBsZSIsImlhdCI6MTUxNjIzODIzfQ.ZEBwz4pWYGqgFJc6DIi7HdTN0z5Pfs4Lcv4ZNwMr1rs';

//     return request;
// };

// const responseHandler = (response: AxiosResponse) => {
//   if (response.status === 401) {
//     //ToDo action of unauthorized
//   }

//  // return response;
// };

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

facebookAxios.interceptors.response.use(onResponse, onResponseError);

export default facebookAxios;
