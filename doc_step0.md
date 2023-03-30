# **STEP 0.**

Se tiene que añadir el script de aframe en el <head> para que se aplique todo el framework.
<a-scene> sw añade en el <body> para poder cargar toda la config que va a requerir los componentes de aframe.

Añadiendo una entidad:
Entidades primitivas de aframe: box, cylinder, plane y sphere.
Atributos a destacar <a-box>:
 - rotation
 - position
 - scale
 - color
 - depth
 - fog
 - height
 - metalness
 - roughness
 - width
 - src
 
Entidad a 3D:
La dsitancia se mide en metro, por lo que hay que tener cuidado porque visualment, por ejemplo, una distancia de 10 sin usar VR puede ser distinto que usandolas;
pudiendo aparecer como algo muy grande dentro de la escena.

Padres a hijos:
En la escena podemos añadir dentro de una entidad otra para que este en herencia con ella. Si se modifica la psoition por ejemplo del padre, la del hijo tambien se ve afectada.

Añadir un eviroment:
Con el script: "https://unpkg.com/aframe-environment-component/dist/aframe-environment-component.min.js" podemos añadir diferentes fondos/entornos a nuestra escena.
En la pagina de github de los desarrolladores podemos ver diferentes tupos: forest, egypt, contact, goldmine, poison, japan, tron, volcano, osiris, default...
Después de añadir ese script en la escena se añade : <a-entity environment="preset: forest; dressAmount: 500" o el numero de elementos que sea.

Añadir una textura:
Para añadir una textura a un component simplemente tenemos que usar el atributo src y añadir la imagen que tengamos como textura. Recuerda que va por debajo del
color que tenga aplicado la entidad.

Asset Management System:
Se usa para la puesta en escena. A través de assets, audio, imagens y video podemos recrear o interactuar en el entorno par aañadir cosas. Para más info buscar
página en la docu.

Añadir un background a la escena:
Para añadir un background se usa la entidad primitiva sky, pero se puede hacer con imagenes. Para ello podemos añadirlo directamente como src o agrgar un <a-assets> 
<img id="sdfsd" src="dklsjfsl"> despues en el elemento simplemente en src añadimos la etiqueta #"id" que hemos puesto en ela img en a-assets en id.
Vale para todo no solo para sky.

Añadir un ground:
Para añadir un suelo usamos el elemento del plano y hacemos como hemos explicado arriba.

Ajuste de iluminación:
Con la etioqueta <a-lights> podemos establecer iluminación en la escena. Por defecto añade una, si noestaría todo oscuro. Puede ser de ambiente o direccional.
Podemos añadir puntual lights que funcionan como bombillas a lo largo de la escena.
<a-light type="ambien o point" (una de las dos) intensity, color, position...
Cuiado con jugar con mucha intensidad puede llegar a sobreilumanr los materiales y no poder ver bien la textura, dependiendo donde la pongas se generan sombras
en los componentes.

Añadir animación.
Podemos añadir animación a una entidad con animation. Propiedades que tiene este built-in: property, from, to, isRawProperty, type, dely, dir, loop... Ver docu animation API.
De esta forma estamos desplazando en la propiedad sobre el eje Y, jacia 2.2 que son como 20 centrimetros mayor, teniendo una direccion alternativa para repetir de arriba abajo
y con una duracion de 2000 ms y con loop infinito. -> <a-box animation="property: object3D.position.y; to: 2.2; dir: alternative; dur: 2000; loop: true" ...></..>

Añadir interacción:
Se usa el built-in de cursor para aplicar interaccion con los elementos. Hay que crearlo como hijo de la camara. Por lo que debemos crear el componente camara y
a continuación cursor como su hijo.

 ->CURSOR:
   Es un componente de raycaster. Y escucha eventos y provee estados para ser ejecutados como: mousedown, mouseup, mouseenter, mouseleave y click events. 
   Se usa el raycaster-intersection y raycaster-intersection-cleared para capturar la entidad intersectada mas cercana.
   Se recomienda usar el componente showLine del raycaster para visualizar mejor las acciones del cursor.
   
   El uso del raycaster es para seleccionar los elementos de la escena que quieres que puedan tener animacion. En este caso lo que hay que hacer es añadir el atributo
   raycaster="objects: .clickable" (o lo que quieras) y luego en los objetos añadir la clase con esa etiqueta. Los objetos que no tengan esa etiqueta no produce
   animación.
   
   Imagenes sobre los eventos y propiedades del cursor
 
   --------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
