import * as THREE from "three";
import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "./examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "./examples/jsm/geometries/TextGeometry.js";

var scene, camera, renderer, font;

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

function box() {
  let geometry = new THREE.BoxGeometry(10, 10, 10);
  let material = new THREE.MeshPhongMaterial({
    color: "#ffffff",
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 20;
  mesh.castShadow = true;
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
      var txt_mesh = new THREE.Mesh(geometry, txt_mat);
      txt_mesh.position.set(0, 140, -140);
      txt_mesh.receiveShadow = true;
      txt_mesh.castShadow = true;
      scene.add(txt_mesh);
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
  leaves_2(level_new, texture_leaves, stop_count - 1, 50, 55);
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
  const group_leaves_lv3 = new THREE.Group();
  let stop_x_box,
    stop_z_box = 0;

  for (let level2 = level_new; level2 < level_new + stop_count; level2++) {
    let y = 8 + 15 * level2;
    if (level2 <= (level_new + stop_count)) {
      stop_x_box = 50;
      stop_z_box = 5;
      // } else if (level2 >= 6 && level2 < 7) {
      //   stop_x_box = -30;
      //   stop_z_box = -25;
      // } else {
      //   stop_x_box = x_params;
      //   stop_z_box = y_params;
    }
    
    for (let x_box = 0; x_box <= stop_x_box; x_box += 15) {
      let leaves1 = tress(x_box, y, y_params, texture_leaves);
      
      if (level2 <= level_new + stop_count) {
        
        group_leaves_lv1.add(leaves1);
        // } else if (level2 >= 6 && level2 < 7) {
        //   group_leaves_lv2.add(leaves1);
        // } else {
        //   group_leaves_lv3.add(leaves1);
      }
      for (let z_box = y_params; z_box <= stop_z_box; z_box -= 15) {
        let leaves2 = tress(x_box, y, z_box, texture_leaves);
        if (level2 <= level_new + stop_count) {
          group_leaves_lv1.add(leaves2);
          // } else if (level2 >= 6 && level2 < 7) {
          //   group_leaves_lv2.add(leaves2);
          // } else {
          //   group_leaves_lv3.add(leaves2);
        }
      }
    }
  }

  group_leaves_lv1.position.set(-30, 0, -30);
  // group_leaves_lv2.position.set(-15, 0, -15);
  // group_leaves1.add(group_leaves_lv1);
  // group_leaves1.add(group_leaves_lv2);
  // group_leaves1.add(group_leaves_lv3);
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

function init() {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 220);
  // camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#87CEEB"); //sky
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);

  document.body.appendChild(renderer.domElement);

  plane();
  pointLight();
  spotLight();
  // steve();
  text_minezraft();
  creeper();
  trunk_leaves();
  window.addEventListener("resize", resize, false);
}
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = function () {
  init();
  render();
};
