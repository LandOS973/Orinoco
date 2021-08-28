// renvoie un objet a partir de l'url de l'api
async function getArticles(url){
    return fetch(url)
        .then(response => response.json())
        .then(articles => {return articles})
        .catch(err => console.log(err))
}

//Calcul prix total de la commande
function total(panier){
    let total = 0;
    for (const article of panier) {
        total += article.price;
    }
    total/= 100;
    return total;
}