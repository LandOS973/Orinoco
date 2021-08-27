//L'envoie des informations commande est envoyés sous ce format :
/**
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
function affichageForm(panier) {
    if (panier) {
        // Si le panier est rempli, on affiche le formulaire
        document.querySelector('.formulaire').innerHTML += `
        <div class="container contact-form">
            <div class="contact-image">
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form>
                <h3>Passez votre commande</h3>
               <div class="row mb-2">
                    <div class="col-sm-10 col-lg-6">
                        <div class="form-group">
                            <input type="text" id="name" name="firstName" minlength="2" maxlength="18" class="form-control" placeholder="Ton prénom *" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" id="lastName" name="lastName" minlength="4" maxlength="18" class="form-control" placeholder="Ton nom *" required/>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" class="form-control" placeholder="Ton Email *" value="" required/>
                        </div>
                    </div>
                    <div class="col-sm-10 col-lg-6">
                        <div class="form-group">
                            <input type="text" id="adress" name="adress" minlength="4" maxlength="30" class="form-control" placeholder="Adresse de livraison *" required/>
                        </div>
                        <div class="form-group">
                            <input type="text" id="city" name="city" minlength="4" maxlength="8" class="form-control" placeholder="Ville *" required/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group d-flex justify-content-center">
                        <button class="btnContact">Commander</button>
                    </div>
                </div>
            </form>
        </div> `
        // ajout du bouton vider le panier
        document.querySelector('.effacer').innerHTML += `<btn href="#" class="retrait margin col-2 mt-4 mb-4 btn btn-secondary">Vider le panier</btn>`;
    }
}

// Fonction du vérifie la validité des information rempli dans le formulaire
// => renvoie un booléen qui sera utile dans la fonction contact
function validation(){
    const form = document.querySelector('form');
    let validEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let validName = new RegExp(/^[a-zA-Z ]+$/);
    let validAdress = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    return validEmail.test(form.email.value) && validName.test(form.firstName.value) && validName.test(form.city.value)  && validName.test(form.lastName.value)  && validAdress.test(form.adress.value) ;
}

// Fonction du permet d'envoie les information utilisateur et de commande à l'api
function contact(panier){
    // On récupère le bouton "commander"
    const btn = document.querySelector('.btnContact');
    btn.addEventListener("click",function(e){
        // Si les regex de validation() sont respectées par l'utilisateur
        if (validation()) {
            e.preventDefault();
            // Création du tableau de string d'id des produits
            const produitsEnvoyés = [];
            for (const article of panier) {
                // boucle sur les produit du panier pour ajouter l'id de chaque dans le tableau
                produitsEnvoyés.push(article._id)
            }
            // Création de la variable d'envoie a l'api
            let order = {
                // Récupération des information du formulaire de contact
                contact : {
                    firstName: document.querySelector('#name').value,
                    lastName: document.querySelector('#lastName').value,
                    address: document.querySelector('#adress').value,
                    city: document.querySelector('#city').value,
                    email: document.querySelector('#email').value,
                },
                // Ajout du tableau d'id produit
                products : produitsEnvoyés,
            }
            // Définition des options d'envoie avec la méthode fetch()
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            //Contact l'api avec les options
            fetch("http://localhost:3000/api/teddies/order", options)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              // Stockage de LocalStorage de l'orderId renvoyée par le serveur
              localStorage.setItem("orderId", data.orderId);
              // Stockage du prix total pour pouvoir l'afficher la page ./confirm.html
              localStorage.setItem("price",total(panier));
              // Stockage des produits de la commande dans une key commande
              localStorage.setItem("commande",localStorage.getItem("products"));
              // Vide le panier
              localStorage.removeItem("products");
              // Redirige sur la page de confirmation de la commande
              window.location.href = "./confirm.html";
            })
            .catch((err) => {
              alert("Il y a eu une erreur : " + err);
            });
        }
    })
}

function main() {
    let panier = JSON.parse(localStorage.getItem("products"));
    affichageForm(panier);
    contact(panier);
}

main();
