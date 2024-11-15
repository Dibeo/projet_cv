import React from "react";
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
      .then((res) => res.blob()) // Récupère le fichier en blob
      .then((blob) => new File([blob], cv.cvName, { type: "audio/mpeg" })); // Crée un objet File à partir du blob

    formData.append("audio", audioFile);

    // Envoi du fichier via POST à l'API
    const response = await fetch("http://localhost:8080/upload-audio", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Fichier audio envoyé et traité avec succès");
    } else {
      console.error("Erreur lors de l'envoi du fichier audio");
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
