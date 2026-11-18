# Ruta de Desarrollo: Proyecto AgentHub

> **Regla de oro:** En este proyecto no escribes código a ciegas. Trabajas bajo el enfoque **Vision to Spec**: primero comprendes el negocio, defines el contrato técnico, validas una propuesta visual y después construyes el prototipo siguiendo esas especificaciones.
>
> La IA puede ayudarte a pensar, diseñar y programar, pero las decisiones técnicas y la validación del resultado son tu responsabilidad.


## Fase 0: Contextualización del Negocio

- **Qué haces:** Descubres el modelo operativo y los requerimientos de la plataforma **AgentHub** antes de comenzar a diseñar la interfaz.

- **¿Por qué?:** Antes de resolver un problema, tu cerebro necesita construir un modelo mental de la situación. Comprender quién utiliza el sistema, qué necesita y qué información administra permite conectar los nuevos conocimientos con estructuras que ya conoces.

- **¿Para qué?:** AgentHub es un SaaS B2B donde las empresas contratan agentes de inteligencia artificial configurados con *skills* (habilidades como buscar información en la web o leer documentos).

Tu trabajo consiste en desarrollar el **panel de administración interno**. El usuario principal es el operador de AgentHub, quien necesita supervisar:

- Las métricas generales del negocio.
- Los usuarios y sus suscripciones.
- Los agentes de IA y sus habilidades.
- Las contrataciones y los contratos.
- Los errores y eventos del sistema.

**Antes de avanzar, debes poder explicar:** qué administra AgentHub, quién utiliza el panel y qué decisiones necesita tomar ese usuario.


## Fase 1: Aprender a escribir una especificación técnica

- **Qué haces:** Antes de crear tu `SPECS.md`, necesitas comprender qué significa especificar un componente de interfaz.

Una buena especificación describe tres elementos:

**Componente + Contenido + Comportamiento.**

- **Componente:** ¿Qué elemento visual necesitas?
- **Contenido:** ¿Qué información debe mostrar?
- **Comportamiento:** ¿Qué sucede cuando el usuario interactúa con él?


### Plantilla para pensar tus especificaciones

Antes de pedir ayuda a la IA, utiliza estas preguntas:

| Elemento | Pregunta que debes responder |
|---|---|
| Componente | ¿Qué elemento necesito construir? |
| Contenido | ¿Qué datos debe mostrar? |
| Comportamiento | ¿Cómo debe reaccionar ante una interacción? |
| Estado | ¿Qué estados visuales puede tener? |
| Restricciones | ¿Qué condiciones debe respetar? |

- **¿Por qué?:** Descomponer una interfaz en componentes, información y comportamientos reduce la carga cognitiva. En lugar de pensar en una pantalla completa, aprendes a identificar unidades más pequeñas y manejables.

- **¿Para qué?:** Aprenderás a convertir necesidades de negocio en instrucciones técnicas verificables. Esta habilidad es fundamental para dirigir agentes de IA y evaluar si sus resultados cumplen los requisitos.

**Criterio de salida:** puedes describir un componente sin recurrir a expresiones ambiguas como "algo parecido a", "una tabla normal" o "que se vea moderno".


## Fase 2: Co-creación del contrato técnico (`SPECS.md`)

- **Qué haces:** Creas el archivo `SPECS.md` en la raíz de tu proyecto. Este documento será el contrato técnico que guiará todas las decisiones de implementación.

No le pidas a la IA que invente y entregue el documento completo. Utilízala como arquitecto y mentor: responde sus preguntas, analiza sus propuestas y decide qué especificaciones representan realmente tu solución.

Tu documento debe contener:

1. Descripción general del proyecto.
2. Stack tecnológico y restricciones.
3. Especificaciones de las seis secciones.
4. Inventario de componentes reutilizables.
5. Criterios de aceptación numerados.

### Estructura sugerida de `SPECS.md`

Utiliza esta plantilla como punto de partida:

