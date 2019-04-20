/* global THREE */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;

if (WEBGL.isWebGL2Available() === false) {
    document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    renderer = new THREE.WebGLRenderer();
} else {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    renderer = new THREE.WebGLRenderer({canvas: canvas, context: context});
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const tetrahedronGeometry = new THREE.TetrahedronGeometry(1, 0);
const octahedronGeometry = new THREE.OctahedronGeometry(0.5, 0);

// Materials
const basicGreenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
const basicRedMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const lambertGreenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true, opacity: 1});
const lambertRedMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 1});
const phongGreenMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, specular: 0xffffff, shininess: 300});
const phongRedMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0xffffff, shininess: 300});
const phongEmissiveGreenMaterial = new THREE.MeshPhongMaterial({
    color: 0x88ff00,
    emissive: 0x008800,
    specular: 0xffffff,
    shininess: 300
});
const phongEmissiveRedMaterial = new THREE.MeshPhongMaterial({
    color: 0xff8800,
    emissive: 0x880000,
    specular: 0xffffff,
    shininess: 300
});

// Objects
const lambertGreenCube = new THREE.Mesh(boxGeometry, lambertGreenMaterial);
const lambertRedCube = new THREE.Mesh(boxGeometry, lambertRedMaterial);
lambertGreenCube.position.x = 1;
lambertRedCube.position.x = -1;
scene.add(lambertGreenCube);
scene.add(lambertRedCube);

const phongGreenOctahedron = new THREE.Mesh(octahedronGeometry, phongGreenMaterial);
const phongRedOctahedron = new THREE.Mesh(octahedronGeometry, phongRedMaterial);
phongGreenOctahedron.position.x = 0.5;
phongRedOctahedron.position.x = -0.5;
scene.add(phongGreenOctahedron);
scene.add(phongRedOctahedron);

const phongEmissiveGreenTetrahedron = new THREE.Mesh(tetrahedronGeometry, phongEmissiveGreenMaterial);
const phongEmissiveRedTetrahedron = new THREE.Mesh(tetrahedronGeometry, phongEmissiveRedMaterial);
phongEmissiveGreenTetrahedron.position.x = 0.5;
phongEmissiveRedTetrahedron.position.x = -0.5;
scene.add(phongEmissiveGreenTetrahedron);
scene.add(phongEmissiveRedTetrahedron);

const basicGreenCube = new THREE.Mesh(boxGeometry, basicGreenMaterial);
const basicRedCube = new THREE.Mesh(boxGeometry, basicRedMaterial);
basicGreenCube.position.x = 0.75;
basicRedCube.position.x = -0.75;
scene.add(basicGreenCube);
scene.add(basicRedCube);

// Lights
const softAmbientLight = new THREE.AmbientLight(0x030303);
scene.add(softAmbientLight);
const directionalSunLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalSunLight);
const originPointLight = new THREE.PointLight(0xffffff, 1, 20);
originPointLight.position.set(0, 0, 0);
scene.add(originPointLight);
const rotatingPointLight = new THREE.PointLight(0xffffff, 0.6, 200);
rotatingPointLight.position.set(0, 0, 0);
scene.add(rotatingPointLight);
camera.position.z = 5;

// Loaders
const loader = new THREE.GLTFLoader();
loader.load('../gltf/skull_downloadable/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    const credits = gltf.asset.extras;
    const creditsString = `${credits.title} credits - Author: ${credits.author}, License :${credits.license}`;
    document.querySelector('.credits').innerText += creditsString;
}, undefined, function (error) {
    console.error(error);
});

function animate(t) {
    const tDivisor = 1000;

    lambertGreenCube.scale.x = Math.sin(t / tDivisor) + 1;
    lambertGreenCube.rotation.set(
        t / tDivisor / 0.5,
        t / tDivisor,
        t / tDivisor);
    lambertGreenCube.position.set(
        -Math.sin(t / tDivisor),
        -Math.cos(t / tDivisor),
        -Math.cos(t / tDivisor));

    lambertRedCube.scale.x = Math.cos(t / tDivisor) + 1;
    lambertRedCube.rotation.set(
        t / tDivisor / 0.5,
        t / tDivisor,
        t / tDivisor);
    lambertRedCube.position.set(
        Math.sin(t / tDivisor),
        Math.cos(t / tDivisor),
        Math.cos(t / tDivisor));

    phongGreenOctahedron.rotation.set(
        -t / tDivisor,
        -t / tDivisor,
        -t / tDivisor);
    phongGreenOctahedron.position.set(
        Math.sin(-t / tDivisor / 0.5) * 0.5,
        Math.sin(-t / tDivisor / 0.5) * 0.5,
        Math.cos(-t / tDivisor / 0.5) * 0.5);

    phongRedOctahedron.rotation.set(
        -t / tDivisor,
        -t / tDivisor,
        -t / tDivisor);
    phongRedOctahedron.position.set(
        -Math.sin(-t / tDivisor / 0.5) * 0.5,
        -Math.sin(-t / tDivisor / 0.5) * 0.5,
        -Math.cos(-t / tDivisor / 0.5) * 0.5);

    phongEmissiveGreenTetrahedron.rotation.set(
        -t / tDivisor / 0.2,
        t / tDivisor / 0.1,
        -t / tDivisor / 0.3);
    phongEmissiveGreenTetrahedron.position.set(
        -Math.sin(t / tDivisor / 0.5) * 3,
        -Math.sin(t / tDivisor / 0.5) * 3,
        -Math.cos(t / tDivisor / 0.5) * 3);

    phongEmissiveRedTetrahedron.rotation.set(
        t / tDivisor / 0.2,
        -t / tDivisor / 0.1,
        t / tDivisor / 0.3);
    phongEmissiveRedTetrahedron.position.set(
        -Math.sin(-t / tDivisor / 0.5) * 3,
        -Math.sin(-t / tDivisor / 0.5) * 3,
        Math.cos(-t / tDivisor / 0.5) * 3);


    basicGreenCube.scale.z = Math.sin(t / tDivisor) + 1;
    basicGreenCube.rotation.set(
        -t / tDivisor / 2,
        t / tDivisor / 2,
        t / tDivisor / 0.2);
    basicGreenCube.position.set(
        Math.sin(t / tDivisor / 2) * 2,
        Math.cos(t / tDivisor / 2) * 2,
        -Math.cos(t / tDivisor / 2) * 2);

    basicRedCube.scale.z = Math.cos(t / tDivisor) + 1;
    basicRedCube.rotation.set(
        t / tDivisor / 2,
        -t / tDivisor / 2,
        t / tDivisor / 0.2);
    basicRedCube.position.set(
        -Math.sin(t / tDivisor / 2) * 2,
        -Math.cos(t / tDivisor / 2) * 2,
        -Math.cos(t / tDivisor / 2) * 2);

    originPointLight.intensity = Math.sin(t / tDivisor / 0.2);
    rotatingPointLight.position.x = Math.sin(t / tDivisor / 5) * 5;
    rotatingPointLight.position.y = Math.cos(t / tDivisor / 5) * 5;
    rotatingPointLight.position.z = Math.sin(t / tDivisor / 5) * 5;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

if (WEBGL.isWebGLAvailable()) {
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}