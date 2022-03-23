import { skippers } from '../config.js'

const primevideo_skippers = skippers
    .filter(e => e.platform === 'PRIMEVIDEO')
    .map(e => {
    return {
        ...e,
        enabled: false
    }
})

let interval_id = null

async function startup () {

    for (let i = 0; i < primevideo_skippers.length; i++) {
        const result = await chrome.storage.local.get(primevideo_skippers[i].name)

        primevideo_skippers[i].enabled = result[primevideo_skippers[i].name]
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {

        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

            const skipper = primevideo_skippers.find(a => a.name === key)
            if (skipper)
                skipper.enabled = newValue

            checkJob()
        }
    })

    checkJob()
}

function checkJob () {

    const should_skip = primevideo_skippers.filter(a => a.enabled).length > 0

    if (should_skip)
        interval_id = interval_id === null ? setInterval(() => {
            const enabled_skippers = primevideo_skippers.filter(a => a.enabled)

            for (let i = 0; i < enabled_skippers.length; i++) {
                
                let skip_elements = document.querySelectorAll(enabled_skippers[i].selectors.join(','))

                skip_elements.forEach((e) => e.click())
            }
        }, 800) : interval_id

    else {
        clearInterval(interval_id)
        interval_id = null
    }
}

startup()
