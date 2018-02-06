({
    baseUrl: 'js/',
    paths: {
        "jquery": '../libs/jquery',
        "jquery.fullscreen":'../libs/jquery.fullscreen'
    },
    shim:{
        "jquery.fullscreen":["jquery"]
    },
    name: 'main',
    out: 'game.js',
    optimize: 'none'
})