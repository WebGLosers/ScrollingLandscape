/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import Background from "./objects/background.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kPlatformTexture = "assets/platform.png";
        this.kWallTexture = "assets/wall.png";
        this.kTargetTexture = "assets/target.png";

        //this.kBg = "assets/pokemon-sky.jpg";
        //this.kBg = "assets/starry_night.jpg";
        //this.kBg = "assets/clouds_bg.png";
        //this.kBg = "assets/clouds_and_sky.jpg";
        // this.kBg2 = "assets/cloud.png"; // temporary for figuring out project
        // this.kBg3 = "assets/glacial_mountains.png";
        // this.kBg4 = "assets/sky.png";
        this.kBg = "assets/sky.png";
        this.kBg2 = "assets/clouds_bg.png";
        this.kBg3 = "assets/glacial_mountains.png";
        this.kBg4 = "assets/clouds_mg_3.png";
        this.kBg5 = "assets/clouds_mg_2.png";
        this.kBg6 = "assets/clouds_mg_1.png";

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

        this.mHeroCam = null;


    // ---------OUR PROJECT-------------------
        this.mBg = null;
        this.mBg2 = null;
        this.mBg3 = null;
        this.mBg4 = null;
        this.mBg5 = null;
        this.mBg6 = null;
    }

    load() {
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kPlatformTexture);
        engine.texture.load(this.kWallTexture);
        engine.texture.load(this.kTargetTexture);
        engine.texture.load(this.kBg);
        engine.texture.load(this.kBg2);
        engine.texture.load(this.kBg3);
        engine.texture.load(this.kBg4);
        engine.texture.load(this.kBg5);
        engine.texture.load(this.kBg6);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kPlatformTexture);
        engine.texture.unload(this.kWallTexture);
        engine.texture.unload(this.kTargetTexture);
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kBg2);
        engine.texture.unload(this.kBg3);
        engine.texture.unload(this.kBg4);
        engine.texture.unload(this.kBg5);
        engine.texture.unload(this.kBg6);
        
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

        // Takes in the following arguments:
        // image asset, direction of movement, speed, x dimension of image, y dimension of image
        //this.mBg = new Background(this.kBg, "right", 0.2, 728, 455);
           
        // Temporary code
        // let bgR2 = new engine.SpriteRenderable(this.kBg2);
        // bgR2.setElementPixelPositions(0, 704, 0, 292);
        // bgR2.getXform().setSize(40, 20);
        // bgR2.getXform().setPosition(50, 50);
        // this.mBg2 = new engine.GameObject(bgR2);
        //sky
        this.mBg = new Background(this.kBg, "right", 0.1, 384, 216);
        //clouds
        this.mBg2 = new Background(this.kBg2, "right", 0.2, 384, 216);
        //mountains
        this.mBg3 = new Background(this.kBg3, "right", .3, 384, 216);
        //cloud 3
        this.mBg4 = new Background(this.kBg4, "right", .4, 384, 216);
        //cloud 2
        this.mBg5 = new Background(this.kBg5, "right", .5, 384, 216);
        //cloud 1 
        this.mBg6 = new Background(this.kBg6, "right", .6, 384, 216);
        
    }

    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mMsg.draw(camera);
        this.mBg.draw(camera);
        this.mBg2.draw(camera);
        this.mBg3.draw(camera);
        this.mBg4.draw(camera);
        this.mBg5.draw(camera);
        this.mBg6.draw(camera);
        this.mHero.draw(camera);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this._drawCamera(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg = "";

        this.mHero.update();
        this.mBg.update();
        this.mBg2.update();
        this.mBg3.update();
        this.mBg4.update();
        this.mBg5.update();
        this.mBg6.update();

        if (this.mDrawCollisionInfo)
            this.mCollisionInfos = [];
        else
            this.mCollisionInfos = null;

        this.mMsg.setText(msg);

    }

}

export default MyGame;