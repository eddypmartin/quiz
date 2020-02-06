export class Util {


     static AleatoireMinMax(min, max) {
         let valMin = Math.min(min, max)
         let valMax = Math.max(min, max)
         return valMin + Math.floor(Math.random() * (valMax - valMin) + 1)
     }

     static genereCouleurAleatoire() {
         return `rgb(
            ${Util.AleatoireMinMax(100,255)},
            ${Util.AleatoireMinMax(0, 100)},
            ${Util.AleatoireMinMax(0, 100)}
            )`
     }


    /* Détruit tous les noeuds du noeud parent racine */
    /* Racine est le conteneur initiale qui contient tous les noeuds */
    /* Racine n'est pas déruit à la fin du processus, il ne reste que le noeud racine vide */
    static detruireTousLesNoeud(noeud, racine) {
        while (noeud.hasChildNodes()) {
            this.detruireTousLesNoeud(noeud.firstChild, racine);
        }
        if (noeud != racine) {
            noeud.parentNode.removeChild(noeud);
            noeud = null
        }
    }
         

        static creationTabValAle(longueur, max) {
            let tableau = new Array()
            let tabMelange = new Array()
            let indexPige;
           // console.log('creationTabValAle', max)
            for (let k = 0; k < max; k++) {
                tableau[k] = k
            }
           // console.log("tableau = ", tableau)

            for (let k = 0; k < longueur; k++) {           
                    indexPige = Math.floor(Math.random() * tableau.length)
                    tabMelange[k] = tableau[indexPige]
                    tableau.splice(indexPige,1)
                    //console.log("tableau = ", tableau)
                   // console.log("tabMelange = ", tabMelange)
            }

            return tabMelange

        }


}