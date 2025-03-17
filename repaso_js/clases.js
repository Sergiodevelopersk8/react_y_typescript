//const Rectangulo = class {

//}

//console.log(Rectangulo);
// clases declaradas con class no tienen hoisting!
class Rectangulo {

}

// Hoisting
// Y esto es cuando tomamos variables definidas con var
// y funciones definidas con function
// y las lleva al comienzo del archivo
//console.log(Cuadrado);
function Cuadrado() {}
//console.log(Cuadrado, Rectangulo);

const r = new Rectangulo()

class Chancho {
  propiedad = 'mi propiedad'
  #hambre
  static estatico = 42
  constructor(estado = 'feliz', hambre = false) {
    this.estado = estado
    this.#hambre = hambre
  }

  hablar() {
    console.log(`soy un chancho ${this.estado} ${this.#hambre ? 'con mucha hambre!' : 'satisfecho!'}`);
  }

  static comer() {
    console.log(this.estatico, 'estoy comiendo!');
  }
}

Chancho.comer()
const feliz = new Chancho('feliz')
//console.log(feliz.__proto__);
//feliz.hablar()
//console.log(feliz);
const triste = new Chancho('triste')
//triste.hablar()
const nose = new Chancho()
//nose.hablar()
