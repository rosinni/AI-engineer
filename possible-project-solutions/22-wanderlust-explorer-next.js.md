# Wanderlust Explorer con React y Next.js 

Esta es una oportunidad ideal para practicar cómo dirigir una IA con precisión y no delegar el criterio arquitectónico, a traves de conceptos que hemos trabajado antes:

- **Visual to Spec** ayuda a traducir referencias reales de UI —como tarjetas, buscador, filtros y estados visuales— en decisiones concretas de diseño y responsividad, incluyendo el estado **“No se encontraron resultados”**.
- **SDD (Spec-Driven Development)** convierte los requisitos: 5 rutas, búsqueda con regex case-insensitive en el título, filtros combinables, `useEffect`, custom hook y ausencia de Redux/Zustand, en una especificación verificable antes de pedir código.
- **Ingeniería de Contexto** evita alucinaciones y código monolítico o incompatible con App Router, por ejemplo, cuidando dónde se usa `useSearchParams` y dónde vive el estado compartido de favoritos.

## Cómo resolverlo

A continuación tienes un flujo de trabajo ordenado para construir el proyecto con un asistente de IA manteniendo el control técnico y pedagógico.

### 1. Analizar la spec y crear un documento de especificación (SDD)

**Antes de escribir componentes**, extrae cada requisito explícito y restricción del enunciado en un archivo breve —por ejemplo, `SPEC.md`— que incluya:

- Las rutas:
  - `/`
  - `/experiences`
  - `/experiences/[id]`
  - `/favorites`
  - `/profile`
- El modelo `Experience`.
- Las reglas de filtrado:
  - Regex `/term/i` sobre el título.
  - Filtros independientes y combinables de categoría y destino.
- La sincronización con `useSearchParams` y `usePathname`.
- Las restricciones:
  - No usar Redux ni Zustand.
  - No es obligatorio utilizar `localStorage`.

**Por qué:**

Pedir simplemente “hazme una app de viajes” puede provocar que la IA invente arquitecturas, instale librerías no solicitadas o mezcle toda la lógica en un solo archivo.

**Para qué:**

Contar con una fuente de verdad clara para revisar cada generación y comprobar los criterios de evaluación.

#### Prompt sugerido:

