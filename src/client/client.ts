import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene()
const cubelist = []
const axesHelp = new THREE.AxesHelper(4)



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)


//light list
const light = new THREE.AmbientLight()
light.position.z = 5
light.position.x = 10

const lightPoint = new THREE.PointLight(0xffffff, 1 , 100)
lightPoint.position.set(0,10,5)

camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

control.enableZoom = false
  

for(let i = 0; i<1000; i++){

    const geometry = new THREE.DodecahedronGeometry( Math.random()/4 + 0.1)
    const material = new THREE.MeshMatcapMaterial({
    color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    transparent : true,
    opacity : 0.4

})
    
  

var cube = new THREE.Mesh(geometry, material)

cube.position.x = Math.random() * 10 - 5
cube.position.y = Math.random() * 10 - 5
cube.position.z = Math.random() * 10 - 5
cube.receiveShadow = true;


scene.add(cube)
cubelist.push(cube)




}


window.addEventListener('resize', onWindowResize, false)


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)


    render()
}

function render() {
    renderer.render(scene, camera)
}


//scens add
scene.add(axesHelp)
scene.add(light)
scene.add(lightPoint)

animate()