```markdown
# AgentHub - Technical Specifications

## 1. Project Overview
- Nombre:
- Objetivo:
- Usuario principal:
- Problema que resuelve:

## 2. Technology Stack
- HTML:
- Tailwind CSS:
- JavaScript:
- Restricciones técnicas:

## 3. Dashboard
### Componentes
### Contenido
### Comportamientos

## 4. Users
### Componentes
### Contenido
### Comportamientos

## 5. Agents
### Componentes
### Contenido
### Comportamientos

## 6. Skills
### Componentes
### Contenido
### Comportamientos

## 7. Contracts
### Componentes
### Contenido
### Comportamientos

## 8. Logs
### Componentes
### Contenido
### Comportamientos

## 9. Component Inventory
- Sidebar:
- Navbar:
- Stat Card:
- Data Table:
- Badge:
- Dropdown:
- Modal:
- Collapsible:

## 10. Acceptance Criteria
1.
2.
3.
```

Cada sección debe tener al menos **tres especificaciones concretas** que describan sus componentes, contenido o comportamientos.

El inventario de componentes debe identificar qué elementos se repiten y cuáles necesitan comportamientos interactivos.

### Prompt de apoyo para tu asistente de IA

```text
Actúa como un Arquitecto de Software Senior y mentor técnico.

Estoy desarrollando el panel administrativo AgentHub y necesito
crear mi archivo SPECS.md antes de comenzar la implementación.

No escribas el documento completo por mí.

Guíame sección por sección:
1. Dashboard
2. Users
3. Agents
4. Skills
5. Contracts
6. Logs
7. Component Inventory
8. Acceptance Criteria

Para cada sección:
- Hazme preguntas para identificar los componentes.
- Ayúdame a definir su contenido y comportamiento.
- Detecta especificaciones ambiguas.
- Propón mejoras cuando falte información.
- Explícame por qué una decisión técnica es necesaria.

Recuerda que cada especificación debe seguir:
Componente + Contenido + Comportamiento.

No avances a la siguiente sección hasta que
yo haya revisado y validado la anterior.

Al finalizar, comprueba que existan:
- Al menos 3 especificaciones por sección.
- Un inventario de componentes reutilizables.
- Criterios de aceptación numerados y verificables.

Mi objetivo es comprender y decidir la arquitectura,
no aceptar automáticamente tus propuestas.
```

- **¿Por qué?:** La elaboración progresiva del documento requiere recuperar, organizar y relacionar información. Este proceso favorece la comprensión profunda frente a la aceptación pasiva de respuestas generadas por IA.

- **¿Para qué?:** Aprenderás a trabajar con un contrato técnico antes de implementar. La especificación se convierte en la fuente de verdad del proyecto.

**Criterio de salida:**

- [ ] Tengo las seis secciones especificadas.
- [ ] Cada sección contiene al menos tres especificaciones concretas.
- [ ] Tengo un inventario de componentes reutilizables.
- [ ] Tengo criterios de aceptación numerados.
- [ ] He revisado y entiendo todas las decisiones del documento.


## Fase 3: El Commit de Especificación (Control de Versiones)

- **Qué haces:** Guardas tu archivo `SPECS.md` en Git y realizas un commit independiente antes de crear cualquier archivo HTML.

Ejecuta:

```bash
git status
git add SPECS.md
git commit -m "docs: add technical specifications for AgentHub admin panel"
```

- **¿Por qué?:** Separar las decisiones de diseño de las tareas de implementación ayuda a organizar el proceso de resolución de problemas y reduce la necesidad de cambiar constantemente entre actividades diferentes.

- **¿Para qué?:** Garantizar la trazabilidad de las decisiones técnicas. El historial de Git debe permitir comprobar que primero definiste qué ibas a construir y después comenzaste a implementarlo.

**Criterio de salida:**

- [ ] El archivo `SPECS.md` está guardado en la raíz del proyecto.
- [ ] El commit se realizó correctamente.
- [ ] `git status` muestra que no hay cambios pendientes relacionados con la especificación.


