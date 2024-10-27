const fs = require('fs').promises;
const config = require('../config/config.js');

// Función para manejar la subida de archivos
const uploadFile = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            const error = new Error('No se han subido archivos.');
            error.statusCode = 400;
            throw error;
        };

        // Importar dinámicamente el módulo webdav
        const { createClient } = await import('webdav');
        const client = createClient(config.webdav_url, {
            username: config.webdav_username,
            password: config.webdav_password,
        });

        const uploadedFiles = [];
        const baseUrl = config.webdav_url_public;

        // Iterar sobre los archivos subidos
        for (const file of req.files) {
            let filePath = file.path;
            let remotePath;
            
            remotePath = `/${Date.now()}-${file.originalname}`;

            // Subir el archivo al servidor WebDAV
            await client.putFileContents(remotePath, await fs.readFile(filePath), { overwrite: true });

            // Construir la URL completa del archivo subido
            const fileUrl = `${baseUrl}${remotePath}`;
            uploadedFiles.push(fileUrl);

            // Eliminar los archivos locales después de la subida
            await fs.unlink(filePath);
        };

        // Devolver las URLs de los archivos subidos como un objeto
        res.json({ message: 'Archivos subidos con éxito', files: uploadedFiles });
    } catch (error) {
        next(error);
    };
};

module.exports = uploadFile;