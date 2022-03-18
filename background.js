import { netflix_skippers, primevideo_skippers } from './config.js'
const skippers = netflix_skippers.concat(primevideo_skippers)

chrome.runtime.onInstalled.addListener(async () => {

  for (let i = 0; i < skippers.length; i++) { 
    let result = await chrome.storage.local.get(skippers[i].name)
      //if (result[skippers[i].name] === undefined) uncomment to preserve old saved configuration when installing or updating
        await chrome.storage.local.set({ [skippers[i].name]: true })
  }

});


