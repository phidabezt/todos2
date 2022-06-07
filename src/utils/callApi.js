import axios from "axios";
import * as Config from "../constants/config";

const callApi = (endpoint, method = "GET", body) => {
  try {
    return axios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
};

export default callApi;
