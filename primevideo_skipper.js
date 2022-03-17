let JUST_SKIPPED = false
let PRIMEVIDEO_SKIP_ENABLED = false

chrome.storage.local.get('primevideo_skip_enabled', function(result) {
    console.log('primevideo_skip_enabled value currently is ', result.primevideo_skip_enabled)
    PRIMEVIDEO_SKIP_ENABLED = result.primevideo_skip_enabled
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'primevideo_skip_enabled') {
            console.log('primevideo_skip_enabled change detected. oldValue: ', oldValue, 'newValue:', newValue)
            PRIMEVIDEO_SKIP_ENABLED = newValue
        }
    }
})

setInterval(() => {
    let skip_button_element = document.querySelector('button.atvwebplayersdk-skipelement-button')

    if (skip_button_element && !JUST_SKIPPED && PRIMEVIDEO_SKIP_ENABLED) {
        skip_button_element.click()
        setJustSkipped()
    }
}, 800)

function setJustSkipped () {
    JUST_SKIPPED = true
    
    setTimeout(() => {
        JUST_SKIPPED = false
    }, 2000)
}

