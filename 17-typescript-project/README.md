# Cinema Seat Manager

El siguiente recorrido está diseñado para que construyas el proyecto utilizando una IA como tutor personal, comprendiendo la razón de ser de cada línea de código.

### Paso 1: Entender cómo guardar la sala en la computadora

**Objetivo y propósito pedagógico:** Desarrollar la abstracción espacial. Aprender a traducir un espacio físico del mundo real (una sala de cine con filas y columnas) a una estructura de datos numérica en la memoria ([fila][columna]).

**Prompt sugerido:**

```text
Actúa como mi tutor de programación. Voy a empezar el proyecto "Cinema Seat Manager" usando una plantilla de TypeScript (donde escribiré mi código en ./src/main.ts).

Tengo que representar una sala de cine de 8 filas por 10 columnas sin usar clases ni objetos, solo arreglos (tablas de datos).

Antes de darme código:
1. Hazme una pregunta sencilla para ayudarme a imaginar cómo se ve una sala de 8x10 en la memoria de la computadora.
2. Pregúntame por qué me conviene usar el número 0 para asientos libres y el número 1 para asientos ocupados.
3. Espera a que te responda para corregirme o confirmarme, y luego ayúdame a escribir la función `inicializarSala()`.
```

### Paso 2: Dibujar la sala en la pantalla

**Objetivo y propósito pedagógico:** Dominar el recorrido de matrices con bucles anidados. Aprender a transformar datos abstractos (0 y 1) en una salida legible por consola (L y X), utilizando bucles y el comando npm run console de la plantilla para ver los resultados en la terminal.

**Prompt sugerido:**

```text
Ya tengo la sala creada llena de ceros en ./src/main.ts. Ahora quiero crear la función `mostrarSala()` para imprimirla en la terminal usando console.log.

1. Pídeme que te explique con mis propias palabras cómo me imagino que deben funcionar dos bucles `for` (uno para las filas y otro para los asientos de cada fila).
2. Cuando te responda, dime si voy bien y ayúdame a traducir eso a TypeScript usando 'L' para los asientos libres (0) y 'X' para los ocupados (1).
3. Recuérdame cómo agregar los números de fila (0 a 7) y columna (0 a 9) a los lados para que la cuadrícula sea fácil de leer en la consola.
```

### Paso 3: Reservar un asiento y evitar errores

**Objetivo y propósito pedagógico:** Entrenar la defensibilidad del código (manejo de casos límite o edge cases). Dejar de asumir que los usuarios actuarán de forma perfecta y aprender a anticipar comportamientos erróneos mediante validaciones y condicionales (if/else).

**Prompt sugerido:**

```text
Ahora quiero crear la función `reservarAsiento()`, que recibe la sala, el número de fila y el número de columna en TypeScript.

1. Antes de darme el código, hazme una lista de 3 cosas malas que podrían pasar si un cliente pide un asiento (por ejemplo: pedir un asiento que no existe o que ya está ocupado).
2. Pídeme que te diga cómo solucionaría esos 3 problemas usando condicionales (`if / else`).
3. Revisa mi respuesta y ayúdame a escribir la función final con mensajes claros de confirmación o error.
```

### Paso 4: El superpoder de buscar asientos juntos

**Objetivo y propósito pedagógico:** Introducir la algoritmia básica y la inspección de vecinos. Enfrentarse a un reto de lógica pura donde se evalúa un elemento junto al que está al lado (columna + 1), aprendiendo a proteger el programa contra desbordamientos de memoria (out-of-bounds).

**Prompt sugerido:**

```text
Llegué a la parte avanzada: crear la función `buscarAsientosContiguos()` para encontrar dos asientos libres juntos en la misma fila (dos ceros seguidos: 0 0).

1. Explícame de forma muy sencilla qué significa "mirar el asiento de al lado" en código.
2. Hazme una pregunta sobre qué pasaría si intento mirar el asiento de al lado cuando ya estoy en el último asiento de la fila.
3. Cuando te responda, ayúdame a escribir el algoritmo paso a paso sin que se rompa el programa.
```

### Paso 5: Poner a prueba tu cerebro

**Objetivo y propósito pedagógico:** Aplicar la metacognición. Obligarse a explicar con propias palabras lo que se aprendió y someterse a preguntas de repaso para asegurar la fijación del conocimiento en la memoria a largo plazo, evitando depender de la copia pasiva de código.

**Prompt sugerido:**

```text
Ya tengo todo el programa funcionando.

Para asegurarme de que de verdad entendí todo y no solo copié código:
1. Hazme 3 preguntas rápidas sobre lo que hicimos hoy (sobre la matriz, los bucles y los errores que evitamos).
2. Pídeme que te explique las respuestas como si tú no supieras nada de programación y yo fuera tu profesor.
```

### Paso 6: El Reto Extra (De la consola a la Web)

**Objetivo y propósito pedagógico:** Comprender la arquitectura de software desacoplada. Descubrir que una buena estructura de datos (la matriz) es independiente de la interfaz donde se visualice, permitiendo migrar de una consola de texto a una página web interactiva sin alterar la lógica interna.

**Prompt para el alumno:**

```text
Ya terminé la versión de consola de mi "Cinema Seat Manager" en TypeScript. 

Como la plantilla ya tiene configurado Vite y Tailwind CSS v4, quiero hacer el reto extra: crear una interfaz visual interactiva en el navegador.

Ayúdame a lograrlo con estas reglas:
1. Explícame cómo puedo pintar mi matriz de 8x10 usando manipulación del DOM desde TypeScript hacia el `index.html`.
2. Dame el código para que los asientos libres se vean verdes (con 'L') y los ocupados rojos (con 'X') usando las clases de Tailwind que ya vienen en el proyecto.
3. Añade un evento de clic para que al hacer clic en un asiento libre, este cambie su estado a ocupado visualmente.
```
