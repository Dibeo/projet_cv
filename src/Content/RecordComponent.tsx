import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const RecordComponent: React.FC = () => {
  const [recordIsDisabled, setRecordIsDisabled] = useState(false);
  const [stopIsDisabled, setStopIsDisabled] = useState(true);
  const [clips, setClips] = useState<
    { audioURL: string; clipName: string }[]
  >([]);

  useEffect(() => {
    const record = document.querySelector("#record") as HTMLButtonElement;
    const stop = document.querySelector("#stop") as HTMLButtonElement;

    if (!record || !stop) {
      console.log("Les éléments #record ou #stop ne sont pas encore disponibles.");
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
            console.log("recorder started");
            setRecordIsDisabled(true);
            setStopIsDisabled(false);
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            console.log("recorder stopped");
            setRecordIsDisabled(false);
            setStopIsDisabled(true);
          };

          mediaRecorder.onstop = () => {
            console.log("recorder stopped");

            const clipName = prompt("Enter a name for your sound clip") || "Unnamed clip";

            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = []; // Reset the chunks for the next recording
            const audioURL = window.URL.createObjectURL(blob);

            // Ajouter le nouveau clip dans la liste
            setClips((prevClips) => [
              ...prevClips,
              { audioURL, clipName },
            ]);
          };
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, []);

  const handleDeleteClip = (clipIndex: number) => {
    // Supprimer le clip de la liste
    setClips((prevClips) => prevClips.filter((_, index) => index !== clipIndex));
  };

  return (
    <article style={{ color: "#FFFFFF" }}>
      <Typography variant="h5">Enregistrement</Typography>
      <Button
        id="record"
        variant="contained"
        disabled={recordIsDisabled}
        style={{ marginRight: "10px" }}
      >
        Rec
      </Button>
      <Button id="stop" variant="contained" disabled={stopIsDisabled}>
        Stop
      </Button>

      <div id="sound-clips" style={{ marginTop: "20px" }}>
        {clips.map((clip, index) => (
          <Card key={index} variant="outlined" style={{ marginTop: "10px" }}>
            <CardContent>
              <Typography variant="h6">{clip.clipName}</Typography>
              <audio controls src={clip.audioURL}></audio>
            </CardContent>
            <CardActions>
            <Button
                variant="contained"
                onClick={() => console.log("Selected")}
              >
                Selectionner
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteClip(index)}
              >
                Supprimer
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default RecordComponent;
