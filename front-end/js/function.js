// renvoie une variable a partir de l'url de l'api

async function getArticles(url){
    return fetch(url)
        .then(response => response.json())
        .then(articles => {return articles})
        .catch(err => console.log(err))
}