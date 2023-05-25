import * as THREE from "three";
import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "./examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "./examples/jsm/geometries/TextGeometry.js";
// let's add some more maybe later
var scene, camera, renderer, txt_minezraft, sun_var;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var switcher = true;
var sunObj = new THREE.Object3D();
var moonObj = new THREE.Object3D();

function createLoader() {
  const loader = new THREE.TextureLoader();
  return loader;
}

function plane() {
  let geometry = new THREE.PlaneGeometry(200, 200);
  const texture = createLoader().load("./assets/texture/grass.jpg");

  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    side: THREE.DoubleSide,
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.rotation.x = Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function pointLight() {
  const pointLight = new THREE.PointLight(0xffffff, 0.9, 1000);
  pointLight.position.set(-30, 50, 70);
  pointLight.castShadow = true;
  scene.add(pointLight);
}

function spotLight() {
  const spotLight = new THREE.SpotLight(0xfad5a5, 1, 1000);
  spotLight.position.set(-50, 50, 160);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function steve() {
  const loader = new GLTFLoader();
  loader.load(
    // resource URL
    "assets/model/scene.gltf",
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          node.position.set(0, 0, 16);
        }
      });
      scene.add(gltf.scene);
    }
  );
}

function text_minezraft() {
  const loader = new FontLoader();

  loader.load(
    "./examples/fonts/droid/droid_sans_bold.typeface.json",
    function (font) {
      const geometry = new TextGeometry("MineZraft", {
        font: font,
        size: 8,
        height: 0,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0,
      });
      var txt_mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      txt_minezraft = new THREE.Mesh(geometry, txt_mat);
      txt_minezraft.position.set(0, 140, -140);
      txt_minezraft.receiveShadow = true;
      txt_minezraft.castShadow = true;
      txt_minezraft.name = "txt_minezraft";
      scene.add(txt_minezraft);
    }
  );
}

function creeper() {
  const texture = createLoader().load("./assets/texture/creeperBody.jpg");

  creeper_head(texture);
  creeper_left_eyes();
  creeper_right_eyes();
  creeper_body(texture);
  creeper_foreleg(texture);
  creeper_hindleg(texture);
}

