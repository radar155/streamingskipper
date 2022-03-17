let JUST_SKIPPED = false
let NETFLIX_SKIP_ENABLED = false

chrome.storage.local.get('netflix_skip_enabled', function(result) {
    console.log('netflix_skip_enabled value currently is ', result.netflix_skip_enabled)
    NETFLIX_SKIP_ENABLED = result.netflix_skip_enabled
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'netflix_skip_enabled') {
            console.log('netflix_skip_enabled change detected. oldValue: ', oldValue, 'newValue:', newValue)
            NETFLIX_SKIP_ENABLED = newValue
        }
    }
})

setInterval(() => {
    let skip_button_element = document.querySelector('button.watch-video--skip-content-button')

    if (skip_button_element && !JUST_SKIPPED && NETFLIX_SKIP_ENABLED) {
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

