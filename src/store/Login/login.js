import { defineStore } from 'pinia'
import {ref} from "vue"
import jwt_decode from "jwt-decode";
import {requestAxios} from "../../Global/axios.js"
import { notifyError, notifySuccess } from "../../Global/notify.js";


export const LoginStore = defineStore('LoginStore', () => {
  const login = ref("")
  const token = ref()
  const rol = ref()
  const user = ref()
  const email = ref()
  const dateLogin = ref()
  

  async function newLogin(dataUser) {
      try {
          const response =  await requestAxios.post(`/login`,dataUser)
          const decoded = jwt_decode(response.data.token);
          token.value = response.data.token
          dateLogin.value = new Date().toISOString();
          console.log(token.value);
         console.log(decoded);
          rol.value = decoded.rol 
          user.value = decoded.user
          email.value = decoded.email
          console.log(decoded.user);
          notifySuccess('Logeado correctamente');
          return response

        } catch (error) {
          console.log('errrrr',error);
          notifyError(error.response.data.msg);
          throw new Error(error)
        }
    }

const logoutUser= ()=>{
  token.value = ""
  rol.value = ""
  user.value = ""
  dateLogin.value = ""
  email.value = ""
  console.log(token.value, "borre token");
}



  return {  newLogin, login, token,rol, email, user, dateLogin, logoutUser } },
  {
    persist: true,
  },);
