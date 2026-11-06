# Aprender a nombrar, etiquetar y reutilizar los flujos con funciones

Hasta ahora has aprendido a escribir instrucciones: declarar variables, trabajar con tipos de datos, usar operadores y controlar el flujo con `if`, `switch` y bucles. Con eso ya puedes resolver problemas. Pero hay un detalle que aparece rápido: **el código empieza a repetirse**.

Imagina que tienes que calcular el precio final de un producto con impuestos en cinco lugares distintos de tu programa. Podrías copiar y pegar la misma fórmula cinco veces. Funciona... hasta que el impuesto cambia, y tienes que acordarte de modificar las cinco copias. Si olvidas una, tu programa tendrá un error silencioso.

Las **funciones** son la herramienta que resuelve este problema. Una función te permite:

1. **Nombrar** un flujo de instrucciones (darle una etiqueta con significado).
2. **Reutilizarlo** tantas veces como quieras, desde cualquier parte.
3. **Cambiar su comportamiento en un solo lugar**, y que todos los usos se actualicen.

En este artículo vas a aprender a pensar con funciones, no solo a escribirlas. La sintaxis se aprende en una tarde; el criterio para decidir *qué* convertir en función, *cómo* llamarla y *qué* debe recibir y devolver se desarrolla con práctica.

## Una función es un flujo con nombre

Piensa en una receta de cocina. La receta de "tortilla de papas" tiene un nombre, una lista de ingredientes (lo que *necesita*) y unos pasos que producen un resultado (la tortilla). No necesitas reescribir los pasos cada vez que alguien dice "prepara una tortilla": simplemente usas la receta.

Una función funciona igual:

| Receta | Función |
|---|---|
| Nombre de la receta | Nombre de la función |
| Ingredientes | Parámetros (entradas) |
| Pasos | Cuerpo de la función |
| El plato terminado | Valor de retorno (salida) |
| "Prepara la receta" | Llamar o invocar la función |

### El problema que resuelven: la repetición

Observa este código sin funciones:

```javascript
const precioLibro = 20;
const precioLibroConIva = precioLibro + precioLibro * 0.21;
console.log("Libro:", precioLibroConIva);

const precioCuaderno = 8;
const precioCuadernoConIva = precioCuaderno + precioCuaderno * 0.21;
console.log("Cuaderno:", precioCuadernoConIva);

const precioMochila = 45;
const precioMochilaConIva = precioMochila + precioMochila * 0.21;
console.log("Mochila:", precioMochilaConIva);
```

Hay tres problemas:

- **Repetición**: la fórmula `precio + precio * 0.21` aparece tres veces.
- **Fragilidad**: si el IVA cambia, hay que editar tres líneas.
- **Falta de significado**: al leer `precio + precio * 0.21`, el lector tiene que *deducir* que se está calculando un precio con IVA.

Ahora el mismo programa con una función:

```javascript
function calcularPrecioConIva(precio) {
  return precio + precio * 0.21;
}

console.log("Libro:", calcularPrecioConIva(20));
console.log("Cuaderno:", calcularPrecioConIva(8));
console.log("Mochila:", calcularPrecioConIva(45));
```

El código es más corto, pero lo más importante es que **ahora el nombre cuenta la historia**. `calcularPrecioConIva(20)` se lee casi como una frase en español.

> **Idea clave:** una función no es solo una forma de ahorrar líneas. Es una forma de **ponerle nombre a una idea** para que tú (y otras personas) puedan razonar sobre el programa a un nivel más alto.

## Anatomía de una función

### Declaración de función

```javascript
function saludar(nombre) {
  return "Hola, " + nombre + "!";
}
```

Veamos cada parte:

- `function`: palabra clave que indica que vas a definir una función.
- `saludar`: el **nombre** de la función.
- `(nombre)`: la lista de **parámetros**, es decir, los datos que la función espera recibir.
- `{ ... }`: el **cuerpo**, donde se escriben las instrucciones.
- `return`: devuelve un valor a quien llamó la función y termina su ejecución.

### Llamar (invocar) la función

Definir una función **no la ejecuta**. Es como escribir una receta: no hay tortilla hasta que alguien cocina.

```javascript
const mensaje = saludar("Ana");
console.log(mensaje); // "Hola, Ana!"
```

Aquí `"Ana"` es un **argumento**: el valor concreto que se le pasa al parámetro `nombre`.

### Parámetros vs. argumentos

Estos dos términos se confunden con frecuencia:

- **Parámetro**: la variable que aparece en la *definición* de la función (`nombre`).
- **Argumento**: el valor real que pasas al *llamarla* (`"Ana"`).

```javascript
function sumar(a, b) {   // a y b son parámetros
  return a + b;
}

sumar(3, 4);             // 3 y 4 son argumentos
```

