import axios from "axios";

const instance = axios.create({
  baseURL: 'https://eshop-deve.herokuapp.com/api/v2',
});

export default instance;