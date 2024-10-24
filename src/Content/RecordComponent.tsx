import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";

const RecordComponent: React.FC = () => {
  const [recordIsDisabled, setRecordIsDisabled] = useState(false);
  const [stopIsDisabled, setStopIsDisabled] = useState(true);
  const [cvs, setCVs] = useState<{ audioURL: string; cvName: string }[]>(
    []
  );

  useEffect(() => {
    const record = document.querySelector("#record") as HTMLButtonElement;
    const stop = document.querySelector("#stop") as HTMLButtonElement;

    if (!record || !stop) {
      console.log(
        "Les éléments #record ou #stop ne sont pas encore disponibles."
      );
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          let chunks: BlobPart[] = [];

          record.onclick = () => {
            mediaRecorder.start();
            setRecordIsDisabled(true);
            setStopIsDisabled(false);
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            setRecordIsDisabled(false);
            setStopIsDisabled(true);
          };

          mediaRecorder.onstop = async () => {
            // Afficher la fenêtre SweetAlert pour demander le nom du cv
            const { value: cvName } = await Swal.fire({
              title: 'Nommer le cv audio',
              input: 'text',
              inputLabel: 'Entrez un nom pour votre cv',
              inputPlaceholder: 'Nom du cv',
              showCancelButton: true,
              confirmButtonText: 'Enregistrer',
              cancelButtonText: 'Annuler',
              inputValidator: (value) => {
                if (!value) {
                  return 'Vous devez entrer un nom !';
                }
                return null;
              },
            });

            const finalCVName = cvName || 'Unnamed cv'; //gere les possibles personnes qui ne nommerait pas leur fichier
          
            // Créer le blob audio à partir des morceaux enregistrés
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = []; // Réinitialiser les morceaux pour l'enregistrement suivant
            const audioURL = window.URL.createObjectURL(blob);
          
            // Ajouter le nouveau cv dans la liste des cvs
            setCVs((prevCVs) => [...prevCVs, { audioURL, cvName: finalCVName }]);
          };
          
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.error("getUserMedia not supported on your browser!");
      Swal.fire({
        title: "Error!",
        text: "getUserMedia not supported on your browser!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }, []);

  /** Suppression d'un audio */
  const handleDeleteCV = (cvIndex: number) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer le cv de la liste
        setCVs((prevCVs) =>
          prevCVs.filter((_, index) => index !== cvIndex)
        );
        Swal.fire("Supprimé !", "Le cv a bien été supprimé.", "success");
      }
    });
  };

  /** Téléchargement d'un audio */
  const handleDownload = (audioURL: string) => {
    Swal.fire({
      title: "Téléchargement en cours",
      text: "Votre téléchargement commence dans un instant...",
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
    });
    // Démarre le téléchargement après l'affichage de l'alerte pour la forme mais useless au fond
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "EnregistrementCV"; // Nom du fichier à télécharger a voir si on modifie ou pas
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <article style={{ color: "#FFFFFF", width: "100vw" }}>
      <Typography variant="h5">Enregistrement</Typography>
      <Button id="record" variant="contained" disabled={recordIsDisabled}>
        Rec
      </Button>
      <Button id="stop" variant="contained" disabled={stopIsDisabled}>
        Stop
      </Button>

      <div
        id="sound-cvs"
        style={{
          margin: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px, 22vw))",
          gap: "10px",
        }}
      >
        {cvs.map((cv, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              minWidth: "320px",
              width: "22vw",
            }}
          >
            <CardContent>
              <Typography variant="h6">{cv.cvName}</Typography>
              <audio controls src={cv.audioURL}></audio>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => console.log("Selected")}
                style={{ width: "45%" }}
              >
                Selectionner
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleDownload(cv.audioURL)}
                title="Télécharger votre fichier"
              >
                <DownloadIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteCV(index)}
                style={{ width: "fit-content" }}
                title="Supprimer votre fichier"
              >
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default RecordComponent;
