# Hablando con el mundo exterior: APIs, servidores stateless y JSON

En esta clase vas a aprender tres cosas que se usan en casi cualquier aplicación real:

1. **Cómo tu código le pide cosas a otro programa por internet** (APIs externas).
2. **Por qué el servidor no se acuerda de ti** entre una petición y la siguiente (comunicación sin estado).
3. **Cómo encontrar un dato dentro de una respuesta enorme** (navegar JSON complejo).


## Comunicándose con APIs externas

Piensa en un restaurante. Tú (el cliente) no entras a la cocina a preparar tu comida. Hay un **mesero** que:

- Recibe tu pedido con un formato conocido (el menú).
- Lo lleva a la cocina.
- Te trae de vuelta el plato.

Una **API** es ese mesero. Tu aplicación es el cliente, el servidor de otra empresa es la cocina, y la API es la forma ordenada de pedir cosas sin necesidad de saber cómo funciona la cocina por dentro.

> **API** = *Application Programming Interface*. Traducido a tierra: "las reglas para pedirle cosas a otro programa".

### Las piezas de una petición

Cada vez que le pides algo a una API, estás armando una **petición** (*request*) con estas partes:

| Pieza | Qué es | Ejemplo |
|---|---|---|
| **URL (endpoint)** | La dirección a la que preguntas | `https://jsonplaceholder.typicode.com/users/1` |
| **Método** | Qué quieres hacer | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| **Headers** | Información extra sobre la petición | `Content-Type: application/json` |
| **Body** | Los datos que envías (si aplica) | `{ "title": "Hola" }` |

Y la API te devuelve una **respuesta** (*response*) con:

- Un **código de estado** (si salió bien o mal).
- Un **body**, casi siempre en formato JSON.

### Tu primera petición: GET

Para practicar usaremos **JSONPlaceholder**, una API pública hecha justamente para aprender. No necesitas cuenta ni clave.

Abre la consola del navegador (F12 → pestaña *Console*) y pega:

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");
const usuario = await respuesta.json();
console.log(usuario);
```

Qué pasó, línea por línea:

1. `fetch(url)` envía la petición. Por defecto es un `GET` ("dame esto").
2. `await` significa "espera a que llegue la respuesta antes de seguir".
3. `respuesta.json()` convierte el texto que llegó en un objeto de JavaScript que sí puedes usar. Esto también toma tiempo, por eso lleva `await`.

### Los códigos de estado (el "semáforo" de la respuesta)

Antes de usar los datos, mira si la petición funcionó:

| Código | Significado en cristiano |
|---|---|
| `200` | Todo bien, aquí está lo que pediste |
| `201` | Se creó lo que pediste crear |
| `400` | Tu petición estaba mal armada |
| `401` / `403` | No estás autenticado / no tienes permiso |
| `404` | Eso que buscas no existe |
| `500` | Se rompió algo en el servidor (no es tu culpa) |

Un patrón básico y seguro:

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");

if (!respuesta.ok) {
  console.log("Algo falló. Código:", respuesta.status);
} else {
  const usuario = await respuesta.json();
  console.log(usuario.name);
}
```

> ⚠️ **Trampa clásica de principiantes:** `fetch` **no lanza error** cuando recibes un 404 o un 500. Solo falla si no hay internet. Por eso hay que revisar `respuesta.ok` tú mismo.

### Los métodos: los verbos de la API

Los métodos le dicen al servidor qué quieres hacer. Una analogía con una agenda de contactos en tu celular:

| Método | Acción | En tu agenda de contactos |
|---|---|---|
| `GET` | Leer | Abrir un contacto para verlo |
| `POST` | Crear | Agregar un contacto nuevo |
| `PUT` | Reemplazar completo | Borrar el contacto y escribirlo de nuevo, todo |
| `PATCH` | Modificar una parte | Cambiar solo el teléfono, lo demás queda igual |
| `DELETE` | Eliminar | Borrar el contacto |

### POST: crear algo nuevo

Para enviar datos, necesitas decir el método, avisar que mandas JSON y poner los datos en el `body`:

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Mi primer post",
    body: "Hola desde la clase",
    userId: 1,
  }),
});

