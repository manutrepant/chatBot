
# CHATBOT
## Exercice apprenant : Javascript ChatBot POO

Apprenant Javascript : Premier projet POO / ChatBot
Bonjour, voici la description de mon projet. N'hésitez pas à me communiquer vos remarques concernant ce projet POO.

Source du projet :
Démo html du projet :

Objectif de l'exercice: Apprendre la POO en Javascript. 
Projet : Créer un ChatBot en POO

Le principe du ChatBot est connu, l'utilisateur propose une question, en fonction de la question le ChatBot propose une réponse.
Voici ma logique pour concevoir le projet.

### Mes données :
  1. les mots clés (data.js)
  ex: "localisation" : ["adresse","rue","pays","endroit","l'adresse"]
  
  2. les réponses par mot clé (response.js) 
  ex : "localisation" : ["Notre adresse se situe au 25 rue de l'Eglise 20000 Ciney "]

### Fonctionnement du script et de ma logique.

Proposer un texte (question à poser) via un formulaire.
Le texte brut tapé sera affiché tel quel.
Le texte à checker pour y trouver des mots clés sera :

  1. Vérifier si il existe et différent d'espace
  2. Nettoyer de caractère interdit ;:!,.?</>
  3. Mise en minuscule (mes mots clés sont en minuscule dans mon fichier data.js)
  4. Phrase découpée en tableau par les espaces

Recherche par mot clé et création de mes résultats 
  1. On boucle (2 dimensions) sur les différentes entrées et sur chaque index, value
  2. La boucle continue le nombre de fois qu'il y a de valeur dans le tableau
  3. Ajout dans un set (permet de insérer qu'une fois la même valeur). ex: adresse, endroit donnera : 1x localisation
  4. On crée un set qui contient les index et ses réponses : [0] Notre adresse se situe au 25 rue de l'Eglise 5590 Ciney

Création des messages dans la page
  1. Affiche la question d'origine
  2. Affiche la réponse par une boucle du tableau final créé

#### A améliorer et problème non résolu.
setTimeOut qui permet d'afficher après 2 secondes une nouvelle réponse.


### Utilisation et matière :
Import .js, addEventListener (submit), try, catch(error) (gestion erreurs)
class, regEx, replace,String.prototype.toLowerCase.call, split, nettoyer entrée vide : arr.filter(Boolean), new Set, compter keys : Object.keys(xxx).length, for Set, push : dans array, ajout dans set : add, valeur par ordre d'insertion this.arrayfinal.values(),
conversion Set en array : Array.from(this.arrayfinal)