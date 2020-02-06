import { Util } from "./Util.js";

export class Question {
    /**
     * Classe permettant de créer et d'afficher une fenêtre
     * et, d'appeler une fonction de l'application passée en paramètre
     * @param {Array} listeQuestions - le tableau des question
     * @param {HTMLElement} conteneurHtml -  La question et ses choix de réponses seront insérée dans le conteneurHtml
     * @param {String} classCss  - Classe css pour la question
     * @param {Function} fonction  - fonction référencée à appeler sur un mousedown
     */

    constructor(listeQuestions, conteneurHtml, classCss, finJeu, boutonSuivant, boutonPrecedent, elmNbBonneReponse, elmNumeroQuestion) {
        //Récupérer les valeurs passées en paramètre			
        this.listeQuestions = listeQuestions;
        this.conteneurHtml = conteneurHtml;
        this.classCss = classCss;
        this.finJeu = finJeu;
        this.boutonSuivant = boutonSuivant
        this.boutonPrecedent = boutonPrecedent
        this.noQuestionEnCours = 0; // le numéro de la question en cours
        this.noQuestionDéjàValidé = -1; // la question qui vient d'être validée
        this.reference_afficherProchaineQuestion = this.afficherProchaineQuestion.bind(this)
        //this.boutonSuivant.addEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
        this.boutonSuivant[0].addEventListener("mousedown", (evt) => {this.afficherProchaineQuestion(evt)}, false); // mobile
        this.boutonSuivant[1].addEventListener("mousedown", (evt) => {this.afficherProchaineQuestion(evt)}, false); // desktop
        this.boutonPrecedent.addEventListener("mousedown", (evt)=>this.afficherPrecedenteQuestion(evt), false);

        //this.nombreDeBonneReponse = 0
        
        this.elmNbBonneReponse = elmNbBonneReponse // l'élément DOM qui contiendra le nombre de bonne réponse
        this.elmNumeroQuestion = elmNumeroQuestion
        this.nbQuestionsQuiz = 5 // Le nombre de questions dans le quiz qui seront extraite aléatoirement de l'ensemble des questions
 }
initialiserListeQuestion()
{
    for (let question of this.listeQuestions)
    {
        for (let rep of question.reponses)
        {
            rep[2] = false
        }
    }
    console.log(this.listeQuestions)
}

initialiserDebutDuQuiz()
{
            this.initialiserListeQuestion()
            this.tabNoQuest = Util.creationTabValAle(this.nbQuestionsQuiz, this.listeQuestions.length)
            this.nombreDeBonnesRéponsesTotalDuQuiz = this.nombreDeBonnesRéponsesDansLeQuestionnaire(this.tabNoQuest)
            console.log("nombreDeBonnesRéponsesTotalDuQuiz = " + this.nombreDeBonnesRéponsesTotalDuQuiz)
            this.nbBonnesReponses = 0
            this.noQuestionEnCours = 0;
            this.nombreDeBonneReponse = 0;
            this.creerQuestion()
            this.direction = 'suivant'
            this.afficherProchaineQuestion()
}
    /**
     * Méthode pour créer et afficher les instances de la classe Fenetre
     */
    creerQuestion() {
        // Créer le conteneur de Question
        // qui sera précédé par this (appartient à l'instance)
        this.elmQuestion = document.createElement('article');
        // Tous les éléments à l'intérieur de elmQuestion seront identifiés par des varaiables locales
        // on ajoute la class 'question' au nouvel élément
         this.elmQuestion.classList.add('question') 
        
        //Créer une balise h1 pour le titre

         let elmTitre = document.createElement('h1');
          // on ajoute l'animation animLaQuestion
          // elmTitre.classList.add('animTitreQuestion') 
         elmTitre.style.animation = `animTitreQuestion 1s  both  cubic-bezier(1,.08,.87,1.64)`
        // On récupère le titre de la question
         elmTitre.innerHTML = 'Question ' + (this.noQuestionEnCours+1) + ' - ' +
         this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours]].titre
        // on ajoute elm titre à elmQuestion
         this.elmQuestion.appendChild(elmTitre)
        // On créé une liste de réponse
         let elmReponses = document.createElement('ul');
