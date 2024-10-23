import { colors } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";

const RecordComponent: React.FC = () => {
  useEffect(() => {
    const record = document.querySelector("#record") as HTMLElement;
    const stop = document.querySelector("#stop") as HTMLElement;
    const soundClips = document.querySelector("#sound-clips") as HTMLElement;

    if (!record || !stop || !soundClips) {
        console.log("Les éléments #record, #stop ou #sound-clips ne sont pas encore disponibles.");
        return;
      }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && record != null && stop != null && soundClips != null) {
        //Garder la condition comme tel sinon Typescript boude
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        // On veut que l'audio
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          record.onclick = () => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
          };
          
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  });

  console.log("ici");

  return (
    <article style={{color:"#FFFFFF"}}>
      <p>Component</p>
      <Button id="record" variant="contained">Rec</Button>
      <Button id="stop" variant="contained" disabled>Stop</Button>
      <div id="sound-clips">Clip</div>
    </article>
  );
};

export default RecordComponent;
