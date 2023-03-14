/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import Background from "./objects/background.js";
import MyGameTwo from "./my_game_two.js";

class MyGame extends engine.Scene {
    constructor() {
        super();


        this.kBg = "assets/sky.png";
        this.kBg2 = "assets/clouds_bg.png";
        this.kBg3 = "assets/glacial_mountains.png";
        this.kBg4 = "assets/clouds_mg_3.png";
        this.kBg5 = "assets/clouds_mg_2.png";
        this.kBg6 = "assets/clouds_mg_1.png";

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
        engine.texture.load(this.kBg6);
    }

    unload() {
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
            [0, 0, 1200, 900]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        engine.defaultResources.setGlobalAmbientIntensity(2.5);


        //sky
        this.mBg = new Background(this.kBg, "right", 0.1, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg.setVertical(false);
        //clouds
        this.mBg2 = new Background(this.kBg2, "right", 0.2, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg2.setVertical(false);
        //mountains
        this.mBg3 = new Background(this.kBg3, "right", .3, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg3.setVertical(false);
        //cloud 3
        this.mBg4 = new Background(this.kBg4, "right", .4, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg4.setVertical(false);
        //cloud 2
        this.mBg5 = new Background(this.kBg5, "right", .5, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg5.setVertical(false);
        //cloud 1 
        this.mBg6 = new Background(this.kBg6, "right", .6, this.mCamera.getWCCenter(), this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
        this.mBg6.setVertical(false);
        
    }

    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mBg.draw(camera);
        this.mBg2.draw(camera);
        this.mBg3.draw(camera);
        this.mBg4.draw(camera);
        this.mBg5.draw(camera);
        this.mBg6.draw(camera);
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

        this.mBg.update();
        this.mBg2.update();
        this.mBg3.update();
        this.mBg4.update();
        this.mBg5.update();
        this.mBg6.update();


        if(engine.input.isKeyClicked(engine.input.keys.N) === true){
            this.next();
        }
    }

    next() { 
        super.next();  // this must be called!

        // next scene to run
          
        let nextLevel = new MyGameTwo();  // next level to be loaded
        nextLevel.start();
    }

}

export default MyGame;