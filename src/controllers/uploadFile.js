const fs = require('fs').promises;
const config = require('../config/config.js');

// Función para formatear la fecha
const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Función para manejar la subida de archivos
const uploadFile = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            const error = new Error('No se han subido archivos.');
            error.statusCode = 400;
            throw error;
        }

        // Obtener el nombre de la query
        const folderName = req.query.name || 'sin_nombre';
        const dateFolder = formatDate();
        const baseFolderPath = `/${folderName}/${dateFolder}`;
        
        // Importar dinámicamente el módulo webdav
        const { createClient } = await import('webdav');
        const client = createClient(config.webdav_url, {
            username: config.webdav_username,
            password: config.webdav_password,
        });

        await client.createDirectory(baseFolderPath, { recursive: true });
        
        
        const uploadedFiles = [];
        const baseUrl = config.webdav_url_public;
        
        // Iterar sobre los archivos subidos
        for (const file of req.files) {
            const filePath = file.path;
            const remotePath = `${folderName}/${dateFolder}/${Date.now()}-${file.originalname}`;

            // Subir el archivo al servidor WebDAV
            await client.putFileContents(remotePath, await fs.readFile(filePath), { overwrite: true });

            // Construir la URL completa del archivo subido
            const fileUrl = `${baseUrl}/${remotePath}`;
            uploadedFiles.push(fileUrl);

            // Eliminar los archivos locales después de la subida
            await fs.unlink(filePath);
        };

        // Devolver las URLs de los archivos subidos como un objeto
        return res.json({ message: 'Archivos subidos con éxito', files: uploadedFiles });
    } catch (error) {
        next(error);
    }
};

module.exports = uploadFile;