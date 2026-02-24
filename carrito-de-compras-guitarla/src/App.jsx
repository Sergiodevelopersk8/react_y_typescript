import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import {db} from './data/db';
import { useState } from "react";


// componente principal de aplicacion
function App() {


//state de react
const [data, setData] = useState(db)



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
              key={guitar.id}
            //   props palabra reservada de react se hace desde el componente
              guitar={guitar}
              />

          )
          )}

        </div>
    </main>

    <Footer/> {/*Compónente de footer aqui el orden si importa */}

    
          
    </>)
}

export default App
