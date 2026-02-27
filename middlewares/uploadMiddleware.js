import multer from "multer";
import path from "path";

// Налаштування сховища файлів
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Тимчасова папка для завантажень
        cb(null, "temp/");
    },
    filename: (req, file, cb) => {
        // Тимчасове ім'я файлу (оригінальне)
        cb(null, file.originalname);
    },
});

// Фільтр тільки для зображень
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter,
});

export default upload;