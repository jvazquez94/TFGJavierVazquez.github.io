AFRAME.registerComponent('mov', {
    schema: {
        coors: { type: 'array' }
    },

    init: function () {
        this.dron = this.el;
        this.currentCoorIndex = 0;
    },

    tick: function (time, deltaTime) {
        if (this.currentCoorIndex < this.data.coors.length) {
            let nextCoord = this.data.coors[this.currentCoorIndex];
            let currentPosition = this.dron.getAttribute('position');
            let v3Coord = this.getCoors(nextCoord);

            let distance = Math.sqrt(
                (v3Coord.x - currentPosition.x) ** 2 +
                (v3Coord.y - currentPosition.y) ** 2 +
                (v3Coord.z - currentPosition.z) ** 2
            );

                this.dron.setAttribute('position', v3Coord);

            console.log(v3Coord.x - currentPosition.x);
            console.log(v3Coord.y - currentPosition.y);
            console.log(v3Coord.z - currentPosition.z);
            console.log(distance);

            if (distance < 0.1) {
                this.currentCoorIndex++;
            }


        }
    },

    getCoors: function (strCoors) {
        let vx = '';
        let vy = '';
        let vz = '';
        let v3 = {};
        let blankIndex = 0;

        for (let i = 0; i < strCoors.length - 1; i++) {

            if (strCoors[i] != ' ') {
                if (blankIndex == 0) {
                    vx = vx + strCoors[i];
                } else if (blankIndex == 1) {
                    vy = vy + strCoors[i];
                } else {
                    vz = vz + strCoors[i];
                }

            } else {
                blankIndex++;
            }

            //Casteamos a tipo numero multiplicando por 1
            vx = vx * 1;
            vy = vy * 1;
            vz = vz * 1;
        }
        return v3 = { x: vx, y: vy, z: vz };
    }

})