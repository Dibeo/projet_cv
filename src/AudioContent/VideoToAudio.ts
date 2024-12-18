import Swal from "sweetalert2";

const extractAudioFromVideo = async (videoFile: File): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.preload = "auto";

    // Affiche une fenêtre de progression
    Swal.fire({
      title: "Extraction audio en cours",
      html: '<div id="swal-progress-bar" style="height: 20px; background: #ddd; width: 100%;"><div style="height: 100%; background: #4caf50; width: 0%; transition: width 0.3s;" id="progress-bar"></div></div>',
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    videoElement.onloadedmetadata = async () => {
      try {
        const audioContext = new AudioContext();

        const mediaStream = (videoElement as any).captureStream();
        const audioSource = audioContext.createMediaStreamSource(mediaStream);
        const silentDestination = audioContext.createMediaStreamDestination(); // Pour ne pas l'entendre
        audioSource.connect(silentDestination);

        const recorder = new MediaRecorder(silentDestination.stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/mp3" });

          if (audioBlob.size === 0) {
            Swal.fire({
              title: "Erreur !",
              text: "Aucun contenu audio valide n'a été généré.",
              icon: "error",
              confirmButtonText: "OK",
            });
            reject(new Error("Le fichier Blob généré est vide."));
            return;
          }

          // Ferme la fenêtre de progression et affiche une confirmation
          Swal.close();
          Swal.fire({
            title: "Succès !",
            text: "L'extraction audio a été terminée avec succès.",
            icon: "success",
            confirmButtonText: "OK",
          });

          resolve(audioBlob);
        };

        // Démarre l'enregistrement
        recorder.start();

        // Joue la vidéo pour permettre l'enregistrement
        videoElement.play();

        // Met à jour la barre de progression
        const duration = videoElement.duration;
        const progressBar = document.getElementById("progress-bar") as HTMLDivElement;
        videoElement.ontimeupdate = () => {
          if (progressBar) {
            const progress = (videoElement.currentTime / duration) * 100;
            progressBar.style.width = `${progress}%`;
          }
        };

        // Stoppe l'enregistrement à la fin de la vidéo
        videoElement.onended = () => {
          recorder.stop();
        };
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Erreur !",
          text: "Une erreur est survenue pendant l'extraction audio.",
          icon: "error",
          confirmButtonText: "OK",
        });
        reject(error);
      }
    };

    videoElement.onerror = () => {
      Swal.fire({
        title: "Erreur !",
        text: "Impossible de lire le fichier vidéo.",
        icon: "error",
        confirmButtonText: "OK",
      });
      reject(new Error("Erreur lors de la lecture du fichier vidéo."));
    };
  });
};

export default extractAudioFromVideo;
