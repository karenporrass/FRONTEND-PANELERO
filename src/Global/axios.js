import axios from "axios";

const requestAxios = axios.create({
    baseURL: "https://localhost:3500/"
});

// https://project-panelero.onrender.com

export {requestAxios}
