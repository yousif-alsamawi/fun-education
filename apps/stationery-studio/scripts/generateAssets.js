import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');
const texturesDir = path.join(assetsDir, 'textures');
const floralsDir = path.join(assetsDir, 'florals');

[publicDir, assetsDir, texturesDir, floralsDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 1. Carrara Marble Background Texture
const marbleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <filter id="marble-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.008" numOctaves="5" result="noise"/>
      <feColorMatrix type="matrix" values="0.95 0 0 0 0.05  0 0.95 0 0 0.05  0 0 0.96 0 0.04  0 0 0 0.35 0" in="noise" result="veins"/>
      <feBlend mode="multiply" in="SourceGraphic" in2="veins"/>
    </filter>
    <linearGradient id="marble-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8F9FA"/>
      <stop offset="35%" stop-color="#EFF1F3"/>
      <stop offset="70%" stop-color="#F5F6F8"/>
      <stop offset="100%" stop-color="#E9ECEF"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#marble-base)"/>
  <rect width="100%" height="100%" fill="#FFFFFF" filter="url(#marble-grain)" opacity="0.75"/>
  <path d="M-50,200 Q200,180 350,300 T750,450 T850,700" fill="none" stroke="#C8B89E" stroke-width="1.2" opacity="0.35"/>
  <path d="M100,-50 Q300,150 450,220 T820,380" fill="none" stroke="#A5B0B8" stroke-width="1.8" opacity="0.25"/>
  <path d="M-20,600 Q250,550 480,680 T850,750" fill="none" stroke="#D4C5A9" stroke-width="0.9" opacity="0.3"/>
</svg>`;

// 2. Luxury Linen Texture
const linenSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <pattern id="linen-cross" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#ECE6DD"/>
      <path d="M0,4 L8,4 M4,0 L4,8" stroke="#D5CDC1" stroke-width="1" opacity="0.6"/>
      <path d="M1,1 L7,7 M1,7 L7,1" stroke="#BDB4A5" stroke-width="0.5" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#linen-cross)"/>
</svg>`;

// 3. Burgundy Rose Frame Artwork
const roseFrameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="860" viewBox="0 0 600 860">
  <defs>
    <radialGradient id="petal-crimson" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#D9384E"/>
      <stop offset="45%" stop-color="#8B1E3F"/>
      <stop offset="85%" stop-color="#4A0E17"/>
      <stop offset="100%" stop-color="#26040A"/>
    </radialGradient>
    <radialGradient id="petal-blush" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#FCEBEF"/>
      <stop offset="75%" stop-color="#EAA5AF"/>
      <stop offset="100%" stop-color="#C26B78"/>
    </radialGradient>
    <linearGradient id="leaf-olive" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7B936C"/>
      <stop offset="60%" stop-color="#4B633E"/>
      <stop offset="100%" stop-color="#2A3D22"/>
    </linearGradient>
    <linearGradient id="gold-dust" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE599"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8C6B14"/>
    </linearGradient>
  </defs>
  <g transform="translate(70, 70)">
    <path d="M-20,-10 C-40,-50 -10,-70 20,-50 C30,-30 10,-10 -20,-10 Z" fill="url(#leaf-olive)" opacity="0.9"/>
    <path d="M20,-20 C60,-40 80,-10 60,20 C40,30 10,10 20,-20 Z" fill="url(#leaf-olive)" opacity="0.85"/>
    <path d="M-40,20 C-70,30 -70,70 -30,60 C-10,50 -20,20 -40,20 Z" fill="url(#leaf-olive)" opacity="0.9"/>
    <path d="M0,0 Q-60,-40 -80,-80" fill="none" stroke="url(#gold-dust)" stroke-width="1.5"/>
    <circle cx="-80" cy="-80" r="3.5" fill="url(#gold-dust)"/>
    <circle cx="-60" cy="-40" r="2.5" fill="url(#gold-dust)"/>
    <circle cx="0" cy="0" r="42" fill="url(#petal-crimson)"/>
    <path d="M-15,-20 C0,-35 25,-25 30,-5 C35,15 10,30 -10,25 C-30,20 -30,-5 -15,-20 Z" fill="none" stroke="#FCEBEF" stroke-width="2" opacity="0.85"/>
    <path d="M-8,-10 C5,-18 18,-10 18,5 C18,18 0,20 -8,12 C-15,5 -15,-5 -8,-10 Z" fill="none" stroke="#FFE599" stroke-width="1.5" opacity="0.9"/>
    <circle cx="48" cy="38" r="30" fill="url(#petal-blush)" opacity="0.95"/>
    <path d="M35,25 C45,15 65,22 68,36 C70,48 55,58 42,52 C30,48 30,32 35,25 Z" fill="none" stroke="#8B1E3F" stroke-width="1.5" opacity="0.7"/>
  </g>
  <g transform="translate(530, 70) scale(-1, 1)">
    <path d="M-20,-10 C-40,-50 -10,-70 20,-50 C30,-30 10,-10 -20,-10 Z" fill="url(#leaf-olive)" opacity="0.9"/>
    <path d="M20,-20 C60,-40 80,-10 60,20 C40,30 10,10 20,-20 Z" fill="url(#leaf-olive)" opacity="0.85"/>
    <path d="M0,0 Q-60,-40 -80,-80" fill="none" stroke="url(#gold-dust)" stroke-width="1.5"/>
    <circle cx="-80" cy="-80" r="3.5" fill="url(#gold-dust)"/>
    <circle cx="0" cy="0" r="42" fill="url(#petal-crimson)"/>
    <circle cx="48" cy="38" r="30" fill="url(#petal-blush)" opacity="0.95"/>
  </g>
  <g transform="translate(70, 790) scale(1, -1)">
    <path d="M-20,-10 C-40,-50 -10,-70 20,-50 C30,-30 10,-10 -20,-10 Z" fill="url(#leaf-olive)" opacity="0.9"/>
    <circle cx="0" cy="0" r="38" fill="url(#petal-crimson)"/>
    <circle cx="45" cy="35" r="26" fill="url(#petal-blush)"/>
  </g>
  <g transform="translate(530, 790) scale(-1, -1)">
    <path d="M-20,-10 C-40,-50 -10,-70 20,-50 C30,-30 10,-10 -20,-10 Z" fill="url(#leaf-olive)" opacity="0.9"/>
    <circle cx="0" cy="0" r="38" fill="url(#petal-crimson)"/>
    <circle cx="45" cy="35" r="26" fill="url(#petal-blush)"/>
  </g>
</svg>`;

// 4. Olive & Sage Botanical Frame
const oliveSageFrameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="860" viewBox="0 0 600 860">
  <defs>
    <linearGradient id="sage-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9CB392"/>
      <stop offset="50%" stop-color="#68825D"/>
      <stop offset="100%" stop-color="#405437"/>
    </linearGradient>
    <linearGradient id="gold-stem" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DFC693"/>
      <stop offset="50%" stop-color="#C5A059"/>
      <stop offset="100%" stop-color="#8C6F2D"/>
    </linearGradient>
  </defs>
  <g transform="translate(530, 120)">
    <path d="M0,0 Q-40,150 10,320 T-10,620" fill="none" stroke="url(#gold-stem)" stroke-width="2"/>
    <path d="M-2,60 C-30,40 -40,70 -10,85 C5,80 5,65 -2,60 Z" fill="url(#sage-grad)"/>
    <path d="M2,130 C30,110 40,140 10,155 C-5,150 -5,135 2,130 Z" fill="url(#sage-grad)"/>
    <path d="M-15,210 C-45,190 -55,220 -25,235 C-10,230 -10,215 -15,210 Z" fill="url(#sage-grad)"/>
    <path d="M5,300 C35,280 45,310 15,325 C0,320 0,305 5,300 Z" fill="url(#sage-grad)"/>
    <path d="M-8,390 C-38,370 -48,400 -18,415 C-3,410 -3,395 -8,390 Z" fill="url(#sage-grad)"/>
    <path d="M10,480 C40,460 50,490 20,505 C5,500 5,485 10,480 Z" fill="url(#sage-grad)"/>
    <circle cx="-12" cy="95" r="4" fill="url(#gold-stem)"/>
    <circle cx="15" cy="165" r="4" fill="url(#gold-stem)"/>
    <circle cx="-20" cy="245" r="4" fill="url(#gold-stem)"/>
    <circle cx="18" cy="335" r="4" fill="url(#gold-stem)"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(texturesDir, 'carrara_marble.svg'), marbleSvg);
fs.writeFileSync(path.join(texturesDir, 'luxury_linen.svg'), linenSvg);
fs.writeFileSync(path.join(floralsDir, 'burgundy_rose_frame.svg'), roseFrameSvg);
fs.writeFileSync(path.join(floralsDir, 'olive_sage_frame.svg'), oliveSageFrameSvg);
console.log('Master assets created successfully in public/assets/');
