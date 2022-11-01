import { skippers, Skipper } from '../config.js'

interface PopupSkipper extends Skipper {
  element: HTMLInputElement | null
}

interface Checkboxes {
  [key: string] : PopupSkipper[]
}

const manifestData = chrome.runtime.getManifest()
let version_span = document.getElementById('version')

if (version_span !== null)
  version_span.innerText = manifestData.version

let checkboxes_id_list: Checkboxes = skippers.reduce((a: Checkboxes, skipper: Skipper) => {
  a[skipper.service] = a[skipper.service] || []
  const popupSkipper = skipper as PopupSkipper
  popupSkipper.element = null
  a[skipper.service].push(popupSkipper)
  return a
}, Object.create(null))

for (const [key, value] of Object.entries(checkboxes_id_list)) {
  const container = document.getElementById('services')
  if (container !== null) {
    container.insertAdjacentHTML('beforeend', `<p class="service"><strong>${key}</strong></p>`)

    for (let i = 0; i < value.length; i++) {
      container.insertAdjacentHTML('beforeend', `
        <div class="selector">
          <p>${value[i].ui}</p>
          ${value[i].beta ? '<sup><p id="beta">BETA</p></sup>' : ''}
          <label class="switch">
            <input type="checkbox" name="${value[i].service.toLowerCase()}" id="${value[i].name}"></input>
            <span class="slider ${value[i].service.toLowerCase()}"></span>
          </label>
        </div>
      `)
  
      value[i].element = document.getElementById(value[i].name) as HTMLInputElement
  
      chrome.storage.local.get(value[i].name, (result) => {
        const element = value[i].element
        if (element !== null)
          element.checked = result[value[i].name]
      })
      
      value[i].element?.addEventListener("change", (event) => {
        console.log((<HTMLInputElement>event.currentTarget).checked)
        chrome.storage.local.set({ [value[i].name]: (<HTMLInputElement>event.currentTarget).checked })
      })
    }
  
    container.insertAdjacentHTML('beforeend', '<hr>')
  }

}
