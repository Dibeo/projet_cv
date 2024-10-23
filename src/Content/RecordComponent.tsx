import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

const RecordComponent: React.FC = () => {
  const [recordIsDisabled, SetRecordIsDisabled] = useState(false);
  const [stopIsDisabled, SetStopIsDisabled] = useState(true);
  useEffect(() => {
    const record = document.querySelector("#record") as HTMLButtonElement;
    const stop = document.querySelector("#stop") as HTMLButtonElement;
    const soundClips = document.querySelector("#sound-clips") as HTMLElement;

    if (!record || !stop || !soundClips) {
      console.log(
        "Les éléments #record, #stop ou #sound-clips ne sont pas encore disponibles."
      );
      return;
    }

    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      record != null &&
      stop != null &&
      soundClips != null
    ) {
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
            SetRecordIsDisabled(true);
            SetStopIsDisabled(false);
          };

          let chunks: any = [];

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            SetRecordIsDisabled(false);
            SetStopIsDisabled(true);
          };

          mediaRecorder.onstop = (e) => {
            console.log("recorder stopped");

            const clipName = prompt("Enter a name for your sound clip");

            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const deleteButton = document.createElement("button");

            clipContainer.classList.add("clip");
            audio.setAttribute("controls", "");
            deleteButton.textContent = "Delete";
            clipLabel.textContent = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;

            deleteButton.onclick = (e) => {
              let evtTgt = e.target as Element;
              (evtTgt!.parentNode!.parentNode as HTMLElement).removeChild(evtTgt!.parentNode as HTMLElement);

            };
          };
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  });

  return (
    <article className="clip" style={{ color: "#FFFFFF" }}>
      <p>Component</p>
      <audio controls></audio>
      <Button id="record" variant="contained" disabled={recordIsDisabled}>
        Rec
      </Button>
      <Button id="stop" variant="contained" disabled={stopIsDisabled}>
        Stop
      </Button>
      <div id="sound-clips">Clip</div>
    </article>
  );
};

export default RecordComponent;
