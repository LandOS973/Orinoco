// Affichage article dans la page article
function afficherArticle(article){
    document.querySelector('.image_teddy').innerHTML = `<img class="imageProduit" src="${article.imageUrl}" alt="image ours">`;
    document.querySelector('.name').innerHTML = `<h1>${article.name}</h1>`;
    document.querySelector('.price').innerHTML = `<p>${article.price/100} &euro;</p>`;
    document.querySelector('.description').innerHTML = `<p>${article.description}</p>`;
    document.querySelector('title').innerHTML = `Orinoco - ${article.name}`;
    // Boucle sur les différentes couleurs
    for (const color of article.colors) {
        document.querySelector('#colors').innerHTML += `<option value="${color}">${color}</option>`;
    }
}

// Changement de couleur de text pour l'une des pages pour respecter les contrast
function contrast(article){
    if (article.name == "Gustav") {
        document.querySelector('.article').classList.add("contrast");
    }
}

// Fonction qui informe ajout panier ou problème ajout panier
function alerte(article){
    let reponse = document.querySelector('.reponse');
    // Si la quantité d'ours ajouté au panier est supérieur a 1
    if (article.quantity >= 1) {
        reponse.innerHTML = `<div class="alert alert-success mb-2" role="alert">Commande ajoutée au panier !</div>`
    } else {
        reponse.innerHTML = `<div class="alert alert-danger mb-2" role="alert">Erreur : Quantité invalide</div>`
    }
}

// methode d'ajout au localstorage de l'article en transformant l'objet au format JSON
function ajoutPanier(article){
    document.querySelector('.panier').addEventListener('click', event => {
        event.preventDefault();
        // Enregistre couleur et quantité choisi + arrondi quantité 
        article.quantity = Math.round(document.querySelector('.quantity').value);
        article.color = document.querySelector('#colors').value;
        // Créer une variable qui vérifie si la key products existe
        let tableauProduit = JSON.parse(localStorage.getItem("products"));
        // Appel la fonction qui informe de l'ajout
        alerte(article);
        // Verifie que la quantité est valide
        if (article.quantity >= 1) {
            // Ajout un tableau de JSON au localstorage qui a l'id => "panier"
            if (tableauProduit) {
                // si tableauProduit existe, ajoute aux localStorage a la key products
                tableauProduit.push(article);
                localStorage.setItem("products",JSON.stringify(tableauProduit));
            } else {
                // si tableauProduit n'existe pas, transform tableauProduit en tableau et ajoute aux localStorage a la key products
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


