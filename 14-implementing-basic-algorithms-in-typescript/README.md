# Implementando algoritmos básicos en TypeScript

Un algoritmo es una receta: una secuencia ordenada de pasos que transforma una entrada en un resultado. Cuando se preparan panqueques, se sigue un algoritmo sin darse cuenta: mezclar harina, huevo y leche, batir, calentar la sartén, verter la masa y dar vuelta cuando se doren los bordes. Si se cambia el orden, el resultado final cambia.

En este módulo se va a aprender a **pensar en pasos** y a **traducir esos pasos a código** usando TypeScript. Se realizará en tres prácticas que se apoyan entre sí:

1. **JavaScript and TypeScript Fundamentals**: el lenguaje y sus reglas básicas.
2. **Data Types and Basic Operators in TypeScript**: con qué "materiales" se trabaja y cómo se combinan.
3. **Mastering Control Flow in TypeScript**: cómo se decide qué sucede y cuántas veces sucede.

> **Idea central del módulo:** un algoritmo se construye con tres ingredientes: **datos** (qué se maneja), **operaciones** (qué se les hace) y **decisiones** (en qué orden y bajo qué condiciones). Cada práctica entrega uno de esos ingredientes.

## JavaScript and TypeScript Fundamentals

JavaScript es el lenguaje que entienden los navegadores y Node.js. TypeScript es JavaScript **con un sistema de tipos encima**: permite describir qué clase de dato se espera y avisa *antes de ejecutar* si algo no coincide. Una analogía útil: JavaScript es manejar sin cinturón de seguridad; TypeScript es el mismo auto, pero con cinturón y alarma de proximidad. Se llega al mismo destino, con menos riesgos.

El flujo de trabajo es el siguiente:

```
archivo.ts  →  compilador de TypeScript (tsc)  →  archivo.js  →  se ejecuta
```

TypeScript revisa el código y, si todo está bien, lo convierte en JavaScript común. Por eso **todo lo que se sabe de JavaScript sigue siendo válido**.

### Tu primer programa

```ts
const nombre: string = "Ada";
console.log(`Hola, ${nombre}. Bienvenida al mundo de los algoritmos.`);
```

Observe las piezas:

| Pieza | Qué hace |
|---|---|
| `const` | Declara un valor que no se va a reasignar |
| `nombre` | El nombre (identificador) que se elige |
| `: string` | La **anotación de tipo**: "esto es texto" |
| `` `...${}...` `` | Plantilla de texto: combina texto fijo con valores |
| `console.log` | Muestra algo por consola |

### `const` y `let`: ¿cuál uso?

```ts
const pi = 3.14159;   // no cambia nunca
let contador = 0;     // va a cambiar
contador = contador + 1;
```

**Regla práctica:** se empieza siempre con `const`. Se cambia a `let` solo cuando sea necesario reasignar. Se evita `var`: es una herencia antigua de JavaScript con comportamientos confusos.

### Funciones: algoritmos con nombre

Una función es un algoritmo empaquetado: recibe entradas (parámetros) y devuelve una salida.

```ts
function duplicar(numero: number): number {
  return numero * 2;
}

console.log(duplicar(4)); // 8
```

Aquí TypeScript ya protege:

```ts
duplicar("cuatro"); // ❌ Error: "cuatro" no es un number
```

Ese error aparece **en el editor**, antes de que el programa se ejecute. Esa es la gran ventaja: los errores se detectan sin que nada se rompa.

### Para pensar

- ¿Por qué resulta útil que el error aparezca antes de ejecutar y no durante?
- Escriba una función `saludar(nombre: string): string` que devuelva un saludo. ¿Qué ocurre si se le pasa un número?


## Data Types and Basic Operators in TypeScript

### Los tipos primitivos: materiales de construcción

```ts
const edad: number = 30;              // números (enteros y decimales)
const ciudad: string = "Buenos Aires"; // texto
const esDocente: boolean = true;      // verdadero o falso
const sinValor: null = null;          // ausencia intencional de valor
let pendiente: undefined = undefined; // valor aún no asignado
```

Y dos tipos compuestos que se usan con frecuencia:

```ts
const notas: number[] = [8, 9, 7, 10];  // arreglo (lista) de números

const alumno: { nombre: string; edad: number } = {
  nombre: "Lucía",
  edad: 22,
};
```

### Inferencia de tipos: TypeScript también observa

