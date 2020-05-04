const Bundler = require('parcel-bundler')
const Path = require('path')
const spritesheet = require('spritesheet-js')
const chokidar = require('chokidar')

const PRODUCTION = process.env.NODE_ENV === 'production'
const SPRITES_PATH = 'sprites/*.png'
const OUT_DIR = 'dist'

const entryFiles = [
    Path.join(__dirname, './index.html')
]

const options = {
    outDir: OUT_DIR,
    publicUrl: PRODUCTION && '.',
    sourceMaps: !PRODUCTION
}


const bundler = new Bundler(entryFiles, options)
let watcher

if (PRODUCTION) {
    createSpriteSheet()
    bundler.bundle()
} else {
    watcher = chokidar.watch()
    watcher.add(SPRITES_PATH)
    watcher.once('all', createSpriteSheet)
    bundler.serve()
}

function createSpriteSheet() {
    spritesheet(SPRITES_PATH, { format: 'json', path: OUT_DIR }, err => {
        if (watcher) watcher.once('all', createSpriteSheet)
        if (err) return console.error(err)
        console.log('🎨 spritesheet generated')
    })
}


