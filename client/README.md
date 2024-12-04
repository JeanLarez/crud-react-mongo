# NODE_MONGO

## Descripción
**NODE_MONGO** es una aplicación fullstack que permite gestionar frutas mediante una API desarrollada con Node.js, Express y MongoDB en el backend, y una interfaz construida con React en el frontend.

La aplicación incluye las siguientes funcionalidades:
- Listar frutas disponibles.
- Buscar frutas por ID, nombre o importe.
- Agregar nuevas frutas.
- Editar frutas existentes.
- Eliminar frutas.

---

## Estructura del Proyecto
- **Backend:** Maneja la lógica del servidor, conexiones a la base de datos y los endpoints de la API.  
  Ubicación: `backend/`
- **Frontend:** Interfaz de usuario creada con React.  
  Ubicación: `client/`

---

# Configuración

## Clonar el Repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd NODE_MONGO

```

## Crear Archivos .env
### Backend
En la carpeta backend, crea un archivo .env con las siguientes variables:

env

```env
PORT=3008
MONGODB_URLSTRING=mongodb+srv://<USUARIO>:<CONTRASEÑA>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ORIGIN=http://localhost:5173
```

## Frontend
En la carpeta client, crea un archivo .env con la siguiente variable:

env

```env
VITE_URL_BACKEND=http://localhost:3008/frutas

```

## Instalación de Dependencias
### Backend
Accede a la carpeta backend:

```bash
cd backend
```

### Instala las dependencias:

```bash
npm install
```

## Frontend
Accede a la carpeta client:

```bash
cd client
```

## Instala las dependencias:

```bash
pnpm install
```

## Comandos Disponibles
### Backend

### Iniciar en modo producción:

```bash
npm start
```

### Iniciar en modo desarrollo:

```bash
npm run dev
```

## Frontend
### Iniciar servidor de desarrollo:

```bash
pnpm dev
```

## Endpoints del Backend
**Base URL:** `http://localhost:3008`

| Método  | Ruta                     | Descripción                                     |
|---------|--------------------------|-------------------------------------------------|
| GET     | `/`                      | Bienvenida a la API.                           |
| GET     | `/frutas`                | Lista todas las frutas disponibles.            |
| GET     | `/frutas/id/:id`         | Busca una fruta por su ID.                     |
| GET     | `/frutas/nombre/:nombre` | Busca frutas cuyo nombre coincida (parcial).   |
| GET     | `/frutas/importe/:precio`| Busca frutas con importe mayor o igual al precio. |
| POST    | `/frutas`                | Agrega una nueva fruta.                        |
| PUT     | `/frutas/id/:id`         | Actualiza los datos de una fruta por su ID.    |
| DELETE  | `/frutas/id/:id`         | Elimina una fruta por su ID.                   |



## Detalles de Conexión a la Base de Datos
La aplicación utiliza MongoDB Atlas. La conexión se configura a través de la variable MONGODB_URLSTRING en el archivo .env.

## Recursos Útiles
Node.js
Express
MongoDB
React
Vite

## Recomendaciones
Asegúrate de que MongoDB esté correctamente configurado y que el URI en el archivo .env sea válido.
Verifica que los puertos en los archivos .env del backend y frontend coincidan con los valores predeterminados.




