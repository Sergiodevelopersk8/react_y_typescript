import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import {db} from './data/db';
import { useState } from "react";


// componente principal de aplicacion
function App() {


//state de react
const [data, setData] = useState(db)


// state para el carrito de compras 
const [cart,setCart] = useState([])


function addToCart (item){

 //no motuar el set
 const itemExists = cart.findIndex((guitar)=> guitar.id === item.id ) //comprueba si esxiste el id en el item
 
 if(itemExists >= 0){
  alert("existe el elemento ")
}
else{

   item.quiantity = 1 //propiedad nueva 

 }


setCart([...cart,item]) //crea una copia del arreglo 

}

// este componente se llama en el index html

  return ( //se muestar en pantalla
    <>

    <Header/> {/*Compónente de header */}

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
