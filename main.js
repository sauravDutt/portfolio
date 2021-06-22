import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ccff, wireframe: true});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader({color: 0x1f1f1f});
scene.background = spaceTexture;


// Moon

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 30),
  new THREE.MeshStandardMaterial({
    color: 0x6e3793,
    wireframe: true,
  })
);

scene.add(moon);

moon.position.z = 10;
moon.position.setY(-10);

// Another Shape
const shapeone = new THREE.Mesh(
  new THREE.IcosahedronGeometry(7, 5),
  new THREE.MeshStandardMaterial({
    color: 0x00ccff,
    wireframe: true,
  })
);



scene.add(shapeone);
shapeone.position.z = 30;
shapeone.position.setX(-10);

// //Another Shape
// const shapetwo = new THREE.Mesh (
//   new THREE.SphereGeometry(6,32, 32),
//   new THREE.MeshStandardMaterial({
//     color: 0x8400ff,
//     wireframe: true,
//   })
// );

// scene.add(shapetwo);
// shapetwo.position.z = 17;
// shapetwo.position.setY(9);
// shapetwo.position.setX(-6);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  
  moon.rotation.x += 0.005;

  shapeone.rotation.x += 0.005;
  shapeone.rotation.y += 0.005;
  shapeone.rotation.z += 0.01;

  
  // controls.update();

  renderer.render(scene, camera);
}

animate();
