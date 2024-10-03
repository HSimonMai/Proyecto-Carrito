//variables
const carrito = document.querySelector('#carrito');
const listaCurso = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito =[];


cargarEventListeners();
function cargarEventListeners(){
//cuando agregas un curso presionando "agregar al carrito"
listaCurso.addEventListener('click',agregarCurso)

  //Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded',() => {
  articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carritoHTML();

//Eliminas cursos del carrito
carrito.addEventListener('click', eliminarCurso);

})};

function agregarCurso(e){
    e.preventDefault(); 
if(e.target.classList.contains("agregar-carrito")  ) {
 //console.log('Agregando al carrito'+e.target.parentElement.firstElementChild.textContent;
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);   
 
    }
}
//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        //Eliminar del arreglo de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId) 
        console.log(articulosCarrito)
    
        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
        }
    }

vaciarCarritoBtn.addEventListener('click',limpiarCarrito)
function limpiarCarrito(){
    articulosCarrito = []
    carritoHTML()
}



// // funciones 
// function agregarCurso(e) {
    
//     console.log(e.target.classList) 
// }  
// lee el contenido del html al que le dimos click y extrae la informacion del curso 
function leerDatosCurso(curso) {
    console.log(curso);  


    const infoCurso={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    } 

  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
   if(existe) {

    const cursos= articulosCarrito.map( curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
        } else {
            return curso;
        } 
        
       }); 
      articulosCarrito = [...cursos];
     } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    } 


    // console.log(infoCurso.imagen)
    // console.log(infoCurso.titulo)
    // console.log(precio)
    // console.log(id)
    // Agrega elementos al arreglo de carrito
    
    carritoHTML()
}




//limpiar HTML


// muestra el carrito de compras en el html 
function carritoHTML() { 
    LimpiarHTML();
    //recorre el carrito y genera html
    articulosCarrito.forEach(curso => { 
        const {imagen,titulo,precio,cantidad,id} = curso  
        const row = document.createElement('tr'); 
        row.innerHTML = `
             <td>
               <img src = ${imagen} width= '100'>
             </td>
             <td>
              ${titulo}
              </td>
              <td>
              ${precio}
              </td>
              <td>
              ${cantidad}
              </td>
            <td>
                <a href='#' class='borrar-curso' data-id="${id}"> X </a>
            </td>
        `;

        
        

        //Agrega el HTML de el carrito en el tbody
        contenedorCarrito.appendChild(row);
        
});
    sincronizarStorange();
};


function sincronizarStorange(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito)); 
};

//Elimina los cursos del Tbody
function LimpiarHTML(){

     

while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)

}

};
