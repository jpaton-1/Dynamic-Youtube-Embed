# **Duke Chapel Livestreams Web App**

This project displays Duke Chapel’s **upcoming** and **past livestreams** directly on a webpage. It uses the **YouTube Data API** to fetch live video information and employs `localStorage` to cache API responses for 24 hours, reducing unnecessary API calls. This version is optimized for use within WYSIWYG editors that allow embedded HTML and JavaScript.

---

## **Features**
- **Displays YouTube Livestreams**: Embeds upcoming or past livestream videos.
- **Caching Mechanism**: Reduces API usage by caching the data for 24 hours using `localStorage`.
- **Self-contained App**: HTML, CSS, and JavaScript are embedded together in a single file for easy use.
  
---

## **Usage Instructions**

1. **Copy the Code**: Copy the HTML+JavaScript code from the example below into your WYSIWYG editor's **source code view**.

2. **Ensure Script Support**: Verify that your WYSIWYG editor allows the use of `<script>` tags. Some editors may block inline scripts for security.

3. **Preview**: Use the editor’s **preview mode** or publish the content to test if the app loads and displays livestreams correctly.

---

## **Code for WYSIWYG Editor**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Duke Chapel Livestreams</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: white;
    }
    .video-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
    }
    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  </style>
</head>
<body>
  <div id="video-container" class="video-container"></div>

  <script>
    const API_KEY = 'Your API Key';
    const CHANNEL_ID = 'Your Channel ID';

    function isCacheValid(timestamp) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Date.now() - timestamp < oneDay;
    }

    async function fetchDataWithCache(apiUrl, cacheKey) {
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

      if (cachedData && cachedTimestamp && isCacheValid(parseInt(cachedTimestamp))) {
        console.log(`${cacheKey} - Loaded from cache`);
        return JSON.parse(cachedData);
      } else {
        console.log(`${cacheKey} - Fetching new data`);
        const response = await fetch(apiUrl);
        const data = await response.json();

        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now());

        return data;
      }
    }

    async function displayUpcomingLivestream() {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=upcoming&type=video&order=date&maxResults=1&channelId=${CHANNEL_ID}&key=${API_KEY}`;
      const data = await fetchDataWithCache(apiUrl, 'upcomingLivestreams');

      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        document.getElementById('video-container').innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>`;
      } else {
        document.getElementById('video-container').innerHTML = '<p>No upcoming livestreams available.</p>';
      }
    }

    window.onload = displayUpcomingLivestream;
  </script>
</body>
</html>
```

---

## **How the App Works**

1. **On Load**: When the page loads, the JavaScript automatically triggers a function to fetch the **next upcoming livestream** from the YouTube API.

2. **Caching Mechanism**:  
   - The API response is cached in `localStorage`.
   - If the cache is still valid (less than 24 hours old), the app uses the cached data.
   - If the cache is expired or missing, the app makes a new API call and updates the cache.

3. **Embedding Video**: The app extracts the **video ID** from the API response and embeds it in an `<iframe>`.

---

## **Troubleshooting**

- **WYSIWYG Restrictions**:  
  If the app doesn't work, check whether your WYSIWYG editor blocks `<script>` tags or `localStorage` access.  
  *Solution*: Use a different editor or CMS that supports inline JavaScript.

- **CORS Issues**:  
  If you're testing on an iframe-based preview or sandboxed environment, you might encounter **CORS** restrictions. This is because external API calls are sometimes blocked in such environments.

- **No Livestreams Available**:  
  If the app shows "No upcoming livestreams available," confirm that there are future events scheduled on Duke Chapel’s YouTube channel.

---

## **Customization**

- **Change Video Type**:  
  To show **past livestreams** instead, replace the `eventType=upcoming` query parameter with `eventType=completed` in the API call.

- **Styling**:  
  Adjust the CSS within the `<style>` block to fit the design needs of your website or WYSIWYG platform.

---

## **License**

This project uses the **YouTube Data API**. Please ensure compliance with YouTube’s API terms of service when deploying your version of this app.

---

Let me know if you need further changes or additional help!
