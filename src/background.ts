import { skippers } from './config.js'

chrome.runtime.onInstalled.addListener(async () => {

  for (let i = 0; i < skippers.length; i++) { 
    let result: { [key: string]: boolean } = await chrome.storage.local.get(skippers[i].name)
      //if (result[skippers[i].name] === undefined) uncomment to preserve old saved configuration when installing or updating
        await chrome.storage.local.set({ [skippers[i].name]: true })
  }

});


