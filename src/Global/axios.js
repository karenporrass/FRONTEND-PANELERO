import axios from "axios";

const requestAxios = axios.create({


    baseURL: "https://proyecto-panelero.onrender.com"
    // baseURL: "http://localhost:3500"    

})
export {requestAxios}
