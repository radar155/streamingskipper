/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "skippers": () => (/* binding */ skippers)
/* harmony export */ });
const skippers = [
    {
        service: 'NETFLIX',
        name: 'netflix_skip_intro',
        ui: 'Skip Intro',
        selectors: ['button[data-uia="player-skip-intro"]']
    },
    {
        service: 'NETFLIX',
        name: 'netflix_skip_recap',
        ui: 'Skip Recap',
        selectors: ['button[data-uia="player-skip-recap"]']
    },
    {
        service: 'NETFLIX',
        name: 'netflix_skip_next_episode',
        ui: 'Skip to Next Episode',
        selectors: ['button[data-uia="next-episode-seamless-button"]', 'button[data-uia="next-episode-seamless-button-draining"]']
    },
    {
        service: 'PRIMEVIDEO',
        name: 'primevideo_skip_intro_&_recap',
        ui: 'Skip Intro & Recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },
    /*{
        service: 'PRIMEVIDEO',
        name: 'primevideo_skip_recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },*/
    {
        service: 'PRIMEVIDEO',
        name: 'primevideo_skip_next_episode',
        ui: 'Skip to Next Episode',
        selectors: ['.atvwebplayersdk-nextupcard-button']
    },
    {
        service: 'PRIMEVIDEO',
        name: 'primevideo_skip_ad',
        ui: 'Skip Ad',
        selectors: ['.fu4rd6c', /*f1cw2swo */],
        beta: true
    },
    {
        service: 'DISNEYPLUS',
        name: 'disneyplus_skip_intro_&_recap',
        ui: 'Skip Intro & Recap',
        selectors: ['button.skip__button']
    },
    {
        service: 'DISNEYPLUS',
        name: 'disneyplus_skip_next_episode',
        ui: 'Skip to Next Episode',
        selectors: ['button[data-testid="up-next-play-button"]']
        //selectors: ['button[data-testid="up-next-play-button"]', 'button[data-gv2elementkey="playNext"]', 'button[data-gv2interactionkey="playNext"']
    }
];


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

let service;
let checking = true;
switch (window.location.host) {
    case 'www.netflix.com':
        service = 'NETFLIX';
        break;
    case 'www.primevideo.com':
        service = 'PRIMEVIDEO';
        break;
    case 'www.disneyplus.com':
        service = 'DISNEYPLUS';
        break;
}
const c_skippers = _config_js__WEBPACK_IMPORTED_MODULE_0__.skippers.filter(e => e.service === service)
    .map(e => {
    return Object.assign(Object.assign({}, e), { enabled: false });
});
async function startup() {
    for (let i = 0; i < c_skippers.length; i++) {
        const result = await chrome.storage.local.get(c_skippers[i].name);
        c_skippers[i].enabled = result[c_skippers[i].name];
    }
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            const skipper = c_skippers.find(a => a.name === key);
            if (skipper)
                skipper.enabled = newValue;
            if (!checking)
                check();
        }
    });
    check();
}
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function check() {
    checking = true;
    const should_skip = c_skippers.filter(a => a.enabled).length > 0;
    console.log('check');
    if (should_skip) {
        const enabled_skippers = c_skippers.filter(a => a.enabled);
        for (let i = 0; i < enabled_skippers.length; i++) {
            let skip_elements = document.querySelectorAll(enabled_skippers[i].selectors.join(','));
            if (skip_elements.length && enabled_skippers[i].name === 'primevideo_skip_ad')
                await sleep(2500);
            skip_elements.forEach((e) => {
                try {
                    console.log('clicking on', e);
                    e.click();
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
        setTimeout(() => {
            check();
        }, 800);
    }
    else
        checking = false;
}
startup();

})();

/******/ })()
;