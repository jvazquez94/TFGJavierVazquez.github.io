AFRAME.registerComponent('up', { 
    schema: {
        activado: {type: 'boolean', default: 'false'},
        click: {type: 'int', default: 0}
    },

    init: function(){
      this.el.object3D.position.y = 0.25;
    },

    tick: function(){       
        var botonupComponent = document.querySelector('[botonup]').components.botonup;
        
        botonupComponent.el.addEventListener('click', (event)=>{
           if(this.data.click == 0){
                this.data.activado = true;
                this.data.click = 1;
           }else{
                this.data.activado = false;
                this.data.click = 0;
           }            
        })

        if(this.data.activado){
            this.el.object3D.position.y += 0.01;
        } 
    }
}),

AFRAME.registerComponent('botonup', {
    events: {
        click: function(evt){
            console.log("El elemento boton_arriba ha sido CLICKEADO!");
        }
    },
})
