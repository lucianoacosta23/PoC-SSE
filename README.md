# PoC-SSE

PoC de Server-Sent Events con un marcador deportivo en vivo.

## Estructura del proyecto

- server/: backend Node.js + Express + TypeScript.
- client/: frontend React + Vite + TypeScript.

## Cómo ejecutar

1. Abrir una terminal en `server` y ejecutar:
   ```bash
   npm install
   npm run dev
   ```
2. Abrir otra terminal en `client` y ejecutar:
   ```bash
   npm install
   npm run dev
   ```

El frontend se sirve en `http://localhost:5173` y se conecta al backend en `http://localhost:4000/events`.
