function affichagePanier(panier){
    if (!panier) {
        document.querySelector('.panier').innerHTML += "Panier vide !";
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
        document.querySelector('.validation').innerHTML +=`<btn href="#" class="retrait margin col-2 mb-4 btn btn-danger">Effacer le panier</btn>`;
        document.querySelector('.validation').innerHTML +=`<btn href="#" class="valider margin col-2 mb-4 btn btn-success">Valider la commande</btn>`;
    }
}


// Supprime tout les articles du panier
function supprimer(){
    document.querySelector('.retrait').addEventListener("click",function(e){
        e.preventDefault();
        localStorage.removeItem("panier");
        location.reload();
    })
}

function main(){
    let panier = JSON.parse(localStorage.getItem("panier"));
    affichagePanier(panier);
    supprimer(); 
}

main();