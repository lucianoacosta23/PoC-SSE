# PoC-SSE

PoC de Server-Sent Events con un marcador deportivo en vivo.

## Estructura del proyecto

- `server/`: backend Node.js + Express + TypeScript.
- `client/`: frontend React + Vite + TypeScript.

## Requisitos

- Node.js instalado (recomendado v20+).
- npm disponible en la terminal.

## Pasos para clonar y ejecutar

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd PoC-SSE
   ```
2. Iniciar el backend:
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. En otra terminal, iniciar el frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Qué esperar

- El backend se ejecuta en `http://localhost:4000`.
- El frontend se sirve en `http://localhost:5173`.
- Abre el navegador en `http://localhost:5173` para ver el marcador en vivo.

## Notas

- El frontend se conecta automáticamente al endpoint SSE del backend en `/events`.
- Si ya ejecutaste `npm install` en `server` o `client`, no es necesario volver a instalar a menos que cambies dependencias.
