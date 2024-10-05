<template>
  <q-layout>
    <q-page-container class="row justify-center">
      <Login class="col-12" v-if="!login"/>
      <router-view class="col-12" v-if="login"/>
      <div class="coso">
        <h1 class="coso2">{{ el_mensaje }}</h1>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'
import Login from '../components/Login.vue'

const el_mensaje = ref(null)
const login = ref(false)
const socket = ref(null)  // Para almacenar la conexión de Socket.IO

defineOptions({
  name: 'MainLayout'
})

// Conectar a Socket.IO cuando el componente se monta
onMounted(() => {
  socket.value = io('http://localhost:80') // Ajusta la URL si es necesario
  el_mensaje.value = localStorage.getItem("id")
  // Escuchar mensajes del servidor
     if(el_mensaje.value === null){
       socket.value.on('generar_id', (mensaje) => {
          localStorage.setItem("id", mensaje)
          //socket.value.emit('id', el_mensaje.value)
          el_mensaje.value = localStorage.getItem("id")
       })
     }
     

  // Enviar un mensaje al servidor después de la conexión
  
})

// Desconectar de Socket.IO cuando el componente se desmonta
/*onBeforeUnmount(() => {
 /* if (socket.value) {
    socket.value.disconnect()
    console.log('Desconectado de Socket.IO')
  }
})*/

</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .coso{
    width: 60%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    z-index: 1;
  }
  .coso2{
    padding: 40px;
    backdrop-filter: blur(40px);
     background-color: rgba(255, 255, 255, 0.3);
     box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
     box-shadow: 3px 3px 8px rgb(9, 66, 127);
  }
  .coso h1{
    font-size: 3rem;
  }
</style>
