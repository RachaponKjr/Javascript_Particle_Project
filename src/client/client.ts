import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const cubelist: THREE.Object3D<THREE.Event>[] | THREE.Mesh<THREE.DodecahedronGeometry, THREE.MeshMatcapMaterial>[] = []
const axesHelp = new THREE.AxesHelper(4)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

//raycaster,pointer


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
  

for(let i = 0; i<300; i++){

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

cube.rotation.x = Math.random() * 2 * Math.PI
cube.rotation.y = Math.random() * 2 * Math.PI
cube.rotation.z = Math.random() * 2 * Math.PI
cube.receiveShadow = true;


scene.add(cube)
cubelist.push(cube)
}

function onPointerMove (  event: any ){
    pointer.x = (event.clientX / window.innerWidth) * 2 -1;
    pointer.y = -(event.clientY / window.innerWidth) * 2 +1;
}




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
    raycaster.setFromCamera( pointer,camera )
    const intersectes = raycaster.intersectObjects( scene.children )
    
    for( let i = 0; i < intersectes.length; i++){
        intersectes[i].object
    }

    renderer.render(scene, camera)

}
console.log(scene.children)


//scens add
scene.add(axesHelp)
scene.add(light)
scene.add(lightPoint)


window.addEventListener( 'pointermove', onPointerMove)
window.addEventListener('resize', onWindowResize, false)
animate()