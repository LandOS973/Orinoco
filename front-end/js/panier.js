// Affichage panier dans la page panier
function affichagePanier(panier){
    if (!panier) {
        // Si la variable panier est vide
        document.querySelector('.panier').innerHTML += `<p class="text-center">Panier vide !</p><img class="travolta" src="../back-end/images/travolta.gif" alt="" srcset="">`;
    }else{
        // Boucle sur chaque article du panier
        for (const article of panier) {
            document.querySelector('.panier').innerHTML += `
            <div class="col-sm-6 col-lg-4 mb-4">
                <div class="card">
                    <img class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title text-center">${article.name}</h4>
                        <p class="card-text">${article.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Couleur : ${article.color}</li>
                        <li class="list-group-item">Quantité : ${article.quantity}</li>
                        <li class="list-group-item">Prix : ${(article.price * article.quantity) / 100} &euro;</li>
                    </ul>
                </div>
            </div>
            `
        }
    }
}

// Affichage du prix total => Utilise la fonction "total()" défini dans function.js
function afficheTotal(panier){
    if (panier) {
        //  Si le panier est défini :
        document.querySelector('.total').innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4 text-center">
            <div class="card ">
                <div class="card-body ">
                    <strong>Prix total</strong> : ${total(panier)} &euro;
                </div>
            </div>
        </div>`
    }
}

// Supprime tout les articles du panier
function supprimer(){
    // Ecoute l'évenement du bouton supprimer
    document.querySelector('.effacer').addEventListener("click",function(e){
        e.preventDefault();
        // Supprime le storage qui à la key "products"
        localStorage.removeItem("products");
        // Recharge la page pour afficher un panier vide (et john travolta)
        location.reload();
    })
}

function main(){
    let panier = JSON.parse(localStorage.getItem("products"));
    affichagePanier(panier);
    afficheTotal(panier);
    supprimer(); 
}

main();