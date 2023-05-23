import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const LoginStore = defineStore('counter', () => {
  const login = ref("")
  
  async function listLogin() {
    try {
      return await requestAxios.get("/login")
    } catch (error) {
      console.log(error);
    }
  }
  async function newLogin(name, attentionLine) {
      try {
          return await requestAxios.post(`/login`,{
              name: name,
              attentionLine: attentionLine
          })
        } catch (error) {
          console.log(error);
        }
    }
    async function putLogin(id ) {
      try {
          return await requestAxios.post(`/login/update/${id}`,{
              id: id
          })
        } catch (error) {
          console.log(error);
        }
    }

  async function active(id, estado){
    try {
      return await requestAxios.put(`/login/update/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error
    }
  }

  return { listLogin, newLogin, putLogin, active, login }
})