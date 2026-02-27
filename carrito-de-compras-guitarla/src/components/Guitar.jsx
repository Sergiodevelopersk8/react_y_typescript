

export default function Guitar({guitar, addToCart /*destructing del propts y propts que van en App.jsx*/} )
{

    //segundo destructing
    const {nombre,image,description, price} = guitar;


    return(<>
     <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{nombre}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3"> ${price}  </p>
                    <button 
                        type="button"
                        onClick={
                            //arrow function para que no se llame en automatico 
                            () => addToCart(guitar)   // llama a la funcion de addToCart que esta en App.jsx  
                        }
                        className="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>
            </div>
    
    
    
    </>)
}