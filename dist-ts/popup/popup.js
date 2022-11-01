var _a;
import { skippers } from '../config.js';
const manifestData = chrome.runtime.getManifest();
let version_span = document.getElementById('version');
if (version_span !== null)
    version_span.innerText = manifestData.version;
let checkboxes_id_list = skippers.reduce((a, skipper) => {
    a[skipper.service] = a[skipper.service] || [];
    const popupSkipper = skipper;
    popupSkipper.element = null;
    a[skipper.service].push(popupSkipper);
    return a;
}, Object.create(null));
for (const [key, value] of Object.entries(checkboxes_id_list)) {
    const container = document.getElementById('services');
    if (container !== null) {
        container.insertAdjacentHTML('beforeend', `<p class="service"><strong>${key}</strong></p>`);
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
      `);
            value[i].element = document.getElementById(value[i].name);
            chrome.storage.local.get(value[i].name, (result) => {
                const element = value[i].element;
                if (element !== null)
                    element.checked = result[value[i].name];
            });
            (_a = value[i].element) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => {
                console.log(event.currentTarget.checked);
                chrome.storage.local.set({ [value[i].name]: event.currentTarget.checked });
            });
        }
        container.insertAdjacentHTML('beforeend', '<hr>');
    }
}
