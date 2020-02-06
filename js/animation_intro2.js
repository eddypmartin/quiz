/*
 *Gérer les événements des animations pour les synchroniser
 */
import {Util} from "./Util.js"
export function animation_intro(lancerQuiz)
{
	//Récupérer les mots
	let lesMots = document.querySelectorAll(".lesMots");
	let laSection = document.querySelector('section')
	/*
	 *Quand l'animation pour écrire le premier mot est terminée
	 * on fait monter le mot en animant la couleur de la section
	 */
	lesMots[0].classList.add('mot1')
	lesMots[0].addEventListener("animationend", monterPremierMot, false);

	function monterPremierMot(evt) {
		//On enlève l'écouteur
		lesMots[0].removeEventListener("animationend", monterPremierMot, false);

		//On affecte au premier mot la classe .bondEnHaut
		lesMots[0].classList.add("bondEnHaut");

		//on récupère la section, le parent du mot... pour lui affecter la classe: .animCouleur
		lesMots[0].parentNode.classList.add("animCouleur");
			
		//Quand le mot est monté, on place le deuxième mot avec son animation
		lesMots[0].addEventListener("animationend", placerDeuxiemeMot, false);
	}


	function placerDeuxiemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerDeuxiemeMot, false);

		//On récupère le deuxième mot pour lui affecter une animation : .versLeCentre
		lesMots[1].classList.add("versLeCentre");
		
		//Quand l'animation du 2e mot est terminée, on place le troisième mot avec son animation
		lesMots[1].addEventListener("animationend", placerTroisiemeMot, false);
	}

	function placerTroisiemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerTroisiemeMot, false);
		// ajouter une animation au deuxième mot
		lesMots[1].classList.add("etirerMot");

		//On récupère le troisième mot pour lui affecter une animation : .etirerMot 
		lesMots[2].classList.add("etirerMot2");
		lesMots[2].addEventListener("animationend", placerQuatriemeMot, false);
	}

	function placerQuatriemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerQuatriemeMot, false);
		lesMots[3].classList.add("versLeCentre");
		lesMots[3].addEventListener("animationend", animerParStep, false);

	}

	function animerParStep(evt){
		evt.target.removeEventListener("animationend", animerParStep, false);
        lesMots[3].classList.add("mot4");
        lesMots[3].addEventListener('animationend', finIntro)
		
	}
	
	function finIntro(evt){
		// on détruit tous les mots de l'animation d'intro
		// Ces mots se trouve dans laSection
		// On peut utiliser la fonction Util.detruireTousLesNoeud()
		Util.detruireTousLesNoeud(laSection, laSection)
		// On lance le Quiz
		lancerQuiz()
	}
}  // fin animation_intro 
