/*
 *Gérer les événements des animations pour les synchroniser
 */
import {Util} from "./Util.js"
export function animation_intro(lancerQuiz)
{
	let laSection = document.querySelector('section')
	let lesMots = document.querySelectorAll('section.lesMots div')
	console.log(lesMots.length)
	// Animation du titre principal
	lesMots[0].classList.add('tomberEtTournerMot')
	// Quand l'animation est terminé on anime les mots suivants
	lesMots[0].addEventListener('animationend', animeLesTroisMotsDeArticle)

	function animeLesTroisMotsDeArticle(evt) {
	evt.target.removeEventListener('animationend', animeLesTroisMotsDeArticle)
	// on anime chacun des mots
	lesMots[1].classList.add('mot1')
	lesMots[2].classList.add('animeElastique')
	lesMots[3].classList.add('animeChute')
	lesMots[3].addEventListener('animationend', initialiseAnimationNoel)

	} // fin animeLesTroisMotsDeArticle

	function initialiseAnimationNoel(evt) {
		// on retire l'écouteur
		evt.target.removeEventListener('animationend', initialiseAnimationNoel)
		// on définit le message  qui sera animé «JOYEUX NOËL»
		const message = 'QUIZ'
		// La fonction animLeCaractere est appelé
		animLeCaractere(message, 0, 0)
	} // fin de la fonction dernièreAnimation

	let position = 0

	function animLeCaractere(message, id, position) {
		// on vérifie si la position du caractère est encore traitable.
		// Est-ce que la position actuel du caractère fait encore partie du message
		if (position < message.length) {
			// creation de élément DIV qui contiendra un caractère du message
			let elmCaractere = document.createElement('div')
			// on ajoute une couleur aléatoire au caractère
			elmCaractere.style.color = Util.genereCouleurAleatoire()
			// on lance l'animation «animGrandeChute»
			elmCaractere.classList.add('animGrandeChute')
			// Quand l'animation animGrandechute est terminée on fait dancé le caractère avec animPetitSaut 
			elmCaractere.addEventListener('animationend', animPetitSaut)
			// on récupère un caractère du message situé à la position courante
			elmCaractere.innerHTML = message[position]
			// l'élément caractère est jouté dans le 5e mot de la section .lesMots 
			lesMots[4].appendChild(elmCaractere)
			// on incrémente la position pour passer à au caractère suivant
			position += 1
			console.log('position =', position)
			// La fonction animLeCaractere sera appelé à toutes les 
			// 1000 ms

			let id = setTimeout(() => {
				animLeCaractere(message, id, position)
			}, 1000);


		} else {
			// Quand le message JOYEUX NOËL a été affiché
			clearTimeout(id)
			// on ajoute une dernière animation d'élastique animeElastique2
			// l'animation est configuré avec lesMots[4].style.animation = ...
			// lesMots[4].style.animation = `animeElastique2 2s   20 alternate`
			lesMots[4].classList.add('animeElastique2')
			console.log(lesMots[4].classList)
			//lesMots[4].addEventListener('animationend', finIntro)
			setTimeout(() => finIntro(), 20000);
		}
	}

	function animPetitSaut(evt) {
		// retirer l'écouteur
		evt.target.removeEventListener('animationend', animPetitSaut)
		// retirer la classe animGrandeChute
		evt.target.classList.remove('animGrandeChute')
		// définir un délai aléatoire
		let delai = Util.AleatoireMinMax(2, 8) / 10
		// définir une durée aléatoire
		let durée = Util.AleatoireMinMax(2, 4) / 10
		console.log(`animPetitSaut ${durée}s ${delai}s  100 alternate`)
		// configurer dynamiquement l'animation animPetitSaut
		// en utilisant evt.target.style.animation =
		evt.target.style.animation = `animPetitSaut ${durée}s ${delai}s  100 alternate`

	}	


		function finIntro(evt) {
			// on détruit tous les mots de l'animation d'intro
			// Ces mots se trouve dans laSection
			// On peut utiliser la fonction Util.detruireTousLesNoeud()
			laSection.classList.remove('lesMots')
			Util.detruireTousLesNoeud(laSection, laSection)
			// On lance le Quiz
			lancerQuiz()
		}

}  // fin animation_intro 
