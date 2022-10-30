# AIO Skipper

AIO skipper is a browser extension made for :movie_camera: binge watchers :tv:.  
It automatically skip intro, recaps and ads in Netflix, Prime Video, Disney+ and others vod streaming services.  
The main objective of AIO Skipper is to support as many services as possible in a single, light browser extension.
AIO Skipper is and will always be free. AIO Skipper is not using any kind of Analytics/Tracking systems.  

<p align="center">
  <img src="https://github.com/radar155/streamingskipper/raw/master/screenshot/1.png" />
</p>


## Supported Services
:white_check_mark: Netflix (Intro - Recaps - Jump to next episode)  
:white_check_mark: Amazon Prime Video (Ads - Intro - Recaps - Jump to next episode)  
:white_check_mark: Disney+ (Intro - Recaps - Jump to next episode)  
:black_square_button: HBOMax  

Please, open an Issue to ask support for a service, feature or for a specific skipper.

## Supported Browsers

:white_check_mark: Chrome (and Chromium)  
:white_check_mark: Microsoft Edge  
:white_check_mark: Brave  
:white_check_mark: Opera  
:black_square_button: Firefox (waiting for manifest v3 support)  


## Todo
 - [ ] Publish into browsers stores
 - [ ] Add support for HBOMax
 - [ ] Add support for Firefox
 - [ ] Collect feedbacks for PrimeVideo Ads skipper, still in BETA
 - [ ] Switch to Typescript
 - [ ] Improve `popup.html/popup.js` to generate HTML by reading `config.js`
 - [ ] Switch to [MutationObserver Api](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## Contribute
Feel free to open an issue, fork or send a PR.  
To load the unpacked version of this extension, you need to run `npm run build` before.  
This is because the `content_script` is an ESModule, and this is not still supported without inconvenient tricks.