import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#record', popover: { title: 'Record', description: 'Pour lancer l\'enregistrement.' } },
    { element: '#stop', popover: { title: 'Stop', description: 'Pour arreter d\'enregistrer.' } },
    { element: '#Exemple', popover: { title: 'Résultat', description: 'Ici se trouve votre enregistrement (celui-ci est un exemple).' } },
    { element: '#download', popover: { title: 'Téléchargement', description: 'Ici vous pouvez télécharger votre CV.' } },
    { element: '#delete', popover: { title: 'Résultat', description: 'Pour supprimer votre CV.' } },
    { element: '#select', popover: { title: 'Résultat', description: 'Pour selectionner le cv que vous souhaiter utiliser pour les étapes suivantes.' } },
  ]
});

export default driverObj;