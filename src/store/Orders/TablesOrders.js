import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"


export const OrderStore = defineStore('counter', () => {
    const order = ref("")
    
    async function listOrders() {
        
        try {
          return await requestAxios.get("/pedido");
        } catch (error) {
          console.log(error);
        }
      }

      async function newOrder(documento, telefono, tipoPanela, cantidad, comprobantePago,
        nombre,direccion,formaPanela,tipoEmpaque,abono,valorTotal,token) {
        try {
          return await requestAxios.post(
            '/pedido',         {
                Documento: documento,
                Telefono: telefono,
                TipoPanela: tipoPanela,
                Cantidad: cantidad,
                ComprobantePago:comprobantePago ,
               
                Nombre: nombre,
                Direccion: direccion,
                FormaPanela: formaPanela,
                TipoEmpaque: tipoEmpaque,
                Abono: abono,
                ValorTotal: valorTotal,
                token: token
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    


      async function putOrder(id,documento, telefono, tipoPanela, cantidad, comprobantePago,nombre,direccion,formaPanela,tipoEmpaque,abono,valorTotal) { //recivir las variables 
        try {
            return await requestAxios.put(`/pedido/editar/${id}`,{
              Documento: documento,
              Telefono: telefono,
              TipoPanela: tipoPanela,
              Cantidad: cantidad,
              ComprobantePago:comprobantePago ,
              Nombre: nombre,
              Direccion: direccion,
              FormaPanela: formaPanela,
              TipoEmpaque: tipoEmpaque,
              Abono: abono,
              ValorTotal: valorTotal
            })
          } catch (error) {
            console.log(error);
          }
      }
    
      async function active(id,estado) {
        console.log("state");
        try {
          return await requestAxios.put(
            `/pedido/state/${id}`,{ state: estado });
             //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
        } catch (error) {
          console.log(error);
          console.log("actualiza");
          return error;
        }
      }
    
      return { listOrders, newOrder, putOrder, active, order } },
      {persist:true});
 
    