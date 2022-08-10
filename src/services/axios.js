import axios from 'axios';

export default axios.create({
   /*  baseURL: `http://localhost:3031`  */
  baseURL: `https://projectberlin-backend.herokuapp.com/`  
});