### Funciones sin parámetros y sin retorno

No todas las funciones necesitan entradas o salidas.

```javascript
function mostrarBienvenida() {
  console.log("Bienvenido a la aplicación");
}

mostrarBienvenida();
```

Esta función no recibe nada y no devuelve nada: solo ejecuta una acción (un *efecto*). Cuando una función no tiene `return`, devuelve `undefined`.


## `return`: la diferencia entre mostrar y devolver

Este es uno de los errores más comunes en quienes están empezando. Compara:

```javascript
function sumarYMostrar(a, b) {
  console.log(a + b);
}

function sumar(a, b) {
  return a + b;
}
```

```javascript
const x = sumarYMostrar(2, 3); // imprime 5, pero x es undefined
const y = sumar(2, 3);         // no imprime nada, pero y vale 5
```

- `console.log` **muestra** un valor en la consola, pero el programa no puede seguir usándolo.
- `return` **entrega** el valor al código que llamó a la función, que puede guardarlo, operarlo o pasarlo a otra función.

> **Regla práctica:** si el resultado va a ser usado por otra parte del programa, usa `return`. Reserva `console.log` para depurar o para mostrar información al usuario.

### `return` termina la función

Todo lo que esté después de un `return` no se ejecuta:

```javascript
function esMayorDeEdad(edad) {
  if (edad >= 18) {
    return true;
  }
  return false;
  console.log("Esto nunca se ejecuta");
}
```

Esta propiedad es útil para escribir funciones más claras mediante **retornos tempranos** (*early returns*):

```javascript
function clasificarTemperatura(grados) {
  if (grados < 0) return "Congelante";
  if (grados < 15) return "Frío";
  if (grados < 25) return "Templado";
  return "Caluroso";
}
```

Este patrón conecta directamente con el control de flujo que ya viste: la función encapsula una decisión completa y le pone un nombre.


## Nombrar bien: el arte de etiquetar flujos

Si las funciones son etiquetas para ideas, **el nombre es lo más importante que escribes**. Un buen nombre ahorra comentarios, explicaciones y errores.

### Principios para nombrar funciones

**1. Usa verbos.** Una función *hace* algo, así que su nombre debería describir una acción.

| Poco claro | Más claro |
|---|---|
| `precio()` | `calcularPrecio()` |
| `usuario()` | `obtenerUsuario()` |
| `datos()` | `validarDatos()` |

**2. Describe qué hace, no cómo lo hace.** El nombre debe comunicar la intención.

```javascript
// ❌ Describe la implementación
function multiplicarPorUnoPuntoVeintiuno(x) { ... }

// ✅ Describe la intención
function aplicarIva(x) { ... }
```

**3. Para preguntas de sí/no, usa prefijos como `es`, `tiene`, `puede`.**

```javascript
function esPar(numero) {
  return numero % 2 === 0;
}

function tienePermiso(usuario) { ... }
function puedeEditar(documento) { ... }
```

Al leer `if (esPar(n))` el código se entiende sin comentarios.

**4. Sé consistente.** Si usas `obtener` para leer datos, no mezcles con `traer`, `buscar` y `conseguir` sin motivo. Elige un vocabulario y mantenlo.

**5. Una función, una responsabilidad.** Si te cuesta nombrarla sin usar "y" (`validarYGuardarYNotificar`), probablemente hace demasiadas cosas y conviene dividirla.

### Convenciones de estilo

En JavaScript y TypeScript, la convención habitual es **camelCase** para funciones y variables: `calcularPromedio`, `obtenerNombreCompleto`. La primera palabra va en minúscula y las siguientes comienzan con mayúscula.

### Un ejercicio mental

Mira este nombre: `procesar(x)`. ¿Qué procesa? ¿Qué devuelve? ¿Qué efecto tiene? No se puede saber sin leer el cuerpo. Ahora compara con `convertirCelsiusAFahrenheit(temperatura)`. Con el nombre solo ya tienes una buena idea de qué entra, qué sale y para qué sirve.



## Tres formas de definir funciones

JavaScript ofrece varias sintaxis. Es importante reconocerlas todas porque las verás en código real.

### 1. Declaración de función

```javascript
function duplicar(n) {
  return n * 2;
}
```

Característica especial: las declaraciones se **elevan** (*hoisting*), es decir, puedes llamarlas antes de la línea donde están escritas.

```javascript
console.log(duplicar(4)); // 8 — funciona aunque la definición esté abajo

function duplicar(n) {
  return n * 2;
}
```

### 2. Expresión de función

Aquí la función se guarda en una variable:

```javascript
const duplicar = function (n) {
  return n * 2;
};
```