function creeper_head(texture) {
  let geometry = new THREE.BoxGeometry(12, 10, 15);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(66, 32, -60);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function creeper_left_eyes() {
  let geometry = new THREE.PlaneGeometry(2.5, 2.5);
  let material = new THREE.MeshPhongMaterial({
    color: "#000000",
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(58, 33, -56);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function creeper_right_eyes() {
  let geometry = new THREE.PlaneGeometry(2.5, 2.5);
  let material = new THREE.MeshPhongMaterial({
    color: "#000000",
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(63, 33, -52);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function creeper_body(texture) {
  let geometry = new THREE.BoxGeometry(10, 18, 8);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(66, 18, -60);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function creeper_foreleg(texture) {
  let geometry = new THREE.BoxGeometry(12, 9, 5);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(63, 5, -57);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function creeper_hindleg(texture) {
  let geometry = new THREE.BoxGeometry(12, 9, 5);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(68, 5, -64);
  mesh.rotation.y = -7;
  mesh.receiveShadow = true;

  scene.add(mesh);
}

function trunk_leaves() {
  const texture_trunk = createLoader().load("./assets/texture/trunk.jpg");
  const texture_leaves = createLoader().load("./assets/texture/leaves1.jpg");
  let level_new = 0;
  let stop_count = 4;

  for (let level = 0; level < stop_count; level++) {
    let y = 8 + 15 * level;
    level_new = level + 1;

    let trunk_1 = tress(-60, y, -55, texture_trunk); //trunk level 1
    scene.add(trunk_1);
    if (level < stop_count - 1) {
      let trunk_2 = tress(50, y, 55, texture_trunk); //trunk level 2
      scene.add(trunk_2);
    }
  }
  leaves_1(level_new, texture_leaves, stop_count, -60, -55);
  leaves_2(level_new - 1, texture_leaves, stop_count - 1, 50, 55);
}

function leaves_1(level_new, texture_leaves, stop_count, x_params, y_params) {
  const group_leaves1 = new THREE.Group();
  const group_leaves_lv1 = new THREE.Group();
  const group_leaves_lv2 = new THREE.Group();
  const group_leaves_lv3 = new THREE.Group();
  let stop_x_box,
    stop_z_box = 0;

  for (let level2 = level_new; level2 < level_new + stop_count; level2++) {
    let y = 8 + 15 * level2;
    if (level2 < 6) {
      stop_x_box = 0;
      stop_z_box = 5;
    } else if (level2 >= 6 && level2 < 7) {
      stop_x_box = -30;
      stop_z_box = -25;
    } else {
      stop_x_box = x_params;
      stop_z_box = y_params;
    }

    for (let x_box = x_params; x_box <= stop_x_box; x_box += 15) {
      let leaves1 = tress(x_box, y, y_params, texture_leaves);
      if (level2 < 6) {
        group_leaves_lv1.add(leaves1);
      } else if (level2 >= 6 && level2 < 7) {
        group_leaves_lv2.add(leaves1);
      } else {
        group_leaves_lv3.add(leaves1);
      }
      for (let z_box = y_params; z_box <= stop_z_box; z_box += 15) {
        let leaves2 = tress(x_box, y, z_box, texture_leaves);
        if (level2 < 6) {
          group_leaves_lv1.add(leaves2);
        } else if (level2 >= 6 && level2 < 7) {
          group_leaves_lv2.add(leaves2);
        } else {
          group_leaves_lv3.add(leaves2);
        }
      }
    }
  }

  group_leaves_lv1.position.set(-30, 0, -30);
  group_leaves_lv2.position.set(-15, 0, -15);
  group_leaves1.add(group_leaves_lv1);
  group_leaves1.add(group_leaves_lv2);
  group_leaves1.add(group_leaves_lv3);
  scene.add(group_leaves1);
}

function leaves_2(level_new, texture_leaves, stop_count, x_params, y_params) {
  const group_leaves1 = new THREE.Group();
  const group_leaves_lv1 = new THREE.Group();
  const group_leaves_lv2 = new THREE.Group();

  let stop_x_box,
    stop_z_box = 0;
  let sum_lvl_stop = level_new + stop_count;
  for (let level2 = level_new; level2 < sum_lvl_stop; level2++) {
    let y = 8 + 15 * level2;
    if (level2 < sum_lvl_stop - 1) {
      stop_x_box = x_params - 15;
      stop_z_box = y_params - 15;
    } else {
      stop_x_box = 15;
      stop_z_box = 15;
    }

    for (let x_box = 0; x_box < stop_x_box; x_box += 15) {
      let leaves1 = tress(x_box, y, x_box, texture_leaves);
      if (level2 < sum_lvl_stop - 1) {
        group_leaves_lv1.add(leaves1);
      } else {
        group_leaves_lv2.add(leaves1);
      }
      for (let z_box = 0; z_box < stop_z_box; z_box += 15) {
        let leaves2 = tress(x_box, y, z_box, texture_leaves);
        if (level2 < sum_lvl_stop - 1) {
          group_leaves_lv1.add(leaves2);
        } else {
          group_leaves_lv2.add(leaves2);
        }
      }
    }
  }

  group_leaves_lv1.position.set(x_params - 15, 0, y_params - 15);
  group_leaves_lv2.position.set(x_params, 0, y_params);
  group_leaves1.add(group_leaves_lv1);
  group_leaves1.add(group_leaves_lv2);
  scene.add(group_leaves1);
}

function tress(x, y, z, texture) {
  let geometry = new THREE.BoxGeometry(15, 15, 15);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
    map: texture,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  return mesh;
}

function skybox_day() {
  var path = "./assets/skybox/skyboxDay/";
  var format = ".png";

  var urls = [
    path + "px" + format,
    path + "nx" + format,
    path + "py" + format,
    path + "ny" + format,
    path + "pz" + format,
    path + "nz" + format,
  ];

  const materialArray = urls.map((image) => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  let skyboxGeo = new THREE.BoxGeometry(1200, 1200, 1200);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
  sun();
}

function skybox_night() {
  var path = "./assets/skybox/skyboxNight/";
  var format = ".png";

  var urls = [
    path + "px" + format,
    path + "nx" + format,
    path + "py" + format,
    path + "ny" + format,
    path + "pz" + format,
    path + "nz" + format,
  ];

  const materialArray = urls.map((image) => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  let skyboxGeo = new THREE.BoxGeometry(1200, 1200, 1200);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
  moon();
}

function sun() {
  const texture = createLoader().load("./assets/texture/sun.jpg");

  const geometry = new THREE.SphereGeometry(15, 64, 64);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffd500,
    map: texture,
  });
  sun_var = new THREE.Mesh(geometry, material);
  sun_var.position.set(140, 280, -600);

  sunObj.add(sun_var);
  scene.add(sunObj);
}

function moon() {
  const texture = createLoader().load("./assets/texture/moon.jpg");

  const geometry = new THREE.SphereGeometry(15, 64, 64);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(140, 280, -600);
  sphere.receiveShadow = false;

  moonObj.add(sphere);
  scene.add(moonObj);
}

function init() {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 220);

  scene.background = null;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);

  document.body.appendChild(renderer.domElement);

  plane();
  pointLight();
  spotLight();
  steve();
  text_minezraft();
  creeper();
  trunk_leaves();
  skybox_day();

  window.addEventListener("resize", resize, false);
  window.addEventListener("click", onMouseClick, false);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("keydown", onDocumentKeyDown, false);
}

function animate() {
  if (switcher == true) {
    sunObj.rotateY(0.004);
  } else {
    moonObj.rotateY(0.004);
  }
}

function render() {
  window.requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects[0].object.name == "txt_minezraft") {
    switcher == true ? skybox_night() : skybox_day();
    switcher = !switcher;

    if (switcher == true) {
      scene.remove(moonObj)
    } else {
      scene.remove(sunObj)
    }
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[0].object.name == "txt_minezraft") {
      intersects[0].object.material.color.set(0x45b6fe);
    }
  }
  renderer.render(scene, camera);
}

function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 32) { //spaceBar
    renderer.setAnimationLoop(animate);
  }
  render();
}

window.onload = function () {
  init();
  render();
};
