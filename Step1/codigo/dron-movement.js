AFRAME.registerComponent('up', {  
    schema: {
        activado: {type: 'boolean'},
    },  

    init: function(){
        
    },

    tick: function(){    
        var scene = document.querySelector('a-scene');
        var dron = scene.querySelector('#dron');
          
        if(this.activado){
            dron.object3D.position.y += 1
       }         
    },
    
    
    
})
