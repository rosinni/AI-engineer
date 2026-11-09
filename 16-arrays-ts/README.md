# Manipular, ordenar y buscar en colecciones de datos

Casi todo lo que vas a construir como AI Engineer es una **colección de algo**:

- una lista de mensajes de un chat,
- los resultados que devuelve una API,
- los documentos que le pasas a un modelo,
- las filas de un dataset.

Un **array** es la estructura que guarda esa colección **en orden**. Y TypeScript agrega una promesa extra: *"todos los elementos de esta colección son del mismo tipo"*.


## Radiografía de un array

Mira este código y su "radiografía" justo debajo:

```ts
const frutas: string[] = ["manzana", "pera", "uva", "kiwi"];
```

```
  frutas
    │
    ▼
 índice →    0           1         2        3
          ┌───────────┬─────────┬────────┬────────┐
 valor →  │ "manzana" │ "pera"  │ "uva"  │ "kiwi" │
          └───────────┴─────────┴────────┴────────┘
                                                  ▲
 frutas.length → 4                                │
 último índice → frutas.length - 1  = 3 ──────────┘
```

**Cómo se conecta el código con la imagen:**

| Código | Qué hace | Resultado |
|---|---|---|
| `frutas[0]` | Lee el casillero 0 | `"manzana"` |
| `frutas[3]` | Lee el casillero 3 | `"kiwi"` |
| `frutas.length` | Cuenta cuántos casilleros hay | `4` |
| `frutas[frutas.length - 1]` | Lee el último | `"kiwi"` |
| `frutas.at(-1)` | Lo mismo, con sintaxis moderna | `"kiwi"` |
| `frutas[10]` | Casillero que no existe | `undefined` |

---

## Tipando arrays: lo que TypeScript te protege

Hay dos formas equivalentes de escribir el tipo de un array:

```ts
const edades: number[] = [25, 31, 19];        // la forma más común
const nombres: Array<string> = ["Ana", "Luis"]; // forma genérica, equivalente
```

### Antes y después de tener tipos

**Sin tipos (JavaScript):** el error aparece *cuando el programa ya corre*.

```js
const edades = [25, 31, 19];
edades.push("veinte");        // JS lo permite... y rompe cuentas más adelante
```

**Con tipos (TypeScript):** el error aparece *mientras escribes*.

```ts
const edades: number[] = [25, 31, 19];
edades.push("veinte");
// ❌ Error TS2345: Argument of type 'string' is not assignable
//    to parameter of type 'number'.
```

### Tres detalles que conviene conocer

```ts
// 1. Un array vacío necesita su tipo, si no TypeScript no sabe qué guardarás
const tareas: string[] = [];

// 2. Arrays de objetos: define primero la forma del objeto
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}
const catalogo: Producto[] = [];

// 3. readonly: un array que nadie puede modificar
const diasLaborales: readonly string[] = ["lun", "mar", "mié", "jue", "vie"];
diasLaborales.push("sáb");
// ❌ Error TS2339: Property 'push' does not exist on type 'readonly string[]'.
```

> 💡 **Regla práctica:** si una función solo *lee* un array y no debería modificarlo, tipa el parámetro como `readonly Producto[]`. Es una forma de dejar escrita tu intención.

<!-- ## Los datos con los que vamos a trabajar

Durante el resto del artículo usaremos **el mismo catálogo**, así puedes comparar resultados fácilmente:

```ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

const catalogo: Producto[] = [
  { id: 1, nombre: "Teclado", precio: 45,   categoria: "periféricos",  stock: 12 },
  { id: 2, nombre: "Monitor", precio: 300,  categoria: "pantallas",    stock: 0  },
  { id: 3, nombre: "Mouse",   precio: 25,   categoria: "periféricos",  stock: 30 },
  { id: 4, nombre: "Webcam",  precio: 80,   categoria: "periféricos",  stock: 5  },
  { id: 5, nombre: "Laptop",  precio: 1200, categoria: "computadoras", stock: 3  },
];
```

--- -->

## Manipular: agregar, quitar y copiar

### 1. La pregunta clave: ¿este método **muta** el array?

Un método **muta** cuando modifica el array original. Un método **no muta** cuando deja el original intacto y te devuelve algo nuevo. Confundir uno con otro es la fuente número uno de bugs con arrays.

Partimos siempre de este array:

```ts
const letras = ["a", "b", "c"];
```

#### Métodos que **mutan** ⚠️

| Código | Array **antes** | Array **después** | Devuelve |
|---|---|---|---|
| `letras.push("d")` | `["a","b","c"]` | `["a","b","c","d"]` | `4` (nueva longitud) |
| `letras.pop()` | `["a","b","c"]` | `["a","b"]` | `"c"` (el que salió) |
| `letras.unshift("z")` | `["a","b","c"]` | `["z","a","b","c"]` | `4` (nueva longitud) |
| `letras.shift()` | `["a","b","c"]` | `["b","c"]` | `"a"` (el que salió) |
| `letras.splice(1, 1)` | `["a","b","c"]` | `["a","c"]` | `["b"]` (los eliminados) |

Visualmente, así actúan `push` y `pop` (trabajan sobre el **final**) frente a `unshift` y `shift` (trabajan sobre el **principio**):

```
            shift() ◄──┐                         ┌──► pop()
                       │                         │
unshift("z") ──►  [ "a" , "b" , "c" ]  ◄── push("d")
                    ▲                     ▲
                 principio               final
```

