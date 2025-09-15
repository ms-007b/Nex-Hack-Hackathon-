/*const videos = [
    {
        src: "video1.mp4",
        description: 'This is the first video description.'
    },
    {
        src: "video2.mp4",
        description: 'Here is the second video description.'
    }
];

function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];

    const videoPlayer = document.getElementById('videoPlayer');
    const videoDescription = document.getElementById('videoDescription');

    videoPlayer.src = selectedVideo.src;
    videoDescription.textContent = selectedVideo.description;
    videoPlayer.load();
    videoPlayer.play();
}

// Optionally, play one video when the page loads
window.onload = playRandomVideo;*/
const videos = [
  {
    src: "video1.mp4",
    description: "Learn how to stay safe in public spaces.",
  },
  {
    src: "video2.mp4",
    description: "Emergency contacts and quick response tips.",
  },
  /*{
        src: 'videos/video3.mp4',
        description: 'Personal safety strategies you should know.'
    }*/
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