No siempre hace falta escribir el tipo. TypeScript lo deduce:

```ts
const total = 25;      // TypeScript infiere: number
const saludo = "Hola"; // TypeScript infiere: string
```

**Criterio:** se deja que infiera cuando el valor es obvio; se anota el tipo explícitamente en los parámetros y retornos de las funciones, donde funciona como documentación.

### Operadores: cómo combinamos los datos

**Aritméticos**

```ts
const suma = 10 + 3;        // 13
const resta = 10 - 3;       // 7
const producto = 10 * 3;    // 30
const division = 10 / 3;    // 3.333...
const resto = 10 % 3;       // 1  (el resto de la división)
const potencia = 2 ** 3;    // 8
```

> El operador `%` (resto) es muy útil en algoritmos. Con él se puede saber si un número es par: `numero % 2 === 0`.

**De comparación**

```ts
5 > 3;     // true
5 === 5;   // true  (igualdad estricta)
5 !== 4;   // true
```

⚠️ **Se debe usar siempre `===` y `!==`** (estrictos). Los operadores `==` y `!=` convierten tipos por detrás y producen resultados sorprendentes, como `"5" == 5` → `true`.

**Lógicos**

```ts
const tieneEntrada = true;
const esMayor = true;

tieneEntrada && esMayor; // true  → AND: ambas deben cumplirse
tieneEntrada || esMayor; // true  → OR: alcanza con una
!tieneEntrada;           // false → NOT: invierte el valor
```

### Un mini algoritmo con lo aprendido

**Problema:** calcular el promedio de un arreglo de notas.

**Paso a paso (en lenguaje humano):**
1. Sumar todas las notas.
2. Dividir esa suma por la cantidad de notas.

```ts
function promedio(notas: number[]): number {
  const suma = notas[0] + notas[1] + notas[2] + notas[3];
  return suma / notas.length;
}

console.log(promedio([8, 9, 7, 10])); // 8.5
```

Funciona... pero **solo para 4 notas**. ¿Y si son 3? ¿O 30? Para resolverlo, hace falta repetir una operación un número variable de veces. Ahí entra la tercera práctica. 👇

### Para pensar

- ¿Qué devuelve `"5" + 3` en JavaScript? ¿Y `"5" - 3`? ¿Por qué TypeScript ayuda a evitar esta confusión?
- Escriba una expresión que sea `true` solo si un número es par **y** mayor que 10.

---

## Mastering Control Flow in TypeScript

El **flujo de control** es el orden en que se ejecutan las instrucciones. Por defecto, el código corre de arriba hacia abajo. Con condicionales y bucles, se decide **cuándo saltar** y **cuándo repetir**.

### Decidir: `if`, `else if`, `else`

```ts
function clasificarNota(nota: number): string {
  if (nota >= 9) {
    return "Sobresaliente";
  } else if (nota >= 6) {
    return "Aprobado";
  } else {
    return "A recuperar";
  }
}

console.log(clasificarNota(7)); // "Aprobado"
```

El programa evalúa las condiciones **en orden** y ejecuta solo la primera que sea verdadera. Por eso el orden importa: se puede invertir las condiciones y observar qué ocurre.

Cuando hay muchos casos sobre un mismo valor, `switch` resulta más legible:

```ts
function nombreDelDia(dia: number): string {
  switch (dia) {
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    default:
      return "Otro día";
  }
}
```

### Repetir: bucles

**`for`: cuando se sabe cuántas vueltas se darán**

```ts
for (let i = 0; i < 5; i++) {
  console.log(`Vuelta número ${i}`);
}
```

Un `for` tiene tres partes: **inicio** (`let i = 0`), **condición para seguir** (`i < 5`) y **avance** (`i++`).

**`while`: cuando se repite hasta que algo se cumpla**

```ts
let intentos = 0;
while (intentos < 3) {
  console.log("Intentando...");
  intentos++;
}
```

**`for...of`: cuando se recorren los elementos de un arreglo**

```ts
const notas: number[] = [8, 9, 7, 10];
for (const nota of notas) {
  console.log(nota);
}
```

### Resolviendo el problema pendiente

Ahora sí, un promedio que funciona con **cualquier cantidad** de notas:

```ts
function promedio(notas: number[]): number {
  let suma = 0;
  for (const nota of notas) {
    suma += nota;
  }
  return suma / notas.length;
}

console.log(promedio([8, 9, 7, 10]));        // 8.5
console.log(promedio([6, 7, 8, 9, 10, 5]));  // 7.5
```

