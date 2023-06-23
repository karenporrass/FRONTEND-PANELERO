import axios from "axios";

const requestAxios = axios.create({

     baseURL: "https://proyecto-panelero.onrender.com/api"
    // baseURL: "http://localhost:3500"    

})
export {requestAxios}
