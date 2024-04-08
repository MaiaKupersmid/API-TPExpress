export default class Alumno {
    constructor(Username, DNI, Edad){
        this.Username = Username;
        this.DNI = DNI;
        this.Edad = Edad;
    }

    toString(){
        return 'soy ' + this.Username + ' y  mi DNI es ' + this.DNI;
    }

}

export {Alumno}