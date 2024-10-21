import { useRouter } from "vue-router"
import { ref } from "vue"

export const funciones = () => {
  const router = useRouter()
  const contraseña = ref('') // Almacena el valor de la contraseña original
  
    
  const enviar_login = () => {
    router.push("/login")
  }
  const enviar_registro = () => {
    router.push("/registro")
  }
  const enviar_datos = () => {
    
  }
  const cambiar_estado = (entrada) => {
    entrada.ver = !entrada.ver; // Cambia el estado de 'ver'
    entrada.tipo = entrada.ver ? "text" : "password" // Cambia el tipo de input
  }

  const reglas_usuario = [
    (val) => (val && val.length > 0 ) || "Ingrese un nombre de usuario"
            
  ]

  const reglas_correo = [
    (val) => (val && /.+@.+\..+/.test(val)) || "Correo inválido"
   ]

  const reglas_contra = [
    (val) => {
      contraseña.value = val // Almacena el valor de la contraseña
      return (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres"; // Verifica la longitud
    },
    (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
    (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
    (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
    (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial"
   
  ]

  const reglas_repetir_contra = [
    (val) => (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
    (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
    (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
    (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
    (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial",
    (val) => (val === contraseña.value) || "Las contraseñas no coinciden" // Comparar con el campo de Contraseña
  ]

  const validar_usuario =()=>{
    
  }

  return {
    enviar_login,
    enviar_registro,
    cambiar_estado,
    enviar_datos,
    reglas_usuario,
    reglas_correo,
    reglas_contra,
    reglas_repetir_contra,
    validar_usuario
  }
}
