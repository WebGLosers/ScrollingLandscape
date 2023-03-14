/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import Background from "./objects/background.js";
import MyGame from "./my_game_main.js";

class MyGameTwo extends engine.Scene {
    constructor() {
        super();

        this.kBg = "assets/Nebula.png";
        this.kBg2 = "assets/stars1.png";
        this.kBg3 = "assets/stars2.png";
        this.kBg4 = "assets/stars3.png";
        this.kBg5 = "assets/stars4.png";


        // The camera to view the scene
        this.mCamera = null;


    // ---------OUR PROJECT-------------------
        this.mBg = null;
        this.mBg2 = null;
        this.mBg3 = null;
        this.mBg4 = null;
        this.mBg5 = null;
        this.mBg6 = null;
    }

    load() {
        engine.texture.load(this.kBg);
        engine.texture.load(this.kBg2);
        engine.texture.load(this.kBg3);
        engine.texture.load(this.kBg4);
        engine.texture.load(this.kBg5);
    }

    unload() {
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kBg2);
        engine.texture.unload(this.kBg3);
        engine.texture.unload(this.kBg4);
        engine.texture.unload(this.kBg5);

        
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 1200, 900]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0, 0, 0.1, 1]);
        // sets the background to gray
        engine.defaultResources.setGlobalAmbientIntensity(3.5);


        //sky
        this.mBg = new Background(this.kBg, "up", 0.1, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg.setHorizontal(false);
        //clouds
        this.mBg2 = new Background(this.kBg2, "up", 0.2, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        //mountains
        this.mBg3 = new Background(this.kBg3, "up", .3, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        //cloud 3
        this.mBg4 = new Background(this.kBg4, "up", .4, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());

        this.mBg5 = new Background(this.kBg5, "up", .5, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        
    }

    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mBg.draw(camera);
        this.mBg2.draw(camera);
        this.mBg3.draw(camera);
        this.mBg4.draw(camera);
        this.mBg5.draw(camera);

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0, 0, 0.1, 1.0]); // clear to light gray

        this._drawCamera(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {

        this.mBg.update();
        this.mBg2.update();
        this.mBg3.update();
        this.mBg4.update();
        this.mBg5.update();

        if(engine.input.isKeyClicked(engine.input.keys.N) === true){
            this.next();
        }
    }

    next() { 
        super.next();  // this must be called!

        // next scene to run
          
        let nextLevel = new MyGame();  // next level to be loaded
        nextLevel.start();
    }

}

export default MyGameTwo;