/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kPlatformTexture = "assets/platform.png";
        this.kWallTexture = "assets/wall.png";
        this.kTargetTexture = "assets/target.png";

        this.kBg = "assets/clouds_and_sky.jpg";
        this.kBg2 = "assets/cloud.png"; // temporary for figuring out project

        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
        this.mShapeMsg = null;

        this.mAllObjs = null;
        this.mPlatforms = null;
        this.mBounds = null;
        this.mCollisionInfos = [];
        this.mHero = null;

        this.mCurrentObj = 0;
        this.mTarget = null;

        // Draw controls
        this.mDrawCollisionInfo = false;
        this.mDrawTexture = false;
        this.mDrawBounds = false;
        this.mDrawRigidShape = true;


    // ---------OUR PROJECT-------------------
        this.mBg = null;
        this.mBg2 = null;
    }

    load() {
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kPlatformTexture);
        engine.texture.load(this.kWallTexture);
        engine.texture.load(this.kTargetTexture);

        engine.texture.load(this.kBg);
        engine.texture.load(this.kBg2);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kPlatformTexture);
        engine.texture.unload(this.kWallTexture);
        engine.texture.unload(this.kTargetTexture);
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kBg2);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        engine.defaultResources.setGlobalAmbientIntensity(3);

        this.mHero = new Hero(this.kMinionSprite);

        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(5, 7);
        this.mMsg.setTextHeight(3);

        let bgR = new engine.SpriteRenderable(this.kBg);
        bgR.setElementPixelPositions(0, 1024, 0, 1024);
        bgR.getXform().setSize(200, 150);
        bgR.getXform().setPosition(100, 75);
        this.mBg = new engine.GameObject(bgR);

        let bgR2 = new engine.SpriteRenderable(this.kBg2);
        bgR2.setElementPixelPositions(0, 1024, 0, 1024);
        bgR2.getXform().setSize(50, 50);
        bgR2.getXform().setPosition(80, 75);
        this.mBg2 = new engine.GameObject(bgR2);
    }

    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mMsg.draw(camera);
        this.mBg.draw(camera);
        this.mBg2.draw(camera);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this._drawCamera(this.mCamera);
    }

    incShapeSize(obj, delta) {
        let s = obj.getRigidBody();
        let r = s.incShapeSizeBy(delta);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg = "";

        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            engine.physics.togglePositionalCorrection();
        }
        if (engine.input.isKeyClicked(engine.input.keys.V)) {
            engine.physics.toggleHasMotion();
        }
        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.randomizeVelocity();
        }

        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            this.mCurrentObj -= 1;
            if (this.mCurrentObj < 0)
                this.mCurrentObj = this.mAllObjs.size() - 1;
        }
        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            this.mCurrentObj += 1;
            if (this.mCurrentObj >= this.mAllObjs.size())
                this.mCurrentObj = 0;
        }

        if (this.mDrawCollisionInfo)
            this.mCollisionInfos = [];
        else
            this.mCollisionInfos = null;

        this.mMsg.setText(msg);

    }

}

export default MyGame;