Esto revela algo fundamental: **en JavaScript, las funciones son valores**. Se pueden guardar en variables, pasar como argumentos y devolver desde otras funciones. A diferencia de las declaraciones, las expresiones **no** se elevan: debes definirlas antes de usarlas.

### 3. Arrow function (función flecha)

Una sintaxis más compacta, muy usada en código moderno:

```javascript
const duplicar = (n) => {
  return n * 2;
};

// Si el cuerpo es una sola expresión, puedes omitir llaves y return
const duplicar = (n) => n * 2;
```

Con un solo parámetro, los paréntesis son opcionales en JavaScript (aunque muchos equipos los mantienen por consistencia):

```javascript
const duplicar = n => n * 2;
```

### ¿Cuál debería usar?

Al comenzar, lo importante es **ser consistente y legible**. Una guía sencilla:

- Usa **declaraciones** (`function nombre() {}`) para funciones principales y reutilizables de tu programa.
- Usa **arrow functions** para funciones cortas, especialmente como argumentos de otras funciones.

## Parámetros en detalle

### Parámetros por defecto

Puedes dar un valor de respaldo cuando no se envía un argumento:

```javascript
function saludar(nombre = "invitado") {
  return `Hola, ${nombre}!`;
}

saludar("Lucía"); // "Hola, Lucía!"
saludar();        // "Hola, invitado!"
```

### Template literals

