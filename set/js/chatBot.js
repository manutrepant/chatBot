// *************************************************************************
// DATA.JS
// importer data des mots clés et des réponses

import{mesDonnees} from './data.js';
// console.log(mesDonnees); // Affiche data.js

// Réponses aux mots clés
import{reponseChatBot} from './response.js';
// console.log(reponseChatBot); // Affiche reponse.js

// ********************************************************************************

  // Sélection du formulaire (form)
  const formulaire  = document.querySelector('#formulaire');

  // evenement envoi submit
  formulaire.addEventListener('submit', (e) => {

        // Sélection input message
        const input  = document.querySelector('#message');

          try {           
              // Pas de reload page
              e.preventDefault();
          
              // si rien envoyé message erreur
                  if(input.value == ''){
                  alert("Entrez votre question !");
                  throw new Error(" Entrez votre question ! ") 
                  }
          
                  // Si tape est remplie   
                  else {  

                  // Appel classe Nettoyer les ,;:!?.
                  new NettoyerLettre(input.value);
                }
          } // Fin de try

          catch(error){     
          console.log(error.stack); // Affichage Error
          } 
    });

 
// *************************************************************************   
// ETAPE 1 (nettoyer la phrase tapée)

class NettoyerLettre{

  constructor(valeurInput, textePropre){
  this.valeurInput = valeurInput;
  this.textePropre=textePropre;
  this.remplaceContenu();
}

    remplaceContenu(){ // retirer ;:!,.?</>

        let texteAC = this.valeurInput; // variable texteAC
        this.texteTape=texteAC; // texte à afficher objet

        const reg = /[\,\<\>\/\?\;\.\!\:]/g;
        let textePropre = texteAC.replace(reg, " " );
        this.textePropre=textePropre;

        // console.log(this.textePropre + " : Phrase nettoyée de ;:!,.?</>"); // OK
        new Minuscule(this.textePropre);
      }
}

// *************************************************************************

// ETAPE 2 (mettre en minuscule)
class Minuscule{

 constructor(textePropre, motMinuscule, motExport){
    this.textePropre=textePropre;
    this.motMinuscule=motMinuscule; 
    this.motExport=motExport;
    this.minusculeFct();
 }

 minusculeFct(){

    // Minuscule pour éviter les doublons de mots ex: Rue, rue, rUe ...
    // On converti l'objet en string + toLowerCase 

    // console.log(this.textePropre + "  (100) - MinusculeFct");
    let minuscule = String.prototype.toLowerCase.call(this.textePropre);
    
    // Assigne le string à this.motMinuscule
    this.motMinuscule =minuscule;
    // console.log(this.motMinuscule + " : Mot motMinuscule (103)"); // OK

    // Appel class ScinderEnMots
    this.motExport=this.motMinuscule;
    // console.log(this.motExport + " (116) - motExport minuscule"); // OK

    // Appel classe ScinderEnMots
    new ScinderEnMots(this.motExport);
 }
}

// *************************************************************************
//ETAPE 3 (diviser phrase en mot(s))

class ScinderEnMots{
  
      constructor(motExport, monMessageAchecker){

        // alert("Passed");
          this.motExport=motExport; 
          // console.log(this.motExport + " Mot à Scinder (133)");
          this.monMessageAchecker=monMessageAchecker;
          this.splitFct();  
      }

      splitFct(){

        let morceaux = this.motExport;
        // console.log(morceaux + " (140) splitFct");
        this.monMessageAchecker = morceaux.split(" ");
        // console.log(this.monMessageAchecker); // tableau de mots découpés

        // nettoyer les entrées vides : Boolean filtre = false null undefined 0 NaN ''
        let arr=this.monMessageAchecker;
        this.monMessageAchecker = arr.filter(Boolean);
        // console.log(this.monMessageAchecker); // tableau de mots nettoyés

        // Si le contenu n'est pas un texte valide

              if (this.monMessageAchecker.length === 0) { 
                alert("Entrez une question valide svp !");
              }

        // input = le contenu de mon input
        const input  = document.querySelector('#message');

        // Appel Class CreationDuPOsteUtilisateur
        new CreationDuPOsteUtilisateur(input.value);

        // Reset input
        input.value = ''; 
        
        // Appel recherche mots clés
        new RechercheMotCleDansMesDonnees(this.monMessageAchecker, this.mesDonnees);

      }       
 }