Este es el patrón **acumulador**: una variable que empieza con un valor inicial y va creciendo en cada vuelta.

### Tres algoritmos clásicos para practicar

**1. Contar cuántos elementos cumplen una condición**

```ts
function contarPares(numeros: number[]): number {
  let cantidad = 0;
  for (const n of numeros) {
    if (n % 2 === 0) {
      cantidad++;
    }
  }
  return cantidad;
}
```

**2. Encontrar el mayor valor**

```ts
function mayor(numeros: number[]): number {
  let max = numeros[0];
  for (const n of numeros) {
    if (n > max) {
      max = n;
    }
  }
  return max;
}
```

**3. Buscar un elemento**

```ts
function existe(numeros: number[], buscado: number): boolean {
  for (const n of numeros) {
    if (n === buscado) {
      return true; // ¡se corta apenas se encuentra!
    }
  }
  return false;
}
```

Se observa que los tres combinan **los tres ingredientes**: datos (el arreglo), operaciones (`%`, `>`, `===`) y decisiones (`if` dentro de un bucle).

### Errores frecuentes (y cómo detectarlos)

| Error | Síntoma | Cómo evitarlo |
|---|---|---|
| **Bucle infinito** | El programa se cuelga | Verificar que la condición del `while` pueda dejar de cumplirse |
| **Error por uno** (off-by-one) | Se pasa o se queda corta una vuelta | Probar con un arreglo de 1 elemento y uno vacío |
| **Usar `=` en vez de `===`** | Asigna en lugar de comparar | Volver a leer las condiciones en voz alta |
| **No inicializar el acumulador** | Resultado `NaN` o `undefined` | Definir siempre el valor inicial (`let suma = 0`) |


## Cómo se conectan las tres prácticas

```
Práctica 1                Práctica 2                 Práctica 3
Fundamentos      →        Tipos y operadores    →    Control de flujo
(el lenguaje)             (datos y operaciones)      (decisiones y repeticiones)
        \                        |                        /
         \_______________________|_______________________/
                                 ↓
                    Algoritmos que resuelven problemas
```

Cada práctica sin las otras queda incompleta: los tipos sin control de flujo son datos inertes; el control de flujo sin tipos es un camino sin señales.

## Y esto, ¿para qué sirve como AI Engineer?

Todo sistema de IA moderno está rodeado de código "común" que prepara datos, valida entradas, recorre listas de resultados, filtra respuestas y decide qué hacer según una condición. Los bucles, los condicionales y los tipos que se vieron aquí son **el pegamento** de esos sistemas. Además, cuando se trabajen con APIs y estructuras de datos más complejas, los tipos de TypeScript ahorrarán horas de depuración.

## Cómo estudiar este módulo (para que quede grabado)

- **Escribir el código a mano.** No copiar y pegar: los dedos también aprenden.
- **Romper los ejemplos a propósito.** Cambiar un `<` por un `<=`, borrar el valor inicial del acumulador y observar qué ocurre. Entender *por qué* falla es entender cómo funciona.
- **Explicarlo en voz alta.** Si se puede explicar un bucle a alguien sin código, se entendió.
- **Practicar poco, pero todos los días.** 20 minutos diarios rinden más que 3 horas un solo día: la repetición espaciada fortalece las conexiones.
- **Equivocarse es parte del proceso.** Cada error del compilador es una pista, no un reproche.


## Desafío final

Escriba una función `resumenDeNotas(notas: number[]): string` que devuelva un texto como:

> `"Promedio: 8.5 | Mayor: 10 | Aprobadas: 4 de 4"`

Pistas: se necesita un acumulador para el promedio, un patrón de "mayor valor" y un contador con `if`. Si se logra, ya se combinaron todo lo aprendido en el módulo. 🎉


## Glosario rápido

- **Algoritmo:** secuencia finita de pasos para resolver un problema.
- **Tipo:** la clase de valor que puede guardar una variable (`number`, `string`, `boolean`...).
- **Operador:** símbolo que combina o compara valores (`+`, `===`, `&&`).
- **Condicional:** estructura que decide qué código se ejecuta según una condición.
- **Bucle:** estructura que repite instrucciones.
- **Acumulador:** variable que va guardando un resultado parcial en cada vuelta.
- **Prueba de escritorio:** simulación manual de un algoritmo, paso a paso.