const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Verificar y crear la carpeta 'uploads' si no existe
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Filtro para permitir solo imágenes y videos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/x-m4v', 'video/ogg', 'video/webm'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes y videos.'), false); // Rechazar el archivo
    }
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Utiliza la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName); // Nombre único para el archivo
    },
});

// Middleware de Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;