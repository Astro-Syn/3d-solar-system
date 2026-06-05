import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane';
import { TextureLoader } from 'three';
import { texture } from 'three/tsl';

const pane = new Pane();


const scene = new THREE.Scene();

const params = {
  color: '#ffffff',
  lightIntensity: 1
};

//texture loader
const textureLoader = new THREE.TextureLoader();


//planets

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial(
  {
    color: 'yellow'
  }
)

const sun = new THREE.Mesh(sphereGeometry, sunMaterial)

sun.scale.setScalar(5);


const earthMaterial = new THREE.MeshBasicMaterial({
  color: 'green'
})

const earth = new THREE.Mesh(sphereGeometry, earthMaterial)

earth.position.x = 10;


scene.add(sun)

// const planets = [
//   {
//     name: 'Mercury',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: mercuryMaterial,
//     moons: [],
//   },
//   {
//     name: 'Venus',
//     radius: 0.8,
//     distance: 15,
//     speed: 0.007,
//     material: venusMaterial,
//     moons: [],
//   },
//   {
//     name: 'Earth',
//     radius: 1,
//     distance: 20,
//     speed: 0.005,
//     material: earthMaterial,
//     moons: [
//       {
//         name: 'Moon',
//         radius: 0.3,
//         distance: 3,
//         speed: 0.015,

//       }
//     ]
//   },
//   {
//     name: 'Mars',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: marsMaterial,
//     moons: [
//       {
//         name: "Phobos",
//         radius: 0.1,
//         distance: 2,
//         speed: 0.02,
//     },
//     {
//       name: "Deimos",
//       radius: 0.2,
//       distance: 3,
//       speed: 0.015,
//       color: 'orange',
//     }
//   ],
//   },
//   {
//     name: 'Jupiter',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: jupiterMaterial,
//     moons: [],
//   },
//   {
//     name: 'Saturn',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: saturnMaterial,
//     moons: [],
//   },
//   {
//     name: 'Uranus',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: uranusMaterial,
//     moons: [],
//   },
//   {
//     name: 'Neptune',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: neptuneMaterial,
//     moons: [],
//   },
//   {
//     name: 'Pluto',
//     radius: 0.5,
//     distance: 10,
//     speed: 0.01,
//     material: plutoMaterial,
//     moons: [],
//   },
// ]

scene.add(earth)



const moonMaterial = new THREE.MeshBasicMaterial({
  color: 'white'
})

const moon = new THREE.Mesh(sphereGeometry, moonMaterial)


moon.scale.setScalar(0.3);
moon.position.x = 2
earth.add(moon)


//pane controls


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
  1500)


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

//initialize a clock
const clock = new THREE.Clock()

const renderLoop = () => {


  //moon.position.x = Math.sin(elapsedTime) * 2

  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop);
    
}

renderLoop()




scene.add(camera)


renderer.render(scene, camera)

