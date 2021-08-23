function afficherArticle(article){
    document.querySelector('.image_teddy').innerHTML = `<img class="imageProduit" src="${article.imageUrl}" alt="image ours">`;
    document.querySelector('.name').innerHTML = `<h1>${article.name}</h1>`;
    document.querySelector('.price').innerHTML = `<p>${article.price/100} &euro;</p>`;
    document.querySelector('.description').innerHTML = `<p>${article.description}</p>`;
    document.querySelector('title').innerHTML = `Orinoco - ${article.name}`;
    for (const color of article.colors) {
        document.querySelector('#colors').innerHTML += `<option value="${color}">${color}</option>`;
    }

}

async function main(){
    const url = new URL(document.location.href);
    const id = url.searchParams.get("id");
    const article = await getArticles(`http://localhost:3000/api/teddies/${id}`);
    afficherArticle(article);
}

main();