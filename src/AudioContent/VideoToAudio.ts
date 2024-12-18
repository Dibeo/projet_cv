import Swal from "sweetalert2";

const extractAudioFromVideo = async (videoFile: File): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoFile);
    //videoElement.muted = true;    //a pas mettre mais a trouver un moyen de ne pas l'entendre
    videoElement.preload = "auto";

    videoElement.onloadedmetadata = () => {
      try {
        const audioContext = new AudioContext();
        const mediaStream = (videoElement as any).captureStream();
        const audioSource = audioContext.createMediaStreamSource(mediaStream);

        const recorder = new MediaRecorder(audioSource.mediaStream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/mp3" });
          if (audioBlob.size === 0) {
            console.error("Le fichier Blob généré est vide.");
            Swal.fire({
              title: "Erreur !",
              text: "Aucun contenu audio valide n'a été généré.",
              icon: "error",
              confirmButtonText: "OK",
            });
            return;
          }
          console.log(audioBlob);
        };

        recorder.start();
        videoElement.play();

        videoElement.onended = () => {
          recorder.stop();
        };
      } catch (error) {
        console.log(error);
      }
    };

    videoElement.onerror = () => {
      console.error("Erreur lors de la lecture du fichier audio.");
      Swal.fire({
        title: "Erreur !",
        text: "Impossible de lire le fichier audio généré.",
        icon: "error",
        confirmButtonText: "OK",
      });
    };
  });
};

export default extractAudioFromVideo;
