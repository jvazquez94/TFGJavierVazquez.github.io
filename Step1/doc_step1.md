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
```html
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
```html
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