#### Métodos que **no mutan** ✅

| Código | Array original | Devuelve | ¿Original cambió? |
|---|---|---|---|
| `letras.slice(0, 2)` | `["a","b","c"]` | `["a","b"]` | No |
| `letras.concat(["d"])` | `["a","b","c"]` | `["a","b","c","d"]` | No |
| `[...letras, "d"]` | `["a","b","c"]` | `["a","b","c","d"]` | No |

### 2. `splice` en detalle (el más confuso)

`splice(desde, cuántosEliminar, ...nuevos)` puede **eliminar, insertar o reemplazar**:

```ts
const l1 = ["a", "b", "c", "d"];
l1.splice(1, 2);          // Eliminar 2 desde el índice 1
// l1 → ["a", "d"]

const l2 = ["a", "b", "c"];
l2.splice(1, 0, "X");     // Insertar "X" en el índice 1 (eliminando 0)
// l2 → ["a", "X", "b", "c"]

const l3 = ["a", "b", "c"];
l3.splice(1, 1, "X");     // Reemplazar el índice 1 por "X"
// l3 → ["a", "X", "c"]
```

**Radiografía del reemplazo `l3.splice(1, 1, "X")`:**

```
  antes:    [ "a" , "b" , "c" ]
                    ▲
                    │  splice(1, 1, "X")
                    │   │  │   └── pon "X" en ese lugar
                    │   │  └────── elimina 1 elemento
                    │   └───────── empezando en el índice 1
  después:  [ "a" , "X" , "c" ]
```

### 3. La trampa de la copia: `=` no copia

```ts
const original = [1, 2, 3];
const copia = original;       // ❌ NO es una copia: son dos nombres para el MISMO array
copia.push(4);

console.log(original);        // [1, 2, 3, 4]  😱 ¡también cambió!
```

```
  original ──┐
             ├──►  [1, 2, 3, 4]      (un solo array en memoria)
  copia ─────┘
```

La forma correcta es crear un array nuevo con el operador *spread* (`...`):

```ts
const original = [1, 2, 3];
const copia = [...original];  // ✅ array nuevo e independiente
copia.push(4);

console.log(original);        // [1, 2, 3]
console.log(copia);           // [1, 2, 3, 4]
```

```
  original ──►  [1, 2, 3]
  copia ─────►  [1, 2, 3, 4]    (dos arrays distintos)
```


## Transformar: `map`, `filter` y `reduce`

Estos tres métodos son el corazón del trabajo con datos. Ninguno muta el original y los tres reciben **una función** que se ejecuta para cada elemento.

| Método | Pregunta que responde | Qué devuelve |
|---|---|---|
| `map` | "¿Cómo quiero **cambiar** cada elemento?" | Array del **mismo tamaño** |
| `filter` | "¿Cuáles elementos quiero **conservar**?" | Array **igual o más corto** |
| `reduce` | "¿Cómo **resumo** todo en un solo valor?" | **Un solo valor** |

Usaremos esta lista de precios:

```ts
const precios: number[] = [120, 45, 300, 80];
```

### 1. `map`: transformar cada elemento

```ts
const conCupon = precios.map(p => p - 10);
```

```
  precios   [ 120 ,  45 ,  300 ,  80 ]
               │     │     │      │
             p - 10 p - 10 p - 10 p - 10      ← la misma función en cada casillero
               ▼     ▼     ▼      ▼
  conCupon  [ 110 ,  35 ,  290 ,  70 ]        ← mismo tamaño
```

`map` también puede cambiar el **tipo** de los elementos. TypeScript lo deduce solo:

```ts
const nombres: string[] = catalogo.map(p => p.nombre);
// ["Teclado", "Monitor", "Mouse", "Webcam", "Laptop"]
//   Producto[]  ──map──►  string[]
```

### 2. `filter`: quedarse con lo que cumple

La función de `filter` debe devolver `true` (conservar) o `false` (descartar):

```ts
const caros = precios.filter(p => p > 100);
```

```
  precios   [ 120 ,  45 ,  300 ,  80 ]
              ✅     ❌     ✅     ❌       ← ¿p > 100?
  caros     [ 120 ,        300 ]            ← más corto
```

### 3. `reduce`: resumir en un solo valor

`reduce` recibe una función con **dos** protagonistas y un valor inicial:

```ts
const total = precios.reduce((acumulado, precio) => acumulado + precio, 0);
//                           ▲           ▲                              ▲
//                           │           │                              └─ valor inicial
//                           │           └─ elemento actual
//                           └─ lo que se lleva "acumulado" hasta ahora
```

**Seguimiento paso a paso (así lo "ve" la computadora):**

| Vuelta | `acumulado` (entra) | `precio` | `acumulado + precio` (sale) |
|---|---|---|---|
| 1 | `0` (inicial) | `120` | `120` |
| 2 | `120` | `45` | `165` |
| 3 | `165` | `300` | `465` |
| 4 | `465` | `80` | `545` |

**Resultado:** `total` vale `545`.

> ⚠️ **Siempre pasa el valor inicial.** Sin él, `reduce` toma el primer elemento como acumulador, y en un array vacío lanza un error.


### 📚 Para seguir explorando

- [Arrays en MDN (español)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Everyday Types: Arrays, en el Handbook de TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)