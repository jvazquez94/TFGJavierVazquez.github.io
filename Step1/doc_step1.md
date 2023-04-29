STEP 1.

Montamos el enviroment con los elementos básicos de la escena,
en este caso el dron será una caja blanca, y los controles 
botones en un principio y después implantaeremos una palanca
de movimiento asemejando la funcionalidad de un joystick.

------------------------------------------------------------------
*03/04/2023*

He comprendido como se gestiona la selección de objetos a nivel escena y componentes desde javascript.
En resumen: se usa la herramienta querySelector para referencia dentro de los componentes de Aframe, usando el tipo document para componentes primitivos del framework. Generalmente se selecciona con este la escena y una vez tenemos el objeto escena en una variable podemos referirnos a otros componentes dentro de ella con nombrandola usando querySelector.
```javascript
var sceneEl = document.querySelector('a-scene');
var dron = sceneEl.querySelector('#dron');
```
Despúes para escuchar evento de un componente en concreto simplemente después de referenciar el componente usamos addEventListner para referirnos al evento al que queda a la escucha por si se ejecuta y la funcion o codigo que se quiere aplicar si eso sucede.
```javascript
var botton = sceneEl.querySelector('#boton');
addEventListener('evento', ()=> {
  //codigo
}); 
```
He incorporado los botones arriba y abajo de manera básica el siguiente objetivo será incluir aceleración, velocidad y componente temporal para crear más realismo en el movimiento. Duda sobre la componente temporal.
```javascript
bot_up.addEventListener('grab-start', () => {
              console.log("DRON`S UP!");
              dron.object3D.position.y += 0.5;
              
            })
            
bot_down.addEventListener('grab-start', () => {
              console.log("DRON`S DOWN!");
              dron.object3D.position.y -= 0.5;
            })
```

------------------------------------------------------------------------

*06-04-2023*

No sé por qué pero el entorno o environment que hay para aframe diseñados por los creadores
al establecerle un static-body para que haga de suelo hace desaparecer el resto de elementos
dynamic-body justo al inicio de la escena. La solución que he encontrado a esto es 
establecer una caja justo debajo con ese rasgo para que haga de suelo fisico.
Usamo un free model de un dron de la página sketchfab.com -> 
"Dron" (https://skfb.ly/6Snot) by Messerhawke is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
Lo primero que vamos a hacer antes de meternos con la parte de desarrollo co javascript es
montar la escena básica como la vamos a querer.
En el js las definiciones de variables y los console.log deben ir dentro de las function para que las compile.

-----------------------------------------------------------------------------

*10-04-2023*

En la página de A-frame: https://aframe.io/docs/1.4.0/introduction/writing-a-component.html#defining-a-behavior-with-the-tick-handler
Explica como implementar en js el movimiento de un objeto siguiendo a otro.
Si miramos el codigo, inicializa el vector de posicion que usara para el movimiento de seguimiento:
```js
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },

```
Despues en la funcion tick inicializa las variables del vector, del target y current position y copia la direction del current
al del target:
```js
 tick: function (time, timeDelta) {
    var directionVec3 = this.directionVec3;

    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;

    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(targetPosition).sub(currentPosition);

```
En este punto ya difiere de nuestro objetivo, ya que quiero implementar un movimiento hacia arriba o hacia abajo y no que siga un target
sin más. 
Por ello nuestro target debe ser el resultado de la posicion de una dirección más una velocidad mas los frames o tiempo usado 
para ese movimiento de maenra que se haga de forma más limpia.
Respuesta de movimiento con aceleración: https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration

---------------------------------------------------------------------------------------------

*12-04-2023*

De la reunión de ayer con Jesús:
Uso de la funcionalidad tick para cambiar la posición del dron, se usa cuando se produce cambio de pantalla (frames).
Organizar en pasos simples para entendimiento e implementación:
1. Hacer componente up al dron para subir 0.01 unidad durante 100 veces/llamadas.
2. Poner atributo a up: tiempo que quiero que suba X seg. Apartar en una propiedad el tiempo que está usando.
Podemos usar console.log para debugear pero tener en cuenta que ralentiza los procesos.
3. Poner para que en cada tick suba un incremento, poner como propiedad.
4. Establecer velocidad concreta: cuanto subo por cada tick por segundo. Esto se puede notar más lento de lo que se debe, luego hay que añadir la componente 
de la aceleración teniendo en cuenta el tiempo que ha pasado hasta ahora por cada tick.
5. Para aceleración (es más realista): es parecido pero con respecto a la variación de velocidad en vez de posicion.

- Tener en cuenta el código de los creadores del animate para avanzar.
- Ser consistente con el calculo del tiempo en cada tick.
- Medir tiempo para no acumular retardo.
- Establecer 2 clicks, el primero para llamar a componente de subir por ejemplo y luego con ese segundo click apagarlo.
- Usar el inspector tanto como para ver si hemos asignado el componente correctamente al click como para ver por que desaperecen objetos de la escena,
  ya que puede deverse por subir muy rapido o variaciones muy rapidas.

  Prueba Github desde VS Code (trabajo)

  ---------------------------------------------------------------------------------

  *13-04-2023*

  ![image](https://user-images.githubusercontent.com/36034121/232315461-7aef1053-f47c-4563-809a-35f3b9427f50.png)

**.init():**
.init() se le llama una vez para inicializar el ciclo de vida de los componentes. Una entidad puede llamar al componente del manejador init cuando:
- El componente es estatico en el html y se carga la pagina por primera vez.
- El componente se configura en una entidad adjunta a traves de setAttribute.
- El componente se configura en una entidad no adjunta y la entidad esta adjunta a la escena via appendChild.
- Configurar inicialmente estados y varibales.
- Vincular metodos.
- Adjuntar event listener.

```js
AFRAME.registerComponent('cursor', {
  // ...
  init: function () {
    // Set up initial state and variables.
    this.intersection = null;
    // Bind methods.
    this.onIntersection = AFRAME.utils.bind(this.onIntersection, this);
    // Attach event listener.
    this.el.addEventListener('raycaster-intersection', this.onIntersection);
  }
  // ...
``` 

**.tick (tiempo, tiempoDelta):**
.tick () es llamado en cada tick o frame del bucle de renderizado de la escena. La escena llamará al manejador de tick de un componente:

- En cada fotograma del bucle de renderizado.
- Del orden de 60 a 120 veces por segundo.
- Si la entidad o la escena no están en pausa (por ejemplo, el Inspector está abierto).
- Si la entidad sigue unida a la escena.

El tick handler se utiliza a menudo para:

- Modificar continuamente la entidad en cada fotograma o en un intervalo.
- Buscar condiciones.
- El tick handler recibe el tiempo global de la escena en milisegundos (time) y la diferencia de tiempo en milisegundos desde el último frame (timeDelta). - Estos valores pueden utilizarse para interpolación o para ejecutar sólo partes del controlador de ticks en un intervalo determinado.

Por ejemplo, el componente de controles de seguimiento hará progresar las animaciones del controlador, actualizará la posición y la rotación del controlador y comprobará si se pulsan botones:

```js
AFRAME.registerComponent('tracked-controls', {
  // ...
  tick: function (time, timeDelta) {
    this.updateMeshAnimation();
    this.updatePose();
    this.updateButtons();
  }
  // ...
});
```

**.tock (tiempo, tiempoDelta, cámara):**
Idéntico al método tick pero invocado después de que la escena se haya renderizado.

El manejador tock se utiliza para ejecutar la lógica que necesita acceder a la escena dibujada antes de que sea empujado en el auricular como efectos de post-procesamiento.

Añadir un receptor de eventos con .addEventListener()
Al igual que con los elementos HTML normales, podemos registrar un listener de eventos con .addEventListener(eventName, function). Cuando se emita el evento para el que está registrado el listener, entonces se llamará a la función y manejará el evento. Por ejemplo, continuando desde el ejemplo anterior con el evento de colisión física:

```js
entityEl.addEventListener('physicscollided', function (event) {
  console.log('Entidad colisionada con', event.detail.collidingEntity);
});
```

Cuando la entidad emita el evento physicscollided, la función será llamada con el objeto del evento. Notablemente en el objeto del evento, tenemos el detalle del evento que contiene datos e información pasada a través del evento.

PREGUNTAR A JESUS SOBRE CARGA DE ELEMNTOS VISUALES GLTF.

**.update (oldData):**
Se llama a .update (oldData) cada vez que cambian las propiedades del componente, incluso al principio del ciclo de vida del componente. Una entidad puede llamar al gestor de actualizaciones de un componente:

- Después de llamar a init (), al principio del ciclo de vida del componente.
- Cuando se actualizan las propiedades del componente con .setAttribute.

El gestor de actualización se utiliza a menudo para:

- Realizar la mayor parte del trabajo de modificación de la entidad, utilizando this.data.
- Modificar la entidad siempre que cambien una o más propiedades del componente.
- Las modificaciones granulares a la entidad se pueden hacer diferenciando el conjunto de datos actual (this.data) con el conjunto de datos anterior antes de la actualización (oldData).

A-Frame llama a .update() tanto al principio del ciclo de vida de un componente como cada vez que cambian los datos de un componente (por ejemplo, como resultado de setAttribute). El gestor de actualizaciones suele utilizar this.data para modificar la entidad. El gestor de actualización tiene acceso al estado anterior de los datos de un componente a través de su primer argumento. Podemos utilizar los datos anteriores de un componente para saber exactamente qué propiedades cambiaron para hacer actualizaciones granulares.

Por ejemplo, la actualización del componente visible establece la visibilidad de la entidad:

```js
AFRAME.registerComponent('visible', {
  /**
   * this.el is the entity element.
   * this.el.object3D is the three.js object of the entity.
   * this.data is the component's property or properties.
   */
  update: function (oldData) {
    this.el.object3D.visible = this.data;
  }
  // ...
});
```

Por rendimiento y ergonomía, recomendamos actualizar la posición directamente a través del Vector3 de three.js Object3D .position en lugar de a través de .setAttribute.

Este método es más fácil porque tenemos acceso a todas las utilidades de Vector3, y más rápido al omitir la sobrecarga de .setAttribute y no necesitar crear un objeto para establecer la posición:

```js
// With three.js
el.object3D.position.set(1, 2, 3);

// With .setAttribute (less recommended).
el.setAttribute('position', {x: 1, y: 2, z: 3});
```

También podemos hacer actualizaciones incrementales (que no es más que modificar un número) y utilizar las utilidades de Vector3:

```js
el.object3D.position.x += 1;
el.object3D.position.multiplyScalar(2);
el.object3D.position.sub(algunOtroVector);
```

**Vinculación de escuchadores de eventos**
Por defecto, las reglas de contexto de ejecución de Javascript vinculan this al contexto global (ventana) para cualquier función independiente, lo que significa que estas funciones no tendrán acceso a this del componente por defecto.

Para que el this del componente sea accesible dentro de un escuchador de eventos, debe ser enlazado.

Hay varias formas de hacerlo:

1. Utilizando una función de flecha para definir el receptor de eventos. Las funciones de flecha enlazan automáticamente this:
```js
this.el.addEventListener('physicscollided', (event) => {
    console.log(this.el.id);
});
```
2. Definiendo tu listener de eventos dentro del objeto events del componente (esto también se encargará de añadir y eliminar el listener automáticamente)

Vea la explicación aquí.

3. Creando otra función, que es la versión vinculada de la función.
```js
this.listeners = {
    clickListener: this.clickListener.bind(this);
}
entityEl.addEventListener('click', this.listeners.clickListener);
```

-----------------------------------------------------------------------------------------------

*16-04-2023*

Tipos de propiedades
Los tipos de propiedades definen principalmente cómo el esquema analiza los datos entrantes del DOM para cada propiedad. Los datos analizados estarán disponibles a través de la propiedad data en el prototipo del componente. Abajo están los tipos de propiedades incorporados en A-Frame:

![image](https://user-images.githubusercontent.com/36034121/232315375-ad8a3916-41ad-4666-a5d8-fe5c465207c7.png)


Eventos
El objeto events permite definir cómodamente controladores de eventos que se vinculan y se conectan y desconectan automáticamente en los momentos adecuados durante el ciclo de vida del componente:

Se adjuntan en .play()
Separados en .pause() y .remove()
El uso de eventos asegura que los manejadores de eventos se limpian a sí mismos cuando la entidad o la escena se pausa, o el componente se separa. Si los manejadores de eventos de un componente se registran manualmente y no se separan correctamente, el manejador de eventos puede seguir disparándose incluso después de que el componente ya no exista.

```js
AFRAME.registerComponent('foo', {
  events: {
    click: function (evt) {
      console.log('This entity was clicked!');
      this.el.setAttribute('material', 'color', 'red');
    }
  }
});
```
----------------------------------------------------------------------

*17-04-2023*

A traves del this.data.[schema_type] accedemos al dato del esquema de nuestra componente: 

```js
AFRAME.registerComponent('log', {
  schema: {
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    console.log(this.data.message);
  }
});
```