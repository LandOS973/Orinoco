//Affiche tout les component en rapport avec le formulaire
/**
 *
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
                        <input type="submit" name="btnSubmit" class="btnContact" value="Commander"/>
                    </div>
                </div>
            </form>
        </div> `
        document.querySelector('.effacer').innerHTML += `<btn href="#" class="retrait margin col-2 mt-4 mb-4 btn btn-secondary">Vider le panier</btn>`;
    }
}

function validation(){
    const form = document.querySelector('form');
    let validEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let validName = new RegExp(/^[a-zA-Z ]+$/);
    let validAdress = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    return validEmail.test(form.email.value) && validName.test(form.firstName.value) && validName.test(form.city.value)  && validName.test(form.lastName.value)  && validAdress.test(form.adress.value) ;
}

function contact(panier){
    const btn = document.querySelector('.btnContact');
    btn.addEventListener("click",function(e){
        e.preventDefault()
        if (validation()) {
            for (const article of panier) {
                delete article.color;
                delete article.colors;
                delete article.description;
                delete article.imageUrl;
            }
            let order = {
                contact : {
                    firstName: document.querySelector('#name').value,
                    lastName: document.querySelector('#lastName').value,
                    address: document.querySelector('#adress').value,
                    city: document.querySelector('#city').value,
                    email: document.querySelector('#email').value,
                },
                products : panier,
            }
            console.table(order);
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            fetch("http://localhost:3000/api/teddies/order", options)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              localStorage.setItem("orderId", data.orderId);
              localStorage.setItem("total", priceConfirmation[1]);
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
