"use client";

import { useConstructUrl } from "@/utils/use-constract-url";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

function formatTime(time: number) {
  if (!Number.isFinite(time)) return "0:00";

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({
  videoKey,
  thumbnailKey,
}: {
  videoKey?: string | null;
  thumbnailKey?: string | null;
}) {
  const constructedVideoUrl = useConstructUrl(videoKey || "");
  const constructedThumbnailUrl = useConstructUrl(thumbnailKey || "");

  const videoUrl = videoKey ? constructedVideoUrl : "";
  const thumbnailUrl = thumbnailKey ? constructedThumbnailUrl : "";

  const [generatedPoster, setGeneratedPoster] = useState("");
  const poster = thumbnailUrl || generatedPoster;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (!videoUrl || thumbnailUrl) return;

    let cancelled = false;
    const v = document.createElement("video");
    v.src = videoUrl;
    v.crossOrigin = "anonymous";
    v.muted = true;
    v.playsInline = true;

    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 1280;
        canvas.height = v.videoHeight || 720;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");

        if (!cancelled) setGeneratedPoster(dataUrl);
      } catch {
        // ignore poster generation failure
      }
    };

    const onLoadedMeta = () => {
      try {
        v.currentTime = 1;
      } catch {}
    };

    const onSeeked = () => capture();
    const onLoadedData = () => capture();

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("loadeddata", onLoadedData);

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("loadeddata", onLoadedData);
      v.src = "";
    };
  }, [videoUrl, thumbnailUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, [videoUrl]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        speedMenuRef.current &&
        !speedMenuRef.current.contains(event.target as Node)
      ) {
        setShowSpeedMenu(false);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  function startHideTimer() {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2000);
  }

  function handleMouseMove() {
    setShowControls(true);
    startHideTimer();
  }

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      startHideTimer();
    } else {
      video.pause();
      setShowControls(true);
    }
  }

  function handleSeek(e: ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;

    const nextTime = Number(e.target.value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
  }

  function handleVolumeChange(e: ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;

    const nextVolume = Number(e.target.value);
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
  }

  async function toggleFullscreen() {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  function changePlaybackRate(rate: number) {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  }

  function handleContextMenu(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  if (!videoKey) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center rounded-lg bg-muted">
        <VideoOff className="mb-4 size-16 text-primary" />
        <p className="text-muted-foreground">No video for this lesson</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onContextMenu={handleContextMenu}
      className="group relative aspect-video overflow-hidden rounded-xl bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster || undefined}
        playsInline
        preload="metadata"
        controls={false}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>

      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 z-10 flex items-center justify-center"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {!isPlaying && (
          <div className="flex size-16 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
            <Play className="ml-1 size-7 fill-current" />
          </div>
        )}
      </button>

      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/30"
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded-md p-2 hover:bg-white/10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5 fill-current" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="rounded-md p-2 hover:bg-white/10"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-5" />
                ) : (
                  <Volume2 className="size-5" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="hidden w-24 cursor-pointer appearance-none rounded-lg bg-white/30 md:block"
              />
            </div>

            <span className="text-sm text-white/85">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Speed Button with Dropdown */}
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="rounded-md p-2 hover:bg-white/10 text-sm font-medium"
                aria-label="Playback speed"
              >
                {playbackRate}x
              </button>

              {/* Speed Menu Dropdown */}
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-16 rounded-lg bg-black/90 py-1 backdrop-blur-sm">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changePlaybackRate(speed)}
                      className={`w-full px-3 py-1.5 text-xs text-white hover:bg-white/10 text-center ${
                        playbackRate === speed ? "bg-white/20" : ""
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-md p-2 hover:bg-white/10"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="size-5" />
              ) : (
                <Maximize className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
