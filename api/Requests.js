import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const GetRequest = async (endPoint) => {
  const request = await axios.get(BASE_URL + endPoint);
  console.log("end point: ", endPoint);
  return request;
}

export const PostRequest = async (endPoint,requestBody) => {
  axios.post(endPoint ,requestBody).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
  })
}