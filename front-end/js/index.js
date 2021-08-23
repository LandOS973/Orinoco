function getArticles(){
    return fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then(articles => {return articles})
        .catch(err => console.log(err))
}

function afficherArticles(articles){
    for (const article of articles) {
        document.querySelector('.product').innerHTML += `
        <div class="col-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${article.name}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        `;
    }
}


async function main(){
    const articles = await getArticles();
    afficherArticles(articles);
}

main();
