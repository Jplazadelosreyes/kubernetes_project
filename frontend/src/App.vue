<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Cargando mensaje del backend...');
const users = ref([]); // Estado para almacenar los usuarios

// Nuevos estados para el formulario de nuevo usuario
const newUserEmail = ref('');
const newUserPassword = ref('');
const newUserName = ref('');
const newUserApellido = ref('');
const newUserRut = ref('');
const addStatusMessage = ref(''); // Mensaje para el usuario sobre el estado de la adición

// Función para cargar los usuarios (se llama al inicio y después de agregar)
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error al obtener usuarios del backend:', error);
    users.value = [{ id: 0, email: 'Error al cargar usuarios', nombre: '', apellido: '', rut: '' }];
  }
};

// Función para agregar un nuevo usuario
const addUser = async () => {
  addStatusMessage.value = 'Agregando usuario...';
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newUserEmail.value,
        password: newUserPassword.value, // En un entorno real, la contraseña debería ser hasheada en el backend
        nombre: newUserName.value,
        apellido: newUserApellido.value,
        rut: newUserRut.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const addedUser = await response.json();
    addStatusMessage.value = `Usuario "${addedUser.email}" agregado con éxito. Recarga la página para verlo.`;

    // Limpiar el formulario
    newUserEmail.value = '';
    newUserPassword.value = '';
    newUserName.value = '';
    newUserApellido.value = '';
    newUserRut.value = '';

    // Opcional: Si quisieras que se vea inmediatamente sin recargar, podrías hacer:
    // fetchUsers();

  } catch (error) {
    console.error('Error al agregar usuario:', error);
    addStatusMessage.value = `Error al agregar usuario: ${error.message}`;
  }
};

onMounted(async () => {
  // Obtener mensaje de saludo del backend
  try {
    const response = await fetch('/api/saludo');
    const data = await response.json();
    message.value = data.message;
  } catch (error) {
    console.error('Error al conectar con el backend para saludo:', error);
    message.value = 'Error al cargar el mensaje del backend.';
  }

  // Obtener lista de usuarios al cargar la página
  fetchUsers();
});
</script>

<template>
  <div>
    <h1>¡Bienvenido a tu App Vue!</h1>
    <p>{{ message }}</p>

    <h2>Agregar Nuevo Usuario</h2>
    <form @submit.prevent="addUser" style="margin-bottom: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; display: inline-block; text-align: left;">
      <div style="margin-bottom: 10px;">
        <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
        <input type="email" id="email" v-model="newUserEmail" required style="width: 250px; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
      <div style="margin-bottom: 10px;">
        <label for="password" style="display: block; margin-bottom: 5px;">Contraseña:</label>
        <input type="password" id="password" v-model="newUserPassword" required style="width: 250px; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
      <div style="margin-bottom: 10px;">
        <label for="nombre" style="display: block; margin-bottom: 5px;">Nombre:</label>
        <input type="text" id="nombre" v-model="newUserName" style="width: 250px; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
      <div style="margin-bottom: 10px;">
        <label for="apellido" style="display: block; margin-bottom: 5px;">Apellido:</label>
        <input type="text" id="apellido" v-model="newUserApellido" style="width: 250px; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
      <div style="margin-bottom: 20px;">
        <label for="rut" style="display: block; margin-bottom: 5px;">RUT:</label>
        <input type="text" id="rut" v-model="newUserRut" style="width: 250px; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
      <button type="submit" style="background-color: #42b983; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Agregar Usuario</button>
      <p v-if="addStatusMessage" style="margin-top: 10px; font-weight: bold;">{{ addStatusMessage }}</p>
    </form>

    <h2>Listado de Usuarios</h2>
    <div v-if="users.length > 0">
      <ul style="list-style-type: none; padding: 0;">
        <li v-for="user in users" :key="user.id" style="margin-bottom: 10px; border: 1px solid #ccc; padding: 10px; border-radius: 8px;">
          <strong>ID:</strong> {{ user.id }}<br>
          <strong>Email:</strong> {{ user.email }}<br>
          <strong>Nombre:</strong> {{ user.nombre }} {{ user.apellido }}<br>
          <strong>RUT:</strong> {{ user.rut }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No se encontraron usuarios o están cargando...</p>
    </div>
  </div>
</template>

<style scoped>
div {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

h2 {
  color: #35495e; /* Azul oscuro de Vue */
  margin-top: 40px;
}
</style>
