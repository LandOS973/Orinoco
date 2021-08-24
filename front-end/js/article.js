// Affichage article dans la page dédiée

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

// Changement de couleur de text pour l'une des pages 

function contrast(article){
    if (article.name == "Gustav") {
        document.querySelector('.article').classList.add("contrast");
    }
}

// methode d'ajout au localstorage de l'article en transformant l'objet au format JSON

function ajoutPanier(article,key){
    document.querySelector('.panier').addEventListener('click', event => {
        article.quantity = document.querySelector('.quantity').value;
        localStorage.setItem(key,JSON.stringify(article));
        key++;
    });
}

async function main(){
    const article = await getArticles(`http://localhost:3000/api/teddies/${new URL(document.location.href).searchParams.get("id")}`);
    let key = 0;
    contrast(article);
    afficherArticle(article);
    ajoutPanier(article,key);
}


main();


