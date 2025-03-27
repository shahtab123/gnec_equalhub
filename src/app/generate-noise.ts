import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Generate noise
const imageData = ctx.createImageData(200, 200);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
  const value = Math.random() * 255;
  data[i] = value;     // R
  data[i + 1] = value; // G
  data[i + 2] = value; // B
  data[i + 3] = 255;   // A
}

ctx.putImageData(imageData, 0, 0);

// Save the noise texture
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(process.cwd(), 'public', 'noise.png'), buffer); 