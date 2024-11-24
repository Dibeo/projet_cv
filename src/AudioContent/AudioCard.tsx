import React from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

interface AudioProps {
  cv: {
    cvName: string;
    audioURL: string;
  };
  index: number;
  handleDownload: (audioURL: string) => void;
  handleDeleteCV: (cvIndex: number) => void;
}

const AudioCard: React.FC<AudioProps> = ({
  cv,
  index,
  handleDownload,
  handleDeleteCV,
}) => {
  // Fonction pour envoyer l'audio au serveur
  const handleSelect = async (audioURL: string) => {
    const formData = new FormData();
    const audioFile = await fetch(audioURL)
      .then((res) => res.blob())
      .then((blob) => new File([blob], cv.cvName, { type: "audio/mpeg" }));

    formData.append("audio", audioFile);

    try {
      // Afficher une pop-up de chargement
      Swal.fire({
        title: "Chargement...",
        text: "Votre audio est en cours de traitement",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Envoi du fichier via POST à l'API
      const response = await fetch("http://localhost:8080/upload-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Succès : affiche une pop-up de réussite
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Fichier audio envoyé et traité avec succès",
        });
      } else {
        // Erreur : affiche une pop-up d'erreur
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue lors de l'envoi de l'audio",
        });
      }
    } catch (error) {
      // Gestion des erreurs : affiche une pop-up d'erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de traiter votre demande. Veuillez réessayer.",
      });
      console.error(error);
    }
  };

  return (
    <Card
      id={cv.cvName}
      key={index}
      color="secondary"
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
          id="select"
          color="primary"
          variant="contained"
          onClick={() => handleSelect(cv.audioURL)} // Envoie le fichier lorsque le bouton "Sélectionner" est cliqué
          style={{ width: "45%" }}
        >
          Sélectionner
        </Button>
        <Tooltip title="Télécharger votre fichier">
          <Button
            id="download"
            color="secondary"
            variant="contained"
            onClick={() => handleDownload(cv.audioURL)}
          >
            <DownloadIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Supprimer votre fichier">
          <Button
            id="delete"
            variant="contained"
            color="error"
            onClick={() => handleDeleteCV(index)}
            style={{ width: "fit-content" }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default AudioCard;