```text
Actúa como un Software Architect especializado en Spec-Driven Development (SDD).

Tu tarea es analizar #PROJECT-BRIEF.md y generar un documento de especificación técnica llamado `SPEC.md`.

## Objetivo
Antes de implementar cualquier componente o escribir código, necesitamos transformar los requisitos del enunciado en una especificación clara, estructurada y verificable.

## Instrucciones

### 1. Analiza el proyecto

- Lee el enunciado original completo.
- Inspecciona la estructura actual del repositorio.
- Identifica los requisitos funcionales y técnicos explícitos.
- Identifica las restricciones y condiciones que debe respetar la implementación.
- No asumas que algo es obligatorio si no está indicado en el enunciado.

### 2. Documenta las rutas
La especificación debe contemplar las siguientes rutas:

- `/`
- `/experiences`
- `/experiences/[id]`
- `/favorites`
- `/profile`
Para cada ruta, documenta su propósito y los requisitos funcionales asociados, siempre que estén respaldados por el enunciado.

### 3. Documenta el modelo de datos Experience
Identifica los atributos necesarios del modelo `Experience`.

Para cada atributo especifica:

- Nombre.
- Tipo de dato.
- Descripción.
- Si es obligatorio u opcional, cuando pueda determinarse.
No inventes atributos sin respaldo en los requisitos. Si necesitas proponer alguno, identifícalo expresamente como propuesta pendiente de validación.

### 4. Documenta las reglas de filtrado
Incluye las siguientes reglas:

- Búsqueda por título utilizando la expresión regular `/term/i`.
- Filtro independiente por categoría.
- Filtro independiente por destino.
- Posibilidad de combinar los filtros de categoría y destino.
- Comportamiento esperado cuando no existen resultados.
Distingue los requisitos explícitos de los comportamientos que todavía necesitan definición.

### 5. Documenta la sincronización con la URL
Incluye los requisitos relacionados con:

- `useSearchParams`.
- `usePathname`.
- Lectura de parámetros de búsqueda.
- Actualización de parámetros cuando corresponda.
- Conservación de filtros al navegar, cuando corresponda.
No inventes nombres de parámetros ni comportamientos que no estén definidos. Registra las decisiones pendientes.

### 6. Restricciones técnicas
Documenta expresamente:

- No utilizar Redux.
- No utilizar Zustand.
- El uso de `localStorage` no es obligatorio.
- Respetar la arquitectura y las tecnologías existentes en el repositorio.

### 7. Estructura del documento
Organiza `SPEC.md` con las siguientes secciones:

1. Descripción del proyecto.
2. Objetivo funcional.
3. Rutas y navegación.
4. Modelo de datos Experience.
5. Reglas de filtrado y búsqueda.
6. Sincronización con la URL.
7. Restricciones técnicas.
8. Criterios de aceptación verificables.
9. Decisiones pendientes y supuestos.

### 8. Criterios de calidad

- Cada requisito debe ser claro y verificable.
- Evita descripciones ambiguas.
- No agregues funcionalidades que no hayan sido solicitadas.
- Diferencia requisitos explícitos, inferencias y propuestas.
- No modifiques archivos existentes, excepto crear `SPEC.md`.
- No escribas componentes ni implementes funcionalidades.
- No instales dependencias.
- No ejecutes cambios sobre el código fuente.

## Resultado esperado
Al finalizar:

1. Crea `SPEC.md` en la raíz del proyecto.
2. Presenta un resumen de los requisitos identificados.
3. Indica qué requisitos están completamente definidos y cuáles necesitan aclaración.
4. Explica cómo podrían comprobarse los criterios de aceptación en una etapa posterior.
**Importante:** en esta etapa solamente estamos especificando el comportamiento esperado del sistema. No estamos construyendo la aplicación.
```

### 2. Investigar referencias, diseñar las pantallas y aplicar Visual to Spec

**Antes de construir la interfaz:** vamos a definir cómo queremos que se vea Wanderlust Labs. Para ello, investigaremos algunas referencias y utilizaremos Google Stitch para diseñar nuestra propia aplicación.

#### A. Investigar referencias

1. Busca dos interfaces reales de aplicaciones de viajes o descubrimiento de experiencias.
2. Observa cómo presentan las experiencias, las imágenes, la búsqueda y los filtros.
3. Identifica qué elementos te gustaría utilizar como inspiración.

Documenta las referencias y tus observaciones en `README.md`, dentro de la sección `## Design References`.


#### Prompt sugerido:

```text
Actúa como un investigador de diseño UX/UI. Analiza las imágenes de referencia que te proporciono [imagen1] , [imagen2], correspondientes a interfaces reales de aplicaciones de viajes o descubrimiento de experiencias.

### Instrucciones

1. Analiza las dos referencias visuales proporcionadas.
2. Observa especialmente:

- Cómo presentan las experiencias o actividades.
- Cómo utilizan las imágenes y las tarjetas de contenido.
- Cómo organizan la búsqueda.
- Qué filtros ofrecen y cómo se presentan.
- Cómo distribuyen la información en pantalla.
3. Identifica qué decisiones de diseño te parecen interesantes y cuáles podrían adaptarse al proyecto que estás desarrollando.

### Documentación
Registra los resultados directamente en `README.md`, dentro de la sección:

`## Design References`

Para cada referencia incluye:

- **Nombre de la aplicación:** identifica la aplicación si aparece en la imagen.
- **Descripción:** qué tipo de contenido o experiencias presenta.
- **Presentación visual:** cómo utiliza las imágenes, tarjetas y distribución del contenido.
- **Búsqueda y filtros:** cómo están organizados y qué opciones se observan.
- **Elementos de inspiración:** qué decisiones de diseño podrías adaptar al proyecto y por qué.
Al finalizar, agrega una breve conclusión con entre 3 y 5 decisiones de diseño que te gustaría aplicar en tu proyecto.

