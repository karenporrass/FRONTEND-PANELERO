import { defineStore } from 'pinia'
import {ref} from "vue"
import axios from "axios"

export const usersStore = defineStore('counter', () => {
    const user = ref("")
    
    async function listUsers() {
      try {
        return await axios.get("https://project-panelero.onrender.com/usuarios")
      } catch (error) {
        console.log(error);
      }
    }
    async function newUsers(names, lastNames,typeDocument, numberDocument, rol,cel, address, email) {
        try {
            return await axios.post(`https://project-panelero.onrender.com/usuarios`,{
             names: names,
             lastNames: lastNames,
             typeDocument: typeDocument,
             numberDocument: numberDocument,
             rol: rol,
             cel: cel,
             address: address,
             email: email,
             password: numberDocument
            })
          } catch (error) {
            console.log(error);
          }
      }

    async function active(id, estado){
      try {
        return await axios.put(`https://project-panelero.onrender.com/usuarios/state/${id}`, {state:estado}) //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
      } catch (error) {
        console.log(error);
        return error
      }
    }
  
    return { listUsers, user, active, newUsers }
  })