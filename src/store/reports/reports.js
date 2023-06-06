import { defineStore } from 'pinia'
import {ref} from "vue"
import {requestAxios} from "../../Global/axios.js"


// listar pedidos 
 
export const OrderStore = defineStore('counter', () => {
    
    async function listOrders() {
        
        try {
          return await requestAxios.get("/pedido");
        } catch (error) {
          console.log(error);
        }
      }     
  
      
      return { listOrders } },
      {persist:true});
 
// listar costos/pago mensual 

export const monthlyStore = defineStore("counter", () => {
    const monthly = ref("");
  
  
    async function listMonthly() {
      console.log("listMonthly")
      try {
        return await requestAxios.get("/monthlyExpenses")
      } catch (error) {
        console.log(error);
      }
    }
    return { listMonthly } },
    {persist:true});
  



// listar costos/pago ocasionales
export const OccasionalStore = defineStore("counter", () => {
  const Occasional = ref("");


  async function listOccasional() {
    console.log("listOccasional")
    try {
      return await requestAxios.get("/occasionalExpenses")
    } catch (error) {
      console.log(error);
    }
  }

  return { listOccasional } },
  {persist:true});


  // listar costos/pago 

  export const payStore = defineStore("payStore", () => {
    const Pay = ref("");
  
  
    async function listPays() {
      console.log("listPays")
      try {
        return await requestAxios.get("/payments")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPays } },
    {persist:true});
  
// listar inventario 

// brands 

export const BrandsStore = defineStore("counter", () => {
    const brands = ref("");
  
  
    async function listPBrands() {
      console.log("listBrands")
      try {
        return await requestAxios.get("/brands")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPBrands } },
    {persist:true});
  

    // category 
    export const CategoryStore = defineStore("CategoryStore", () => {
        const Category = ref("");
      
      
        async function listCategory() {
          console.log("listCategory")
          try {
            return await requestAxios.get("/category")
          } catch (error) {
            console.log(error);
          }
        }
        return { listCategory } },
        {persist:true});

// product 
export const productStore = defineStore("productStore", () => {
    const product = ref("");
  
  
    async function listProduct() {
      console.log("listProduct")
      try {
        return await requestAxios.get("/product")
      } catch (error) {
        console.log(error);
      }
    }
    return { listProduct } },
    {persist:true});

// vault 
export const vaultStore = defineStore("vaultStore", () => {
    const vault = ref("");
  
  
    async function listVault() {
      console.log("listPays")
      try {
        return await requestAxios.get("/cellars")
      } catch (error) {
        console.log(error);
      }
    }
    return { listVault } },
    {persist:true});

// listar mantenimiento 

// eps 
export const epsStore = defineStore('epsStore', () => {
    const eps = ref("")
    
    async function listEps() {
      try {
        return await requestAxios.get("/eps/all")
      } catch (error) {
        console.log(error);
      }
    }    
    return { listEps } },
    {persist:true});

// farmRegistry 
export const farmRegistryStore = defineStore('farmRegistryStore', () => {
    const farm = ref("")
    
    async function listFarms() {
      try {
        return await requestAxios.get("/registroFinca/all")
      } catch (error) {
        console.log(error);
      }
    }   
    return { listFarms } },
    {persist:true});

// lots 
export const lotsStore = defineStore('lotsStore', () => {
    const lots = ref("")
    
    async function listlots() {
      try {
        return await requestAxios.get("/lotes/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listlots } },
    {persist:true});

// measurementUnits 

export const unitsStore = defineStore('unitsStore', () => {
    const unit = ref("")
    
    async function listUnits() {
      try {
        return await requestAxios.get("/unidadesMedida/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listUnits } },
    {persist:true});

// PaymentMethod 
export const paymentStore = defineStore('paymentStore', () => {
    const payment = ref("")
    
    async function listPayments() {
      try {
        return await requestAxios.get("/metodoPago/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPayments } },
    {persist:true});

// stages 
export const stagesStore = defineStore('stagesStore', () => {
    const stage = ref("")
    
    async function listStages() {
      try {
        return await requestAxios.get("/etapas/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listStages } },
    {persist:true});

// TypeDocument 

export const documentStore = defineStore('documentStore', () => {
    const document = ref("")
    
    async function listDocuments() {
      try {
        return await requestAxios.get("/tipoDocumento/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listDocuments } },
    {persist:true});

// TypePackage 
export const packagingStore = defineStore('packagingStore', () => {
    const packaging = ref("")
    
    async function listPackaging() {
      try {
        return await requestAxios.get("/tipoEmpaque/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPackaging } },
    {persist:true});

// TypePanela 
export const panelaStore = defineStore('panelaStore', () => {
    const panela = ref("")
    
    async function listPanela() {
      try {
        return await requestAxios.get("/tipoPanela/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPanela } },
    {persist:true});


// TypePay 
export const typePayStore = defineStore('typePayStore', () => {
    const pay = ref("")
    
    async function listTypePay() {
      try {
        return await requestAxios.get("/tipoPago/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listTypePay } },
    {persist:true});

// TypeWork 
export const workStore = defineStore('workStore', () => {
    const work = ref("")
    async function listWork() {
      try {
        return await requestAxios.get("/tipoLabor/all")
      } catch (error) {
        console.log(error);
      }
    }
    return { listWork } },
    {persist:true});


// Listar transformacion 

// dailyProcess 

export const useDailyStore = defineStore('Daily', () => {
    
    const getDaily = async () =>{
      try {
        return await requestAxios.get("/procesoDiario/dailyProcess"
      
        );
      } catch (error) {
        console.log(error);
        return error
      }
    }
    return { getDaily } },
    {persist:true});

// packed 

export const usePackedStore = defineStore('usePackedStore', () => {
    
    const listPacked = async()=> {
      try {
        return await requestAxios.get("/empacados/packed")
      } catch (error) {
        console.log(error);
      }
    }
    return { listPacked } },
    {persist:true});

// TransformedRawMaterial 
export const storeTransformed = defineStore('storeTransformed', () => {
    
    const listTransformed = async ()=>{
      try {
        return await requestAxios.get("/materiaTransformada/transformed"
        );
      } catch (error) {
        console.log(error);
        return error
      }
    }
    return { listTransformed } },
    {persist:true});