### Restricciones

- Basa tus observaciones en los elementos visibles en las imágenes.
- No inventes funcionalidades que no puedas observar.
- Si algún elemento no puede identificarse, indícalo expresamente.
- No copies la interfaz completa de las referencias.
- No modifiques código ni comiences a construir la interfaz.
- No sobrescribas el resto del contenido existente en `README.md`.
**Resultado esperado:** una sección `Design References` en `README.md` que documente las dos referencias visuales y las decisiones de diseño que servirán como inspiración para diseñar las pantallas del proyecto en Stitch.
```


#### B. Diseñar nuestra aplicación con Google Stitch

A partir de las referencias y los requisitos de `SPEC.md`, utiliza **Google Stitch** para generar una propuesta visual de Wanderlust Labs.

La propuesta debe incluir las cinco páginas requeridas:

1. Home `/`.
2. Explorador `/experiences`.
3. Detalle `/experiences/[id]`.
4. Favoritos `/favorites`.
5. Perfil `/profile`.

Ten en cuenta los siguientes elementos:

- Identidad visual coherente: colores, tipografías y estilo general.
- Navegación y distribución de los elementos.
- Diseño de las tarjetas y protagonismo de las fotografías.
- Ubicación y apariencia de la búsqueda y los filtros.
- Adaptación a dispositivos móviles.
- Estados importantes, como filtros activos, ausencia de resultados y favoritos vacíos.

Puedes utilizar las referencias investigadas como inspiración, pero el resultado debe representar una propuesta propia para Wanderlust Labs.

**Importante:** no aceptes automáticamente el primer diseño que genere la IA. Revísalo, solicita los cambios necesarios y aprueba las pantallas antes de continuar.

No necesitas diseñar cada detalle ni construir un prototipo interactivo completo. El objetivo es obtener una referencia visual clara de las cinco páginas.

#### C. Aplicar Visual to Spec

Una vez aprobados los diseños de Stitch, compártelos con tu agente de IA y pídele que los analice para generar un documento llamado `DESIGN_SPEC.md`.

El documento debe describir:

- La estructura visual de cada página.
- La distribución y jerarquía de los elementos.
- El diseño de las tarjetas, la búsqueda y los filtros.
- La adaptación a dispositivos móviles.
- Los estados visuales importantes.
- Los componentes compartidos entre páginas.

El agente debe describir lo que realmente aparece en los diseños y señalar cualquier aspecto que no esté definido, sin inventar decisiones visuales.

Si Stitch proporciona un documento con las reglas visuales del proyecto, puedes aprovecharlo como referencia para evitar duplicar información sobre colores, tipografías y estilos.

#### Entregables

Al finalizar tendrás:

- `README.md`: referencias de diseño investigadas.
- Proyecto de Stitch: diseños aprobados de las cinco páginas.
- `DESIGN_SPEC.md`: especificación visual derivada de los diseños.

**¿Por qué hacemos esto?**

Las referencias nos ayudan a encontrar inspiración, pero no definen cómo será nuestro producto. Con Stitch podemos transformar esas ideas en una propuesta visual propia y revisarla antes de comenzar a programar.

**¿Para qué?**

Para que el agente tenga dos fuentes claras antes de implementar:

- `SPEC.md`: explica qué debe hacer la aplicación.
- `DESIGN_SPEC.md` y los diseños aprobados: explican cómo debe verse.

De esta manera, el agente no tendrá que inventar la estructura visual de la aplicación durante el desarrollo.

### 3. Inicializar Next.js y definir el contrato de datos

**Base de TypeScript y dataset de 100 elementos:**

Crea el proyecto con:

```bash
create-next-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Define primero la interfaz `Experience` con las siguientes propiedades:

- `id`
- `title`
- `description`
- `category`: `Adventure | Culture | Food | Wellness | Nature`
- `destination`
- `price`
- `rating`
- `imageUrl`

Después, genera `src/data/experiences.ts` con 100 objetos válidos.

