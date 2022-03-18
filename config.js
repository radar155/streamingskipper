export const netflix_skippers = [
    {
        name: 'netflix_skip_intro',
        selectors: ['button[data-uia="player-skip-intro"]']
    },
    {
        name: 'netflix_skip_recap',
        selectors: ['button[data-uia="player-skip-recap"]']
    },
    {
        name: 'netflix_skip_next_episode',
        selectors: ['button[data-uia="next-episode-seamless-button"]', 'button[data-uia="next-episode-seamless-button-draining"]']
    }
  ]

export const primevideo_skippers = [
    {
        name: 'primevideo_skip_intro_&_recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },
    /*{
        name: 'primevideo_skip_recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },*/
    {
        name: 'primevideo_skip_next_episode',
        selectors: ['.atvwebplayersdk-nextupcard-button']
    },
    /*{
        name: 'primevideo_skip_ad',
        selectors: []
    }*/
]