import * as THREE from "three";
import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";

var scene, camera, renderer, box;

init();

function init() {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 220);
  // camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.target = new THREE.Vector3(0, 0, 0); //focus

  createGround();
  // pointLight();
  // spotLight();
  // steve();

  window.addEventListener("resize", resize, false);

  update();
}
function update() {
  requestAnimationFrame(update);

  // box.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function pointLight() {
  const light = new THREE.PointLight(0xffffff, 0.9, 1000);
  light.position.set(-30, 50, 70);
  light.castShadow = true;
  scene.add(light);
}

function spotLight() {
  const spotLight = new THREE.SpotLight(0xfad5a5, 1, 1000);
  spotLight.position.set(-50, 50, 160);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function createGround() {
  const geometry = new THREE.PlaneGeometry(200, 200);
  // geometry.rotateX(-Math.PI * 0.5);
  const texture_map_ground = new THREE.TextureLoader().load(
    "assets/texture/grass.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture_map_ground,
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  // plane.position.set(0, 0, 0);
  plane.receiveShadow = true;
  scene.add(plane);
}

function steve() {
  const loader = new GLTFLoader();

  loader.load(
    "assets/model/scene.gltf",
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
