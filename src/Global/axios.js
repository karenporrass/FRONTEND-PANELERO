import axios from "axios";

const requestAxios = axios.create({

    baseURL: "http://localhost:3500"
    // baseURL: "https://project-panelero.onrender.com"
});

export {requestAxios}
