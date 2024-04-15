import axios from "axios";

const API = {};
const BASE_URL = "https://api.realworld.io/api";



API.getArticlesOfFollowed = async (page, limit, token) => {
  try {
    const config = {
      headers: {
        Authorization: "Token " + token,
      },
    };
    const res = await axios.get(BASE_URL + `/articles/feed?offset=${(page - 1) * limit}&limit=${limit}`, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export default API;