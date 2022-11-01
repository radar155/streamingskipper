import { skippers } from '../config.js'
const manifestData = chrome.runtime.getManifest()
let version_span = document.getElementById('version')
version_span.innerText = manifestData.version

let checkboxes_id_list = skippers.reduce((a, skipper) => {
  a[skipper.service] = a[skipper.service] || []
  skipper.element = null
  a[skipper.service].push(skipper)
  return a
}, Object.create(null))

console.log(checkboxes_id_list, Object.entries(checkboxes_id_list))
for (const [key, value] of Object.entries(checkboxes_id_list)) {
  const container = document.getElementById('services')
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

    value[i].element = document.getElementById(value[i].name)

    chrome.storage.local.get(value[i].name, (result) => {
      console.log(result, value[i].element)
      value[i].element.checked = result[value[i].name]
    })

    value[i].element.addEventListener("change", (event) => {
      console.log(event.currentTarget.checked)
      chrome.storage.local.set({ [value[i].name]: event.currentTarget.checked })
    })
  }

  container.insertAdjacentHTML('beforeend', '<hr>')
}

console.log('ao')
console.log(checkboxes_id_list['DISNEYPLUS'][0].element)
console.log(document.getElementById('disneyplus_skip_intro_&_recap'))
console.log(checkboxes_id_list['DISNEYPLUS'][0].element === document.getElementById('disneyplus_skip_intro_&_recap'))
/*
for (let i = 0; i < checkboxes_id_list.length; i++) {

  checkboxes_id_list[i].element = document.getElementById(checkboxes_id_list[i].id)

  chrome.storage.local.get(checkboxes_id_list[i].id, (result) => {
    checkboxes_id_list[i].element.checked = result[checkboxes_id_list[i].id]
  });

  checkboxes_id_list[i].element.addEventListener("change", (event) => {
    chrome.storage.local.set({ [checkboxes_id_list[i].id]: event.currentTarget.checked })
  });

}*/

/*
      <p class="service"><strong>Netflix</strong></p>
      <div class="selector">
        <p>Skip Intro</p>
        <label class="switch">
          <input type="checkbox" name="netflix" id="netflix_skip_intro"></input>
          <span class="slider netflix"></span>
        </label>
      </div>
      <div class="selector">
        <p>Skip Recap</p>
        <label class="switch">
          <input type="checkbox" name="netflix" id="netflix_skip_recap"></input>
          <span class="slider netflix"></span>
        </label>
      </div>
      <div class="selector">
        <p>Skip To Next Episode</p>
        <label class="switch">
          <input type="checkbox" name="netflix" id="netflix_skip_next_episode"></input>
          <span class="slider netflix"></span>
        </label>
      </div>
    <hr>


    <p class="service"><strong>Prime Video</strong></p>
    <div class="selector">
      <p>Skip Intro & Recap</p>
      <label class="switch">
        <input type="checkbox" name="primevideo" id="primevideo_skip_intro_&_recap"></input>
        <span class="slider primevideo"></span>
      </label>
    </div>
    <div class="selector">
      <p>Skip To Next Episode</p>
      <label class="switch">
        <input type="checkbox" name="primevideo" id="primevideo_skip_next_episode"></input>
        <span class="slider primevideo"></span>
      </label>
    </div>
    <div class="selector">
      <p>Skip Ad</p>
      <sup>
        <p id="beta">BETA</p>
      </sup>
      <label class="switch">
        <input type="checkbox" name="primevideo" id="primevideo_skip_ad"></input>
        <span class="slider primevideo"></span>
      </label>
    </div>
    <hr>
    */