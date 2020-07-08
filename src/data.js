//halar data//

let element = document.getElementById('personajitos')

for (var i = 1; i < 50; i++) {
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




