import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Коренева директорія проекту
export const rootDir = path.resolve(__dirname, "..");

// Папка public
export const publicDir = path.join(rootDir, "public");

// Папка avatars
export const avatarsDir = path.join(publicDir, "avatars");