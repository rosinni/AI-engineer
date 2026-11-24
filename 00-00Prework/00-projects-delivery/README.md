# Aprender a colaborar y gestionar versiones: Git y GitHub desde cero

Este es el dibujo que vamos a ir completando durante todo el módulo. Vuelve a él cada vez que te sientas perdido o perdida.

```
 Tu navegador (la "pantalla")
      │
      └── Codespace  (una computadora que vive en la nube)
             │
             └── Carpeta del proyecto   ← repositorio LOCAL
                    │
                    ├── tus archivos
                    └── .git  (carpeta oculta: la memoria del historial)
                           │
                           │   push ⬆  /  pull ⬇
                           ▼
                    GitHub   ← repositorio REMOTO (la copia "oficial")
```

Fíjate que hay **dos lugares en la nube**: el Codespace (donde trabajas) y GitHub (donde guardas la copia oficial). Parece confuso al principio, pero al terminar este artículo vas a poder explicar la diferencia con tus propias palabras.


# Git para desarrolladores: fundamentos del control de versiones

## 1. El problema que Git viene a resolver

Seguro te ha pasado algo así:

```
tesis_final.docx
tesis_final_v2.docx
tesis_final_v2_corregido.docx
tesis_final_AHORA_SI.docx
tesis_final_AHORA_SI_de_verdad.docx
```

Estás haciendo **control de versiones a mano**. Y funciona… hasta que necesitas responder preguntas como:

- ¿Qué cambió entre la versión 2 y la 4?
- ¿Quién hizo ese cambio?
- ¿Cómo vuelvo a la versión que funcionaba?
- ¿Qué pasa si dos personas editan el mismo archivo a la vez?

> Git funciona como los **puntos de guardado de un videojuego**. No guardas el juego entero cada vez: dejas marcados momentos concretos ("antes del jefe final") a los que puedes volver si algo sale mal.


## 2. ¿Dónde vamos a trabajar? Codespaces es tu computadora en la nube

Para usar Git necesitas una computadora con Git instalado, una terminal y un editor de código. Instalar y configurar todo eso puede ser un obstáculo enorme para quien empieza. Por eso vamos a usar **GitHub Codespaces**.

**Un Codespace es una computadora real (virtual) que GitHub mantiene encendida para ti en un centro de datos.** Tú la ves y la controlas desde el navegador, como si te conectaras a distancia a otra máquina.

### Codespace vs. computadora física

| Tu computadora física | Un Codespace |
|---|---|
| Está sobre tu escritorio | Está en un centro de datos de GitHub |
| Tienes pantalla, teclado y mouse | Usas tu navegador y tu teclado para controlarla a distancia |
| Tiene un sistema operativo (Windows, macOS…) | Tiene **Linux** (Ubuntu), ya instalado |
| Tiene un disco duro con carpetas y archivos | Tiene su propio "disco" con carpetas y archivos |
| Tienes que instalar programas (editor, Git…) | **Ya vienen instalados**: editor, terminal y Git |
| Botón de encendido | *Create* (crear) / *Resume* (reanudar) |
| Apagas la computadora | Se **detiene sola** tras un rato sin actividad (tus archivos siguen ahí) |
| Tiras la computadora a la basura | *Delete codespace*: **se pierde todo lo que no subiste a GitHub** |

> Es como si en clase cada estudiante recibiera una **computadora nueva, idéntica y ya configurada**. Nadie pierde media hora instalando cosas, y a todos nos funciona igual.

### ⚠️ La advertencia más importante de este módulo

Un Codespace **no es** un lugar para guardar tu trabajo a largo plazo. Es tu **escritorio de trabajo**. Si borras el Codespace, se borran sus archivos. Lo que está a salvo es lo que subiste a GitHub (con `push`, que veremos más adelante).

## 3. La terminal: otra forma de hablarle a la computadora

### ¿Qué es y por qué la usamos?

Hasta ahora le has dado órdenes a tu computadora con el mouse: hacer clic en una carpeta, arrastrar un archivo, presionar un botón. La terminal hace **exactamente lo mismo, pero escribiendo**.

Los desarrolladores usamos la terminal porque:

- Es **precisa**: dices exactamente lo que quieres.
- Es **repetible**: puedes guardar los comandos y volver a ejecutarlos.
- Es **universal**: funciona igual en casi cualquier computadora y servidor.
- Git se creó pensando en ella: ahí tiene todas sus funciones.

**Importante:** en el Codespace, la terminal controla *la computadora del Codespace* (la de la nube), no la tuya.

### Cómo se lee lo que aparece en la terminal

