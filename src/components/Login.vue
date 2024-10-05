<template>
  <div class="login row justify-center">
    <div class="uno col-4 row justify-center items-center row">
        <q-card class="tarjeta col-10 ">
        <q-card-section class="formulario row justify-center items-center">
            <q-form @submit="onSubmit" @reset="onReset" class="col-10">
            <q-input
                class="q-mb-md"
                v-for="(dato, id) in datos"
                :key="id"
                filled
                v-model="dato.valor"
                :label="dato.etiqueta"
                :type="dato.tipo"
                lazy-rules
                :rules="dato.reglas"
            />

            <q-toggle v-model="licencia" label="Acepto los términos de licencia" class="q-mb-md"/>
    
            <div class="flex flex-center">
                <q-btn label="Enviar" type="submit" color="primary" class="boton_enviar" @click.prevent="enviar"/>
            
            </div>
            </q-form>
        </q-card-section>
        </q-card>
    </div>
    <div class="imagen col-8">

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
const los_datos = ref({})
const licencia = ref(false)
const datos_finales = ref([])
const datos = ref([
  {
    id: 0,
    etiqueta: "Usuario",
    tipo: "text",
    valor: "",
    reglas: [(val) => (val && val.length > 0) || "Ingrese un nombre de usuario"],
  },
  {
    id: 1,
    etiqueta: "Contraseña",
    tipo: "password",
    valor: "",
    reglas: [
    (val) => val.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
    (val) => /[A-Z]/.test(val) || "Debe incluir al menos una letra mayúscula",
    (val) => /[a-z]/.test(val) || "Debe incluir al menos una letra minúscula",
    (val) => /\d/.test(val) || "Debe incluir al menos un número",
    (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val) || "Debe incluir al menos un carácter especial"
  ]
  }
])

const enviar = async ()=>{
    datos.value.forEach(element => {
    let etiqueta = element.etiqueta
    let valor = element.valor
    let objeto = {
      etiqueta,
      valor
    }
    datos_finales.value.push(objeto)                         
    })
  await axios.post('http://localhost/login',datos_finales.value)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
       
}
</script>

<style scoped>
.formulario{
   height: 100%;
    
}
.login {
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  left: 0;
  z-index: 1;
 
}
.uno{
    background-image: linear-gradient(rgba(18, 68, 139, 0.5), rgba(18, 68, 139, 0.5)), url("/imagenes/mensaje.png");
    background-size: 100% 50%;
    height: 100%;
}
.tarjeta {
    height: 50%;
     backdrop-filter: blur(40px);
     background-color: rgba(255, 255, 255, 0.3);
     box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
     border-radius: 5%;
}

.imagen{
   background-image: url("/imagenes/fondo.png");
    height: 100%;
}
.boton_enviar{
    width: 40%;
}
</style>