## **STEP PREV.** 
  
  Por problemas deje un mes esto, retomamos con curso de youtube para WebVR con aframe, ya que me estaba liando yo solo con la documentación que hay en la página oficial.
  
  *Project name in glitch: tfg-project*
  
  1. Basic Primitives And HTML Attributes (A-Frame Tutorial - WebVR)  
  Lo primero que inserta en la escena es una caja, hay que tener en cuenta que de manera por defecto es decir: <a-box></..> no aparecería nada en el browser ya que
  la camara está en primera persona por defecto en la misma posición de la caja. 
  Si accedemos al menú de visualizar en 3D podemos analizar la escena y movernos por ella, comprobando que la caja está ahí. Para moverte por la escena 3D: Si clicamos
  y mantenemos el mouse hacia abajo veremos la caja justo al lado (buscarlo si simplemente hacia abajo no está). Para alejarnos de la caja y cambiar la posicion,       pulsamos W,A,S,D mientras mantenemos el click con el ratón para movernos en la escena.
  Si salimos en la vista web ya se puede apreciar la caja. Recuerda que la caja es un elemento por defecto pero todos los primitivos acaban siendo entidades.
  Atributos: color, width, height, deepth
  Recuerda que las distancias en Aframe están en metros, dato a tener en cuenta al estar en escala para diseñar las escenas ya que el punto de vista es de una persona.
  Para el primitivo cylinder: color, height, radius, segments-radial, open-ended (para quitar las caras del segmento a true si se quiere quitar y dejar abierto),
  para ver el resto de las caras y no este a la mitad el útlimo atributo: side="double".
  
  
  2. Camera Primitive.
  El elemento camara por defecto se posicion en el modo VR en el 0 0 0 y en el modo escritorio 0 1 0. Cuando se añade un elemento con una imagen se pone en la etiqueta
  <a-assets> <img> la imagen precargada para luego añadirla a un objeto. En Glitch para precargar una imagen desde los assets se copia el link que te ofrece y se 
  pega en el src.
  Con el atributo de camera: user-height podemos aplicar la vista de altura que queramos, en el ejemplo usamos 1.6 que en metros sería la estatura minima de un adulto.
  No usar el atributo position directamente sobre el elemento de a-camera, mejor meter a-camera en a-entity y usar el position en esta etiqueta padre. De esta forma se 
  sincroniza el atributo de la altura de ojo con la posición.
  Eliminaron el user-height en una de las versiones actualizadas asi que se usa de manera similar salvo que solo con position 0 1.6 0.
  Se pueden añadir más de una cámara en la escena, para dar diferentes tipos de vista. Usando el atributo active, añadimos cual quieres que sea la que esta usandose.
  con true o false en las diferentes que haya.
  
  
 3. Position and Relative Positioning.
 Los ejes x y z se corresponden así para declarar la posición de los elementos de la escena.
 Se puede instanciar entidades a otras pasando a relacionarse como padre e hijo, siendo la posición origen del hijo el centro de referencia de la posición del padre.
 Para alinear por ejemplo un circle con la superficie del padre, usar el 0.11? (sobre la depth del objeto padre?) en el eje z de su posición y no quede con reflejos raros superponiendose el otro.
 Tener cuidado cuando ubicamos un objeto fuera del padre puesto que hay que calcular sumandole la distancia de la posicion del objeto que tenemos de referencia.
 Si se cambia la posición del padre la del hijo cambia.
 
 
 4. Rotation and Relative Rotation.
 Es igual que la posicion pero con el atributo de rotation.
 
 
 5. Scale, Relative Scale, and Reflection.
 Podemos escalarar los objetos de la escena con el atributo scale="x x x".
 Hay que tener cuidado cuando al elemento se le ha aplicado previamente otra transformacón porque los ejes en este caso se escalan sobre lo anteriormente
 aplicado. En el ejemplo del video, el eje y tiene aplicada antes una rotación (sobre el cilindro) de 90 grados, entonces cuando aplicamos el escalado a dos,
 no se produce de la misma manera que si no hubieramos aplicado esa rotación, es decir si ha rotado -90 grados en ese eje se escala sobre la nueva posicion de la 
 rotación producida.
 La relatividad de la escala se trabaja de igual manera con la relación de herencia entre padres e hijos.
 Para saber como se transforma a partir de otra, en este caso de una rotación imaginar ejes 
 y rotar el eje los grados aplicados, después a partir de ahi hacer la escala.
 Cuando se usa numeros negativos en las transformaciones es lo que se llama reflection.
 
 
 6. Image Textures and Materials.
 Usame el Assets Manage System para precargar las imagenes de por ejemplo materiales y que no consuma tanta memoria. Se añade poniendo el elemento <a-assets>
 y dentro <img id.. src...> sin cerrar la etiqueta de img.
 Para repetir la textura en el eje X Y se usa el atributo repeat= "1 1" es el default para ambos ejes. 
 El uso de los atributos de la normal se usan sobre todo en desarrollo de videojuegos para dar sombreado realista a las texturas de los assets.
 Los atributos usados para el texturizado de la normal son normal-map, normal-texture-repeat, normal-scale.
 Para que la luz concuerde con la posicion del objeto lo mejor es que el signo de la escala normal concuerde con la del eje de la posición, para que asi el reflejo
 de la luz concuerde.
 Para controlar el reflejo de la luz en la textura usamos el atributo roughness="0.5" por defecto.
 Tambien los atributos los podemos asignar no en la etiqueta del primitivo, si no en un atributo llamado material="color: blue; position:"x x x"; ..
 Cuando además de esto usamos el atributo scale y el eje X lo ponemos a -1 tenemos un efecto muy particular que consiste en que las caras segun vamos rotando se vuelven transaparentes (efecto sims) -> creo que lo ha quitado porque a mi no se me aplica.
 Se puede aplicar el atributo roughness a los maeriales por defecto sin definir una textura como imagen.
 El atributo shader tambien es otro efecto sobre el texturizado y puede ser standar (que es con brillo) o flat (Que es opaco sin brillo).
 Para aplicar transparencia al objeto se usa el atributo opacity="0.5".
 Ojo con los atributos como position que no pueden ir dentro de material.
 
 
 7. Image and Curve Image primitives.
 Hay que tener en cuenta la escala de las imaagenes para que a la hora de escalar en la escena se haga de forma correcta y no se distorsione por un mal concepto de 
 las proporciones. Para ello nos ofrece una fórmula para pasar a milimetros las longitud y ancho de al imagen para añadir a nuestra escena.
 La fórmula es: Ancho de imagen (m) = ancho (m) / IMG ancho (px) * IMG altura (px) que es: 1 metro(que es la unidad de medida que se usa en aframe) entre 1024 pixeles
 por la altura de la imagen que usemos.
 De esta manera el resultado que nos de es el que aplicamos como milimetros al ancho de la imagen para que luego cuando usemos el componente scale se aplique todo 
 sin distorsion.
 El componente para añadir una imagen curva es: <a-curvedimage src="" theta-length="210" theta-start=0" radius="" position="">.
 La rotacion depende de la graduacion del parametro theta.
 Para calcular el arco usa la pagina dejada en favs: handymath.com y asi establecer los parametros correctos. La anchura se calcula como en una imagen normal (paso anterior)
 
 8.Breaking primitives down.
  
 -------------------------------------------------------------------------
 *27-02-2023*
 
 9. Ground.
 Uso de imagenes para texturizado del suelo con componentes ya usados como la normal, imagenes, repea, rotation, scale, etc.
 Para este video no le ha hecho falta modificar el roughness para el contraste del brillo con el material ya que simplemente con la normal-nmap y normal-texture-repeat, le ha conseguido dar el toque necesario para hacerlo realista.
 Recuerdo con no aadir dentro de la etiqueta a-assets los elementos de la escena ya que si no no se van a visualizar.
 
 
 10. Sky and 360 grades.
 El tipo de primitivs a-sky es una circunferenciad e radio por defecto 10000 metros por eso nos da la sensacion de fondo e cielo. Se le puede cambiar el radio con el parametro radius para ver como abarca la esfera del componente. Tambien se le puede hacer doble para que cubra todo el rango del espacio y cubir la esfera al completo duplicando ambas mitades de la esfera,una en el otro semicirculo.
 Para poner el suelo acorde con el infinito del cielo recordar cambiar los parametros de repeat y normal-textuyre-repeat para que no este todo borroso (generalmente la mitad del valor superficie agrandada.
 
Usar buenas texturas para que no quede raro.
Para que no nos afecte por ejemplo en un texturizado de suelo el sombreado de la luz de la escena porque queremos que quede con un toque cartoon, le aplicamos al componente del suelo shader:flat para que no refleje esa luz.
Podemos aplicar imagenes 360 para dar mnas realismo a la escena, página: texturify.com


----------------------------------------------------------------------------------------
*28-02-2023*

13. Loading an Displaying 3D Models.
La pagina que usa para descargar modelos gratis de 3D es: skechfab.com
Para importar archivos 3D o elementos de los assets que no son imagenes usamos la etiqueta <a-asset-item> en los assets del sysrtem management, luego en escena
añadimos el idcon un elemento <a-entity gltf-model="#ref">. En este caso es un modelo 3D gltf ( Formato de Transmisión de Lenguaje Gráfico.)
Si se actualiza el nombre de los archivos graficos recuerda renombrarlos en el html, en el caso del .bin, abrirlo y buscar el uri: del json donde se modifica tammbien
el nombre si no, no aparece en la escena. Al igual donde tengas las texturas, por eso no te carga en glitch, ya que en el json esta buscando en una carpeta llamada
textures dentro de la del proyecto y en glitch no deja crear carpetas en los assets, por eso la opcion es o trabajar quitando la ruta de esa carpeta en el fichero
o trasladar el puesto de trabajo en windows, ya que la virtual box de linux va muy lento.

----------------------------------------------------------------------------------------
  
*01-03-2023*

14. Animating objects.
Para animar un componente de la escena se usa el componente <a-animation> dentro del componente no de la etiqueta, es decir <a-box> </a-box> en lugar de <a-box <a-animation>.
Si por ejemplo le añades, attribute = "rotation" es la accion que va a realizar, despues se le añade to="0 0 0", hara la accion del attribute hasta la posicion 
que le indiques en to. Si le añades el atributo repeat="2", por ejemplo, repetira la accion dos veces (a parte de la primera al recargar la pagina.
X -> correcion, de esta manera no parece funcionar (obsoleto??):
  
  ```html
 <!-- Caja -->
      <a-box color="#AA0000"
             position="0 0.5 0"
             animation="property: rotation; to: 0 360 0; loop: true; dur: 1000;">
      </a-box>
  ```
      
 La dur esta mas referido a cuanto tarda en hacer el loop.
 El atributo easing esta para hacer lineal o no el loop, es decir, para cuando este empezando/terminando el loop se ralentice o vaya mas rapido o sea lineal.
 Se puede jugar con la relación padre e hijo metiendo la animacion dentro de un <a-entity> y despues una caja o cualquier componente para que los efectos
 de la accion sean sobre el padre.
  
 -------------------------------------------------------------------------------
  
*02-03-2023*
  
 Usamos el atributo easing con ease-out para que la acción se produzca con una deceleración al final.
 También podemos usar el factor de scale para escalar el objeto como una acción; to y pones la escala a la que quieres que cambie. Se puede aplicar efecto rebote en el  easing el nombre de la etiqueta del atributo es parecidad a la de deceleración: ease-out-bounce.
 Tambien se puede animar el color de un componente. El nombre del atributo es material.color para aplicar el cambio de color from x to x.
 También se puede animar la opacidad con el nombre del atributo material.opacity., tambien se puede con opacity directamente.
 Para que un componente tenga una accion con respecto a un punto de referencia como se menciona en la leccion anterior hay que meter la componente en una
 padre que puede ser una entidad vacia y posicionar la entidad padre por ejemplo en el centro (0 0 0) y la hija en otro punto para que las acciones producidas,
 como por ejemplo la de rotar, se haga sobre el eje del padre si aplicamos en la etiqueta de el, luego si aplicamos en la etiqueta del hijo, ademas de hacer sobre
 el eje del padre se hace otra sobre ella.
 Cuidado con la guia de colores ya que en la etiqueta de animacion de from a to solo coge # con el codigo hexadecimal.
  
 -------------------------------------------------------------------------------
  
*06-03-2023*
  
 15. Luces y sombras.
  
 Para establecer una luz solo hay que introducir un elemento a-entity y poner la componente light="" dentro podemos añadir diferentes atributos. El primero que
 se establece es el type para el tipo de luz, ambient, point, spot.
 Para establecer sombras en la escena primero podemos activar o desactivar con el atributo shadow="enabled: true" en la etiqueta scene. Despues tenemos que definir
 en la luz el atributo castShadow: true para que las fisicas entren en juego. Luego hay que defiinir los objetos que queremos que reciban sombra y los que emitan
 sombra, para ello en el atributo shadow="receive: true" o "cast: true".
 Tambien se puede establecer con animaciones de movimiento, por ejemplo, para que la luz siga al objeto, esto se consigue en la luz con el atributo target y el id 
 del elemento que queremos que enfoque conel tipo de luz spot.
  
  ```html
  <!DOCTYPE html>
<html>
  <head>
    <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene shadow="enabled: true">
      <!--Asset Management-->
      <a-assets>
        <img id="floor" src="assets/textures/Erba_01_TileMat_baseColor.jpeg">
        <a-asset-item id="wall" src="assets/muros/scene.gltf"></a-asset-item>
        
      </a-assets>
      
      <a-entity position="0 -0.5 2.5">
        <a-camera></a-camera>
      </a-entity>
      
      <a-plane src="#floor"
               rotation="-90 0 0"
               scale="20 20 1"
               repeat="10 10"
               normal-texture-repeat="10 10"
               shadow="receive: true">
      </a-plane>
      
      <a-entity gltf-model="#wall"
                position="0 0 0"
                scale="0.6 0.6 0.6"
                >
      </a-entity>
      
      <a-entity light="type: ambient;
                        intensity:0.1"></a-entity>

      <!--<a-entity light="type: point;
                        intensity: 0.9;
                        distance: 50;
                        castShadow: true  "
                position="0 1 1.5"></a-entity>-->

       <a-entity postion="0 100 0">
            <a-box  position="1.2 0 0.5"
                  rotation="0 -90 0"
                  color="#3295D6"
                  depth="0.1"
                  weight="5"
                  height="5"
                  shadow="receive:true"></a-box>

          <a-box  position="0 2 0.5"
                  rotation="-90 0 90"
                  color="#3295D6"
                  depth="0.1"
                  weight="2"
                  height="4"
                  shadow="receive:true"></a-box>



          <a-box  position="-1.2 0 0.5"
                  rotation="0 -90 0"
                  color="#3295D6"
                  depth="0.1"
                  weight="5"
                  height="5"
                  shadow="receive:true"></a-box>

          <a-box  position="0 0 0.2"
                  rotation="0 0 0"
                  color="#3295D6"
                  depth="0.1"
                  weight="10"
                  height="5"
                  scale="3 1 1"
                  shadow="receive:true"></a-box>
       </a-entity>           
      

      <a-entity light="type: point;
                        intensity: 0.3;
                        castShadow: true;
                        distance: 50"
                position="0 1.7 0.5">          
      </a-entity>
      <a-sphere radius="0.2"
                    position="0 2 0.5"></a-sphere>

      <a-sphere radius="0.2"
      position="0 2 0.5"></a-sphere>

      <a-box color="red"
              position="0 0.5 0.7"
              scale="0.5 0.5 0.5"
              shadow="cast: true"></a-box>

      <a-box  id="blue-box"
              color="blue"
              position="3 0.5 3"
              scale="0.5 0.5 0.5"
              shadow="cast: true"
              animation="property: position;
                          dir: alternate;
                          to: 5 0.5 0.7;
                          loop: true;
                          easing: linear;
                          dur: 4000"></a-box>

      <a-entity light="type: spot;
                        target: #blue-box;
                        color: #C40070;
                        angle: 20;
                        castShadow: true;
                        penumbra: 0.1"
                position="2 3 2"
      ></a-entity>

    </a-scene>
  </body>
</html>
```
  
 ----------------------------------------------------------------------------------
  
 *07-03-2023*
  
  16.  Inspector.
 Para lanzar el inspector control + alt + I
 Con el control del mouse puedes moverte por la vista del inspector.
 Se puede ajustar por ejemplo un luz desde el inspector poniendola donde quieres, ajustando colo, intensidad, distancia. Y una vez hecho eso le damos al boton
 de arriba a la derecha de copiar enitdad html para copiarla en el fichero. Dato: Tener cuidado que esta seleccionado el elemento porque se quita el inspector en
 Glitch y tienes que volver a hacerlo.
 Para cambiar la cantidad de espacio que abarca una luz spot se cambia el angle de la entidad.
 
 17. Cursor Primitivo y cursor.
 Se introduce el componente del mouse relacionado con los eventos del framework, ya sean clickEventmouseEnter, Leave....
 El a-cursor se introduce como hijo dentro de un elemento camera (no es necesario) apareciendo en la escena un circulito por defecto con los bordes negros. 
 Podemos añadir dentro del cursor en el atributo rayCaster para que enseñe la linea de movimiento del haz.
 Tiene sentido meter el cursor dentro de una camara para guiarnos con el movimiento que hacemos, despues dentro no hace falta generar un componente cursor,
 podemos añadir dentro un a-entity y despues ponerle el atributo cursor, luego añadimos los que necesitemos para modificarlo: position, geometry y material para añadirlo.
 Tambien podemos en el material cambiar el color dependiendo del fondo que tengamos por si se hace dificil distinguirlo.
 
 18. Event Set Component.
 Recomienda insertar el script source de uno de los creadores de aframe: ngokevin -> Github.
 Se ha movido el repositorio que tenia a https://github.com/amitwaghmare/aframe-event-set-component
 Hay que añadir la linea de script que añade los eventos: 
  <script src="https://rawgit.com/ngokevin/aframe-event-set-component/master/dist/aframe-event-set-component.min.js"></script>
o instalar via NPM (Node Package Management para gestionar paquetes y librerias de JavaScript)

 -------------------------------------------------------------------------------------------------
  
 *08-03-2023*
  
 src="https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js" -> script a usar para los events set ya que el anterior NO funcionaba.
 Para usar los eventos tenemos que establecer en el objeto que se desea producir el evento el siguiente formato:
 event-set__[nombre_evento] = "_event: mouseenter; material.color: ...", en el nombre evento no se pueden usar mayusculas pero si '_'.
 Tipos de _event: click, mouseenter, mouseleave, mousedown, mouseup, y fusing.
 
 
--------------------------------------------------------------------------------------------------- 
  
*09-03-2023*
  
19. Gaze-Based Interactions.
Basicamente te da un ejemplo parra dar feedback visual cuando la gente usa el movil o las gafas, en este caso en el que tenemos las cajas con los respectivos eventos
añade que cada vez que el cursor señala una caja usa fuse: true y fuseTimeOut: 1500 en el cursor, para que cada vez que se posicione sobre una añade una animation que 
ensancha el cursor un poco para dar ese feedback visual del que hablamos, ya que no todos los usuarios usaran la app web.
En la animación del cursor le añade el atributo de scale, to="3 3 3" dur, begin="cursor-fusing" y fill="backwar" que con esto ultimo lo que hace es aplicar la acción
O evento click sin necesidad de hacerlo.

-->**Corrección** el atributo fuse a cursor y fuseTimeout es el que hace el click sin necesidad de aplicar manualmente.
   El atributo begin de la animation ya no existe en su lugar se usa startEvents.
   El atributo fill de la animation hace ya no existe

 
![image](https://user-images.githubusercontent.com/36034121/224068798-4466ddc3-79c8-48b2-a88c-bba1732fcee7.png)
  
  ----------------------------------------------------------------------------------------------------
  
  *10-03-2023*

  La manera que he descubierto de que se reinicie la animacion de fusing es muy diferente al del video debido a nuevas releases del framework.
  Para empezar, no se por que porque en la docu oficial de aframe el atributo startEvents de una animacion deberia reiniciar la animacion de manera automatica,
  pero no lo hace, entonces la solucion efectiva que he hecho es añadir otra animacion para cuando salga de un componente deje de hacer fusing.
  Tambien he usado el evento mouseenter y mouseleave ya que cursor-fusing tampoco lo estaba agarrando bien.
  
  
  ------------------------------------------------------------------------------------------------
  
  *13-03-2023*
  
  20. Selective Intersections.  
  Para usar la intersección selectiva del cursor tenemos que aplicar elelemento raycaster y su objects: .clickable.
  De esta forma añadiendo al elemento en cuestion que queremos seleccionar la caracteristica class=" clickable" estamos como checkeando el elemento para el raycaster.
   
  ------------------------------------------------------------------------------------------------------------
  
  *14-03-2023*
  
  ->Selective Intersection.
  Entonces el consejo que da para usar y desusar un elemento como estabamos haciendo con estas caracteristicas es añadir eventos en las cajas respectivas para
  que en los respectivos targets quite la caracteristica clickable y lo añada a la otra cada vez que se pulse una de las dos.
  Entonces lo unico que añadiriamos a cada uno de los elementos seria:
  
  ```html
   <a-box ...
     event-set__clearclass="_event: click; class: not-clickable"
     event-set__tarclass="_event: click; _target: #[tar_box]; class: clickable">
   </a-box>
  ```
  
  De esta manera todos los elementos tendrian implementado los eventos que les quita la clase clickable y se la añade al destino.
  
  ---------------------------------------------------------------------------------------------------------------
  
  *15-03-2023*
  
  **21. Controller-Based Interactions.**
  
  Introduce el uso de las super hands, cereado pro William Murphy con su repositorio de github:  https://github.com/c-frame/aframe-super-hands-component  
  Para instalar el componente nos sirve con adjuntar estas líneas de codigo en la cabecera:
  ```html
  <script src="https://unpkg.com/super-hands@^3.0.3/dist/super-hands.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.misc.min.js"></script>
  ```  
  Ahora a traves de un entity le asignamos el atributo progressive-control:
  ```html
   <a-entity progressive-controls></a-entity>
  ```
  Esta linea nos ayuda a implementar controladores para que trabajen correctamente en cualquier plataforma (web, oculus, mobile, etc). Debria aparecer un cursor por
  defecto en nuestra escena, pero no está sucediendo¿?
  -> Creo que lo han quitado, ya que es como un cursor.
  Añadir que el cursor sea de tipo circle en vez de figuras geometricas completas puede dar feedback negativo a nivel usuario con las accioens mouseenter y mouseleave, generando movimientos raros y poco armonicos.
  
  Ahora añadimos varias cajas en negro y les asignamos eventos para pulsarlas.
  Esta añadiendo la caracteristica hoverable, ya que usa unos eventos parecidos a mouseenter y mouseleave pero con hover-start hover-end, y la aplica a 3 botones y
  una pantalla para hacer cambiar de color a la pantalla.
  ```html
   
  ```
  
  Añade un elemento mixin que aparece en la pagina de github de William Murphy (como un cursor) y luego lo unico que hace es añadir la clase UIButton a los botones para que la pantalla solo sea clickable para esa clase y asi hacer que los usuarios solo puedan pulsar esos botones y no reinician la pantalla, dando esos privilegios
  a otros elementos.
  Parece como una extension del cursor con mas elementos.

  ------------------------------------------------------------------------------------------------------

  *16-03-2023*

  Esto es una prueba de actualizacion GIT desde Visual Studio
 
  **22. Interaction Gestures.**
  Uso del componente superhands junto con event-set para la reaccion y control de componentes de la escena.

  Presentamos el mismo problema que en el anterior, y es que la entitty de los superhands de progressive-controls esta desactualizada y ya no se usa, por lo que toca labor de investigación
  para ver como usar las superhands actualmente.
  Usa los elementos qeu si aperecen en la pagina de superhands como son los eventos grab-end y grab-start y los atributos clickable, grabbable y droppable para arrastre y trigger de choque de elementos
  sin usar fisicas.

 
 -------------------------------------------------------------------------
  
  *21-03-2023*
  
  Hay al parecer una version en la pagina de github de superhands para mouse, ya que la del control con fisicas normal
  parece que no va con el mouse normal.
  el código que usa para aplicar con el mouse del ordenador es:
  ```html
  <html>
  <head>
    <title>A-Frame Super Hands Component - 6DOF With Physics</title>
    <!-- Replace "../build.js" with the super-hands and
         A-Frame distributions to run : -->
    <script src="../build.js"></script>
    <!-- <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script> -->
    <!-- <script src="https://unpkg.com/super-hands/dist/super-hands.min.js"></script> -->
    <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-physics-system@v4.1.0/dist/aframe-physics-system.js"></script>
    <script src="https://unpkg.com/aframe-event-set-component@^4.1.1/dist/aframe-event-set-component.min.js"></script>
    <!-- <script src="https://unpkg.com/aframe-physics-extras/dist/aframe-physics-extras.min.js"></script> -->
    <script src="https://unpkg.com/aframe-environment-component@1.3.2/dist/aframe-environment-component.min.js"></script>
    <script>
      //color randomizer
      AFRAME.registerComponent('color-randomizer', {
        play: function () {
          this.el.addEventListener('drag-drop', function (evt) {
            evt.detail.dropped.setAttribute('material', 'color',
              '#'+(Math.random()*0xFFFFFF<<0).toString(16))
            // color randomizer credit: http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript#comment6801353_5365036
          })
        }
      })
      // forward mouse and touch events to the super-hands entity
      AFRAME.registerComponent('capture-mouse', {
        init: function () {
          this.eventRepeater = this.eventRepeater.bind(this)
          this.el.sceneEl.addEventListener('loaded', () => {
            this.el.sceneEl.canvas.addEventListener('mousedown', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('mouseup', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchstart', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchmove', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchend', this.eventRepeater)
          }, {once: true})
        },
        eventRepeater: function (evt) {
          if (evt.type.startsWith('touch')) {
            evt.preventDefault()
            // avoid repeating touchmove because it interferes with look-controls
            if (evt.type === 'touchmove') { return }
          }
          this.el.emit(evt.type, evt.detail)
        }
      })
    </script>
    <link rel="stylesheet" type="text/css" href="../assets/examples.css">
  </head>
  <body>
    <a-scene physics environment="preset: tron; shadow: true">
      <a-assets>
        <a-mixin id="cube" geometry="primitive: box; width: 0.33; height: 0.33; depth: 0.33"
                 hoverable grabbable stretchable draggable droppable
                 event-set__hoveron="_event: hover-start; material.opacity: 0.7; transparent: true"
                 event-set__hoveroff="_event: hover-end; material.opacity: 1; transparent: false"
                 body="shape: none" shape="shape: box; halfExtents: 0.165 0.165 0.165" shadow></a-mixin>
        </a-mixin>
      </a-assets>
      <a-entity camera look-controls wasd-controls position="0 1 1"
                capture-mouse
                raycaster cursor="rayOrigin:mouse"
                body="type: static; shape: sphere; sphereRadius: 0.001"
                super-hands="colliderEvent: raycaster-intersection;
                             colliderEventProperty: els;
                             colliderEndEvent:raycaster-intersection-cleared;
                             colliderEndEventProperty: clearedEls;">
      </a-entity>
      <a-entity class="transformer" position = "0 1.6 -1"
                color-randomizer droppable body="type: static; shape: none"
                shape="shape: box; halfExtents: 0.25 0.25 0.25"
                geometry="primitive: box; width: 0.5; height: 0.5; depth: 0.5"
                event-set__dragon="_event: dragover-start; material.color: orange"
                event-set__dragoff="_event: dragover-end; material.color: purple"
                material="color:purple" shadow>
        <a-entity text="value: Drag&drop to change color;
                        width: 0.5; wrapCount: 12; align: center"
                  position="0 0 0.25">
        </a-entity>
      </a-entity>

      <a-entity class="cube" mixin="cube" position="0 0.265 -1" material="color: red"></a-entity>
      <a-entity class="cube" mixin="cube" position="0 0.265 -0.5" material="color: red"></a-entity>
      <a-entity class="cube" mixin="cube" position="-1 0.265 -1" material="color: blue"></a-entity>
      <a-entity class="cube" mixin="cube" position="-1 0.265 -0.5" material="color: blue"></a-entity>
      <a-entity class="cube" mixin="cube" position="1 0.265 -1" material="color: green"></a-entity>
      <a-entity class="cube" mixin="cube" position="1 0.265 -0.5" material="color: green"></a-entity>
      <!-- ground collider keeps objets from falling -->
      <a-box body="type: static; shape: none" shape="shape: box; halfExtents: 50 0.0005 50" width=100 height=0.001 depth=100 visible="false"></a-box>
    </a-scene>

    <!-- GitHub Corner. -->
    <a href="https://github.com/c-frame/aframe-super-hands-component" class="github-corner">
      <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#222; color:#fff; position: absolute; top: 0; border: 0; right: 0;">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
  </body>
</html>

 ```
 
  ---------------------------------------------------------------------------------
  
  *22-03-2023*
  
  Sigo investigando sobre el uso de superhands para hacer un hoverable, draggable, etc basicos en la escena sin el uso de fisicas. 
  Por el momento he sacado en conclusión varios atributos nuevos que son útiles para poner en la escena.
  Uno de ello es el elemento 
  ```html
  <a-assets>
   <a-mixin id="red_box" material="color: #AA0000" 
                      dynamic-body="shape: box"
                      hoverable grabbale droppable stretchable
                      shadow="cast: true" >
   </a-mixin>
  </a-assets>
  
  ...
  
  <a-box mixin="red_box" class="box" position=" x x x">
  ``` 
  Ya que gracias a la previa definicion de estos podemos reutilizar elementos. Es como definir un prefab de Unity.
  Luego se define el objeto como se indica anteriormente y podemos sacar varios objetos con las mismas caracteristicas.
  Para que la seleccion de elementos del raycaster sea efectiva con el class, debe hacerse con el elemento instanciado, y no sobre el mixin.
  
  -------------------------------------------------------------------------------------------
  
  *23-03-2023*
  
  La funcionalidad de superhands que controla el movimiento segun la vista para los lados arriba y abajo es **grabbable**. Entonces, si se quiere conseguir una UX estetica y fluida lo mejor es aplicar esto: 
  ```html
  <a-mixin id="red_box" material="color: #AA0000"                      
                     grabbable
                     shadow="cast: true"
                     cursor="fuse: true"
                     dynamic-body="shape: box"
                     event-set__grabon="_event: grab-start; material.opacity: 0.5; transparent: true"
                     event-set__grabboff="_event: grab-end; material.opacity: 1; transparent: false">
            </a-mixin>
  ```
  En este ejemplo lo que estamos haciendo es que cuando se agarre el elemento (en este caso un prefab de una caja) cada vez que se agarre con el cursor (si queremos que sea con el mouse tenemos que poner atributo **capture-mouse** y como **rayOrigin** del cursor el mouse) hacemos que la opacidad de la caja baje para generar esa sensacion de interacción. Para que la funcionalidad de grabbable sea efectiva hay que aplicar fisicas a la escena.
  Para ello lo que tenemos que hacer es añadir la etiqueta **phisycs** en el elemento **a-scene** y en los respectivos elementos de la escena poner el atributo de **dynamic-body** para los elementos que van a moverse e interseccionar, y para los estaticos con los que se choca (como es el suelo) **static-body**. Se le añade a la etiqueta dynamic-body="shape: box.." por ejemplo para hacer mas preciso esas fisicas indicandole la forma. 
  
  --------------------------------------------------------------------------------------------------

  *24-03-2023*

  23. Physics and Collisions.
  Basicamente lo unico que explica aqui es el uso del static-body y dynamic-body de los objetos y el atributo physics
  con sus caracteristicas de gravity y restitution (que es como retorno (muelle). Tambien explica este efecto muelle desde los propios 
  objetos dynamic y static con linearDampingy tambien la caracteristica de mass.
  Como consejo para colisiones nos dice que podemos usar el mismo objeto y hacerlo invisible pero un poco mas grande en
  su escalado para las colisiones.

---------------------------------------------------------------------------------------------------
  *30-03-2023*
  
  Investigando para la escena final controlando un dron, problematicas:
  - controlar dron.
  - proyectar camara de dron en pantalla -> pagina stackoverflow: https://stackoverflow.com/questions/44760526/a-frame-how-to-render-2nd-camera-to-canvas


