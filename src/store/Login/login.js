import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const LoginStore = defineStore('counter', () => {
    const Login = ref("")
    
    async function listLogin() {
      try {
        return await axios.get("https://project-panelero.onrender.com/Login")
      } catch (error) {
        console.log(error);
      }
    }
    async function newLogin( user, password) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/Login`,{
              user: user,
              password: password
            })
          } catch (error) {
            console.log(error);
          }
      }

      async function putLogin( id, user, password) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/Login/${id}`,{
                user: user,
                password: password
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/Login/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listLogin, Login, active, newLogin, putLogin }
  })