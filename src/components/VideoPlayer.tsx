import * as React from "react";
import { useState, useEffect } from "react";

interface VideoData {
  src: string;
  description: string;
}

const videos: VideoData[] = [
  {
    src: "/src/assets/Videos/vid01.mp4",
    description:
      "When Someone Invades Your Personal Space. Use when: A person comes too close in a way that feels uncomfortable, threatening, or unsafe. Aim: To create space and set boundaries before the situation turns into a physical attack. Effect: Shows the other person that you are alert, confident, and not an easy target. Purpose: To stop the approach, warn them off, and give yourself a chance to leave safely. Best in: Early stages of confrontation — when someone is trying to intimidate, harass, or corner you.",
  },
  {
    src: "/src/assets/Videos/vid02.mp4",
    description:
      "Double-Hand Front Choke. Use when: Someone grabs your neck from the front with both hands (choking you). Aim: Their hands around your throat or windpipe area. Effect: Cuts off air or blood flow — very dangerous; can make you dizzy, pass out, or lose control fast. Purpose: To stop the choke and get free so you can breathe and escape. Best in: Close, immediate danger when both hands are on your neck and you must act right away.",
  },
  {
    src: "/src/assets/Videos/vid03.mp4",
    description:
      "Wrist Grab Strike. Use when: Someone grabs your wrist (one or both hands) and won't let go. Aim: The attacker's wrist, thumb joint, or inside forearm. Effect: Causes sharp pain or shock, can make them loosen their grip or drop your arm. Purpose: To break the grab quickly so you can move your arm and escape. Best in: Close situations where the attacker holds your hand, wrist, or is trying to control your arm.",
  },
  {
    src: "/src/assets/Videos/vid04.mp4",
    description:
      "Grab hair. Use it right away if someone grabs your hair. Goal = get free and run, not fight. Use it when they're holding your head or stopping you from leaving",
  },
  {
    src: "/src/assets/Videos/vid05.mp4",
    description:
      "Ribs Palm Strike. Use when attacker is at the side or slightly turned. Aim: Side of the ribs. Effect: Causes sharp pain, can make the attacker bend or lose balance. Purpose: To weaken the grip if attacker holds you or to create an opening. Best in: Close side attacks or grabs.",
  },
  {
    src: "/src/assets/Videos/vid06.mp4",
    description:
      "Chest Palm Strike. Use when the attacker is directly in front of you, trying to push, grab, or come closer. Aim: Center of the chest (sternum). Effect: Knocks attacker backward and creates distance. Purpose: To push away strongly and buy time to escape. Best in: Situations where you need space quickly.",
  },
  {
    src: "/src/assets/Videos/vid07.mp4",
    description:
      "Neck Palm Strike. Use when the attacker is close and threatening seriously. Aim: Side of the neck (where nerves and blood vessels are). Effect: Can stun, weaken, or slow down the attacker. Purpose: Quickly create a chance to escape or take control. Best in: Emergency, high-risk situations.",
  },
];

const VideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(videos[0]);
  const [currentBadge, setCurrentBadge] = useState<string>("");
  const videoRef = React.useRef<HTMLVideoElement>(null);

  console.log(currentVideo, "video");

  const badges = ["🏅", "🎖️", "🔰", "📛", "🛡️"];

  const playRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideo(videos[randomIndex]);
    showRandomBadge();
    
    // We need to wait for the state to update and the component to re-render
    // before we can access the video element with the new source
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 0);
  };

  const showRandomBadge = () => {
    const randomIndex = Math.floor(Math.random() * badges.length);
    setCurrentBadge(badges[randomIndex]);
  };

  // Show a badge on component mount and handle video loading
  useEffect(() => {
    showRandomBadge();
    
    // When currentVideo changes, load and play the new video
    if (videoRef.current && currentVideo) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideo]);

  return (
    <div className="video-player-container p-4">
      <div className="badge-display text-4xl text-center my-4">
        <span role="img" aria-label="achievement badge">
          {currentBadge}
        </span>
      </div>

      <div className="video-container">
        {currentVideo ? (
          <>
            <video
              ref={videoRef}
              id="videoPlayer"
              controls
              autoPlay
              className="w-full max-w-[640px] mx-auto block"
            >
              <source src={currentVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-description my-4 p-4 bg-gray-100 rounded-lg">
              {currentVideo.description}
            </div>
          </>
        ) : (
          <div className="no-video-message text-center my-8">
            Click the button below to play a random self-defense technique
            video.
          </div>
        )}
      </div>

      <button
        onClick={playRandomVideo}
        className="block mx-auto my-4 px-6 py-3 bg-blue-600 text-white border-none rounded cursor-pointer font-bold"
      >
        Play Random Technique
      </button>
    </div>
  );
};

export default VideoPlayer;