// *************************************************************************
// ETAPE 4 (Afficher la phrase de l'utilisateur dans la fenêtre)

class CreationDuPOsteUtilisateur{ 
      
  // Création Div contenu tapé tel quel
  // nettoyage du texte à analyser

          constructor(texteTape){
                this.texteTape = texteTape;
                console.log(texteTape + " Texte original (168)"); // OK
                this.dom();
          }

         dom(){

              // Création du Div
              let creationDuMessage = document.createElement('div');

              // Ajout de la class
              creationDuMessage.className = "monMessage";
    
              // Ajout du texte de l'utilisateur
              creationDuMessage.textContent = this.texteTape;
    
              // Attacher l'ensemble des div à mon conteneur ciblé - Affichage message
              document.querySelector('#messages').prepend(creationDuMessage);       
          }            
   } 


// *************************************************************************
// ETAPE 5 (rechercher les mot(s) tapé(s) et les comparer au fichier data.js)

  class RechercheMotCleDansMesDonnees {

        constructor(monMessageAchecker, mesDonnees, monSet, arrayfinal){
          this.monMessageAchecker=monMessageAchecker; 
          this.mesDonnees=mesDonnees;
          this.monSet=monSet;
          this.arrayfinal=arrayfinal;
          this.rechercheMotCle(); // Loop 2 dimensions  
        }
              rechercheMotCle(){

                    // Initialisation
                    let monTableauCle=[];
                    let maCle="";
                    
                    // Tableau des résulats de la recherche des mots (ex: rue =>  resultat :localisation)
                    let tableauRef = [];

                    // Tableau phrase résultat
                    let reponses = [];

                    // Création d'un tableau new Set
                    let monSet = new Set(tableauRef);
      
                    // Création d'un tableau def
                    let reponseBot = new Set(reponses);

                 
                const nbrEntrees = Object.keys(mesDonnees).length;
                // console.log(nbrEntrees + " Nombre d'entrées des data"); // nombre d'entrées de mesDonnees : 6
            
                // Mettre dans tableau le nom des clefs du data.js **********************************
                // Boucle = intro, periode, contact, localisation,  ...

                        for (var nom_cle in mesDonnees){ 
                        maCle = monTableauCle.push(nom_cle); 
                        // console.log(nom_cle + " : Loop sur toutes les entrées"); 
                        }       

                // *************************************************************************
                // BOUCLE 1 (1ère dimension)

                        for (let boucleDonnees = 0; boucleDonnees < nbrEntrees; boucleDonnees++) {
                    
                          var result=false; // 203
                       
                              // console.log(boucleDonnees + " (compteur du nbr d'entrée(s) de l'objet data ex: 5 rangées)");
                              console.log("-------------------------------------------------------");

                              // maCleActive est utile pour connaître la rentrée en cours et rechercher l'index ex: intro[0] 
                              const maCleActive = monTableauCle[boucleDonnees] 
                              console.log(maCleActive + " <= RANGEE EN COURS ") // intro, periode, contact, localisation,  ...
                
                // *************************************************************************             
                // BOUCLE 2 (2ème dimension) boucle for dans la boucle for 1
                      // maCleActive [0],[1] du nombres d'entrées ex: intro, periode...

                      for (var i in Object.keys(mesDonnees[maCleActive])) {
                      // console.log(i + " index du nombre de données de " + maCleActive)


                // *************************************************************************  
                // Boucle sur le nombre de mots tapé du tableau


                              for (let compt = 0; compt < this.monMessageAchecker.length; compt++) {
                              // Si mot du tableau de mots clés tapés [0,..] sont trouvés dans datas.js

                                        if((mesDonnees[maCleActive])[i]==this.monMessageAchecker[compt]){
                                        
                                                console.log(maCleActive +" : Ma clé trouvée !");    
                                                // Ajoute la cle ex: localisation, ne l'ajoute pas si déjà présent (new Set)
                                                
                                                // Ajouter dans monSet le résultat trouvé
                                                monSet.add(maCleActive); 
                                                // console.log(monSet);

                                                let phraseAafficher = reponseChatBot[maCleActive][0];
                                                // console.log(phraseAafficher);

                                                reponseBot.add(phraseAafficher);
                                                // console.log(reponseBot);

                                                this.monSet=monSet
                                                // console.log(this.monSet); 

                                                // set arrayfinal (Donne l'index de mes réponses)
                                                this.arrayfinal=reponseBot;
                                                // console.log(this.Arrayfinal);
                                                
                                                // Quand mot clé trouvé true
                                                // console.log(result + " (Mise à TRUE)")
                                                result = true;

                                                // console.log(result + " " + maCleActive + " = Mot clé trouvé dans data.js ! ");
                                                // ex: true, intro

                                        } // fin if
                                        

                                        // Si pas de mot clé trouvé !

                                              if(result == false ) {
                                              console.log(" Pas de mot clé trouvé !");
                                              } // fin if

                                        // console.log(compt)
                                        // console.log(this.monMessageAchecker.length)
                                        // console.log(nbrEntrees + " Nombre entrées DB") // 6 total
                                        // console.log(boucleDonnees + " rangée en cour") // 0 à 5
                                        // console.log(i + " / index en cours")
                                        // console.log("("+boucleDonnees+")   --> "+maCleActive+"["+i+"]")

                                        // si le compteur est = à la dernière boucle de la dernière entrée
                                        if(compt==this.monMessageAchecker.length-1 && boucleDonnees == nbrEntrees-1 ){
                                          console.log(" FIN DE CHECK")

                                                  if(result == false && this.monSet==undefined) {

                                                      console.log(" Pas de mot clé trouvé et SET VIDE");
                                                          // Pouser dans le set
                                                          // donner noInfo à arrayfinal (Texte pas de réponse à la question)
                                                          this.arrayfinal=reponseChatBot.noInfo;
                                                          
                                                    } // fin if
                                          
                                          new VisualiserDonneesSet(this.monSet, this.arrayfinal);
                                        }
                                    } // fin boucle
                            } // fin boucle niv 2
                        } // fin de boucle for 1
                } // fin méthode rechercheMotCleDansMesDonnees()
      }


// *************************************************************************
// ETAPE 6 

class VisualiserDonneesSet{

        constructor(monSet,arrayfinal,maboucle){
            this.monSet=monSet;
            this.arrayfinal=arrayfinal;
            this.maboucle=maboucle;
            this.visualiserDonnees();
            this.creerDiv();
        }

        visualiserDonnees(){

          // Réintialiser et vider le set précédent
            if(this.monSet==true){
              this.monSet.clear(); 
            }

        } 

        creerDiv(){
                   
                      // console.log(this.arrayfinal.size + " / Longueur de arrayfinal") // ok
                      let resultat = Array.from(this.arrayfinal);
                            
                            for (let b = 0; b < resultat.length; b++) {
                            // console.log(resultat[b]);

                                        // Création du Div
                                        const reponseMessage = document.createElement('div');
                              
                                        // Ajout de la class
                                        reponseMessage.className = "chatBotMessage";

                                        // Ajout du contenu
                                        reponseMessage.textContent = resultat[b];

                                        // Ajout du div et son contenu en premier (devant les autres)
                                        document.querySelector('#messages').prepend(reponseMessage);                     
                            }

                      resultat=[]; // clean resultat
                }  
          }