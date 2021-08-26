function affichagePanier(panier){
    if (!panier) {
        document.querySelector('.panier').innerHTML += `<p class="text-center">Panier vide !</p><img class="travolta" src="../back-end/images/travolta.gif" alt="" srcset="">`;
    }else{
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

//Calcul et Affiche prix total de la commande
function total(panier){
    if (panier) {
        let total = 0;
        for (const article of panier) {
            total += article.price;
        }
        total/= 100;
        document.querySelector('.total').innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4">
            <div class="card ">
                <div class="card-body ">
                    <strong>Prix total</strong> : ${total} &euro;
                </div>
            </div>
        </div>`
    }
}

// Supprime tout les articles du panier
function supprimer(){
    document.querySelector('.effacer').addEventListener("click",function(e){
        e.preventDefault();
        localStorage.removeItem("products");
        location.reload();
    })
}

function main(){
    let panier = JSON.parse(localStorage.getItem("products"));
    affichagePanier(panier);
    total(panier);
    supprimer(); 
}

main();