// Affiche la commande réalisée
function affichageCommande(){
    // Récupère le prix total et l'orderId dans LocalStorage
    const price = localStorage.getItem("price");
    const orderId = localStorage.getItem("orderId");
    const commande = JSON.parse(localStorage.getItem("commande")) ;
    if(commande){
        // Si une commande à été passée
        document.querySelector('.commande').innerHTML = `
        <h2>Merci pour votre commande !</h2> 
        <p>Votre numéro de commande : <strong>${orderId}</strong></p> 
        <p class="text-commande">Prix total de la commande : <strong>${price} &euro;</strong></p>`
        for (const article of commande) {
            console.log(article);
            document.querySelector('.item').innerHTML += `
            <div class="col-sm-12 col-lg-6 col-xl-4">
                <div class="card" style="border-radius:20px">
                    <img class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title" style="border-top:1px solid black">${article.name}</h5>
                        <p class="card-text">Prix total : ${(article.price/100) * article.quantity} &euro;</p>
                        <p class="card-text">Quantité : ${article.quantity}</p>
                        <p class="card-text">Couleur : ${article.color}</p>
                    </div>
                </div>
            </div>`
        }
    }else{
        document.querySelector('.commande').innerHTML = `
        <h2>Aucune commande en cours</h2> 
        <a class="btn btn-primary" href="./index.html">Cliquez ici pour retourner a l'acceuil</a> `
    }
}


function main(){
    affichageCommande();
}

main();