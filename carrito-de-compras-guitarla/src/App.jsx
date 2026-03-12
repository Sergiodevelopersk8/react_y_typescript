import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import {useCart} from './hooks/useCart'



// componente principal de aplicacion
function App() {


  //Este objeto se llama desde el hook de useCart importa todas las funciones
  const {data,cart, isEmpty,cartTotal,addToCart,removeFromCart,decrementQuantity,increaseQuantity,clearCart} = useCart()

// este componente se llama en el index html

  return ( //se muestar en pantalla
    <>

    <Header
    cart={cart}
    isEmpty = { isEmpty}
    cartTotal = {cartTotal}
    removeFromCart = {removeFromCart} /* manda la señal al header.jsx para eliminar producto del carrito compra*/
    increaseQuantity = {increaseQuantity}
    decrementQuantity = {decrementQuantity}
    clearCart = {clearCart}
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
              // setCart={setCart}
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
