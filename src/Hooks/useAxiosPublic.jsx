//method 1
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosPublic = () => {
  return axiosPublic;
};
export default useAxiosPublic;

//method 2
// import axios from 'axios';

// const useAxiosPublic = () => {
//   return axios.create({
//     baseURL: 'http://localhost:5000',
//   });
// };

// export default useAxiosPublic;
