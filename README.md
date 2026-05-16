# Perfumes Hero

Hero full-viewport construido con React + TypeScript + Vite + Tailwind CSS + lucide-react.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Implementación

- Carousel de 4 perfumes con rotación por flechas
- Fondo dinámico sincronizado con el perfume activo
- Tipografías Google Fonts: Anton + Inter
- Overlay de grain SVG
- Layout responsive con roles `center`, `left`, `right`, `back`
- Precarga de imágenes en montaje
- Assets locales procesados para usar botellas limpias dentro del hero

## Perfumes incluidos

- One Million Elixir
- Erba Pura
- Invictus Victory Elixir
- Creed Aventus

## Estructura principal

- `src/App.tsx`: hero principal y lógica del carousel
- `src/assets/perfumes/*`: imágenes listas para usar
- `src/index.css`: base Tailwind + reset mínimo
- `index.html`: carga de fuentes y bootstrap de Vite
