"use strict"

import GameObject from "../../engine/game_objects/game_object";

class Background extends GameObject {
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

        // Allows for infinite scrolling
        this.isTiled = true;
    }

    update() {
        this.isAutomatic();
        this.mRenderComponent.getXform().incXPosBy(0.1);
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