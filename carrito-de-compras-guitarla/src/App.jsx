import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import {db} from './data/db';
import { useState,useEffect } from "react";
import { Return } from "three/examples/jsm/transpiler/AST.js";
import { SpecularMIPLevelNode } from "three/examples/jsm/nodes/Nodes.js";



// componente principal de aplicacion
function App() {
/******************************************** INICIO DE VARIABLES     *********************************************/ 
const MAX_ITEMS = 5
const MIN_ITEMS = 1
const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : [] //si el carrito tiene guardado llama al parse sino este esta vacio []
}
/******************************************** FIN DE VARIABLES     *********************************************/ 




  /******************************************** INICIO DE USES  *********************************************/ 
  
  //state de react
  const [data] = useState(db)
  
  
  // state para el carrito de compras 
  const [cart,setCart] = useState(initialCart)
  
  //sincroniza con el cambio de cart para guardar nuestro carro en localstorage y no se tenga que agregar dos veces el elemento
  useEffect(()=>{
  localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])


  /******************************************** FIN DE USES  *********************************************/ 




/******************************************** INICIO DE LAS FUNCIONES    *********************************************/ 


function addToCart (item){

 //no motuar el set
 const itemExists = cart.findIndex((guitar)=> guitar.id === item.id ) //comprueba si esxiste el id en el item
 
 if(itemExists >= 0){

  if(cart[itemExists].quantity >= MAX_ITEMS) return //limita las veces que se puede agregar el producto desde el boton de agregar
  const updateCart = [...cart]; //copia del carrito

  updateCart[itemExists].quantity++ //pasamos la posicionmodificamos para agregar al carrito

  setCart(updateCart) //seteamos el carrito


}
else{

   item.quantity = 1 //propiedad nueva 
   
   setCart([...cart,item]) //crea una copia del arreglo 

 }


}

// funcion que elimina un producto del carrito de compras
function removeFromCart(id){
  setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

// funcion que incrementa los articulos con el boton de +

function increaseQuantity(id){

 const updatedCart = cart.map(item => {

  if(item.id === id && item.quantity < MAX_ITEMS){

    return {...item, quantity:item.quantity + 1}

  }

  return item
 
})

 setCart(updatedCart) 
}

// funcion de decrementar los objetos del carrito
function decrementQuantity(id){
  const updateCart = cart.map(item => {
    if (item.id === id && item.quantity > MIN_ITEMS ){
return{...item, quantity:item.quantity - 1}
    }
    return item
  })
  setCart(updateCart)
}


function clearCart(){
  setCart([]) //vacia el carrito de todos los elementos
}







/******************************************** FIN DE LAS FUNCIONES    *********************************************/


// este componente se llama en el index html

  return ( //se muestar en pantalla
    <>

    <Header
    cart={cart}
    removeFromCart={removeFromCart} /* manda la señal al header.jsx para eliminar producto del carrito compra*/
    increaseQuantity={increaseQuantity}
    decrementQuantity={decrementQuantity}
    clearCart={clearCart}
    /> {/*Compónente de header */}

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* siguiente codigo es de javascript */}
          {data.map((guitar)=>(
              
              <Guitar 
              //propts de key se usa cada vez que se use una iteracion map 
              key={guitar.id} //llave de la id 
            //   props palabra reservada de react se hace desde el componente
              guitar={guitar}

              // prop del carrito de compras setCar
              setCart={setCart}
              addToCart={addToCart}

              />

          )
          )}

        </div>
    </main>

    <Footer/> {/*Compónente de footer aqui el orden si importa */}

    
          
    </>)
}

export default App
