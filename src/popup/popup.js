import { skippers } from '../config.js'
const manifestData = chrome.runtime.getManifest()
let version_span = document.getElementById('version')
version_span.innerText = manifestData.version

let checkboxes_id_list = skippers.map(item => {
  return {
    id: item.name,
    element: null
  }
})

for (let i = 0; i < checkboxes_id_list.length; i++) {

  checkboxes_id_list[i].element = document.getElementById(checkboxes_id_list[i].id)

  chrome.storage.local.get(checkboxes_id_list[i].id, (result) => {
    checkboxes_id_list[i].element.checked = result[checkboxes_id_list[i].id]
  });

  checkboxes_id_list[i].element.addEventListener("change", (event) => {
    chrome.storage.local.set({ [checkboxes_id_list[i].id]: event.currentTarget.checked })
  });

}
