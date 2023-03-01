"use strict"

import engine from "../../engine"

class Background extends engine.GameObject {
    constructor(spriteTexture, direction) {
        this.kDelta = 0;
        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);

        // Need to change
        this.mRenderComponent.getXform().setPosition(50, 40);
        this.mRenderComponent.getXform().setSize(3, 4);
        
        // Gets the direction for the background to move in
        this.mDirection = direction;
        this.isAutomatic = false;
    }

    update() {
        this.isAutomatic();
    }

    setTint() {

    }

    setNewBackgroundImage(image) {

    }

    draw(camera) {

    }

    setSpeed() {

    }

    isAutomatic() {
        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            this.isAutomatic = !this.isAutomatic;
        }
    }
}

export default Background;