const rest = (a, b, ...argumentos) => {
  console.log(a, b);
  console.log(argumentos);
}

//rest(1, 2, 3, 4, 5, 6)

const obj = {
  a: 1, b: 2, c: 3, d: 4
}

//const { a, b, ...restobj } = obj
//console.log(a, b, restobj);

const arr = [1, 2, 3, 4, 5]

const [a, b, ...r] = arr

const useState = () => ['valor', () => {}]

const [valor, setValor] = useState()
console.log(valor, setValor);
