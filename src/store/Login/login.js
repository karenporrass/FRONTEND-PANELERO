import { defineStore } from 'pinia'
import {ref} from "vue"
import jwt_decode from "jwt-decode";
import {requestAxios} from "../../Global/axios.js"

export const LoginStore = defineStore('counter', () => {
  const login = ref("")
  const token = ref()
  const rol = ref()
  
  function getToken(token) {
   this.token = token
  }

  async function newLogin(dataUser) {
      try {
          const response =  await requestAxios.post(`/login`,dataUser)
          const decoded = jwt_decode(response.data.token);
          token.value = response.data.token
          rol.value = decoded.rol 
          
          return response

        } catch (error) {
          console.log('errrrr',error);
          throw new Error(error)
        }
    }
    async function putLogin(id) {
      try {
          return await requestAxios.post(`/login/update/${id}`,{
              id: id
          })
        } catch (error) {
          console.log(error);
        }
    }


  return {  newLogin, putLogin, login, getToken } },
  {persist:true});
