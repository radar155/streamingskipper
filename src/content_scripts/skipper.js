import { skippers } from '../config.js'

let service
let checking = true

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

            if (!checking)
                check()
        }
    })

    check()
}

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

async function check () {
    checking = true

    const should_skip = c_skippers.filter(a => a.enabled).length > 0
    console.log('check')
    if (should_skip) {
        const enabled_skippers = c_skippers.filter(a => a.enabled)

        for (let i = 0; i < enabled_skippers.length; i++) {

            let skip_elements = document.querySelectorAll(enabled_skippers[i].selectors.join(','))
            if (skip_elements.length && enabled_skippers[i].name === 'primevideo_skip_ad')
                await sleep(2500)
            
            skip_elements.forEach((e) => {
                try {
                    console.log('clicking on', e)
                    e.click()
                } catch (e) {
                    console.error(e)
                }
            })

        }
        setTimeout(() => {
            check()
        }, 800);
    } else
        checking = false

}

startup()
