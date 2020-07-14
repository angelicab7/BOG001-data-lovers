
/*Loading indicator*/ 
let currentPage = 1;
const loadingIndicator = document.querySelector('.loading-indicator');
let isLoading = false;

async function getCharacters(page = 1) {
    let charactersContainer = document.querySelector('#characters-container');
    loadingIndicator.classList.add('active');
    isLoading = true;
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();
    isLoading = false;
    loadingIndicator.classList.remove('active');
    console.log(data);
    data.results.forEach(character =>
        charactersContainer.innerHTML += cardCharacter(
            character.image,
            character.name,
            character.status,
            character.location.name,
            character.origin.name,
            character.specie
        )
    );
};

getCharacters();

/*Flip card*/
function cardCharacter(urlImage, name, status, location, origin, specie) {
    return (
        `
        <div class="column">
                <div class="card">
                    <img src="${urlImage}" alt="image" class="card-image" />
                    <div class="card-content">
                        <h3 class="card-title">${name}</h3>
                        <p class="card-description">
                            Status: ${status}
                        </p>
                        <p class="card-description">
                            Specie: ${specie}
                        </p>
                        <p class="card-description">
                            Origin: ${origin}
                        </p>
                        <p class="card-description">
                            Current location: ${location}
                        </p>
                    </div>
                </div>
            </div>
        `
    )
};

/*Infinite Scroll*/
function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


window.onscroll = function () {
    if (getScrollTop() + 40 < getDocumentHeight() - window.innerHeight) {
        return;
    }
    if (!isLoading) {
        currentPage++;
        getCharacters(currentPage);
    }
};


