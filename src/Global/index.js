import axios from "axios";

const requestAxios = axios.create({
    baseURL: "https://project-panelero.onrender.com"
});

export {requestAxios}; 
