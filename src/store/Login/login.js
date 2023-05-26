import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const LoginStore = defineStore('counter', () => {
  const login = ref("")
  

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


  return {  newLogin, putLogin, login }
})