## Fase 4: Stitch como Referencia Visual

- **Qué haces:** Utilizas tu archivo `SPECS.md` como fuente de instrucciones para generar una propuesta visual de AgentHub utilizando Stitch.

La especificación técnica será tu prompt. No necesitas inventar una nueva descripción del proyecto: debes traducir los requisitos que ya definiste en una propuesta visual.

### Prompt de apoyo para Stitch

```text
Diseña un panel administrativo SaaS llamado AgentHub.

Utiliza las siguientes especificaciones como contrato
funcional y visual del proyecto:

[PEGA AQUÍ EL CONTENIDO DE TU SPECS.md]

Genera una interfaz administrativa moderna, profesional,
responsive y coherente con el contexto de un SaaS B2B.

Respeta las secciones, componentes, datos y comportamientos
descritos en las especificaciones.

Utiliza una estructura visual consistente entre las vistas,
con sidebar, navbar, tarjetas, tablas y componentes reutilizables.

Incluye estados visuales para elementos interactivos
y contempla los modos claro y oscuro.
```

### Evalúa la propuesta antes de implementarla

La propuesta generada por Stitch es una **referencia visual, no la entrega final**.

Debes analizarla y decidir:

| Aspecto | Qué debes revisar |
|---|---|
| Estructura | ¿Respeta las seis secciones? |
| Componentes | ¿Incluye los elementos definidos en la spec? |
| Contenido | ¿Muestra los datos correctos? |
| Consistencia | ¿Mantiene los mismos patrones visuales? |
| Interactividad | ¿Representa correctamente dropdowns, modales y colapsables? |
| Tailwind | ¿La implementación posterior podrá utilizar clases de Tailwind, incluyendo variantes `dark:`? |

Identifica tres tipos de decisiones:

- **Conservar:** elementos que cumplen las especificaciones.
- **Corregir:** elementos que necesitan ajustes visuales o funcionales.
- **Descartar:** elementos que contradicen el contrato técnico.

Por ejemplo, si la propuesta utiliza estilos en línea, no debes trasladarlos automáticamente a tu implementación. Si falta un comportamiento definido en la spec, debes incorporarlo aunque Stitch no lo haya representado.

- **¿Por qué?:** Comparar una propuesta visual con un conjunto de requisitos obliga a analizar, contrastar y tomar decisiones. No estás copiando una interfaz: estás aprendiendo a evaluar una solución.

- **¿Para qué?:** Aprenderás a utilizar herramientas generativas como aceleradores del diseño sin perder el control de la arquitectura ni de los requisitos funcionales.

**Criterio de salida:**

- [ ] Tengo una propuesta visual de AgentHub.
- [ ] He comparado la propuesta con mi `SPECS.md`.
- [ ] Identifiqué qué conservar, corregir y descartar.
- [ ] Tengo una referencia visual validada para comenzar a implementar.


## Fase 5: Construcción del Layout Base y Modo Oscuro

- **Qué haces:** Creas tu archivo `index.html` e implementas la estructura general del panel.

Comienza por los elementos que se repetirán en todas las vistas:

- Sidebar: navegación principal.
- Navbar: encabezado y controles generales.
- Main: contenedor del contenido.
- Área de contenido: espacio donde se renderizarán las seis secciones.

Utiliza HTML5 semántico y Tailwind CSS mediante CDN.

### Estructura de referencia

```html
<body>
  <div id="app">

    <aside>
      <!-- Navegación -->
    </aside>

    <div>
      <header>
        <!-- Navbar -->
      </header>

      <main>
        <!-- Contenido de las secciones -->
      </main>
    </div>

  </div>
</body>
```

Esta estructura es orientativa. Debes adaptarla a las decisiones de tu `SPECS.md`.

### Configuración de Tailwind

Si utilizas Tailwind CSS mediante CDN, configura la estrategia de modo oscuro basada en clases antes de comenzar a utilizar las variantes `dark:`.

En la configuración de Tailwind Play CDN, utiliza:

