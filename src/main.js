import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'



const scene = new THREE.Scene();

//create custom geometry

//const verticies = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0])

//const bufferAttribute = new THREE.BufferAttribute(verticies, 3)

//const geometry = new THREE.SphereGeometry(1, 16, 16);
//geometry.setAttribute('position', bufferAttribute)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)

//const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "green", wireframe: true});
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

scene.add(cubeMesh)




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
  controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop);
    
}

renderLoop()




scene.add(camera)


renderer.render(scene, camera)

