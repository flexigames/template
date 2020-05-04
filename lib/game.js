import Entity from "../entities/Entity"

export default class Game {
    constructor({stage, width, height}) {
        this.container = stage
        this.height = height
        this.width = width

        new Entity(10, 10, { sprite: 'enemy' })
    }

    update(dt) {

    }
}