```javascript
tailwind.config = {
  darkMode: 'class'
}
```

Así, las clases `dark:` responderán a la presencia de la clase `dark` en el elemento raíz.

### Implementa el toggle de modo oscuro

En esta fase prepara también el botón de cambio de tema y su persistencia en `localStorage`.

El comportamiento esperado es:

1. El usuario pulsa el botón de tema.
2. JavaScript agrega o elimina la clase `dark` del elemento raíz.
3. La preferencia se guarda en `localStorage`.
4. Cuando se vuelve a cargar la página, se recupera la preferencia guardada.

### Prompt de apoyo para tu asistente de IA

```text
Actúa como un desarrollador frontend experto en HTML5
y Tailwind CSS.

Te comparto mi contrato técnico:

[PEGA AQUÍ TU SPECS.md]

Ayúdame a implementar únicamente el layout base de AgentHub.

Necesito:
- Sidebar semántico.
- Navbar.
- Contenedor principal.
- Diseño responsive.
- Soporte para modo claro y oscuro.
- Toggle funcional con persistencia en localStorage.

Utiliza Tailwind CSS mediante CDN y configura
darkMode: 'class'.

No implementes todavía las seis secciones.

Explícame la responsabilidad de cada elemento HTML
y la lógica necesaria para cambiar el tema.

No utilices estilos en línea.

Al finalizar, indícame cómo verificar
que cada comportamiento funciona.
```

- **¿Por qué?:**

Resolver primero la estructura espacial macro antes de agregar componentes pequeños reduce la carga sobre la memoria de trabajo. Además, implementar un primer comportamiento funcional proporciona retroalimentación temprana.

### El para qué (Arquitectura Web)

Construirás una base semántica y reutilizable que permitirá incorporar las seis secciones sin duplicar la estructura general.

**Criterio de salida:**

- [ ] La página muestra correctamente el sidebar y navbar.
- [ ] El contenido principal tiene un espacio definido.
- [ ] El layout se adapta a diferentes tamaños de pantalla.
- [ ] El toggle cambia entre modo claro y oscuro.
- [ ] La preferencia se conserva al recargar la página.


## Fase 6: Primera Sección Completa — Gestión de Usuarios

- **Qué haces:** Antes de construir las seis vistas, implementarás una sección completa: **Usuarios**.

Esta sección funcionará como tu laboratorio de aprendizaje. Aquí construirás, probarás y validarás los patrones visuales y funcionales que después reutilizarás.

Comienza con:

1. Título y descripción de la sección.
2. Tarjetas de métricas.
3. Tabla de usuarios.
4. Badges de estado.
5. Dropdown de acciones.
6. Modal para visualizar el detalle de un usuario.

Utiliza datos hardcodeados coherentes con el negocio.

### Construye primero la interfaz

Implementa la tabla con sus columnas y registros.

Comprueba que:

- Los encabezados sean claros.
- Los datos estén correctamente alineados.
- Los badges representen los estados.
- Las acciones estén ubicadas en cada fila.

### Implementa el primer dropdown

Cada fila tendrá un botón ⋮ que abrirá un menú de acciones.

Define un patrón reutilizable mediante atributos `data-*`.

Por ejemplo:

```html
<button data-dropdown-trigger>
  ⋮
</button>

<div data-dropdown-menu hidden>
  <button>Ver detalle</button>
  <button>Eliminar</button>
</div>
```

La idea es que JavaScript identifique los elementos mediante atributos y no dependa de nombres de clases visuales.

### Implementa el modal

El botón "Ver detalle" abrirá un modal con información del usuario seleccionado.

El modal debe:

- Abrirse al pulsar la acción correspondiente.
- Mostrar los datos del usuario.
- Cerrarse con el botón ✕.
- Cerrarse al pulsar el backdrop.
- Permanecer abierto al hacer clic dentro de su contenido.

Utiliza identificadores o atributos `data-*` para relacionar los botones con los modales.

