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

export const disneyplus_skippers = [
    {
        name: 'disneyplus_skip_intro_&_recap',
        selectors: ['button.skip__button']
    },
    {
        name: 'disneyplus_skip_next_episode',
        selectors: ['button[data-testid="up-next-play-button"]']
    }
]

export const skippers = [
    {   
        platform: 'NETFLIX',
        name: 'netflix_skip_intro',
        selectors: ['button[data-uia="player-skip-intro"]']
    },
    {
        platform: 'NETFLIX',
        name: 'netflix_skip_recap',
        selectors: ['button[data-uia="player-skip-recap"]']
    },
    {
        platform: 'NETFLIX',
        name: 'netflix_skip_next_episode',
        selectors: ['button[data-uia="next-episode-seamless-button"]', 'button[data-uia="next-episode-seamless-button-draining"]']
    },
    {
        platform: 'PRIMEVIDEO',
        name: 'primevideo_skip_intro_&_recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },
    /*{
        platform: 'PRIMEVIDEO',
        name: 'primevideo_skip_recap',
        selectors: ['button.atvwebplayersdk-skipelement-button']
    },*/
    {
        platform: 'PRIMEVIDEO',
        name: 'primevideo_skip_next_episode',
        selectors: ['.atvwebplayersdk-nextupcard-button']
    },
    {
        platform: 'PRIMEVIDEO',
        name: 'primevideo_skip_ad',
        selectors: ['.fu4rd6c', /*f1cw2swo */]
    },
    {
        platform: 'DISNEYPLUS',
        name: 'disneyplus_skip_intro_&_recap',
        selectors: ['button.skip__button']
    },
    {
        platform: 'DISNEYPLUS',
        name: 'disneyplus_skip_next_episode',
        selectors: ['button[data-testid="up-next-play-button"]']
        //selectors: ['button[data-testid="up-next-play-button"]', 'button[data-gv2elementkey="playNext"]', 'button[data-gv2interactionkey="playNext"']
    }
]
