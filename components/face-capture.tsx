"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, Loader2 } from "lucide-react";

const MODEL_URL = process.env.NEXT_PUBLIC_FACE_API_MODEL_URL || "/models";

type Props = {
  onCapture: (file: File) => void;
  onFaceReady?: () => void;
};

export default function FaceCapture({ onCapture, onFaceReady }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [faceApi, setFaceApi] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    let stream: MediaStream | null = null;

    const init = async () => {
      try {
        const source = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } }
        });
        stream = source;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const api = await import("@vladmandic/face-api");
        await api.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setFaceApi(api);
      } catch (err) {
        console.warn("Camera or model init failed", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!faceApi || !videoRef.current) return;
    let frame: number;

    const detect = async () => {
      if (!videoRef.current) return;
      try {
        const detection = await faceApi.detectSingleFace(
          videoRef.current,
          new faceApi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.4 })
        );
        const hasFace = Boolean(detection);
        setFaceDetected(hasFace);
        if (hasFace && onFaceReady) onFaceReady();
      } catch (err) {
        console.warn("Face detection skipped", err);
      }
      frame = requestAnimationFrame(detect);
    };

    frame = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(frame);
  }, [faceApi, onFaceReady]);

  const captureFrame = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `sembla-selfie-${Date.now()}.jpg`, { type: "image/jpeg" });
        setPreview(URL.createObjectURL(file));
        onCapture(file);
      },
      "image/jpeg",
      0.92
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/50">
      <video ref={videoRef} className="aspect-square w-full object-cover" playsInline muted autoPlay />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`h-40 w-40 rounded-full border ${faceDetected ? "border-accent shadow-[0_0_40px_rgba(90,182,255,0.4)]" : "border-white/20"}`}
        />
      </div>
      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
        {faceDetected ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Camera className="h-4 w-4" />}
        {faceDetected ? "Face locked" : "Align face"}
      </div>
      <div className="absolute bottom-3 right-3">
        <button
          type="button"
          onClick={captureFrame}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-deep"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          Capture
        </button>
      </div>
      {preview ? (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Captured frame" className="h-full w-full object-cover opacity-80" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
              Captured
            </span>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="rounded-full border border-white/30 px-3 py-1 text-xs text-white hover:border-white/60"
            >
              Retake
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
