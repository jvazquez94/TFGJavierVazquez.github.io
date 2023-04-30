AFRAME.registerComponent('movement', { 
    schema: {
        activadoup: {type: 'boolean', default: 'false'},
        activadodown: {type: 'boolean', default: 'false'},
        clickup: {type: 'int', default: 0},
        clickdown: {type: 'int', default: 0}
    },

    tick: function(){       
        var botonupComponent = document.querySelector('[botonup]').components.botonup;
        var botondownComponent = document.querySelector('[botondown]').components.botondown;

        console.log("ACTIVADO UP: "+this.data.activadoup + " - CLICK UP: "+ this.data.clickup + "| ACTIVADO DOWN: "+ this.data.activadodown +
            " - CLICK DOWN: " + this.data.clickdown);

        botonupComponent.el.addEventListener('click', (event)=>{            
            
           if(this.data.clickup == 0 && this.data.clickdown == 0){
                console.log("TRAZA PARADO -> SUBIR");
                this.data.activadoup = true;
                this.data.clickup = 1;
                this.data.activadodown = false;
           }else if(this.data.clickup == 0 && this.data.clickdown == 1){
                console.log("TRAZA BAJANDO -> SUBIR");
                this.data.activadoup = true;
                this.data.clickup = 1;
                this.data.clickdown = 0;
                this.data.activadodown = false;
            
           }else if(this.data.clickup == 1 && this.data.clickdown == 0){
            console.log("TRAZA SUBIENDO -> PARAR");
                this.data.activadoup = false;
                this.data.clickup = 0;
                this.data.activadodown = false;
           }           
        })

        botondownComponent.el.addEventListener('click', (event)=>{
            
            if(this.data.clickup == 0 && this.data.clickdown == 0){
                console.log("TRAZA PARADO->BAJAR");
                this.data.activadodown = true;
                this.data.clickdown = 1;
                this.data.activadoup = false;
           }else if(this.data.clickup == 0 && this.data.clickdown == 1){
            console.log("TRAZA BAJANDO -> PARAR");
                this.data.activadodown = false;
                this.data.clickdown = 0;
                this.data.activadoup = false;
           }else if(this.data.clickup == 1 && this.data.clickdown == 0){
            console.log("TRAZA SUBIENDO -> BAJAR");
                this.data.activadodown = true;
                this.data.clickdown = 1;
                this.data.activadoup = false;
                this.data.clickup = 0;
           }           
         })

        if(this.data.activadoup){
            this.el.object3D.position.y += 0.01;
        }else if(this.data.activadodown){
            this.el.object3D.position.y -= 0.01;
        }
    }
}),

AFRAME.registerComponent('botonup', {
    events: {
        click: function(evt){
            console.log("El elemento boton_arriba ha sido CLICKEADO!");
        }
    },
}),

AFRAME.registerComponent('botondown', {
    events: {
        click: function(evt){
            console.log("Elemento boton_abajo ha sido CLICKEADO");
        }
    }
})
