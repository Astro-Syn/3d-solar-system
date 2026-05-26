import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Pane } from 'tweakpane';




const pane = new Pane();

const params = {
  color: '#00ff00',
  lightIntensity: 1
};

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


const scene = new THREE.Scene();

//create custom geometry

//const verticies = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0])

//const bufferAttribute = new THREE.BufferAttribute(verticies, 3)

//const geometry = new THREE.SphereGeometry(1, 16, 16);
//geometry.setAttribute('position', bufferAttribute)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const material  = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color('green');

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


scene.add(sphere, cylinder, cube, knot);


//light

const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.set(2,2,0)
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.5,
  400)


const aspectRatio = window.innerWidth / window.innerHeight

//const camera = new THREE.OrthographicCamera(
 // -1 * aspectRatio,
 // 1 * aspectRatio,
 // 1,
 // -1,
 // 0.1,
 // 200
//)

camera.position.z = 5

const canvas = document.querySelector('canvas.threejs')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio)

const controls = new OrbitControls( camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;


window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})



const renderLoop = () => {
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh){
      child.rotation.x += 0.01;
    }
  })
  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop);
    
}

renderLoop()




scene.add(camera)


renderer.render(scene, camera)