Cuando abres la terminal verás algo parecido a esto:

```
@tu-usuario ➜ /workspaces/mi-repo (main) $
```

| Parte | Qué significa |
|---|---|
| `@tu-usuario` | Tu usuario de GitHub: quién está trabajando |
| `/workspaces/mi-repo` | **Dónde estás** (la carpeta actual). Equivale a la carpeta que tienes abierta en el explorador |
| `(main)` | La "línea de trabajo" de Git en la que estás (la principal se llama `main`) |
| `$` | "Estoy listo, dime qué hacer" |

Para escribir un comando, escribes después del `$` y presionas **Enter**. Si no pasa nada visible, normalmente significa que funcionó.

### Tus primeros comandos (con su equivalente del mouse)

| Comando | Qué hace | Equivale a… |
|---|---|---|
| `pwd` | Muestra en qué carpeta estás | Mirar la barra de dirección del explorador |
| `ls` | Lista los archivos de la carpeta | Ver el contenido de una carpeta |
| `ls -a` | Lista **también los archivos ocultos** | Activar "mostrar archivos ocultos" |
| `cd nombre-carpeta` | Entrar a una carpeta | Hacer doble clic en una carpeta |
| `cd ..` | Subir a la carpeta anterior | Hacer clic en "atrás" o en la carpeta padre |
| `mkdir nombre` | Crear una carpeta | Clic derecho → Nueva carpeta |
| `echo "hola" > archivo.txt` | Crear un archivo con texto | Clic derecho → Nuevo archivo, y escribir |
| `cat archivo.txt` | Mostrar el contenido de un archivo | Abrir el archivo para leerlo |
| `clear` | Limpiar la pantalla | — |

> 💡 **Sobre `echo`, `>` y `>>`:** `echo "hola"` significa "di esto". Normalmente lo muestra en pantalla, pero con `>` le dices "en vez de mostrarlo, escríbelo en este archivo" (¡reemplaza lo que había!). Con `>>` le dices "agrégalo al final" sin borrar lo anterior.

### 🧪 Mini-práctica: explora tu computadora de la nube

Escribe estos comandos de a uno y observa qué pasa:

```bash
pwd
ls
ls -a
cd ..
pwd
ls
```

Después responde: ¿en qué carpeta estás? ¿Qué carpetas ves? Esto es lo mismo que hacías con el mouse, pero con palabras.

> ⚠️ **No te preocupes por equivocarte.** Un comando mal escrito casi nunca rompe nada: la terminal solo te dirá que no entendió. Y si algo sale muy mal, siempre puedes borrar el Codespace y crear uno nuevo.


## 4. ¿Qué es un repositorio?

Un **repositorio** (o **repo**) es, en el fondo, esto:

> **Una carpeta común y corriente + una carpeta oculta llamada `.git` que guarda la memoria de todos los cambios.**

Nada más. Tus archivos están ahí, igual que siempre. Lo único especial es esa carpeta oculta (el punto al inicio del nombre la hace invisible), que es donde Git anota el historial.

Compruébalo tú mismo dentro de tu Codespace:

```bash
ls        # no ves .git
ls -a     # ahora sí aparece .git
```

### Dos lugares donde vive un repositorio

| | Repositorio **local** | Repositorio **remoto** |
|---|---|---|
| **Dónde está** | En tu Codespace (tu "computadora") | En GitHub |
| **Qué es** | La carpeta donde trabajas | La copia "oficial" compartida |
| **Analogía** | Las fotos en la memoria de tu celular | Las fotos respaldadas en la nube |

Cuando creas un Codespace desde un repo de GitHub, **GitHub copia ese repo dentro del Codespace por ti**. Esa copia se llama **clone** (clon), y en un momento la vas a ver con más detalle.


## 5. Las tres zonas de Git: cómo se guarda un cambio

Aquí está el corazón de Git. Un cambio pasa por **tres zonas**:

```
 [ Tus archivos ]  ──git add──▶  [ Zona de preparación ]  ──git commit──▶  [ Historial ]
   (editas aquí)                   (eliges qué guardar)                     (queda guardado)
```

### La analogía de Instagram

| Acción en Git | Analogía con Instagram |
|---|---|
| Editar archivos | Sacar y retocar fotos en tu galería |
| `git add` | **Seleccionar las fotos** que vas a poner en la publicación (el carrusel) |
| `git commit -m "mensaje"` | **Guardar la publicación** con su pie de foto: queda lista en tu dispositivo, pero **todavía no es pública** |
| El mensaje del commit | El **pie de foto**: explica qué contiene |
| `git log` | Tu **perfil**, con todas tus publicaciones en orden |
| `git status` | Revisar el **borrador** antes de continuar |
| `git push` *(lo veremos luego)* | Tocar **"Compartir"**: sube la publicación a la nube |

