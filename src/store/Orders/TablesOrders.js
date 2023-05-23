import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"

export const OrderStore = defineStore('counter', () => {
    const order = ref("")
    
    const listOrders = (async () => {
        console.log("listOrders")
        try {
          return await requestAxios.get("/pedido");
        } catch (error) {
          console.log(error);
        }
      })

      const newOrder =  (async (documento, telefono, tipoPanela, cantidad, comprobantePago,saldopendiente,nombre,direccion,formaPanela,tipoEmpaque,abono,valorTotal) => {
        try {
          return await requestAxios.post(
            `/pedido`,         {
                Documento: documento,
                Telefono: telefono,
                TipoPanela: tipoPanela,
                Cantidad: cantidad,
                ComprobantePago:comprobantePago ,
                SaldoPendiente: saldopendiente,
                Nombre: nombre,
                Direccion: direccion,
                FormaPanela: formaPanela,
                TipoEmpaque: tipoEmpaque,
                Abono: abono,
                ValorTotal: valorTotal
            }
          );
        } catch (error) {
          console.log(error);
        }
      })
    
      const putOrder =  (async (id,documento, telefono, tipoPanela, cantidad, comprobantePago,saldopendiente,nombre,direccion,formaPanela,tipoEmpaque,abono,valorTotal) =>{
        try {
          return await requestAxios.post(
            `/pedido/editar/${id}`,
            {
              Documento: documento,
              Telefono: telefono,
              TipoPanela: tipoPanela,
              Cantidad: cantidad,
              ComprobantePago:comprobantePago ,
              SaldoPendiente: saldopendiente,
              Nombre: nombre,
              Direccion: direccion,
              FormaPanela: formaPanela,
              TipoEmpaque: tipoEmpaque,
              Abono: abono,
              ValorTotal: valorTotal
            }
          );
        } catch (error) {
          console.log(error);
        }
      })
    
      async function active(id, estado) {
        try {
          return await requestAxios.put(
            `/pedido/update/state/${id}`,
            { state: estado }
          ); //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    
      return { listOrders, newOrder, putOrder, active, order };
    });
    