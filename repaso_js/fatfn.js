// funciones que se DECLARAN con la palabra reservada function
function Fn() {
  // { prop: 'propiedad' }
  //
  this.prop = 'propiedad'
}

Fn.prototype.lala = function FuncionDePrototipo() {}

const r = new Fn()
//console.log(r.__proto__);
//

// fat arrow function

const fatFn = () => { // NO TIENEN CONTEXTO DE THIS!!!!
  this.prop = 'lala'
}

const r1 = fatFn()
//console.log(this);

//console.log(r1)
//

// return implicito
const fnR = () => 2


console.log(fnR());
