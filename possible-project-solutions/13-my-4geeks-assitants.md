# My 4Geeks Assistant — Teaching OpenClaw to Track Your Progress

### Objetivo del proyecto

Conectar tu asistente de IA (OpenClaw) a la API de 4Geeks Academy mediante tu token de estudiante para que conozca en tiempo real tu progreso, entregas pendientes y calificaciones, construyendo cada habilidad (skill) a través de interacción conversacional directa con el agente.

## Paso 1: Configurar el token de forma segura

1. Inicia sesión en 4geeks.com.
2. Ve a tu perfil y en la sección recursos, copia el valor de la API KEY.
3. Almacena este token en las variables de entorno de tu instancia de OpenClaw (por ejemplo, bajo la clave `FOURGEEKS_TOKEN`). No compartas el token en los mensajes del chat ni en archivos del repositorio.

## Paso 2: Inicializar el registro (`SKILL_LOG.md`)

1. Crea un archivo llamado `SKILL_LOG.md` en la raíz de tu repositorio.
2. Utilízalo para documentar cada skill creada con la siguiente estructura:
   - Prompt utilizado en la conversación.
   - Descripción de la skill y endpoints utilizados.
   - Captura o texto con la salida de la prueba exitosa.

## Paso 3: Crear las 4 skills principales

Envía a OpenClaw un prompt por cada habilidad. Cada una debe usar un único endpoint de la API de BreatheCode.

### Skill 1 — Autenticación

- Prompt: "Quiero crear una skill que me permita verificar si mi token de estudiante almacenado en la variable de entorno FOURGEEKS_TOKEN es válido y mi sesión está activa en 4Geeks."
- Acción: Ejecuta la prueba con OpenClaw y registra los datos en `SKILL_LOG.md`.

### Skill 2 — Obtener mis proyectos

- Prompt: "Crea una skill para consultar la lista de mis proyectos asignados en 4Geeks con sus estados actuales (pendiente, entregado, calificado) usando la variable de entorno FOURGEEKS_TOKEN."
- Acción: Ejecuta la prueba y documenta el resultado.

### Skill 3 — Obtener trabajo pendiente

- Prompt: "Crea una skill con la responsabilidad única de listar qué proyectos o tareas me faltan por entregar."
- Acción: Ejecuta la prueba y documenta el resultado.

### Skill 4 — Obtener resumen de progreso

- Prompt: "Crea una skill que consulte el porcentaje global de mi avance en el curso de 4Geeks."
- Acción: Ejecuta la prueba y documenta el resultado.

## Paso 4: Crear 2 skills extendidas adicionales

Define dos necesidades adicionales relacionadas con tu cuenta de 4Geeks (por ejemplo: consultar asistencias, ver calendario de eventos o listar calificaciones) y créalas conversando con OpenClaw.

### Skill 5 — [Nombre de tu habilidad extra 1]

- Prompt: Solicita a OpenClaw la creación de la quinta habilidad enfocada en un único endpoint.
- Acción: Documenta en `SKILL_LOG.md`.

### Skill 6 — [Nombre de tu habilidad extra 2]

- Prompt: Solicita a OpenClaw la creación de la sexta habilidad.
- Acción: Documenta en `SKILL_LOG.md`.

## Paso 5: Entrega del proyecto

1. Verifica que `SKILL_LOG.md` contenga las 6 skills documentadas con su prompt, descripción, endpoints y prueba de funcionamiento.
2. Confirma que ningún archivo del proyecto contenga la API KEY explícita en texto plano.
3. Haz commit y push del archivo `SKILL_LOG.md` a tu repositorio personal de GitHub.
4. Envía el enlace de tu repositorio a tu instructor.