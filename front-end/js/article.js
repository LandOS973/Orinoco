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

// Fonction qui informe ajout panier ou problème ajout panier
function alert(article){
    let reponse = document.querySelector('.reponse');
    if (article.quantity > 0) {
        reponse.innerHTML = `<div class="alert alert-success mb-2" role="alert">Commande ajoutée au panier !</div>`
    } else {
        reponse.innerHTML = `<div class="alert alert-danger mb-2" role="alert">Erreur : Quantité invalide</div>`
    }
}

// methode d'ajout au localstorage de l'article en transformant l'objet au format JSON
function ajoutPanier(article){
    document.querySelector('.panier').addEventListener('click', event => {
        event.preventDefault();
        // Enregistre couleur et quantité choisi
        article.quantity = document.querySelector('.quantity').value;
        article.color = document.querySelector('#colors').value;
        let tableauProduit = JSON.parse(localStorage.getItem("products"));
        alert(article);
        // Verifie que la quantité est valide
        if (article.quantity > 0) {
            // Ajout un tableau de JSON au localstorage qui a l'id => "panier"
            if (tableauProduit) {
                tableauProduit.push(article);
                localStorage.setItem("products",JSON.stringify(tableauProduit));
            } else {
                tableauProduit = [];
                tableauProduit.push(article);
                localStorage.setItem("products",JSON.stringify(tableauProduit));
            }
        }
    });
}

async function main(){
    const article = await getArticles(`http://localhost:3000/api/teddies/${new URL(document.location.href).searchParams.get("id")}`);
    contrast(article);
    afficherArticle(article);
    ajoutPanier(article);
}

main();


