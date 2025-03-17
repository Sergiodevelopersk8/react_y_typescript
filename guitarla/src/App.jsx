import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import {db} from "../src/data/db"


function App() {

 const initialCart = () =>{
     const localstorageCart = localStorage.getItem('cart')
     return localstorageCart ? JSON.parse(localstorageCart) : []
     }
     
     const [data] = useState(db)
 
 const [cart, setCart] = useState(initialCart)




const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

useEffect(()=>{ 
    localStorage.setItem('cart',JSON.stringify(cart))
},[cart])

function addToCart(item){

    const itemExists = cart.findIndex((guitar)=> guitar.id === item.id )
    if(itemExists >= 0 ){
        if(cart[itemExists].quantity >= MAX_ITEMS) return
        const updateCart = [...cart]
        updateCart[itemExists].quantity++;
        setCart(updateCart)
    }
    else{
        item.quantity = 1
        setCart([...cart,item])
    }

  
}

function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

function increaseQuantity(id){
const updateCart = cart.map(item =>{
    if(item.id === id && item.quantity < MAX_ITEMS){
        return{
            ...item,
            quantity: item.quantity + 1
        }
    }
    return item
})



//setearlo 
setCart(updateCart)

}


function decrementQuantity(id){
    const updateCart = cart.map(item =>{
        if(item.id === id && item.quantity > MIN_ITEMS){
            return{
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updateCart)
}

function clearCart(){
    setCart([])
}





  return (
    <>
     <Header
     cart={cart}
     removeFromCart={removeFromCart}
     increaseQuantity = {increaseQuantity}
     decrementQuantity = {decrementQuantity}
     clearCart = {clearCart}
     />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
    
    {
    /* iterar el array de objetos */
    data.map((guitar) =>(
        
        <Guitar
        key={guitar.id}
        guitar = {guitar}
        cart = {cart}
        setCart = {setCart}
        addToCart = {addToCart}
       
        />
        
    ))
    
    }
    
         

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