//console.log("this.noQuestionEnCours = ", this.noQuestionEnCours)
        let elmRep; // une réponse
        let elmX; // coché ou non
        let elmTexte // texte de la réponse
        let k=0; // le numéro de la réponse
       // on parcourt l'ensemble des réponses de this.listeQuestions
      // let numQuestion = Util.piger(this.tabNoQuestionMelange)  
        let nbRep = this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours]].reponses.length
        // Les choix de réponses sont mélangés
        let tabNoRep = Util.creationTabValAle(nbRep, nbRep)
        let tabReponses = this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours]].reponses
        for (let k=0 ; k<nbRep ; k++)
        {
            // Création de chaque élément réponse de la liste des réponses
            elmRep = document.createElement('li');
            elmX = document.createElement('label');
            if (tabReponses[tabNoRep[k]][2]==true){ // si la réponse à déjà été cochée 
                elmX.classList.add('fas', 'fa-check')
            }
            
            elmTexte = document.createElement('div');
            elmTexte.innerHTML = `${k+1} - ${tabReponses[tabNoRep[k]][0]}`
            elmRep.dataset.checked = tabReponses[tabNoRep[k]][2];
            // elmRep.classList.add('animReponse')
            if(k%2==0)
            {elmRep.style.animation = `animReponseDroite 2s ${k}s both  cubic-bezier(1,.08,.87,1.64)`}
            else {elmRep.style.animation = `animReponseGauche 2s ${k}s both  cubic-bezier(1,.08,.87,1.64)`}
            elmRep.appendChild(elmX)
            elmRep.appendChild(elmTexte)
            elmRep.id = tabNoRep[k];
           // elmRep.dataset.index = k++
            elmReponses.appendChild(elmRep)
            elmRep.addEventListener('mousedown', this.valideLaReponse.bind(this),false)
        }
        this.elmQuestion.appendChild(elmReponses)
        this.conteneurHtml.appendChild(this.elmQuestion)
        //this.boutonSuivant.addEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
    }


    valideLaReponse(evt){
             //this.boutonSuivant.classList.remove('nohover')
    // on s'assure que la fonction ne s'exécute qu'une seule fois dès que l'utilisateur a cliquer sur un choix
            let cibleReponse;
            
            if (evt.target.tagName.toUpperCase() != 'LI')
            {
                cibleReponse = evt.target.parentNode
            }
            else
            {
                cibleReponse = evt.target
            }
            cibleReponse.style.animation = `animCheck .25s 2 both alternate cubic-bezier(.99,-0.48,.79,1.63)`
            cibleReponse.addEventListener('animationend',
            ()=>{cibleReponse.style.animation=''})
            console.log("cibleReponse = " + cibleReponse.tagName)
            
            console.log(this.noQuestionEnCours-1)
            console.log(cibleReponse.id)
            console.log(this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours-1]].reponses[cibleReponse.id][1])
            if (cibleReponse.dataset.checked == 'false') {
                console.log("cibleReponse.dataset.checked = " + cibleReponse.dataset.checked)
                cibleReponse.dataset.checked = 'true'
                console.log("cibleReponse.dataset.checked = " + cibleReponse.dataset.checked)
                cibleReponse.classList.add('selection')
                this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours - 1]].reponses[cibleReponse.id][2] = true
                //cibleReponse.querySelector('label').innerHTML = '&#10008;'
                //cibleReponse.querySelector('label').innerHTML = '&#10004;'
                cibleReponse.querySelector('label').classList.add('fas', 'fa-check')
                // cibleReponse.innerHTML = '&#10006; ' + cibleReponse.innerHTML
            } else {
                cibleReponse.dataset.checked = 'false'
                this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours - 1]].reponses[cibleReponse.id][2] = false
                cibleReponse.classList.remove('selection')
               // cibleReponse.querySelector('label').innerHTML = ''
                cibleReponse.querySelector('label').classList.remove('fas', 'fa-check')
            }
    console.log(this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours-1]].reponses[cibleReponse.id][1])
            if (this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours-1]].reponses[cibleReponse.id][1] && cibleReponse.dataset.checked == 'true')
            {
                this.nombreDeBonneReponse += 1;
                console.log('this.nombreDeBonneReponse ' + this.nombreDeBonneReponse)
            }
            else
            if (this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours-1]].reponses[cibleReponse.id][1] && cibleReponse.dataset.checked == 'false')
            {
                this.nombreDeBonneReponse -= 1;
                console.log('this.nombreDeBonneReponse ' + this.nombreDeBonneReponse)
            }
            else
            if (this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours - 1]].reponses[cibleReponse.id][1]==false && cibleReponse.dataset.checked == 'true')
            {
                this.nombreDeBonneReponse -= 1;
                console.log('this.nombreDeBonneReponse ' + this.nombreDeBonneReponse)
            }
            if (this.listeQuestions[this.tabNoQuest[this.noQuestionEnCours - 1]].reponses[cibleReponse.id][1]==false && cibleReponse.dataset.checked == 'false')
            {
                this.nombreDeBonneReponse += 1;
                console.log('this.nombreDeBonneReponse ' + this.nombreDeBonneReponse)
            }
            console.log('this.nombreDeBonneReponse ' + this.nombreDeBonneReponse)
            // pour débloqué le boutonSuivant une seule fois par question
            if (this.noQuestionDéjàValidé != this.noQuestionEnCours)
            {
                this.noQuestionDéjàValidé = this.noQuestionEnCours
                // this.boutonSuivant.addEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
            }
    }


    evaluationReponse(){
        let classe, crochet;
        let syntheseQuestionRep = ''
        for (let noQuestion of this.tabNoQuest)
        {
            console.log(this.listeQuestions[noQuestion].titre)
            syntheseQuestionRep += `<dl><dt>${this.listeQuestions[noQuestion].titre}</dt>`
            for ( let reponse of this.listeQuestions[noQuestion].reponses)
            {
                console.log(reponse[0], reponse[1], reponse[2] )
                crochet = ''
                classe = ''
                if (reponse[1] == true)
                {
                    classe = 'vert'
                    if (reponse[1] == reponse[2])
                    {
                    this.nbBonnesReponses++
                    crochet = '&#10003;' // un crochet
                    }
                    else 
                    {
                    crochet = '&#10006;' // un X
                    }
                } 
                else if (reponse[1] == false)
                {
                    classe = 'rouge'
                    if (reponse[2] == true)
                    {
                        this.nbBonnesReponses--
                        crochet = '&#10006;' // un X
                    }
                }               
    
                syntheseQuestionRep += `<dd class='${classe}'>${reponse[0]} ${crochet}</dd>`
            }
            syntheseQuestionRep += '</dl>'
        }
        console.log(this.nbBonnesReponses)
        return syntheseQuestionRep
    }


    faireSortirLaQuestion(){
      if (this.elmQuestion)
        {
            this.elmQuestion.classList.add('animeSortieQuestion')
          // this.detruireQuestion()
            setTimeout(() => {this.detruireQuestion()}, 1000); 
            // this.elmQuestion.addEventListener('animationend',this.detruireQuestion.bind(this))
        }    
  
    }

    detruireQuestion() {
        Util.detruireTousLesNoeud(this.conteneurHtml, this.conteneurHtml)
        }


    
    afficherPrecedenteQuestion(evt)
    {
        if (this.noQuestionEnCours >= 2)
        {
        this.noQuestionEnCours-=2;
        this.direction = 'precedent'
        this.afficherQuestion(evt)
        }

    }
    afficherProchaineQuestion(evt) {
            this.direction = 'suivant'
            this.afficherQuestion(evt)
    }



    afficherQuestion(evt) {
            // S'il reste une question on l'affiche, sinon c'est la fin du jeu ...
            // console.log('this =  ', this)
            // console.log('this.elmQuestion =  ', this.elmQuestion)
             console.log("this.noQuestionEnCours = ", this.noQuestionEnCours)
          
           // this.boutonSuivant.classList.add('nohover')
           if (this.direction == 'precedent')
           {
               
               this.elmQuestion.style.animation = `animePrecedenteQuestion .5s both cubic-bezier(1,.01,1,.3)`
           }
           else{
               this.elmQuestion.style.animation = `animeSortieQuestion .5s both cubic-bezier(1,.01,1,.3)`
           }
            
            this.elmQuestion.addEventListener('animationend',()=>{
            this.elmNbBonneReponse.innerHTML = this.nombreDeBonneReponse
            this.detruireQuestion()
    	        if (this.noQuestionEnCours < this.nbQuestionsQuiz) {
    	        // On affiche la question
                this.creerQuestion()
                this.noQuestionEnCours++;
    	         } else {                    
                    //this.boutonSuivant.removeEventListener("mousedown", this.afficherProchaineQuestion, false);
    	            this.finJeu(this.evaluationReponse());
    	        }
            })
    	  
        }; // afficherProchaineQuestion
        
        nombreDeBonnesRéponsesDansLeQuestionnaire(tabNoQuest)
        {
            let nbBonnesRéponses =0
            for (let noQuest of tabNoQuest)
            {
                for (let uneReponse of this.listeQuestions[noQuest].reponses)
                { 
                    if (uneReponse[1] == true)
                    {
                        nbBonnesRéponses += 1;
                    }
                }
            }
            console.log("nbBonnesRéponses = ", nbBonnesRéponses)
            return nbBonnesRéponses;
        }
} //Fin class Question