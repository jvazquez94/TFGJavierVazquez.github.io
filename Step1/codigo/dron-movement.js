AFRAME.registerComponent('up', {  
    schema: {
        
    },  

    init: function(){  
        
    },
    

    tick: function(time, timeDelta){        
        
        this.el.object3D.position.y += 1;

    }  
})
