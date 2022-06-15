import axios from 'axios'

const url = 'http://localhost:8080/'

const instance = axios.create({
  baseURL: url,
})

// instance.interceptors.request.use(function (req) {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.authorization = `Bearer ${token}`;
//     return req;
//   }

//   return req;
// });

export default instance
