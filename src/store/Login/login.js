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
  

  async function newLogin(dataUser) {
      try {
          const response =  await requestAxios.post(`/login`,dataUser)
          const decoded = jwt_decode(response.data.token);
          token.value = response.data.token
          console.log(token.value);
         console.log(decoded);
          rol.value = decoded.rol 
          user.value = decoded.user
          console.log(decoded.user);
          notifySuccess('Logeado correctamente');
          return response


        } catch (error) {
          console.log('errrrr',error);
          notifyError(error.response.data.errors);
          throw new Error(error)

        }
    }
    // async function putLogin(id) {
    //   try {
    //       return await requestAxios.post(`/login/update/${id}`,{
    //           id: id
    //       })
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }


  return {  newLogin, login, token,rol } },
  {
    persist: true,
  },);
