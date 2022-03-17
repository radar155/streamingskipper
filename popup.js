let netflix_skip_enabled_checkbox = document.getElementById("netflix_skip_enabled")

chrome.storage.local.get('netflix_skip_enabled', (result) => {
  netflix_skip_enabled_checkbox.checked = result.netflix_skip_enabled
});

netflix_skip_enabled_checkbox.addEventListener("change", (event) => {
  chrome.storage.local.set({ netflix_skip_enabled: event.currentTarget.checked })
});

let primevideo_skip_enabled_checkbox = document.getElementById("primevideo_skip_enabled")

chrome.storage.local.get('primevideo_skip_enabled', (result) => {
  primevideo_skip_enabled_checkbox.checked = result.primevideo_skip_enabled
});

primevideo_skip_enabled_checkbox.addEventListener("change", (event) => {
  chrome.storage.local.set({ primevideo_skip_enabled: event.currentTarget.checked })
});

var manifestData = chrome.runtime.getManifest()
console.log(manifestData.version)
