import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {scene}from './setup'
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });
let model, skeleton, mixer, clock;
const modelLoader = new GLTFLoader();
modelLoader.setDRACOLoader(dracoLoader);

function loadModel(filepath,pos) {
  const {x,y,z} = pos

  return new Promise((resolve, reject) => {
    modelLoader.load(
      filepath,
      function (gltf) {
        console.log("MODD",gltf)
        gltf.scene.scale.setX(0.003)
        gltf.scene.scale.setY(0.003)
        gltf.scene.scale.setZ(0.003)

        gltf.scene.position.setX(x)
        gltf.scene.position.setY(y)
        gltf.scene.position.setZ(z)

        let mixer = new THREE.AnimationMixer( gltf );

        console.log(gltf.animations)
        // if (gltf.animations.length > 0) {
        //   gltf.animations.forEach((anime) => mixer.clipAction(anime).play());
        // } else {
          // mixer
          //   .clipAction(gltf.animations[0])
          //   .setLoop(THREE.LoopOnce)
          //   .play().clampWhenFinished = true;
        // }
    
        // console.log("mixx",mixer)
        // const action = mixer.clipAction( gltf.animations[ 0 ] );
        // console.log("action",action)
        //   // action.play();

        resolve(gltf);
      },
      function (xhr) {
        // console.log("loading", xhr);
      },
      function (error) {
        console.log("ERROR on loading model", error);
        reject(error);
      }
    );
  });
}


// function loadModel (filepath,pos){
// // model
// const loader = new FBXLoader();
// loader.load( filepath, function ( object ) {
//   object.scale.setX(0.008)
//   object.scale.setY(0.008)
//   object.scale.setZ(0.008)

//   mixer = new THREE.AnimationMixer( object );
//   console.log("object",object)
//   console.log("mixx",mixer)
//   const action = mixer.clipAction( object.animations[ 0 ] );
//   console.log("action",action)

//   action.play();

//   object.traverse( function ( child ) {

//     if ( child.isMesh ) {

//       child.castShadow = true;
//       child.receiveShadow = true;

//     }

//   } );

//   scene.add( object );

// } );
// }

export { loadModel };
