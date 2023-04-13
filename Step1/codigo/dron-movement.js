

AFRAME.registerComponent('up', {    

    init: function(){
        
    },

    tick: function(time, deltaTime){
        
        var scene = document.querySelector('a-scene');
        var dron = scene.querySelector('#dron');
        var bot = scene.querySelector('#boton_arriba');
        var posy = dron.object3D.position.y;
        
        bot.addEventListener('click', (event) => {
            console.log("CLICK BOTON ARRIBA");
            console.log(time);
            posy += 1;  
            console.log(posy);          
        });
    },   
})
