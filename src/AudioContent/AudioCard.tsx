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
          onClick={() => console.log("Selected")}
          style={{ width: "45%" }}
        >
          Selectionner
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
