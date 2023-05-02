    AFRAME.registerComponent('movement', { 
        schema: {
            activadoup: {type: 'boolean', default: 'false'},
            activadodown: {type: 'boolean', default: 'false'},
            activadostraight: {type: 'boolean', default: 'false'},
            activadoback: {type: 'boolean', default: 'false'},
            activadoright: {type: 'boolean', default: 'false'},
            activadoleft: {type: 'boolean', default: 'false'},
            clickup: {type: 'int', default: 0},
            clickdown: {type: 'int', default: 0}
        },

        init: function(){
            var scene = document.querySelector('a-scene');
            var btnup = scene.querySelector('#boton_arriba');
            var btndown = scene.querySelector('#boton_abajo');
            var btnstraight = scene.querySelector('#boton_recto');
            var btnback = scene.querySelector('#boton_atras');
            var btnright = scene.querySelector('#boton_der');
            var btnleft = scene.querySelector('#boton_izq');

            //Inicializamos los estados para el boton de recto
            btnstraight.addEventListener('click', (event)=>{            
                this.data.activadostraight = true; 
                this.data.activadoback = false;
                    
            });
            

            btnback.addEventListener('click', (event)=>{
                this.data.activadoback = true;
                this.data.activadostraight = false; 
            });
            

            btnright.addEventListener('click', (event)=>{
                this.data.activadoright = true;
                this.data.activadoleft = false;
            });
            

            btnleft.addEventListener('click', (event)=>{
                this.data.activadoleft = true;
                this.data.activadoright = false;
            });
            

            //Inicializamos los estados para el boton de subir
            btnup.addEventListener('click', (event)=>{            
                
            if(this.data.clickup == 0 && this.data.clickdown == 0){ //Estado: PARADO -> SUBIR
                    this.data.activadoup = true;
                    this.data.clickup = 1;
                    this.data.activadodown = false;
            }else if(this.data.clickup == 0 && this.data.clickdown == 1){ //Estado: BAJANDO -> SUBIR
                    this.data.activadoup = true;
                    this.data.clickup = 1;
                    this.data.clickdown = 0;
                    this.data.activadodown = false;
                
            }else if(this.data.clickup == 1 && this.data.clickdown == 0){ //Estado: SUBIENDO -> PARAR
                    this.data.activadoup = false;
                    this.data.clickup = 0;
                    this.data.activadodown = false;
            }           
            });
            
            //Inicializamos los estados para el boton de bajar
            btndown.addEventListener('click', (event)=>{
                
                if(this.data.clickup == 0 && this.data.clickdown == 0){//Estado: PARADO -> BAJAR
                    this.data.activadodown = true;
                    this.data.clickdown = 1;
                    this.data.activadoup = false;
            }else if(this.data.clickup == 0 && this.data.clickdown == 1){//Estado: BAJANDO -> PARAR
                    this.data.activadodown = false;
                    this.data.clickdown = 0;
                    this.data.activadoup = false;
            }else if(this.data.clickup == 1 && this.data.clickdown == 0){//Estado: SUBIENDO -> BAJAR
                    this.data.activadodown = true;
                    this.data.clickdown = 1;
                    this.data.activadoup = false;
                    this.data.clickup = 0;
            }           
            });
        },

        tick: function(time, timeDelta){ 
            var data = this.data; 
            var el = this.el; 

            if(data.activadoup){
                el.object3D.position.y += 0.01;
            }else if(data.activadodown){
                el.object3D.position.y -= 0.01;
            }
            
            if(data.activadostraight){
                el.object3D.position.z -= 0.01; //alejarse hacia adelante en el eje z es -
            }else if(data.activadoback){
                el.object3D.position.z += 0.01;
            }
            
            if(data.activadoright){
                el.object3D.position.x += 0.01;
            }else if(data.activadoleft){
                el.object3D.position.x -= 0.01;
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
    }),

    AFRAME.registerComponent('btnstraight', {
        events: {
            click: function(evt){
                console.log("El elemento boton_recto ha sido CLICKEADO!");
            }
        },
    }),

    AFRAME.registerComponent('btnback', {
        events: {
            click: function(evt){
                console.log("El elemento boton_atras ha sido CLICKEADO!");
            }
        },
    }),
    AFRAME.registerComponent('btnright', {
        events: {
            click: function(evt){
                console.log("El elemento boton_derch ha sido CLICKEADO!");
            }
        },
    }),
    AFRAME.registerComponent('btnleft', {
        events: {
            click: function(evt){
                console.log("El elemento boton_izq ha sido CLICKEADO!");
            }
        },
    })
