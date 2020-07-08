
//halar data//

let element = document.getElementById('personajitos')

for (var i = 1; i < 10; i++) {
    fetch('https://rickandmortyapi.com/api/character/' + i + '/').then(response => {
        response.json().then(data => {
            debugger
            element.innerHTML = `
            <div>
                <img src='${data.image}'/>
                <p>${data.name}</p>
                <p>${data.status}</p>
                <p>${data.species}</p>
                <p>${data.type}</p>
                <p>${data.gender}</p>
                <p>${data.origin.name}</p>
                
            </div>
            `;
            console.log(data)
        });
    })
        .catch(err => console.log(err));
}



/* menu*/

const buttonMenu = document.querySelector('#main-menu-button');

buttonMenu.addEventListener('click', toggleMenu);

/**
 * Toggles main menu
 * @param {Event} event 
 */
function toggleMenu(event) {
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.toggle('active');
}

//funcion slider//}

const slides=document.querySelector(".slider").children;
const indicator=document.querySelector(".slider-indicator").children;

 for(let i=0; i<indicator.length; i++){
     indicator[i].addEventListener("click",function(){
      
        for(let j=0; j<indicator.length; j++){
          indicator[j].classList.remove("active");
        }
         this.classList.add("active");
         const id=this.getAttribute("data-id");
        for(let j=0; j<slides.length; j++){
            slides[j].classList.remove("active");
        }

         slides[id].classList.add("active");

     })
 }
