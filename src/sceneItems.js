import * as THREE from "three";
import { scene ,render,renderer} from "./setup";
import { loadModel } from "./ModelLoader";
import {extract} from "./UI"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// const hat = require("./Example_all feature.glb").default;
// const earth = require("./Avatar3.glb").default;
// const earth = require("./Avatar5.glb").default;
// const earth = require("./test.glb").default;
// /Users/admin/Desktop/avatar-main/src/
// const earth = require("./model/friman-robot/source/Friman.glb").default;
const earth = require("./model/rig.glb").default;

// const earth = require("./model/model1/bonnie-skin (1)/source/Pain Gesture.fbx").default;
// const earth = require("./model/model1/bonnie-skin (1)/source/Samba Dancing.fbx").default;

// const earth = require("./model/f.glb").default;
const hdrbg = require("./model/Texture/courtyard_2k.hdr")
var face, hair, cloth

function addBacklight(){
    const tl = new THREE.PointLight(0xffffff,0.2)
    const bl = new THREE.PointLight(0xffffff,0.2)
    const tr = new THREE.PointLight(0xffffff,0.4)
    const br = new THREE.PointLight(0xffffff,0.2)
    const xd = 6
    const zd = 7
    const yd = 8
    const rightShift = 1
    tl.position.set(-xd+rightShift,yd+rightShift,-zd)
    tr.position.set(xd+rightShift,yd+rightShift,-zd)
    bl.position.set(xd+rightShift,-yd+rightShift,-zd)
    br.position.set(-xd+rightShift,-yd+rightShift,-zd)

    // tl.castShadow = true
    tr.castShadow = true
    // bl.castShadow = true
    // br.castShadow = true
  
  scene.add(tl)
  scene.add(tr)
  // scene.add(bl)
  // scene.add(br)

// scene.add(new THREE.PointLightHelper(tl))
// scene.add(new THREE.PointLightHelper(tr))
// scene.add(new THREE.PointLightHelper(bl))
// scene.add(new THREE.PointLightHelper(br))
}


function setHDRLighting(){
  new RGBELoader()
  .setDataType( THREE.UnsignedByteType ) // alt: FloatType, HalfFloatType
  .load( hdrbg.default, function ( texture, textureData ) {
    var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
    // scene.background = envMap;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
    render();
  } );
  var pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();
}

function setDirectionalLighting(){
  const dirLight = new THREE.DirectionalLight( 0xdddddd, 0.4 );
  dirLight.position.set( 2, 1.8, 4 );
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 500;
  const lightDist = 20
  dirLight.shadow.camera.right = lightDist;
  dirLight.shadow.camera.left = - lightDist;
  dirLight.shadow.camera.top	= lightDist;
  dirLight.shadow.camera.bottom = - lightDist;
  dirLight.shadow.mapSize.width = 512*4;
  dirLight.shadow.mapSize.height = 512*4;
  dirLight.shadow.radius = 4;
  // dirLight.shadow.bias = - 0.0005;
  scene.add( dirLight );
}

function addLights() {
  addBacklight()
  setHDRLighting()
  setDirectionalLighting()

  const rectLight = new THREE.RectAreaLight( 0xffffff,0.2,8,8 );
  rectLight.position.set( 0, -4, 5 );
  rectLight.lookAt( 0, 0, 0 );
scene.add(rectLight)
}
let globalmodel
function extractMesh(name){
  return globalmodel.scene.getChildByName(name)
}
const changeCol=(colIndex)=>{
  const surface = extractMesh("Beta_Surface")
  const joints = extractMesh("Beta_Joints")

  console.log(surface.material)
  if(colIndex==1){
    surface.material.color =  { r: 0.1, g: 0.3, b: 0.5 }
    joints.material.color =  { r: 0.0, g: 0.0, b: 0.10784313725490197 }
  }else {
    surface.material.color =  { r: 0.5, g: 0.3, b: 0.1 }
    joints.material.color =  { r: 0.1, g: 0.0, b: 0.0784313725490197 }

  }
  // { r: 0.6666666666666666, g: 0.23921568627450981, b: 0.20784313725490197 }
   
        
        
}
const changepos =(posIndex)=>{

  
   
      const spine = extractMesh("mixamorigSpine")
      const leftleg = extractMesh("mixamorigLeftUpLeg")
      const rightleg = extractMesh("mixamorigRightUpLeg")
      const spine2 = extractMesh("mixamorigSpine2")
      const LeftShoulder = extractMesh("mixamorigLeftShoulder")
      const leftforearm = extractMesh("mixamorigLeftForeArm")
      console.log("rightleg",rightleg)
      console.log("rightlegm",rightleg.material)
      if(posIndex===1){
        
        rightleg.rotation.x = -0.7
        rightleg.rotation.z = -0.9
        rightleg.rotation.x = -0.5
        spine.rotation.z = 0.4
        rightleg.rotation.z = 0.34
        spine2.rotation.x = -0.750
        spine2.rotation.y = -0.200
        // spine2.rotation.y = -0.200
        LeftShoulder.rotation.x = 0.910
        LeftShoulder.rotation.y = -1.3
        LeftShoulder.rotation.z = 0.5

        leftforearm.rotation.y = -1.230
      }else{

        rightleg.rotation.x =0
        rightleg.rotation.z =0
        rightleg.rotation.x =0
        spine.rotation.z =0
        rightleg.rotation.z =0
        spine2.rotation.x =0
        spine2.rotation.y =0
        // spine2.rotation.y =0
        LeftShoulder.rotation.x =0
        LeftShoulder.rotation.y =0
        LeftShoulder.rotation.z =0

        leftforearm.rotation.y =0
      }
    }

      
const addItem = () => {
  loadModel(earth , {x:0,y:0,z:0})
    .then((e) => {
      globalmodel=e
      

      
      // rot 0.600,0,-0.7
      
      // const nose = extractMesh("Nose_01")
      // const ear = extractMesh("Ears_01")
      // const eye = extractMesh("Eye_01")
      // const Sunglasses =extractMesh("Sunglasses_frame_01")
      // const Sunglasses_glass =Sunglasses.getChildByName("Plane001_1")
      // const Sunglasses_frame =Sunglasses.getChildByName("Plane001")
      // const hair = extractMesh("Hair_01")
      // const cloth = extractMesh("Cloth_01")
      // const Mouth = extractMesh("Mouth_01")
      // const face = Mouth.getChildByName("Roundcube006_2")
      // extract({face})


      // head.visible = false
      // hair.castShadow = true
      // Sunglasses_glass.castShadow = true
      // Sunglasses_glass.material.metalness = 1
      // Sunglasses_glass.material.color =new THREE.Color(0x111111)
      // Sunglasses_glass.material.metalness = 0.8

      // Sunglasses_frame.castShadow = true
      // ear.receiveShadow = true
      // nose.castShadow = true
      // eye.castShadow = true
      // cloth.castShadow = true
      // face.castShadow = true

      console.log(e.scene.children)

      
      e.scene.traverse(l=>{
        if(l.isMesh ){
          console.log("HEYYY",l)
          l.receiveShadow = true
        }
      })

      // nose.receiveShadow = false
      // ear.castShadow = false
      scene.add(e.scene);
      // extract({cloth,face,hair,hair_mask,hat})
  console.log(scene)
      render()
    })
  addLights();
};

export { addItem ,face, hair, cloth ,changepos,changeCol };
