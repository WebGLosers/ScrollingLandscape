"use strict"

import engine from "../../engine"
import Background from "./background";

class Foreground extends Background {
    constructor(spriteTexture, direction) {
        super();
        this.kDelta = 0;
        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);

        // Need to change
        this.mRenderComponent.getXform().setPosition(50, 40);
        this.mRenderComponent.getXform().setSize(3, 4);
        
        // Gets the direction for the background to move in
        this.mDirection = direction;
    }

    setTint() {

    }

    setNewBackgroundImage(image) {

    }

    draw(camera) {

    }

    setSpeed() {

    }
}

export default Foreground;