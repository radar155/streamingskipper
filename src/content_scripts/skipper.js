import { skippers } from '../config.js'

let service

switch (window.location.host) {
    case 'www.netflix.com':
        service = 'NETFLIX'
        break
    case 'www.primevideo.com':
        service = 'PRIMEVIDEO'
        break
    case 'www.disneyplus.com':
        service = 'DISNEYPLUS'
        break
}

const c_skippers = skippers
    .filter(e => e.service === service)
    .map(e => {
    return {
        ...e,
        enabled: false
    }
})

let interval_id = null

async function startup () {

    for (let i = 0; i < c_skippers.length; i++) {
        const result = await chrome.storage.local.get(c_skippers[i].name)

        c_skippers[i].enabled = result[c_skippers[i].name]
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {

        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

            const skipper = c_skippers.find(a => a.name === key)
            if (skipper)
                skipper.enabled = newValue

            checkJob()
        }
    })

    checkJob()
}

function checkJob () {

    const should_skip = c_skippers.filter(a => a.enabled).length > 0

    if (should_skip)
        interval_id = interval_id === null ? setInterval(() => {
            const enabled_skippers = c_skippers.filter(a => a.enabled)

            for (let i = 0; i < enabled_skippers.length; i++) {
                console.log(enabled_skippers[i])
                let skip_elements = document.querySelectorAll(enabled_skippers[i].selectors.join(','))
                
                skip_elements.forEach((e) => {
                    try {
                        e.click()
                    } catch (e) {
                        console.error(e)
                    }})

            }
        }, 800) : interval_id

    else {
        clearInterval(interval_id)
        interval_id = null
    }
}

startup()
