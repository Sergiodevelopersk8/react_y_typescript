import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {

    // aqui se especifica el tipo de Guitar para el localstorage (carrito de compras)
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0 ) { // existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            // obtiene la copia de item con los ...
            // especificamos que es de tipo cartitem
            const newItem : CartItem = {...item, quantity : 1}
            // se setea el elemento
            setCart([...cart, newItem])
        }
    }

   
      // funcion que elimina un producto del carrito de compras
    //   se usa un lookrevom Guitar['id'] para que no se genere rpoblemas a la hora de cambiar 
    // un dato en los types
      function removeFromCart(id: Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
      
      // funcion que incrementa los articulos con el boton de +
      
      function increaseQuantity(id: Guitar['id']){
      
       const updatedCart = cart.map(item => {
      
        if(item.id === id && item.quantity < MAX_ITEMS){
      
          return {...item, quantity:item.quantity + 1}
      
        }
      
        return item
       
      })
      
       setCart(updatedCart) 
      }
      
      // funcion de decrementar los objetos del carrito
      function decreaseQuantity(id: Guitar['id']){
        const updateCart = cart.map(item => {
          if (item.id === id && item.quantity > MIN_ITEMS ){
      return{...item, quantity:item.quantity - 1}
          }
          return item
        })
        setCart(updateCart)
      }
      

    function clearCart() {
        setCart([])
    }

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] )

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}