# cpanel-image-uploader-node

## Descripción
Este proyecto es una aplicación Node.js basada en Express que permite la carga de imágenes en un servidor WebDAV. Incorpora medidas de seguridad y control de acceso para proteger la API.

## Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework para Node.js
- **Multer** - Middleware para la gestión de archivos subidos
- **WebDAV** - Protocolo para la carga y gestión de archivos remotos
- **dotenv** - Carga de variables de entorno
- **helmet** - Seguridad HTTP
- **cors** - Control de acceso entre dominios
- **express-rate-limit** - Límite de solicitudes para mitigar ataques de denegación de servicio (DoS)
- **morgan** - Logger HTTP para Express

## Estructura del Proyecto
```
index.js
logs/
package.json
README.md
src/
    config/
        config.js
        server.js
    controllers/
        uploadFile.js
    helpers/
        logMessage.js
    middleware/
        errorMiddleware.js
        limiterMiddleware.js
        multer.js
    routes/
        index.js
        webdavRoutes.js
```

## Configuración
El archivo `.env` almacena las credenciales y configuraciones del servidor WebDAV:
```
WEBDAV_URL=''
WEBDAV_USERNAME=''
WEBDAV_PASSWORD=''
UPLOAD_DIR=''
```

## Instalación y Ejecución
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/MRubilarRiffo/cpanel-image-uploader-node.git
   cd cpanel-image-uploader-node
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar el archivo `.env`.
4. Iniciar el servidor:
   ```sh
   npm start
   ```

## Endpoints
### **Subida de Archivos**
**POST** `/webdav/upload`
- **Descripción:** Permite la carga de archivos a un servidor WebDAV.
- **Middleware:** `limiterMiddleware`, `multer`
- **Parámetros:**
  - `files` (array) - Archivos a subir (límite: 100 archivos).
  - `name` (query) - Nombre de la carpeta donde se almacenará el archivo.
- **Respuesta:**
  ```json
  {
    "message": "Archivos subidos con éxito",
    "files": ["<URL del archivo>"]
  }
  ```

## Middleware
- **errorMiddleware.js**: Manejo de errores y registro de logs.
- **limiterMiddleware.js**: Límite de solicitudes por IP.
- **multer.js**: Configuración de almacenamiento y validación de archivos.

## Seguridad y Buenas Prácticas
- Se utiliza **helmet** para establecer encabezados de seguridad.
- Se aplican **restricciones CORS** para controlar el acceso.
- Se limita el número de solicitudes con **express-rate-limit**.

## Registro de Logs
El sistema genera logs de actividad en la carpeta `logs/`, con un archivo por día.

## Licencia
Este proyecto está bajo la licencia ISC.

## Autor
Jacke
