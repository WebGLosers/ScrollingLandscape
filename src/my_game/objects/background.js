"use strict"

import engine from "../../engine/index.js";


class Background extends engine.GameObject {
    constructor(spriteTexture, direction) {
        super();
        this.kDelta = 0;
        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);

        // Need to change
        this.mRenderComponent.setElementPixelPositions(0, 1024, 0, 1024);
        this.mRenderComponent.getXform().setPosition(100, 75);
        this.mRenderComponent.getXform().setSize(200, 150);
        
        // Gets the direction for the background to move in
        this.mDirection = direction;
        this.isAutomatic = false;

        // Allows for infinite scrolling
        this.isTiled = true;
    }

    update() {
        // NOTE: We can change this so that if they click left or right
        // it just changes the direction(?)
        if (this.mDirection == "left") {
            this.mRenderComponent.getXform().incXPosBy(-0.1);
        } else if (this.mDirection == "right") {
            this.mRenderComponent.getXform().incXPosBy(0.1);
        } else if (this.mDirection == "up") {
            this.mRenderComponent.getXform().incYPosBy(0.1);
        } else {
            this.mRenderComponent.getXform().incYPosBy(-0.1);
        }
    }

    // This code was taken from Chapter 11.1 tile_game_object.js
    drawInfinite(camera) {
        // Step A: Compute the positions and dimensions of tiling object.
        let xf = this.getXform();
        let w = xf.getWidth();
        let h = xf.getHeight();
        let pos = xf.getPosition();
        let left = pos[0] - (w / 2);
        let right = left + w;
        let top = pos[1] + (h / 2);
        let bottom = top - h;

        // Step B: Get the world positions and dimensions of the drawing camera.
        let wcPos = camera.getWCCenter();
        let wcLeft = wcPos[0] - (camera.getWCWidth() / 2);
        let wcRight = wcLeft + camera.getWCWidth();
        let wcBottom = wcPos[1] - (camera.getWCHeight() / 2);
        let wcTop = wcBottom + camera.getWCHeight();

        // Step C: Determine the offset to the camera window's lower left corner.
        let dx = 0, dy = 0; // offset to the lower left corner
        // left/right boundary?
        if (right < wcLeft) { // left of WC left
            dx = Math.ceil((wcLeft - right) / w) * w;
        } else {
            if (left > wcLeft) { // not touching the left side
                dx = -Math.ceil((left - wcLeft) / w) * w;
            }
        }
        // top/bottom boundary
        if (top < wcBottom) { // Lower than the WC bottom
            dy = Math.ceil((wcBottom - top) / h) * h;
        } else {
            if (bottom > wcBottom) {  // not touching the bottom
                dy = -Math.ceil((bottom - wcBottom) / h) * h;
            }
        }

        // Step D: Save the original position of the tiling object.
        let sX = pos[0];
        let sY = pos[1];

        // Step E: Offset tiling object and modify the related position variables.
        xf.incXPosBy(dx);
        xf.incYPosBy(dy);
        right = pos[0] + (w / 2);
        top = pos[1] + (h / 2);

        // Step F: Determine the number of times to tile in the x and y directions.
        let nx = 1, ny = 1; // number of times to draw in the x and y directions
        nx = Math.ceil((wcRight - right) / w);
        ny = Math.ceil((wcTop - top) / h);

        // Step G: Loop through each location to draw a tile
        let cx = nx;
        let xPos = pos[0];
        while (ny >= 0) {
            cx = nx;
            pos[0] = xPos;
            while (cx >= 0) {
                this.mRenderComponent.draw(camera);
                xf.incXPosBy(w);
                --cx;
            }
            xf.incYPosBy(h);
            --ny;
        }

        // Step H: Reset the tiling object to its original position.
        pos[0] = sX;
        pos[1] = sY;
    }

    setTiled(tile) {
        this.isTiled = tile;
    }

    shouldTile() {
        return this.isTiled;
    }

    setTint() {

    }

    setNewBackgroundImage(image) {
        this.mRenderComponent = new engine.SpriteRenderable(image);
    }

    setSpeed(speed) {
        this.kDelta = speed;
    }

    isAutomatic() {
        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            this.isAutomatic = !this.isAutomatic;
        }
    }

    draw(aCamera) {
        if (this.isVisible() && (this.mDrawRenderable)) {
            if (this.shouldTile()) {
                // find out where we should be drawing   
                this.drawInfinite(aCamera);
            } else {
                this.mRenderComponent.draw(aCamera);
            }
        }
    }

}

export default Background;