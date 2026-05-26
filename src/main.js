import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
import { TextureLoader } from 'three';

const pane = new Pane();


const scene = new THREE.Scene();

const params = {
  color: '#ffffff',
  lightIntensity: 1
};


const textureLoader = new THREE.TextureLoader();


//geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

const material  = new THREE.MeshPhysicalMaterial();


const grassTexture = textureLoader.load('/Images/wispy-grass-meadow_albedo.png')
grassTexture.repeat.set(10, 10)
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
material.map = grassTexture;



pane.addBinding(params, 'color')
.on('change', (ev) => {
  material.color.set(ev.value);
});

pane.addBinding(params, 'lightIntensity', {
  min: 0,
  max: 10
}).on('change', (ev) => {
  pointLight.intensity = ev.value;
});


pane.addBinding(material, 'metalness', {
  min: 0,
  max: 1, 
  step: 0.01
})

pane.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01
})

pane.addBinding(material, 'reflectivity', {
  min: 0,
  max: 1, 
  step: 0.01
})

pane.addBinding(material, 'clearcoat', {
  min: 0,
  max: 1,
  step: 0.01
})


//const cubeGeometry = new THREE.BoxGeometry(1,1,1)
//const cubeMaterial = new THREE.MeshBasicMaterial({color: "white"});
const plane = new THREE.Mesh(planeGeometry, material);
const cube = new THREE.Mesh(geometry, material);
const knot = new THREE.Mesh(torusKnotGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.geometry = sphereGeometry
sphere.material = material



const cylinder = new THREE.Mesh(cylinderGeometry, material)
cylinder.geometry = cylinderGeometry
cylinder.material = material
//material


knot.position.x = 2;
sphere.position.x = 4;
cylinder.position.x = -2;
plane.position.y = 1.5;




scene.add(sphere, cylinder, cube, knot);
scene.add(plane)

//light

const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.set(2,2,0)
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  2000)


const aspectRatio = window.innerWidth / window.innerHeight

//const camera = new THREE.OrthographicCamera(
 // -1 * aspectRatio,
 // 1 * aspectRatio,
 // 1,
 // -1,
 // 0.1,
 // 200
//)

camera.position.z = 10;
camera.position.y = 5;

const canvas = document.querySelector('canvas.threejs')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio)

const controls = new OrbitControls( camera, canvas)
controls.enableDamping = true;
controls.autoRotate = false ;


window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})



const renderLoop = () => {
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh){
      child.rotation.y += 0.01;
    }
  })
  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop);
    
}

renderLoop()




scene.add(camera)


renderer.render(scene, camera)

