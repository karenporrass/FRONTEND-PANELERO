import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from 'vue';
import {requestAxios} from "../../Global/axios.js"

export const payStore = defineStore("counter", () => {
  const Pay = ref("");

  const listPays = computed(async () => {
    console.log("listPays")
    try {
      return await requestAxios.get("/");
    } catch (error) {
      console.log(error);
    }
  })

  const newPays = computed (async (documen, rol, concept, methodPay, time) => {
    try {
      return await requestAxios.post(
        `/payments`,         {
          DNI: documen,
          ROl: rol,
          CONCEPT: concept,
          PAYMENT_METHOD: methodPay,
          TIME_TO_PAY: time,
        }
      );
    } catch (error) {
      console.log(error);
    }
  })

  const putPays = computed (async (id, documen, rol, concept, methodPay, time) =>{
    try {
      return await requestAxios.post(
        `/update/${id}`,
        {
          DNI: documen,
          ROl: rol,
          CONCEPT: concept,
          PAYMENT_METHOD: methodPay,
          TIME_TO_PAY: time,
        }
      );
    } catch (error) {
      console.log(error);
    }
  })

  async function active(id, estado) {
    try {
      return await requestAxios.put(
        `/state/${id}`,
        { state: estado }
      ); //asi es como se pasa por el body el state es como se llama en el backend y estado es el nombre de mi variable que le puse en la funcion
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return { listPays, newPays, putPays, active, Pay };
});
