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

const sunTexture = textureLoader.load(
  '/Images/sun-texture.jpg'
)
const venusTexture = textureLoader.load('/Images/venus-texture.jpg')
const mercuryTexture = textureLoader.load('/Images/mercury-texture.jpg')
const earthTexture = textureLoader.load('/Images/earth-texture.jpg')
const marsTexture = textureLoader.load('/Images/mars-texture.webp')
const jupiterTexture = textureLoader.load('/Images/jupiter-texture.jpg')
const saturnTexture = textureLoader.load('/Images/saturn-texture.jpg')
const saturnRingTexture = textureLoader.load('/Images/saturn-ring-texture.png')
const uranusTexture = textureLoader.load('/Images/uranus-texture.jpg')
const neptuneTexture = textureLoader.load('/Images/neptune-texture.jpg')
const plutoTexture = textureLoader.load('/Images/pluto-texture.png')
const moonTexture = textureLoader.load('/Images/moon-texture1.jpg')


//planets

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial(
  {
    map: sunTexture
  }
)

const sun = new THREE.Mesh(sphereGeometry, sunMaterial)

sun.scale.setScalar(5);

const mercuryMaterial = new THREE.MeshStandardMaterial(
  {
    map: mercuryTexture
  }
)

const mercury = new THREE.Mesh(sphereGeometry, mercuryMaterial)


const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture
})

const venus = new THREE.Mesh(sphereGeometry, venusMaterial)


const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
})

const earth = new THREE.Mesh(sphereGeometry, earthMaterial)



const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture
})

const mars = new THREE.Mesh(sphereGeometry, marsMaterial)



const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture
})

const jupiter = new THREE.Mesh(sphereGeometry, jupiterMaterial)


const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture
}) 
const saturn  = new THREE.Mesh(sphereGeometry, saturnMaterial)


const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture
}) 
const uranus = new THREE.Mesh(sphereGeometry, uranusMaterial)


const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture
})

const neptune = new THREE.Mesh(sphereGeometry, neptuneMaterial) 


const plutoMaterial = new THREE.MeshStandardMaterial({
  map: plutoTexture
})
const pluto = new THREE.Mesh(sphereGeometry, plutoMaterial) 



scene.add(sun)




const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,

      }
    ]
  },
  {
    name: 'Mars',
    radius: 1.5,
    distance: 20,
    speed: 0.01,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
    },
    {
      name: "Deimos",
      radius: 0.2,
      distance: 3,
      speed: 0.015,
      color: 'orange',
    }
  ],
  },
  {
    name: 'Jupiter',
    radius: 3,
    distance: 25,
    speed: 0.01,
    material: jupiterMaterial,
    moons: [],
  },
  {
    name: 'Saturn',
    radius: 1.5,
    distance: 30,
    speed: 0.01,
    material: saturnMaterial,
    moons: [],
  },
  {
    name: 'Uranus',
    radius: 1.2,
    distance: 35,
    speed: 0.01,
    material: uranusMaterial,
    moons: [],
  },
  {
    name: 'Neptune',
    radius: 1.2,
    distance: 40,
    speed: 0.01,
    material: neptuneMaterial,
    moons: [],
  },
  {
    name: 'Pluto',
    radius: 0.4,
    distance: 45,
    speed: 0.01,
    material: plutoMaterial,
    moons: [],
  },
]



const moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture
})

const moon = new THREE.Mesh(sphereGeometry, moonMaterial)


moon.scale.setScalar(0.3);
moon.position.x = 2
earth.add(moon)



//pane controls


//planet loop

const planetMeshes = planets.map((planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material)
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  scene.add(planetMesh)
})


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