> 🔎 **¿Dónde falla la analogía?** En Instagram, "guardar" y "publicar" suelen sentirse como un solo paso. En Git son pasos separados a propósito: puedes hacer muchos *commits* en tu computadora, con calma y sin que nadie los vea, y subirlos (`push`) cuando quieras.


### Esto también se puede hacer sin escribir comandos

En el Codespace, el panel **Source Control** (el ícono de ramas en la barra izquierda) hace lo mismo con botones:

| En la terminal | En el panel Source Control |
|---|---|
| `git add archivo` | El botón **+** al lado del archivo |
| `git commit -m "mensaje"` | Escribir el mensaje en la caja y presionar **Commit** |
| `git push` / `git pull` | El botón **Sync Changes** |

Los botones y los comandos son **dos caras de lo mismo**. Aprender los comandos te permite entender qué pasa realmente detrás de cada botón.


# GitHub para la colaboración en equipo

**Git no es GitHub,** Esta confusión es muy común, así que dejémosla clara desde el principio:

| | **Git** | **GitHub** |
|---|---|---|
| **Qué es** | Un programa que lleva el historial | Un sitio web que **aloja** repositorios de Git |
| **Dónde funciona** | En tu computadora (o Codespace) | En internet |
| **Analogía** | La **fotografía** | **Instagram** |
| **Otra analogía** | El **correo electrónico** | **Gmail** |

Puedes usar Git sin GitHub. GitHub agrega lo que Git, por sí solo, no tiene: guardar tus repos en la nube, compartirlos y colaborar con otras personas.


## Clone, fork y pull request

Estos tres conceptos son los que más confunden. Vamos con calma.

### Clone: una copia en tu computadora

**Clone** descarga un repositorio completo (archivos **y todo su historial**) a una computadora, y deja la copia **conectada** con el original.

> 📥 **Analogía:** descargar una sola foto es guardar un archivo. Un *clone* es como **descargar un álbum completo, con todas las versiones anteriores de cada foto**, y que además se quede enlazado al álbum original.

💡 **Ya hiciste un clone sin darte cuenta:** cuando creaste tu Codespace, GitHub clonó el repositorio dentro de él.

```bash
git clone https://github.com/usuario/repositorio.git    # Así se hace "a mano"
```

### Fork: tu propia copia en GitHub

**Fork** crea una copia completa de un repositorio **en tu propia cuenta de GitHub**. La copia es tuya: puedes cambiarla sin afectar al original. Se hace con un botón, **en la web de GitHub**, no con la terminal.

> 🎬 **Analogía:** el **Remix de los Reels de Instagram**. Tomas el Reel de otra persona y creas **tu versión, en tu cuenta**, con crédito al autor original. El original no cambia, y lo que hagas con tu remix es asunto tuyo.

### Clone vs. fork: la diferencia clave

| | **Clone** | **Fork** |
|---|---|---|
| **Dónde se crea la copia** | En una computadora (o Codespace) | En tu cuenta de GitHub |
| **Cómo se hace** | Con `git clone` (o automáticamente al crear un Codespace) | Con el botón **Fork** de GitHub |
| **Para qué sirve** | Trabajar en archivos | Tener una versión propia de un proyecto ajeno |
| **Se combinan** | — | Normalmente haces **fork** y luego **clone** de tu fork |



## Errores comunes (y qué significan)

| Lo que ves | Qué pasó | Qué hacer |
|---|---|---|
| `nothing to commit, working tree clean` | No hay cambios nuevos | Revisa que hayas **guardado el archivo** (`Ctrl+S`; un punto en la pestaña indica que no está guardado) |
| `no changes added to commit` | Cambiaste archivos pero no los preparaste | Falta el `git add` |
| Hice commit, pero no aparece en GitHub | El commit solo está en tu Codespace | Falta el `git push` |
| `fatal: not a git repository` | Estás en una carpeta que no es un repo | Ejecuta `pwd` y `cd` a la carpeta correcta |
| `rejected` al hacer push | Hay cambios nuevos en GitHub que no tienes | Ejecuta `git pull` y luego `git push` |
| Borré el Codespace y perdí mi trabajo | No habías hecho `push` | Recuerda: **haz `push` antes de borrar** |
| Creé un repo dentro de otro repo | Usaste `git init` donde ya había uno | Verifica con `git status` antes de `git init` |

