const API_KEY = 'AIzaSyBuoIV7cSxilFJd2DBJ-fNF-mO_HEJfjhM';  // Replace with your actual API key
const CHANNEL_ID = 'UC6PnY_FQmr-0bFN1aK22hBg';  // Duke Chapel's channel ID

const upcomingContainer = document.getElementById('upcoming-livestreams');

async function fetchUpcomingLivestreams() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=upcoming&type=video&maxResults=1&channelId=${CHANNEL_ID}&key=${API_KEY}`
  );
  
  const data = await response.json();
  displayLivestreams(data, upcomingContainer);
}

function displayLivestreams(data, container) {
  if (data.items.length === 0) {
    container.innerHTML = '<p>No upcoming livestreams available.</p>';
    return;
  }

  data.items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.medium.url;

    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${thumbnail}" alt="${title}" />
      </a>
    `;
    container.appendChild(videoElement);
  });
}

window.onload = fetchUpcomingLivestreams;
