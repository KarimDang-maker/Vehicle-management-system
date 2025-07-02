# CONCEPTION DE MON API DE GESTION DES VEHICULES 




### Models / Ressources
#### Vehicule
    - Marque : String
    - Model : String
    - Immatriculation :  String
    - Annee : Number
    - prixLocation : number


### EndPoint / Points d'extremites 
#### CRUD

1. creer un vehicule
HTTP POST
URL:/vehicule
Request body: entite / information du vehicule

Response:   201: Vehicule creer
            500: Erreur


2. Mise a jour
HTTP PUT
URL: /Vehicule/:id
Request body: entite / information du vehicule 

Response:   200: Vhicule mis a jour.
            500: Erreur d'application 

3. Supression
HTTP DELETTE 
URL: /Vehicule/:id

Response:   200: Supression effectue
            500: Erreur d'application

4. Lire les informations d'un vehicule a l'aide de soun iddentifiant
HTTP GET
URL: Vehicule/id

Response :  200: Une liste de vehicule 
            404: Vehicule introuvable
            500: Erreur d'appliaction

5. afficher tous les vehicules ( Nous rencvoie la liste de tous les vehicules )
HTTP GET
URL: Vehicules

Response:   200: Afficher une liste de vehicules
            404: Vehicule non trouvee
            500: Erreur d'application 

6. Lire un vehicule a l'aide de son numero de son nummero d'immatriculation 
HTTP GET
URL: Vehicule/search/:immatriculation

Response:   200: Vehicule ok
            404: Vehicule non trouve 
            500: Erreur d'application 

7. Recuperer les vehicules par prix ( Filtrage des vehicules par le prix maximum )
HTTP GET 
URL: Vehicule/price:prixMax

Response:   200: Afficher une liste de vehicules
            404: Vehicules non trouve
            500: Erreur d'application 