
import fs from 'fs';

export const removeFile = (imagePath) => {
  fs.unlinkSync(`./uploads/${imagePath}`);
}