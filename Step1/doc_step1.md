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

