# Proyecto: Lógica de negocio y procesamiento de datos en TypeScript

El objetivo general de este proyecto es desarrollar la capa de lógica de negocio y procesamiento de datos en TypeScript para la empresa asignada en tu curso. En esta etapa no construyes una aplicación visual completa, sino los cimientos: utilidades puras, fuertemente tipadas y reutilizables para filtrar, ordenar, buscar, transformar y validar la información crítica de tu negocio.

## Fase 1: Análisis del briefing y configuración

Requisito previo obligatorio antes de escribir código.

Abre y lee detenidamente el archivo `company-BRIEFING.md` en tu repositorio para identificar:

- Entidades del negocio (ej. `Product`, `User`, `Order`).
- Campos exactos y sus tipos de datos.
- Reglas de validación y reportes solicitados.

En tu terminal, crea y cambia a una nueva rama de trabajo:

```bash
git switch -c feature/domain-models
```

Asegúrate de tener la estructura de carpetas creada dentro de `src/`:

```text
src/
├── types/
│   └── models.ts
├── utils/
│   ├── collections.ts
│   ├── search.ts
│   ├── transformations.ts
│   └── validations.ts
└── index.html (opcional)
```

## Fase 2: Definición de interfaces y tipos base

En `src/types/models.ts`, modela con tipos explícitos cada una de las entidades que leíste en el briefing.

```ts
// Ejemplos genéricos — adapta los nombres a tu BRIEFING.md
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  isActive: boolean;
}
```

## Fase 3: Implementación de algoritmos de búsqueda

En `src/utils/search.ts`, crea las funciones para encontrar elementos dentro de colecciones.

- Búsqueda lineal: recorre arrays desordenados con métodos de array o bucles tradicionales.
- Búsqueda binaria: requiere que el array esté previamente ordenado por la clave de búsqueda. Devuelve el índice o `-1` si no existe.

## Fase 4: Manejo y ordenamiento de colecciones

En `src/utils/collections.ts`, escribe funciones puras (que no modifiquen el array original):

- Filtrado: crea funciones que reciban una lista y criterios (ej. rango de precio, estado).
- Ordenamiento: implementa utilidades para ordenar ascendente o descendentemente creando copias del array (`[...array].sort(...)`).

## Fase 5: Transformaciones y generación de reportes

En `src/utils/transformations.ts`, crea funciones de agregación tipadas para generar estadísticas sobre los datos de la empresa:

- Conteo de items por categoría.
- Suma total de montos o valores numéricos.
- Cálculo de promedios, valores mínimos y máximos.
- Uso de `.reduce()`, `.map()` y `.filter()`.

## Fase 6: Validaciones de reglas de negocio

En `src/utils/validations.ts`, define funciones que verifiquen que un objeto cumple con los requisitos del negocio antes de procesarlo (campos obligatorios presentes, precios mayores a `0`, fechas coherentes).

## Fase 7: Verificación, pruebas y Pull Request

Comprueba que todo tu código compile sin errores ejecutando:

```bash
npx tsc --noEmit
```

Opcionalmente, prueba tus funciones creando un script ejecutable (por ejemplo, con `npx tsx src/demo.ts`) o construyendo un `index.html` simple.

Haz commit de tus cambios, sube la rama y abre el Pull Request (PR) hacia `main`. Tras la aprobación, realiza el merge.
