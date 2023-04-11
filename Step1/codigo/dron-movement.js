

AFRAME.registerComponent('dron-movement', {

    schema: {
            acceleration: {default: 40},
        },

    init: function () {
        var el = this.el;
        var velocity = new THREE.Vector3();       
              
    },


    tick: function (time, delta) {
      var dron = el.querySelector('#dron');
        var bot_up = el.querySelector('#boton_arriba');
        var velocity = this.velocity;
        var posy = dron.object3D.position.y;
        var target;

        bot_up.addEventListener('click', function (event) {
            pos += acceleration * delta;
        });
    },

})
