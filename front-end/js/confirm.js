function affichageCommande(){
    const price = localStorage.getItem("price");
    const orderId = localStorage.getItem("orderId");
    if(orderId){
        document.querySelector('.commande').innerHTML = `
        <h2>Merci de votre commande !</h2> 
        <p>Votre numéro de commande : <strong>${orderId}</strong></p> 
        <p class="text-commande">Prix total de la commande : <strong>${price} &euro;</strong></p>`
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