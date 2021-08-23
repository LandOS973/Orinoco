function afficherArticles(articles){
    for (const article of articles) {
        document.querySelector('.product').innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card">
                <a href="./article.html?id=${article._id}">
                    <img class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="price">${article.price/100} &euro;</h5>
                        <h5 class="card-title">${article.name}</h5>
                        <div class="description">
                            <p class="card-text">${article.description}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>`;
    }
}


async function main(){
    const articles = await getArticles("http://localhost:3000/api/teddies");
    afficherArticles(articles);
}

main();
