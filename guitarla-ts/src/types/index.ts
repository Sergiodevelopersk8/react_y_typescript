// en este archivo centraliza todos los types
// se exportan para los componenetes o Hooks que lo necesiten
// se especifica el tipo que es guitar
export type Guitar = {
    id:number
    name:string
    image:string
    description:string
    price:number
}

// aqui hereda de arriba el type de Guitar
// se hace poniendo Guitar y el amperson &
// tambien puede que CartItem sea una interfaz y heredar de un type y se usa el extends
// export interface CartItem extends Guitar &{
// otra forma es usando el utility
// utility usando el pick que seleccionando atributos de otro type
// export type CartItem =  Pick<Guitar,'id'| 'name' | 'price'> & { quantity:number }

export type CartItem = Guitar &{
    quantity:number
}
