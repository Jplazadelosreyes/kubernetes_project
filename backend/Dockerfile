# backend/Dockerfile

# Usar una imagen base de Node.js ligera
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
# Esto ayuda a que el cache de Docker sea más eficiente si los archivos no cambian
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY src/ ./src/

# Exponer el puerto en el que la aplicación Node.js escuchará
EXPOSE 3000

# Comando para iniciar la aplicación cuando el contenedor arranque
CMD ["npm", "start"]