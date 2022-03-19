import { skippers } from '../config.js'

const disneyplus_skippers = skippers
    .filter(e => e.platform === 'DISNEYPLUS')
    .map(e => {
    return {
        ...e,
        enabled: false
    }
})

let interval_id = null

async function startup () {

    for (let i = 0; i < disneyplus_skippers.length; i++) {
        const result = await chrome.storage.local.get(disneyplus_skippers[i].name)
        console.log(disneyplus_skippers[i].name +' value currently is ', result[disneyplus_skippers[i].name])
        disneyplus_skippers[i].enabled = result[disneyplus_skippers[i].name]
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        console.log('onchange', changes, namespace)
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

            const skipper = disneyplus_skippers.find(a => a.name === key)
            if (skipper) {
                console.log(key + ' change detected. oldValue: ', oldValue, 'newValue:', newValue)
                skipper.enabled = newValue
            }

            checkJob()
        }
    })

    checkJob()
}

function checkJob () {

    const should_skip = disneyplus_skippers.filter(a => a.enabled).length > 0
    console.log('should skip', should_skip)
    if (should_skip)
        interval_id = interval_id === null ? setInterval(() => {
            const enabled_skippers = disneyplus_skippers.filter(a => a.enabled)

            console.log('setinterval', enabled_skippers)

            for (let i = 0; i < enabled_skippers.length; i++) {
                let skip_elements = document.querySelectorAll(enabled_skippers[i].selectors.join(','))
                console.log(skip_elements)
                if (skip_elements.length) { // lo skip next episode non funziona se parte che è disabilitato e lo abilito dopo che è apparso il tasto
                    for (let k = 0; k < skip_elements.length; k++)
                        skip_elements[k].click()
                    return
                }

            }
        }, 800) : interval_id

    else {
        clearInterval(interval_id)
        interval_id = null
    }
}

/*function setJustSkipped () {
    JUST_SKIPPED = true
    
    setTimeout(() => {
        JUST_SKIPPED = false
    }, 2000)
}*/

startup()




