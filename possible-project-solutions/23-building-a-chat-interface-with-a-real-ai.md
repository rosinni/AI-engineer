# Building a Chat Interface with a Real AI

A lo largo de esta guía aprenderás a conectar un frontend en **React/Next.js** directamente a la API de Groq usando `fetch`, enviando el historial completo en cada turno para mantener el contexto, manejando esperas y errores reales con `async/await`, midiendo el consumo de tokens (`usage`) y persistiendo la sesión en `localStorage`.

Tu meta: no solo hacer que el chat funcione, sino entender cómo viajan los datos, cuánto cuesta cada interacción y cómo diseñar una interfaz confiable que no pierda el hilo cuando el usuario recarga la página.

Dividiremos el reto en 5 fases incrementales, asegurando validaciones constantes (pequeñas victorias de dopamina) antes de pasar a la siguiente etapa.

**[Fase 1: Conexión]** ➔ **[Fase 2: Layout Base]** ➔ **[Fase 3: Flujo Asíncrono]** ➔ **[Fase 4: Métricas]** ➔ **[Fase 5: Persistencia]**

## 🚀 Paso a Paso Guiado

### Fase 1: Credenciales y Aislamiento de la API

**Objetivo cognitivo:** Validar el canal de comunicación cliente-servidor sin la interferencia del estado de React.

#### Creación de Credenciales

1. Regístrate en [console.groq.com](https://console.groq.com).
2. Ve a la sección **API Keys** y genera un token nuevo.

#### Configuración del Entorno

Crea el archivo `.env.local` en la raíz del proyecto y declara la clave con el prefijo de Next.js:

```env
NEXT_PUBLIC_GROQ_API_KEY=tu_api_key_aquí
```

#### Prueba de Concepto (Smoke Test)

Antes de escribir React, realiza una petición directa usando `fetch` en la consola del navegador o en un script temporal para confirmar el acceso a la API:

```javascript
fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "qwen/qwen3.6-27b",
    messages: [{ role: "user", content: "Hola" }]
  })
})
  .then(res => res.json())
  .then(console.log);
```

**Hito de validación:** Verifica en la consola que el status sea `200` y que el JSON devuelva las claves `choices` y `usage`.

### Fase 2: Andamiaje de la Interfaz (v0.dev)

**Objetivo cognitivo:** Externalizar la carga de diseño visual para focalizar la energía neuro-ejecutiva en la arquitectura de datos.

#### Generación con v0.dev

1. Ingresa a [v0.dev](https://v0.dev).
2. Introduce el siguiente prompt:

   > "Una interfaz de chat moderna en React/Tailwind con un área principal de mensajes, un input con botón de envío, y una barra lateral derecha para mostrar estadísticas de tokens (prompt, completion, total) y métricas de rendimiento."

#### Integración al Proyecto

Exporta los componentes generados a la estructura del proyecto Next.js (`/components` o `page.tsx`).

#### Definición de Estados Principales

En el componente principal, declara las variables de estado reactivas:

```typescript
const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
const [input, setInput] = useState('');
```

### Fase 3: Gestión del Flujo Asíncrono y Estado Stateless

**Objetivo cognitivo:** Asimilar la naturaleza *stateless* de la API enviando el historial completo en cada llamada.

#### Control de Interacción y Carga

Crea el estado de carga y el estado de errores:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

#### Implementación de la Función de Envío

Construye el manejador del envío (`handleSubmit`):

1. Bloquea la interfaz activando `isLoading(true)`.
2. Agrega inmediatamente el mensaje del usuario al estado `messages`.
3. Prepara el payload enviando todo el arreglo del historial más el nuevo mensaje.

#### Manejo Riguroso de Errores con `async/await`

```typescript
try {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "qwen/qwen3.6-27b",
      messages: updatedHistory
    })
  });

  if (!res.ok) throw new Error(`Error en la API: ${res.statusText}`);

  const data = await res.json();

  // Agregar respuesta de la IA al estado
} catch (err: any) {
  setError(err.message);
} finally {
  setIsLoading(false);
}
```

**Hito de validación:** Envía múltiples mensajes continuos y verifica que el modelo mantenga el contexto de la conversación.

### Fase 4: Telemetría y Acumulación de Métricas

**Objetivo cognitivo:** Conectar los datos devueltos en la propiedad `usage` con la interfaz del usuario.

#### Estado del Contador de Tokens

Define un estado para rastrear las métricas acumuladas:

```typescript
const [metrics, setMetrics] = useState({
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
  lastResponseTime: 0,
  model: ''
});
```

#### Extracción y Acumulación de Datos

1. Mide el tiempo transcurrido registrando `performance.now()` antes y después del `fetch`.
2. Al recibir la respuesta exitosa, actualiza las métricas sumando los valores nuevos a los anteriores:

```typescript
const { prompt_tokens, completion_tokens, total_tokens } = data.usage;

setMetrics(prev => ({
  promptTokens: prev.promptTokens + prompt_tokens,
  completionTokens: prev.completionTokens + completion_tokens,
  totalTokens: prev.totalTokens + total_tokens,
  lastResponseTime: responseTimeInMs,
  model: data.model
}));
```

#### Renderizado en la Barra Lateral

Conecta los valores de `metrics` a las tarjetas o indicadores visuales diseñados en la Fase 2.

### Fase 5: Persistencia del Estado e Higiene de Sesión

**Objetivo cognitivo:** Garantizar la continuidad de la experiencia mediante el ciclo de vida de React y el almacenamiento local.

#### Lectura Inicial (useEffect de Montaje)

Recupera los mensajes guardados al cargar el componente:

```typescript
useEffect(() => {
  const savedMessages = localStorage.getItem('chat_history');
  if (savedMessages) setMessages(JSON.parse(savedMessages));
}, []);
```

#### Escritura Automática

Sincroniza los cambios del historial con `localStorage`:

```typescript
useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }
}, [messages]);
```

#### Reinicio Manual de Sesión

Crea una función para el botón **“Borrar conversación”**:

```typescript
const handleClear = () => {
  localStorage.removeItem('chat_history');
  setMessages([]);
  setMetrics({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    lastResponseTime: 0,
    model: ''
  });
};
```

**Hito de validación:** Recarga la página con `F5` después de enviar varios mensajes y verifica que el historial permanezca intacto.

## 📋 Lista de Verificación Final del Alumno

- [ ] ¿El archivo `.env.local` guarda la clave sin subirla al repositorio?
- [ ] ¿Se utiliza `fetch` nativo sin librerías externas ni SDKs de Groq?
- [ ] ¿El payload incluye el historial completo (`messages`) en cada llamada?
- [ ] ¿Se muestra visualmente el indicador de estado **“pensando...”** durante la llamada?
- [ ] ¿Los errores devuelven un mensaje visible y amigable en lugar de romper la app?
- [ ] ¿La suma de `prompt_tokens`, `completion_tokens` y `total_tokens` se acumula correctamente a lo largo de toda la sesión?
- [ ] ¿Se muestra al menos una métrica adicional (tiempo de respuesta o modelo)?
- [ ] ¿La conversación sobrevive a la recarga del navegador?
- [ ] ¿El botón **“Borrar conversación”** limpia el estado y el `localStorage`?