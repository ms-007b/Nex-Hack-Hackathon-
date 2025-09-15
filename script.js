const videos = [
  {
    src: "video1.mp4",
    description:"When Someone Invades Your Personal Space. Use when: A person comes too close in a way that feels uncomfortable, threatening, or unsafe.Aim: To create space and set boundaries before the situation turns into a physical attack.Effect: Shows the other person that you are alert, confident, and not an easy target.Purpose: To stop the approach, warn them off, and give yourself a chance to leave safely.Best in: Early stages of confrontation — when someone is trying to intimidate, harass, or corner you.",
  },
  {
    src: "video2.mp4",
    description: "Double-Hand Front Choke. Use when: Someone grabs your neck from the front with both hands (choking you). Aim: Their hands around your throat or windpipe area. Effect: Cuts off air or blood flow — very dangerous; can make you dizzy, pass out, or lose control fast. Purpose: To stop the choke and get free so you can breathe and escape. Best in: Close, immediate danger when both hands are on your neck and you must act right away.",
  },
  {
    src: "video3.mp4",
    description: "Wrist Grab Strike. Use when: Someone grabs your wrist (one or both hands) and won’t let go. Aim: The attacker’s wrist, thumb joint, or inside forearm. Effect: Causes sharp pain or shock, can make them loosen their grip or drop your arm. Purpose: To break the grab quickly so you can move your arm and escape. Best in: Close situations where the attacker holds your hand, wrist, or is trying to control your arm.",
    },
   {
    src: "video4.mp4",
    description: "Grab hair. Use it right away if someone grabs your hair. Goal = get free and run, not fight. Use it when they’re holding your head or stopping you from leaving",
    },
    {
    src: "video5.mp4",
    description: "Ribs Palm Strike. Use when attacker is at the side or slightly turned. Aim: Side of the ribs.  Effect: Causes sharp pain, can make the attacker bend or lose balance. Purpose: To weaken the grip if attacker holds you or to create an opening. Best in: Close side attacks or grabs.",
    },
    {
    src: "video6.mp4",
    description: "Chest Palm Strike. Use when the attacker is directly in front of you, trying to push, grab, or come closer. Aim: Center of the chest (sternum). Effect: Knocks attacker backward and creates distance. Purpose: To push away strongly and buy time to escape. Best in: Situations where you need space quickly.",
    },
    {
    src: "video7.mp4",
    description: "Neck Palm Strike. Use when the attacker is close and threatening seriously. Aim: Side of the neck (where nerves and blood vessels are). Effect: Can stun, weaken, or slow down the attacker. Purpose: Quickly create a chance to escape or take control. Best in: Emergency, high-risk situations.",
    },
];

const badges = ["🏅", "🎖️", "🔰", "📛", "🛡️"];

function playRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videos.length);
  const selectedVideo = videos[randomIndex];

  const videoPlayer = document.getElementById("videoPlayer");
  const videoDescription = document.getElementById("videoDescription");

  videoPlayer.src = selectedVideo.src;
  videoDescription.textContent = selectedVideo.description;
  videoPlayer.load();
  videoPlayer.play();

  showRandomBadge();
}

function showRandomBadge() {
  const randomIndex = Math.floor(Math.random() * badges.length);
  const badgeDisplay = document.getElementById("badgeDisplay");
  badgeDisplay.textContent = badges[randomIndex];
}

// Optional: show a badge on page load
window.onload = () => {
  showRandomBadge();
};