**Por qué:**

Si la IA genera los 100 objetos sin un contrato tipado previo, puede usar nombres de propiedades diferentes, como `dest` en lugar de `destination` o `img` en lugar de `imageUrl`, además de categorías fuera de la lista permitida.

**Para qué:**

Garantizar un tipado consistente en todo el proyecto y evitar errores de compilación al conectar componentes y filtros.

### 4. Diseñar la arquitectura de estado y el custom hook antes de las vistas

**URL como fuente de verdad y `useState` para los favoritos:**

Define explícitamente en el prompt de contexto:

- Un custom hook, por ejemplo `useExperiences` o `useFilters`, que:
  - Aplique una regex case-insensitive.
  - Escape caracteres especiales introducidos por el usuario antes de crear el `RegExp`, por ejemplo:

    ```js
    new RegExp(escapedTerm, "i")
    ```

  - Combine los filtros de categoría y destino.
- El estado de favoritos mediante `useState` en un nivel compartido, como:
  - Un layout.
  - Un provider.
  - Un componente contenedor de cliente compartido entre páginas.
- Las props necesarias para pasar el estado y las acciones hacia los componentes hijos.
- El uso de `useEffect` donde corresponda, por ejemplo:
  - Sincronizar estado o efectos ante cambios de los query params.
  - Actualizar `document.title` en `/experiences/[id]`.

**Por qué:**

En Next.js App Router, los componentes son Server Components por defecto y `useSearchParams` requiere componentes cliente, generalmente acompañados de `<Suspense>`. Además, si cada página crea su propio `useState` para favoritos, `/favorites` y `/profile` no verán las experiencias marcadas en `/experiences`.

**Para qué:**

Cumplir las reglas de estado nativo, evitar bucles en `useEffect`, permitir navegación fluida sin recargas y mantener los filtros compartibles mediante la URL.

### 5. Construir por módulos acotados y validar contra la spec

**Iteración incremental con verificación:**

Pide a la IA un componente o página por turno:

1. Navbar con `usePathname` para marcar el enlace activo.
2. `SearchBar`.
3. `FilterBar`.
4. `ExperienceCard`.
5. Las rutas:
   - `/`
   - `/experiences`
   - `/experiences/[id]`
   - `/favorites`
   - `/profile`

En cada petición, proporciona siempre:

- `SPEC.md`.
- La interfaz `Experience`.
- El hook acordado.
- La estrategia de estado compartido.

Revisa cada entrega contra la lista de evaluación.

**Por qué:**

Generar las cinco páginas y toda la lógica de una sola vez puede producir código truncado, imports rotos o responsabilidades mezcladas.

**Para qué:**

Mantener el contexto limpio, comprender qué hace cada pieza —especialmente para principiantes— y detectar fallos de forma temprana.

## Consejos clave de Ingeniería de Contexto

### Aísla el contexto por tarea

Al pedir `ExperienceCard`, no cargues toda la lógica de `useSearchParams`. Utiliza únicamente:

- La interfaz `Experience`.
- Las props esperadas:
  - `experience`
  - `isFavorite`
  - `onToggleFavorite`

### Protege la regex ante entradas de usuario

Construir una expresión regular directamente con texto proporcionado por el usuario puede lanzar errores de sintaxis.

Por ejemplo, estas entradas pueden fallar:

```js
new RegExp("c++", "i")
new RegExp("(a", "i")
```

Debes pedir explícitamente que se escapen los caracteres especiales antes de construir el `RegExp`. Así se evitan errores al buscar símbolos como `?`, `[`, `(` o `+`.

### Comprueba los casos borde de la URL

Verifica el comportamiento al abrir directamente:

```text
/experiences?search=vela&category=Adventure&destination=Croatia
```

En una pestaña nueva:

- Los inputs deben mostrar los valores correspondientes desde el inicio.
- La lista debe aparecer ya filtrada.
- Al limpiar los filtros, los query params deben actualizarse.
- La navegación debe realizarse sin recargar la página.