- **¿Por qué?:** Aprender un comportamiento completo, probarlo y corregirlo antes de incorporar otros permite construir esquemas mentales reutilizables. Evitas acumular errores de diferentes componentes al mismo tiempo.

- **¿Para qué?:** Construirás tus primeros componentes interactivos con JavaScript nativo y establecerás patrones que podrás aplicar al resto de la plataforma.



## Fase 7: Construcción de las Secciones Restantes

- **Qué haces:** Ahora que tienes una sección completa y validada, construirás las cinco vistas restantes reutilizando los patrones que desarrollaste en Usuarios.

No necesitas reinventar cada componente. Debes adaptar los componentes existentes al contenido y comportamiento específico de cada sección.

### Orden recomendado

**1. Dashboard**

Implementa las métricas generales, indicadores de actividad, agentes activos y errores recientes.

Verifica que los indicadores representen datos que también aparecen en las otras secciones.

**2. Agentes**

Construye la tabla o listado de agentes con su nombre, estado, empresa asociada y cantidad de skills.

Incorpora el componente colapsable para mostrar las habilidades asociadas a cada agente.

**3. Skills**

Implementa el catálogo de habilidades disponibles, con su nombre, descripción, categoría y estado.

**4. Contrataciones**

Construye la vista de contratos y contrataciones, mostrando la empresa, el agente contratado, la fecha, el importe y el estado.

**5. Logs**

Implementa el registro de errores y eventos del sistema, mostrando fecha, agente, tipo de error, descripción y nivel de criticidad.

### Reutilización de componentes

Mantén un patrón único para los comportamientos interactivos.

| Componente | Patrón sugerido |
|---|---|
| Dropdown | `data-dropdown-trigger` |
| Menú dropdown | `data-dropdown-menu` |
| Apertura de modal | `data-modal-open="user-detail"` |
| Cierre de modal | `data-modal-close` |
| Contenedor modal | `data-modal="user-detail"` |
| Colapsable | `data-collapsible-trigger` |
| Contenido colapsable | `data-collapsible-content` |

Los atributos son convenciones que tú defines. Lo importante es mantenerlos consistentes en todas las secciones.

### Micro-pasos de interactividad

**A. Dropdowns**

Reutiliza el patrón de Usuarios.

Verifica:
- Abre el menú correcto.
- Cierra el anterior cuando se abre otro.
- Se cierra al hacer clic fuera.

**B. Modales**

Reutiliza el sistema de apertura y cierre.

Verifica:
- Se abre el modal correspondiente.
- Se cierra con ✕.
- Se cierra con backdrop.
- No se cierra al interactuar con su contenido.

**C. Skills colapsables**

Implementa un componente que permita mostrar y ocultar las habilidades de cada agente.

La transición debe ser visualmente fluida.

Ten en cuenta que el atributo `hidden` oculta inmediatamente el elemento y no permite animar su desaparición de forma convencional. Puedes utilizar alternativas como `max-height`, `grid-template-rows` o clases de transición.

Verifica:
- El contenido se expande.
- El contenido se contrae.
- La transición se percibe correctamente.
- Cada agente controla sus propias skills.

**D. Modo oscuro**

Comprueba que todos los componentes nuevos respeten las variantes `dark:` de Tailwind.

La preferencia debe mantenerse al navegar entre las vistas y al recargar la página.


## Fase 8: Consistencia de Datos y Auditoría Final

- **Qué haces:** Realizas una auditoría completa del proyecto. Tu objetivo es comprobar que la implementación responde a las especificaciones y que las seis vistas representan un mismo sistema, no seis pantallas independientes.

### Primera parte: consistencia de datos

Utiliza un conjunto de datos coherente en todas las secciones.

Por ejemplo:

El agente `Jarvis-Support` debe aparecer:

- En el Dashboard, como agente activo o con algún indicador de error.
- En Agentes, con su información y estado.
- En Skills, asociado a sus habilidades.
- En Contrataciones, vinculado con la empresa correspondiente.
- En Logs, cuando se registren errores asociados a él.

Los nombres, identificadores, estados y relaciones deben ser consistentes.

