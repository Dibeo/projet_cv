import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  nextBtnText: 'Suivant',
  prevBtnText: 'Precedent',
  doneBtnText: 'Terminer',
  steps: [
    { element: '#record', popover: { title: 'Enregistrer', description: 'Pour lancer l\'enregistrement.' } },
    { element: '#stop', popover: { title: 'Arrêter', description: 'Pour arrêter d\'enregistrer.' } },
    { element: '#Exemple', popover: { title: 'Résultat', description: 'Ici se trouve votre enregistrement (celui-ci est un exemple).' } },
    { element: '#download', popover: { title: 'Télécharger', description: 'Ici vous pouvez télécharger votre CV.' } },
    { element: '#delete', popover: { title: 'Supprimer', description: 'Pour supprimer votre CV.' } },
    { element: '#select', popover: { title: 'Sélectionner', description: 'Pour sélectionner le CV que vous souhaitez utiliser pour les étapes suivantes.' } },
    { popover: { title: 'À votre tour', description: 'Vous avez maintenant les informations importantes pour démarrer votre enregistrement.' } }
  ]
});

export default driverObj;
