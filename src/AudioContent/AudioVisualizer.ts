import { useRef } from "react";

export default class AudioVisualizer {
  protected audioContextRef = useRef<AudioContext | null>(null);
  protected animationId: number | null = null;

  public startAudioVisualizer = (
    stream: MediaStream,
    canvasRef: React.RefObject<HTMLCanvasElement>
  ) => {
    this.audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = this.audioContextRef.current.createAnalyser();
    const source = this.audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      if (canvasContext) {
        const draw = () => {
          this.animationId = requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);

          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          const barWidth = (canvas.width / bufferLength) * 1.25;
          const centerY = canvas.height / 2;
          let x = 0;

          dataArray.forEach((item) => {
            const barHeight = item / 2;
            const colorValue = Math.min(255, item + 100);

            canvasContext.fillStyle = `rgb(50, 50, ${colorValue})`;
            canvasContext.fillRect(x, centerY - barHeight, barWidth, barHeight);
            canvasContext.fillRect(x, centerY, barWidth, barHeight);
            x += barWidth + 1;
          });

          canvasContext.strokeStyle = "white";
          canvasContext.lineWidth = 2;
          canvasContext.beginPath();
          canvasContext.moveTo(0, centerY);
          canvasContext.lineTo(canvas.width, centerY);
          canvasContext.stroke();
        };
        draw();
      }
    }
  };

  public stopAudioVisualizer = (
    stream: MediaStream,
    canvasRef: React.RefObject<HTMLCanvasElement>
  ) => {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      if (canvasContext) {
        const centerY = canvas.height / 2;
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.strokeStyle = "white";
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();
        canvasContext.moveTo(0, centerY);
        canvasContext.lineTo(canvas.width, centerY);
        canvasContext.stroke();
      }
    }
  };
}
