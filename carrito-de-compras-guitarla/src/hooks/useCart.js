// este es un custom hook y estos solo deben de tener logica no templates por eso se 
// use el js

import { useState,useEffect } from "react";
import {useMemo} from 'react';
import {db} from '../data/db';

function useCart(){

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
   

   
    //state derivado
    const isEmpty = useMemo(() => cart.length === 0,[cart]) //con usememo solo se ejecuta esto cuando carrito haya sido modificado


    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price ), 0) ,[cart]) 



    // este es el ereturn y es recomendable que sea en un objeto para usarlo en otros lados 
    // con el nombre de lo que se retorn

   return{
    data,
    cart,
    isEmpty,
    cartTotal,
    addToCart,
    removeFromCart,
    decrementQuantity,
    increaseQuantity,
    clearCart,
   }





}


export {
    useCart
}