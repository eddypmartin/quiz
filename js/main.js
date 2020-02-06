/* on importe les modules */
import {quiz} from "./quiz.js";
import {Fenetre} from "./Fenetre.js";
import {Question} from "./Question.js";
import {animation_intro} from "./animation_intro.js";

 //animation_intro(lancerQuiz)
 lancerQuiz()

function lancerQuiz()
{
	let noQuestionEnCours, //no de la question en cours
		conteneurHtml, // qui contiendra une question
		etatQuiz, //Indications sur l'évolution du Quiz
		boutonSuivant, //Bouton pour afficher les questions suivantes
		boutonPrecedent, //Bouton pour afficher les questions suivantes
		elmNbBonneReponse,
		elmNumeroQuestion
		//Quand la page est chargée...

		//On récupère les balises où seront affichées les infos ou autres
		let elmHeader = document.querySelector('header')
		elmHeader.style.display = 'flex';


		let elmFooter = document.querySelector('footer')
		elmFooter.style.display = 'flex'
		conteneurHtml = document.querySelector('section')
		etatQuiz = document.querySelector("footer > p");
		boutonSuivant = document.querySelectorAll(".suivant")
		boutonPrecedent = document.querySelector(".precedent")
		// boutonSuivant.addEventListener('mousedown', ()=>console.log('allo'))
		elmNumeroQuestion = document.querySelector(".noQuestion");
		elmNbBonneReponse = document.querySelector("footer > p > i");

 		// Les questions à afficher
		const	leQuestionnaire = new Question(
					quiz.listeQuestions,
					conteneurHtml,
					'animQuestion',
					finJeu,
					boutonSuivant,
					boutonPrecedent,
					elmNbBonneReponse,
					elmNumeroQuestion
			)

	//On initialise les valeurs du quiz pour commencer à jouer
	onCommenceJouer();

	function onCommenceJouer(evt) {
		//Initialiser les variables
			leQuestionnaire.initialiserDebutDuQuiz()

	}; // onCommenceJouer

	
	function finJeu(syntheseQuestionRep) {
//localStorage.clear();
		// on récupère le meilleur score sauvegardé dans localStorage
		let meilleurScore = localStorage.getItem("meilleurScore") === null ? 0 : localStorage.getItem("meilleurScore");
		// le maximum entre meilleurScore et leQuestionnaire.nombreDeBonneReponse
		let noteActuel = Math.round(leQuestionnaire.nombreDeBonneReponse / leQuestionnaire.nombreDeBonnesRéponsesTotalDuQuiz * 100)
		meilleurScore = Math.max(meilleurScore, noteActuel)
		// on enregistre ce meilleur score dans localStorage
		localStorage.setItem('meilleurScore', meilleurScore)
		// on configure les éléments de la fenêtre
		let laPage = document.querySelector("body"),
			largeur = laPage.offsetWidth,
			hauteur = laPage.offsetHeight,
			texte = "Le quiz est terminé.<br>"  
					+`Le questionnaire contenait ${leQuestionnaire.nbQuestionsQuiz} questions`
					+` et ${leQuestionnaire.nombreDeBonnesRéponsesTotalDuQuiz} bonnes réponses.<br> `
					+`Vous avez obtenu ${leQuestionnaire.nombreDeBonneReponse} / ${leQuestionnaire.nombreDeBonnesRéponsesTotalDuQuiz}<br>`
					+`Ce qui correspond à une note de ${noteActuel} / 100 <br>`
					+ `Le meilleur pointage à date est ${meilleurScore} / 100<br><br>` 
					+ '<br>Cliquer pour fermer la fenêtre et rejouer!'
					+ syntheseQuestionRep
	
		// Voir constructeur de la classe fenêtre...

			let uneFenetre = new Fenetre(0, 0, largeur, hauteur, "fenetre", texte, laPage, onCommenceJouer);

	} // Fin afficherFenetre
}


