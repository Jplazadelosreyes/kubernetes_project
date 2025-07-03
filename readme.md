[![Despliegue de Prueba en Minikube](https://github.com/Jplazadelosreyes/kubernetes_proyect/actions/workflows/test.yml/badge.svg)](https://github.com/Jplazadelosreyes/kubernetes_proyect/actions/workflows/test.yml)
# 🚀 Aplicación Full-Stack con Kubernetes

Una aplicación web de ejemplo de tres capas diseñada para demostrar el despliegue y gestión de aplicaciones con Docker Compose y Kubernetes.

## 📖 Descripción del Proyecto

Esta aplicación implementa un sistema completo de gestión de usuarios con las siguientes capas:

- **Frontend (Vue.js)**: Interfaz de usuario interactiva con formularios y visualización de datos
- **Backend (Node.js + Express)**: API RESTful que maneja la lógica de negocio
- **Base de Datos (PostgreSQL)**: Almacenamiento persistente de datos de usuarios

## ✨ Funcionalidades

- 📝 Mostrar mensaje de bienvenida desde el backend
- 👥 Listar usuarios existentes en la base de datos
- ➕ Agregar nuevos usuarios mediante formulario
- 🔄 Actualización automática de la lista de usuarios

## 🛠️ Stack Tecnológico

### Frontend
- **Vue.js 3** - Framework JavaScript reactivo
- **Vite** - Herramienta de construcción rápida
- **Nginx** - Servidor web y proxy inverso

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web minimalista
- **pg** - Cliente PostgreSQL para Node.js

### Base de Datos
- **PostgreSQL 16** - Sistema de gestión de base de datos

### DevOps
- **Docker** & **Docker Compose** - Contenerización
- **Kubernetes** & **Minikube** - Orquestación de contenedores
- **GitHub Actions** - Integración y despliegue continuo

## 📂 Estructura del Proyecto

```
.
├── backend/                     # Código fuente del backend
│   ├── Dockerfile              # Imagen Docker del backend
│   ├── package.json            # Dependencias Node.js
│   └── src/
│       └── index.js            # Aplicación Express
├── database/
│   └── init.sql                # Script de inicialización de BD
├── frontend/                   # Código fuente del frontend
│   ├── Dockerfile              # Imagen Docker del frontend
│   ├── package.json            # Dependencias Vue.js
│   ├── nginx.conf              # Configuración proxy inverso
│   └── src/
│       ├── App.vue
│       ├── main.js
│       └── assets/
├── k8s/                        # Manifiestos Kubernetes
│   ├── configmaps/
│   │   └── postgres-initdb-config.yaml
│   ├── deployments/
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   └── postgres-deployment.yaml
│   ├── pvcs/
│   │   └── postgres-pvc.yaml
│   └── services/
│       ├── backend-service.yaml
│       ├── frontend-service.yaml
│       └── postgres-service.yaml
├── docker-compose.yaml         # Configuración Docker Compose
└── README.md
```

## 📋 Requisitos Previos

Antes de comenzar, instala las siguientes herramientas:

- [Git](https://git-scm.com/) - Control de versiones
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - Contenerización
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) - Kubernetes local
- [kubectl](https://kubernetes.io/docs/tasks/tools/) - CLI de Kubernetes
- [Node.js](https://nodejs.org/) (opcional, para desarrollo local)

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado para desarrollo)

```bash
# 1. Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO>
cd kubernetes_proyect

# 2. Levantar los servicios
docker compose up --build

# 3. Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000/api/saludo
```

Para detener los servicios:
```bash
docker compose down
```

### Opción 2: Kubernetes con Minikube

```bash
# 1. Iniciar Minikube
minikube start

# 2. Configurar entorno Docker de Minikube
eval $(minikube docker-env)

# 3. Construir imágenes Docker
docker build -t mi-app-backend:latest ./backend
docker build -t mi-app-frontend:latest ./frontend

# 4. Aplicar manifiestos Kubernetes
kubectl apply -f k8s/pvcs/postgres-pvc.yaml
kubectl apply -f k8s/configmaps/postgres-initdb-config.yaml
kubectl apply -f k8s/deployments/postgres-deployment.yaml
kubectl apply -f k8s/services/postgres-service.yaml
kubectl apply -f k8s/deployments/backend-deployment.yaml
kubectl apply -f k8s/services/backend-service.yaml
kubectl apply -f k8s/deployments/frontend-deployment.yaml
kubectl apply -f k8s/services/frontend-service.yaml

# 5. Verificar estado de los pods
kubectl get pods

# 6. Acceder a la aplicación
minikube service frontend-service --url
```

## 🔍 Verificación del Despliegue

### Docker Compose
```bash
# Verificar contenedores activos
docker compose ps

# Ver logs
docker compose logs -f
```

### Kubernetes
```bash
# Verificar deployments
kubectl get deployments

# Verificar servicios
kubectl get services

# Verificar pods
kubectl get pods

# Ver logs de un pod específico
kubectl logs <nombre-del-pod>
```

## 🧪 CI/CD con GitHub Actions

El proyecto incluye un workflow automatizado que:

- ✅ Configura un entorno Minikube
- 🔨 Construye las imágenes Docker
- 🚀 Despliega la aplicación completa
- 🔍 Ejecuta pruebas de conectividad
- 📊 Verifica el estado de los recursos

El workflow se ejecuta automáticamente en cada push y pull request a la rama `main`.

## 🔧 Comandos Útiles

### Docker
```bash
# Limpiar contenedores y volúmenes
docker compose down -v

# Reconstruir imágenes
docker compose build --no-cache

# Ver logs en tiempo real
docker compose logs -f <servicio>
```

### Kubernetes
```bash
# Aplicar todos los manifiestos
kubectl apply -f k8s/

# Eliminar recursos
kubectl delete -f k8s/

# Describir un recurso
kubectl describe pod <nombre-del-pod>

# Acceder a un pod
kubectl exec -it <nombre-del-pod> -- /bin/bash
```

### Minikube
```bash
# Ver estado del clúster
minikube status

# Abrir dashboard
minikube dashboard

# Detener Minikube
minikube stop

# Eliminar clúster
minikube delete
```

## 📚 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/saludo` | Mensaje de bienvenida |
| GET | `/api/users` | Lista todos los usuarios |
| POST | `/api/users` | Crea un nuevo usuario |

## 🔮 Próximos Pasos

- [ ] Implementar Ingress para exposición robusta
- [ ] Añadir autenticación JWT
- [ ] Configurar Secrets para manejo seguro de credenciales
- [ ] Implementar Horizontal Pod Autoscaler
- [ ] Integrar monitoreo con Prometheus/Grafana
- [ ] Añadir pruebas unitarias y de integración
- [ ] Configurar logging centralizado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Solución de Problemas

### Docker Compose
- **Error de puerto ocupado**: Cambiar puertos en `docker-compose.yaml`
- **Problemas de conexión a DB**: Verificar que PostgreSQL esté completamente iniciado

### Kubernetes
- **Pods en estado Pending**: Verificar recursos disponibles con `kubectl describe pod`
- **Imágenes no encontradas**: Asegurar que `eval $(minikube docker-env)` esté configurado
- **Servicios no accesibles**: Verificar que los puertos estén correctamente expuestos

---

⭐ Si este proyecto te ha sido útil, ¡dale una estrella en GitHub!