### Segunda parte: auditoría técnica

Revisa el código con los siguientes criterios:

**HTML y estructura**
- [ ] Uso correcto de etiquetas semánticas.
- [ ] No utilizo estilos en línea (`style="..."`).
- [ ] No existen elementos HTML innecesarios.
- [ ] La navegación entre secciones funciona.

**Tailwind CSS**
- [ ] Utilizo clases de utilidad.
- [ ] No dependo de estilos CSS improvisados.
- [ ] Las variantes `dark:` están correctamente aplicadas.
- [ ] El diseño es responsive.

**JavaScript**
- [ ] Los dropdowns funcionan.
- [ ] Los modales funcionan.
- [ ] Los colapsables funcionan.
- [ ] El modo oscuro persiste.
- [ ] No existen errores en la consola.
- [ ] Los listeners no generan comportamientos duplicados.

**Consistencia del producto**

Verifica los requisitos cuantitativos establecidos en el README del proyecto:

- [ ] Dashboard con las métricas y elementos requeridos.
- [ ] Al menos 5 filas de usuarios.
- [ ] Al menos 4 agentes.
- [ ] Al menos 4 skills.
- [ ] Al menos 4 contratos.
- [ ] Al menos 6 registros de errores.
- [ ] Los demás requisitos específicos del README están cumplidos.

Los valores anteriores son mínimos de referencia: si el README establece cantidades o condiciones diferentes, prevalece el README.

### Tercera parte: auditoría con IA

Utiliza la IA como un Code Reviewer, no como un generador automático de correcciones.

### Prompt de auditoría

```text
Actúa como un Senior Frontend Engineer y Code Reviewer.

Voy a compartir contigo mi SPECS.md, mi código HTML,
mi JavaScript y los criterios de aceptación del proyecto.

Tu trabajo es auditar mi implementación.

Compara el código contra las especificaciones
y los criterios de aceptación.

Revisa:
1. Estructura semántica HTML.
2. Uso de Tailwind CSS.
3. Ausencia de estilos en línea.
4. Funcionamiento de dropdowns.
5. Funcionamiento de modales.
6. Funcionamiento de colapsables.
7. Persistencia del modo oscuro.
8. Consistencia de datos entre secciones.
9. Cumplimiento de los requisitos cuantitativos.
10. Reutilización de componentes.

IMPORTANTE:
No corrijas el código automáticamente.

Primero entrega un informe indicando:
- Criterio evaluado.
- Estado: cumple / no cumple / parcial.
- Evidencia encontrada en el código.
- Problema detectado.
- Recomendación para resolverlo.

Prioriza los errores que impiden el funcionamiento
o contradicen las especificaciones.
```

### Cuarta parte: historial de Git

Comprueba que tu historial refleje el proceso de desarrollo.

Ejecuta:

```bash
git log --oneline
```

Verifica que el commit de `SPECS.md` aparezca antes del commit de implementación.

Esto permite demostrar que trabajaste siguiendo el enfoque Spec-Driven Development.

- **¿Por qué?:** La auditoría promueve la metacognición: analizar qué hiciste, cómo lo resolviste y qué podrías mejorar. El aprendizaje no termina cuando el código funciona; también implica comprender por qué funciona.

- **¿Para qué?:** Desarrollarás la capacidad de revisar tu propio trabajo con criterios profesionales, detectar inconsistencias y entregar un producto verificable.

### Entrega final

Antes de entregar:

- [ ] El repositorio es público.
- [ ] `SPECS.md` está incluido en el repositorio.
- [ ] `index.html` está incluido en el repositorio.
- [ ] Ambos archivos están commiteados.
- [ ] El historial de Git demuestra que la especificación se creó primero.
- [ ] Todos los criterios del README están cumplidos.
- [ ] El prototipo funciona correctamente.


El objetivo no es solamente terminar AgentHub: es desarrollar el criterio técnico necesario para dirigir, evaluar y construir software con asistencia de inteligencia artificial.