const nuevoPost = await respuesta.json();
console.log(nuevoPost); // incluye un id nuevo asignado por el servidor
```

Fíjate en dos detalles:

- `JSON.stringify(...)` convierte tu objeto en texto, porque por internet viajan textos, no objetos de JavaScript.
- El header `Content-Type: application/json` le avisa al servidor "lo que te mando es JSON". Sin él, muchos servidores no entienden el body.


## PATCH a fondo: modificar solo lo que cambió

Esta es la parte donde más se confunden los principiantes, así que vamos con calma.

### El problema que resuelve

Imagina que tienes un perfil de usuario en el servidor:

```json
{
  "id": 1,
  "name": "Ana Pérez",
  "email": "ana@correo.com",
  "phone": "555-1234",
  "city": "Buenos Aires"
}
```

Ana se mudó y solo quiere cambiar su ciudad. ¿Tienes que enviar todo el perfil otra vez para cambiar un único dato? Ahí es donde elegir entre `PUT` y `PATCH` importa.

### PUT vs PATCH con una analogía

Tienes una hoja impresa con tus datos y notas que la dirección está mal.

- **PUT** = tirar la hoja y entregar una **hoja nueva completa**. Si olvidas escribir el teléfono en la hoja nueva, el teléfono desaparece.
- **PATCH** = tomar un **corrector y cambiar solo la línea de la dirección**. Todo lo demás queda intacto.

### Verlo en código

**Con PUT** (reemplazo completo). Si envías solo la ciudad:

```js
await fetch("https://api-ejemplo.com/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ city: "Córdoba" }),
});
```

En una API que sigue la regla estricta de `PUT`, el usuario quedaría así:

```json
{
  "id": 1,
  "city": "Córdoba"
}
```

Perdiste `name`, `email` y `phone`. Por eso con `PUT` debes enviar **el objeto completo**.

**Con PATCH** (cambio parcial). Envías solo lo que cambia:

```js
await fetch("https://api-ejemplo.com/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ city: "Córdoba" }),
});
```

Resultado:

```json
{
  "id": 1,
  "name": "Ana Pérez",
  "email": "ana@correo.com",
  "phone": "555-1234",
  "city": "Córdoba"
}
```

Solo cambió `city`. Lo demás sigue ahí.

### Cuándo usar cada uno

| Situación | Método recomendado |
|---|---|
| Un formulario de "editar perfil" donde el usuario cambia un campo | `PATCH` |
| Un interruptor tipo "marcar tarea como completada" | `PATCH` |
| Reemplazar un documento entero por una versión nueva | `PUT` |
| Crear algo que todavía no existe | `POST` |

Regla práctica para recordar: **si solo cambió una parte, usa `PATCH`. Si estás entregando el objeto entero de nuevo, usa `PUT`.**


### Cosas que conviene saber de PATCH

1. **Los campos que no mandas, no se tocan.** Esa es toda la gracia.
2. **No todas las APIs soportan `PATCH`.** Algunas solo ofrecen `PUT`. Revisa siempre la documentación de la API que vayas a usar.
3. **Los arrays suelen reemplazarse completos.** Si un usuario tiene `"hobbies": ["leer", "correr"]` y haces `PATCH` con `{ "hobbies": ["nadar"] }`, normalmente quedará `["nadar"]`, no `["leer", "correr", "nadar"]`. Si quieres agregar uno, envía la lista final completa.
4. **Enviar `null` suele significar "borra este campo".** Por ejemplo `{ "phone": null }` quita el teléfono. Pero esto depende de cada API, así que verifica en su documentación.
5. **Sigues necesitando el `Content-Type`.** Es el error más común: olvidar el header y que el servidor ignore el body.

### Resumen exprés de PATCH

- `PATCH` = "cambia **solo esto**, lo demás déjalo igual".
- `PUT` = "reemplaza **todo** por esto".
- Con `PATCH` mandas poco; con `PUT` mandas todo.
- Siempre: método, header `Content-Type`, y body con `JSON.stringify`.


## Comunicación sin estado: el servidor tiene amnesia


Un servidor web **no recuerda nada** de ti entre una petición y la siguiente. Cada petición es como llegar a un mostrador donde el empleado sufre de amnesia: no sabe quién eres, qué pediste hace cinco minutos ni si ya habías venido.

A esto se le llama comunicación **sin estado** (*stateless*).

### Una analogía de cafetería

Imagina una cafetería donde el barista olvida todo apenas termina de atenderte:

- **Petición 1:** "Hola, soy Ana, quiero un café con leche." → Te lo prepara.
- **Petición 2 (un minuto después):** "¿Me agregas azúcar a mi café?" → *"¿Cuál café? ¿Quién eres?"*

Para que funcione, en cada visita tendrías que decir todo de nuevo: "Soy Ana, mi pedido es un café con leche, agrégale azúcar."

Así funcionan los servidores. **Cada petición debe traer toda la información necesaria** para que el servidor la entienda.

### ¿Por qué lo hacen así?

Parece incómodo, pero tiene ventajas enormes:

- **Es simple:** el servidor no tiene que guardar un cuaderno con la historia de millones de usuarios.
- **Escala bien:** si llegan un millón de visitas, cualquier servidor disponible puede atender cualquier petición, porque ninguno depende de "recordar" a nadie.
- **Es más fácil de reparar:** si un servidor falla, otro toma su lugar sin que se pierda ninguna conversación.

### Entonces, ¿cómo sabe la app que sigo conectada?

Si el servidor no te recuerda, ¿cómo es que cuando inicias sesión en una página sigues "dentro" al navegar? Porque **tú le recuerdas quién eres en cada petición**, mostrando una especie de **credencial**.

Volvamos a la cafetería. Ahora el barista te da un **ticket con tu nombre y número de pedido** la primera vez. En cada visita siguiente, muestras el ticket y él sabe de quién se trata sin recordarte personalmente.

En la web, ese "ticket" puede ser:

- Una **cookie**, que el navegador guarda y envía automáticamente en cada petición.
- Un **token**, que tu código guarda y manda en un header.

Ejemplo de enviar un token en cada petición:

```js
const token = "abc123-mi-token-secreto";

