const NETFLIX_SKIP_DEFAULT = true
const PRIMEVIDEO_SKIP_DEFAULT = true

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ netflix_skip_enabled: NETFLIX_SKIP_DEFAULT })
  console.log(`Default setting netflix_skip_enabled: ${NETFLIX_SKIP_DEFAULT}`)
  chrome.storage.local.set({ primevideo_skip_enabled: PRIMEVIDEO_SKIP_DEFAULT })
  console.log(`Default setting primevideo_skip_enabled: ${PRIMEVIDEO_SKIP_DEFAULT}`)
});


