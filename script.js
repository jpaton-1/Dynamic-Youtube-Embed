const API_KEY = 'AIzaSyBuoIV7cSxilFJd2DBJ-fNF-mO_HEJfjhM';  // Replace with your actual YouTube API key
const CHANNEL_ID = 'UC6PnY_FQmr-0bFN1aK22hBg';  // Duke Chapel's channel ID

// DOM Elements
const upcomingContainer = document.getElementById('upcoming-livestreams');
const pastContainer = document.getElementById('past-livestreams');

// Fetch Upcoming Livestreams
async function fetchUpcomingLivestreams() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=upcoming&type=video&order=date&maxResults=1&channelId=${CHANNEL_ID}&key=${API_KEY}`
  );

  const data = await response.json();
  console.log('Upcoming Livestreams Response:', data);  // For debugging
  displayLivestreams(data, upcomingContainer);
}

// Fetch Past Livestreams
async function fetchPastLivestreams() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=completed&type=video&order=date&maxResults=1&channelId=${CHANNEL_ID}&key=${API_KEY}`
  );

  const data = await response.json();
  console.log('Past Livestreams Response:', data);  // For debugging
  displayLivestreams(data, pastContainer);
}

// Display Livestreams in the DOM
function displayLivestreams(data, container) {
  if (data.items.length === 0) {
    container.innerHTML = '<p>No livestreams available.</p>';
    return;
  }

  data.items.forEach(item => {
    const videoId = item.id.videoId;

    const videoElement = document.createElement('div');
    videoElement.classList.add('video-container');
    videoElement.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
    container.appendChild(videoElement);
  });
}

// Load the data when the page loads
window.onload = () => {
  fetchUpcomingLivestreams();
  fetchPastLivestreams();
};
