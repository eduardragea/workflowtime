import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161/build/three.module.js";
import { MarchingCubes } from "./MarchingCubes.js";
import getLayer from "./getLayer.js";
import { getBody } from "./getBody.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';


const container = document.getElementById("threejs-container");
const w = container.clientWidth;
const h = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

let mousePos = new THREE.Vector2();
const textureLoader = new THREE.TextureLoader();

// Initialize RAPIER physics engine
await RAPIER.init();
let gravity = { x: 0, y: 0, z: 0 };
let world = new RAPIER.World(gravity);

const numBodies = 20;
const bodies = [];
const debugBodies = false;
for (let i = 0; i < numBodies; i++) {
    const body = getBody({ debug: debugBodies, RAPIER, world });
    bodies.push(body);
    if (debugBodies) {
        scene.add(body.mesh);
    }
}

// MOUSE RIGID BODY
const matcap = textureLoader.load("{% static 'assets/black-n-shiney.jpg' %}");
let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 0);
let mouseRigid = world.createRigidBody(bodyDesc);
let dynamicCollider = RAPIER.ColliderDesc.ball(0.5);
world.createCollider(dynamicCollider, mouseRigid);

const geometry = new THREE.IcosahedronGeometry(0.35, 3);
const material = new THREE.MeshMatcapMaterial({ matcap });
const mouseMesh = new THREE.Mesh(geometry, material);
mouseMesh.userData = {
    update() {
        mouseRigid.setTranslation({ x: mousePos.x * 4, y: mousePos.y * 4, z: 0 });
        let { x, y, z } = mouseRigid.translation();
        mouseMesh.position.set(x, y, z);
    }
};
scene.add(mouseMesh);

// METABALLS
const metaMat = new THREE.MeshMatcapMaterial({ matcap, vertexColors: true });
const metaballs = new MarchingCubes(96, metaMat, true, true, 90000);
metaballs.scale.setScalar(5);
metaballs.isolation = 1000;
metaballs.userData = {
    update() {
        metaballs.reset();
        const strength = 0.5;
        const subtract = 10;
        bodies.forEach((b) => {
            const { x, y, z } = b.update();
            metaballs.addBall(x, y, z, strength, subtract, b.color.getHex());
        });
        metaballs.update();
    }
};
scene.add(metaballs);

const gradientBackground = getLayer({
    hue: 0.6,
    numSprites: 8,
    opacity: 0.2,
    radius: 10,
    size: 24,
    z: -10.5,
});
scene.add(gradientBackground);

function animate() {
    requestAnimationFrame(animate);
    world.step();
    mouseMesh.userData.update();
    metaballs.userData.update();
    renderer.render(scene, camera);
}
animate();

// Handle resizing
function handleWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener('resize', handleWindowResize, false);

// Handle mouse movement
function handleMouseMove(evt) {
    const rect = container.getBoundingClientRect();
    mousePos.x = ((evt.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mousePos.y = -((evt.clientY - rect.top) / container.clientHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);
