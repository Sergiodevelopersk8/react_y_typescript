function fn(){
    this.prop = "propiedad";
    return 'esto es desde fn return';
}

const r = new fn();
console.log(r.__proto__);