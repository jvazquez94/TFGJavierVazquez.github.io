// Dron Movement
import * as THREE from 'three';

AFRAME.regiserComponent('dron-movement', {
    var THREE = requite()
    schema: {
        acceleration: { default: 30 },
        
    },

    init: function () {
        this.easing = 1.1;

        this.velocity = new THREE.Vector3();


    },

    tick: function (time, delta) {

    },

    updateVel: function (delta) {

    },

    getMovementVector: (function () {

    }),

})