Fíjate en el uso de las comillas invertidas (`` ` ``) y `${}`. Permiten insertar valores dentro de un texto de forma más legible que la concatenación con `+`.

### Múltiples parámetros: el orden importa

```javascript
function calcularDescuento(precio, porcentaje) {
  return precio - precio * (porcentaje / 100);
}

calcularDescuento(200, 15); // 170
calcularDescuento(15, 200); // -15 ← el orden invertido da un resultado absurdo
```

Cuando una función tiene más de dos o tres parámetros, es fácil confundir el orden. Más adelante verás cómo usar objetos para hacer las llamadas más legibles.


## Alcance (*scope*): dónde vive cada variable

Cada función crea su propio espacio de variables. Lo que declaras dentro **no es visible desde afuera**.

```javascript
function calcularTotal(precio) {
  const impuesto = precio * 0.21; // existe solo dentro de la función
  return precio + impuesto;
}

calcularTotal(100);
console.log(impuesto); // ❌ ReferenceError: impuesto is not defined
```

Esto es una **ventaja**, no una limitación: cada función es una "caja" autocontenida. No tienes que preocuparte de que una variable interna choque con otra del mismo nombre en otra parte del programa.

### Variables locales y globales

```javascript
const IVA = 0.21; // global: visible en todo el archivo

function calcularConIva(precio) {
  const total = precio * (1 + IVA); // local: solo existe aquí
  return total;
}
```

Una función **puede leer** variables definidas fuera de ella, pero conviene evitarlo cuando es posible. Una función que depende solo de sus parámetros es más fácil de entender, probar y reutilizar.

### Funciones puras: un ideal a perseguir

Una **función pura** cumple dos condiciones:

1. Dado el mismo input, siempre devuelve el mismo output.
2. No modifica nada fuera de sí misma (no tiene efectos secundarios).

```javascript
// ✅ Pura
function sumar(a, b) {
  return a + b;
}

// ❌ No pura: depende de y modifica una variable externa
let contador = 0;
function incrementar() {
  contador++;
  return contador;
}
```

No todas tus funciones serán puras (mostrar algo en pantalla ya es un efecto), pero **separar la lógica de cálculo de los efectos** hace tu código mucho más predecible.


## TypeScript: etiquetar también lo que entra y lo que sale

Hasta aquí, JavaScript te permite llamar `calcularDescuento("hola", true)` sin quejarse. El error aparecerá en tiempo de ejecución, quizá mucho después, de forma confusa. TypeScript añade **tipos** para detectar estos problemas mientras escribes.

### Tipar parámetros y retorno

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}
```

- `a: number` y `b: number`: los parámetros deben ser números.
- `: number` después de los paréntesis: la función devuelve un número.

Ahora, si intentas esto:

```typescript
sumar("2", 3);
// ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

TypeScript te avisa **antes de ejecutar** el programa.

> **Idea clave:** los tipos son otra forma de etiquetado. El nombre te dice *qué hace* la función; los tipos te dicen *qué necesita* y *qué entrega*. Juntos funcionan como un contrato.

### Funciones que no devuelven nada: `void`

```typescript
function mostrarBienvenida(nombre: string): void {
  console.log(`Bienvenido, ${nombre}`);
}
```

### Parámetros opcionales

Con `?` indicas que el argumento puede omitirse:

```typescript
function saludar(nombre: string, titulo?: string): string {
  if (titulo) {
    return `Hola, ${titulo} ${nombre}`;
  }
  return `Hola, ${nombre}`;
}

saludar("Pérez", "Dr.");  // "Hola, Dr. Pérez"
saludar("Pérez");         // "Hola, Pérez"
```

Dentro de la función, `titulo` puede ser `string` o `undefined`, y TypeScript te obliga a comprobarlo antes de usarlo. Eso previene muchos errores clásicos.

### Parámetros por defecto con tipos

```typescript
function crearSaludo(nombre: string = "invitado"): string {
  return `Hola, ${nombre}`;
}
```

TypeScript infiere el tipo desde el valor por defecto, así que también podrías escribir `nombre = "invitado"`.

### Inferencia de tipos del retorno

TypeScript puede deducir el tipo de retorno:

```typescript
function duplicar(n: number) {
  return n * 2; // TypeScript infiere: number
}
```

Aun así, **declarar el tipo de retorno explícitamente** en funciones importantes es una buena práctica: documenta tu intención y detecta errores si el cuerpo devuelve algo distinto de lo esperado.

### Tipar arrow functions

```typescript
const multiplicar = (a: number, b: number): number => a * b;
```

### Tipos de unión en parámetros

```typescript
function formatearId(id: string | number): string {
  return `ID-${id}`;
}

formatearId(42);      // "ID-42"
formatearId("abc");   // "ID-abc"
```

### Un contrato completo en acción

```typescript
function esMayorDeEdad(edad: number): boolean {
  return edad >= 18;
}
```

Solo leyendo la firma `esMayorDeEdad(edad: number): boolean` ya sabes todo lo esencial: recibe un número, devuelve verdadero o falso. No necesitas ver el cuerpo.


## Reutilizar flujos: funciones que llaman a funciones

El verdadero poder aparece cuando **combinas** funciones pequeñas para construir comportamientos complejos.

### Descomponer un problema

Supón que necesitas calcular el total de una compra con descuento e impuestos, y mostrar el resultado formateado. En lugar de una función gigante, descompón:

```typescript
function aplicarDescuento(precio: number, porcentaje: number): number {
  return precio - precio * (porcentaje / 100);
}

function aplicarIva(precio: number, tasa: number = 0.21): number {
  return precio + precio * tasa;
}

function formatearMoneda(monto: number): string {
  return `$${monto.toFixed(2)}`;
}

function calcularTotalFinal(precio: number, descuento: number): string {
  const conDescuento = aplicarDescuento(precio, descuento);
  const conIva = aplicarIva(conDescuento);
  return formatearMoneda(conIva);
}

console.log(calcularTotalFinal(100, 10)); // "$108.90"
```

Observa los beneficios:

- Cada función es **pequeña y fácil de probar** por separado.
- `calcularTotalFinal` **se lee como una receta**: aplicar descuento, aplicar IVA, formatear.
- Si el formato de moneda cambia, modificas **solo** `formatearMoneda`.
- Puedes **reutilizar** `aplicarIva` en otros cálculos sin tocar nada más.

### Funciones como valores: pasar funciones a otras funciones

Como las funciones son valores, puedes pasarlas como argumentos. Este es el fundamento de muchas operaciones que usarás constantemente:

```typescript
const precios: number[] = [10, 20, 30];

const preciosConIva = precios.map((p) => aplicarIva(p));
// [12.1, 24.2, 36.3]

const baratos = precios.filter((p) => p < 25);
// [10, 20]
```

Aquí `map` y `filter` reciben una función y la aplican a cada elemento. Más adelante profundizarás en esto, pero ya puedes ver la idea: **separar el "qué hacer" del "con qué datos hacerlo"**.


## Errores frecuentes (y cómo evitarlos)

### 1. Olvidar el `return`

```javascript
function sumar(a, b) {
  a + b; // calcula, pero no devuelve nada
}

sumar(2, 3); // undefined
```

### 2. Llamar la función sin paréntesis

```javascript
const resultado = saludar;     // guarda la función misma, no la ejecuta
const resultado = saludar();   // ejecuta y guarda el resultado
```

### 3. Confundir `console.log` con `return`

Si necesitas usar el valor después, devuélvelo. Mostrarlo no es lo mismo que entregarlo.

### 4. Modificar variables externas sin darte cuenta

```javascript
let total = 0;
function agregar(n) {
  total += n; // efecto secundario oculto
}
```

Prefiere recibir datos por parámetro y devolver resultados.

### 5. Funciones que hacen demasiado

Si una función tiene 60 líneas y hace validación, cálculo, formato y guardado, divídela.

### 6. Nombres vagos

`hacerCosa()`, `procesar()`, `datos()` obligan a leer el cuerpo para entender el propósito.