const respuesta = await fetch("https://api-ejemplo.com/mi-perfil", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

El servidor lee el header `Authorization`, verifica que el token sea válido y entonces sabe quién eres. Cada petición lleva el token, porque el servidor **no recuerda** la anterior.


### Qué significa esto cuando programas

- **Siempre envía lo necesario en cada petición:** identificación (token o cookie), el id del recurso, los datos.
- **Nunca asumas que "ya se lo dije antes".** Si no viaja en esta petición, el servidor no lo sabe.
- **El estado vive en el cliente.** Tu aplicación (por ejemplo, con Context API o `useState`) es la que recuerda cosas como "el usuario está logueado" o "este es el carrito". Lo que recuerda el servidor son los datos guardados (en su base de datos), no la conversación.

### Resumen express

- Servidor **sin estado** = no recuerda peticiones anteriores.
- Cada petición debe ser **completa por sí sola**.
- La "memoria" de la sesión se logra con **credenciales** (cookies o tokens) que tú envías cada vez.


## API y navegación de JSON complejo

### Repaso rápido de JSON

JSON es el formato de texto en que casi todas las APIs devuelven datos. Se parece mucho a los objetos y arrays de JavaScript:

- **Objeto:** `{ "clave": valor }`, se usa para describir una cosa.
- **Array:** `[ elemento1, elemento2 ]`, se usa para una lista de cosas.
- Los valores pueden ser texto, número, `true`/`false`, `null`, otro objeto u otro array.

El detalle es que **pueden anidarse**: un objeto dentro de un objeto, dentro de un array, y así.

### Un JSON "complejo" de ejemplo

Esto es lo que podría devolver una API de una tienda:

```json
{
  "pedido": {
    "id": 8821,
    "cliente": {
      "nombre": "Ana Pérez",
      "direccion": {
        "ciudad": "Buenos Aires",
        "calle": "Av. Rivadavia 1234"
      }
    },
    "productos": [
      { "nombre": "Teclado", "precio": 45, "cantidad": 1 },
      { "nombre": "Mouse", "precio": 20, "cantidad": 2 }
    ],
    "envio": null
  }
}
```

A primera vista parece un laberinto. Pero hay una estrategia sencilla.

### La técnica: léelo como un mapa de carpetas

Piensa en carpetas dentro de carpetas en tu computadora. Para llegar a un archivo, escribes la ruta paso a paso: `Documentos > Trabajo > informe.pdf`. Con JSON es igual. Para llegar a un dato, sigues la **ruta** con puntos (para objetos) y corchetes con números (para arrays).

Supongamos que guardaste la respuesta en una variable llamada `datos`:

| Quiero... | Ruta | Resultado |
|---|---|---|
| El id del pedido | `datos.pedido.id` | `8821` |
| El nombre del cliente | `datos.pedido.cliente.nombre` | `"Ana Pérez"` |
| La ciudad del cliente | `datos.pedido.cliente.direccion.ciudad` | `"Buenos Aires"` |
| El primer producto | `datos.pedido.productos[0]` | `{ nombre: "Teclado", ... }` |
| El nombre del segundo producto | `datos.pedido.productos[1].nombre` | `"Mouse"` |

### Regla de oro para los arrays

**Los arrays empiezan a contar desde 0.** El primer elemento es `[0]`, el segundo `[1]`, el tercero `[2]`. Es una de las fuentes de errores más comunes. Si pides `[2]` en una lista de solo dos elementos, obtienes `undefined`.

### Método paso a paso para no perderte

Cuando recibas una respuesta enorme de una API, sigue estos pasos:

1. **Imprímela completa.** `console.log(datos)` y mírala con calma.
2. **Identifica qué es cada nivel.** ¿Es un objeto `{}` o un array `[]`? Eso decide si usas punto o corchete.
3. **Baja un nivel a la vez.** Haz `console.log(datos.pedido)`, luego `console.log(datos.pedido.cliente)`, y así. Si en algún paso ves `undefined`, te equivocaste en ese nivel.
4. **Cuando llegues a un array, decide qué necesitas:** ¿un elemento puntual (`[0]`) o recorrerlos todos?

### El error más famoso: `Cannot read properties of undefined`

Seguramente te vas a topar con este mensaje. Significa: "intentaste entrar a algo que no existe". Por ejemplo, en el JSON de arriba, `envio` vale `null`. Si intentas esto:

```js
console.log(datos.pedido.envio.empresa); // ❌ Error
```

JavaScript se queja porque `envio` es `null` y `null` no tiene propiedades. La solución cómoda se llama **encadenamiento opcional** (`?.`):

```js
console.log(datos.pedido.envio?.empresa); // ✅ undefined, sin romper nada
```

El `?.` significa: "si lo anterior existe, sigue; si no, detente y devuelve `undefined` en vez de dar error". Úsalo cuando no estés seguro de que un dato venga en la respuesta.

También puedes poner un valor por defecto con `??`:

```js
const empresa = datos.pedido.envio?.empresa ?? "Sin envío asignado";
console.log(empresa); // "Sin envío asignado"
```

### Desestructuración: sacar varios datos de una vez

Si vas a usar muchos datos de un mismo nivel, escribir la ruta completa cada vez es cansado. Puedes "desempacar" los datos:

```js
const { nombre, direccion } = datos.pedido.cliente;
const { ciudad } = direccion;

console.log(nombre, ciudad); // "Ana Pérez" "Buenos Aires"
```

Es solo una forma más corta de escribir lo mismo.

### Práctica sugerida: una API real

JSONPlaceholder devuelve usuarios con datos anidados. Pruébalo:

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");
const usuario = await respuesta.json();

console.log(usuario);
```

Intenta responder usando solo la consola:

1. ¿Cuál es el nombre de la empresa del usuario? (pista: busca el objeto `company`)
2. ¿Cuál es la latitud de su dirección? (pista: `address` → `geo` → `lat`)
3. ¿Qué pasa si pides `usuario.company.slogan`? ¿Cómo evitarías un error si no existiera?