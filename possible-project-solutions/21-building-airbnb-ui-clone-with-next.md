# Building an airbnb ui clone with next.js

El objetivo de este ejercicio es practicar la arquitectura de componentes en React y Next.js (App Router) clonando una interfaz real (Airbnb) con enfoque **mobile-first**, tal como ocurre en un entorno de desarrollo frontend real.

Además de lograr que la interfaz se parezca a Airbnb, aprenderás a:

- **Planificar antes de programar:** redactar un mini-brief (`context.md`) y traducir capturas visuales en especificaciones de componentes mediante prompts de visión.
- **Diseñar mobile-first:** comenzar pensando en pantallas pequeñas (375 px) y escalar a escritorio (768 px en adelante), usando únicamente Tailwind CSS y sin librerías de componentes preconstruidas.
- **Estructurar componentes pequeños y reutilizables:** crear componentes funcionales con `const`, con una sola responsabilidad, de menos de aproximadamente 80 líneas y reutilizarlos entre vistas.
- **Manejar estado y efectos en React:** usar `useState` para filtros, búsqueda, ordenación, galería y contador de huéspedes, y `useEffect` para simular la carga asíncrona de datos con estados de carga.
- **Conectar vistas sin recargas:** navegar entre `/`, `/catalog` y `/rooms/[id]` mediante el componente `<Link>` de Next.js.

## Paso 1: redactar `context.md`

Antes de escribir código:

1. Crea el archivo `context.md` en la raíz del proyecto.
2. Describe las tres vistas: inicio (`/`), catálogo (`/catalog`) y detalle de habitación (`/rooms/[id]`).
3. Lista los componentes principales de cada vista tomando como referencia Airbnb.
4. Escribe un breve párrafo sobre quién es el usuario y qué busca hacer en la plataforma.

### Prompt sugerido:

```text
Ayúdame a redactar el contenido de un archivo context.md para un proyecto donde clonaremos el frontend de Airbnb con Next.js y Tailwind CSS. Incluye:

- Una descripción concisa de las 3 vistas: Inicio (/), Catálogo (/catalog) y Detalle de habitación (/rooms/[id]).
-Un desglose de los componentes principales identificados para cada vista.
- Un breve perfil del usuario objetivo y su meta al interactuar con la plataforma.
```


## Paso 2: configurar el proyecto y Git

1. Pide a tu agente de código con IA que genere los comandos para crear un proyecto Next.js 16 con TypeScript, Tailwind CSS y App Router mediante `npx create-next-app`.
2. Revisa los comandos, ejecútalos y comprueba que `npm run dev` levanta sin errores.
3. Organiza la estructura base con:
   - `/app`: rutas.
   - `/components`: interfaz reutilizable.
   - `/types`: interfaces y tipos de TypeScript.
4. Crea un repositorio público en GitHub, inicializa Git en el proyecto, realiza el primer commit y súbelo.

```text
Configura un nuevo proyecto de Next.js 16 con TypeScript, Tailwind CSS y el App Router usando npx create-next-app con las opciones predeterminadas y recomendadas. Genera la estructura de carpetas inicial organizada con /app para las rutas (/, /catalog, /rooms/[id]), /components para componentes de UI reutilizables y /types para las interfaces de TypeScript. Proporcióname los comandos exactos que debo ejecutar en la terminal para crearlo y comprobar que el servidor de desarrollo arranca.
```

## Paso 3: aplicar el flujo de visión a especificación

1. Abre Airbnb en el navegador con un viewport móvil de 375 px.
2. Toma capturas de las vistas de inicio, catálogo y detalle de una habitación.
3. Sube cada captura a tu agente de IA y pide que identifique:
   - Nombre del componente.
   - Props.
   - Relación de layout.
4. Guarda las especificaciones en `context.md` o en comentarios del código antes de programar cada vista.


### Prompt sugerido:

```text
Analiza esta captura de pantalla de la vista de [Inicio / Catálogo / Detalle] de Airbnb en viewport móvil (375px) y genera una especificación técnica de componentes (nombre, props y relación de layout).

Reglas estrictas para este turno:

- Revisa context.md para comprobar si ya existe una especificación de esta vista y evita duplicar o sobrescribir contenido.
- Muéstrame en tu respuesta el bloque exacto que propones añadir o actualizar en context.md.
- No modifiques context.md, no crees ni edites ningún otro archivo y no escribas código de componentes todavía. Detente aquí y espera mi aprobación explícita antes de hacer cualquier cambio.
```

## Paso 4: crear los tipos globales en TypeScript
En lugar de dictarle todas las interfaces a mano, aprovecha que la información ya existe en context.md.

Pide a tu agente que lea la especificación de context.md.

Genera las interfaces principales (ej. `Property`, `Category`, `FilterState`) dentro de `/types/index.ts`.

### Prompt sugerido

```text
Basándote en la especificación de componentes y datos que documentamos en context.md, crea el archivo /types/index.ts con todas las interfaces de TypeScript necesarias para el proyecto (Property, Category, FilterState, etc.).
```

## Paso 5: implementar los componentes y vistas

Con `context.md` actualizado y `/types/index.ts` definido, la orden para construir cada vista es directa y limpia.

### A. Página de Inicio (`/`)

```text
Lee la especificación de la Página de Inicio en context.md y los tipos en /types/index.ts. Implementa los componentes reutilizables en /components (Navbar, CategoryFilter, PropertyCard, PropertyGrid) y conecta en /app/page.tsx la lógica de búsqueda en tiempo real, filtro activo (useState) y la simulación de carga asíncrona con setTimeout (useEffect).
```

### B. Página de Catálogo (`/catalog`)

```text
Revisa la especificación del Catálogo en context.md. Crea el componente ResultsHeader con la lógica de ordenamiento por precio (asc/desc) mediante useState, reutiliza PropertyCard y añade el placeholder del área de mapa adaptando su layout de móvil a escritorio.
```

### C. Detalle de Habitación (`/rooms/[id]`)

```text
Basándote en la especificación de la vista de detalle en context.md, implementa /app/rooms/[id]/page.tsx junto con sus subcomponentes en /components (ImageGallery con control de fotos, PropertyHeader, HostInfo, AmenitiesGrid y BookingCard con contador de huéspedes). Simula la carga de datos del id mediante useEffect.
```

## Paso 6: navegación y revisión de calidad

Asegúrate de sustituir cualquier etiqueta `<a>` por el componente `<Link>` de Next.js para una navegación SPA limpia entre `/`, `/catalog` y `/rooms/[id]`.

Revisa que ningún componente supere las **~80 líneas** y que todos utilicen exclusivamente clases de Tailwind CSS, sin librerías externas de UI.
