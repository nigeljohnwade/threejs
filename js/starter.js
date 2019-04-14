/* global THREE */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;

if ( WEBGL.isWebGL2Available() === false ) {
    document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
    renderer = new THREE.WebGLRenderer();
}else{
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Materials
const basicGreenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
const basicRedMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const lambertGreenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent :true, opacity: 1});
const lambertRedMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent :true, opacity: 1});
const phongGreenMaterial = new THREE.MeshPhongMaterial({color: 0x88ff00, emissive: 0x008800, specular: 0xffffff, shininess: 300});
const phongRedMaterial = new THREE.MeshPhongMaterial({color: 0xff8800, emissive: 0x880000, specular: 0xffffff, shininess: 300});
const customGLMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vs').textContent.trim(),
    fragmentShader: document.getElementById('fs').textContent.trim()
});

// Objects
const lambertGreenCube = new THREE.Mesh(boxGeometry, lambertGreenMaterial);
const lambertRedCube = new THREE.Mesh(boxGeometry, lambertRedMaterial);
lambertGreenCube.position.x = 1;
lambertRedCube.position.x = -1;
scene.add( lambertGreenCube );
scene.add( lambertRedCube );

const phongGreenCube = new THREE.Mesh(boxGeometry, phongGreenMaterial);
const phongRedCube = new THREE.Mesh(boxGeometry, phongRedMaterial);
phongGreenCube.position.x = 0.5;
phongRedCube.position.x = -0.5;
scene.add( phongGreenCube );
scene.add( phongRedCube );

const basicGreenCube = new THREE.Mesh(boxGeometry, basicGreenMaterial);
const basicRedCube = new THREE.Mesh(boxGeometry, basicRedMaterial);
basicGreenCube.position.x = 0.75;
basicRedCube.position.x = -0.75;
scene.add( basicGreenCube );
scene.add( basicRedCube );

const customBlueSphere = new THREE.Mesh(sphereGeometry, customGLMaterial);
// scene.add( customBlueSphere );

// Lights
const softAmbientLight = new THREE.AmbientLight(0x030303);
scene.add(softAmbientLight);
const directionalSunLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalSunLight);
const originPointLight = new THREE.PointLight(0xffffff, 1, 20);
originPointLight.position.set( 0, 0, 0);
scene.add( originPointLight );
const rotatingPointLight = new THREE.PointLight(0xffff00, 0.6, 200);
rotatingPointLight.position.set( 0, 0, 0);
scene.add( rotatingPointLight );
camera.position.z = 5;

function animate(t) {
    const tDivisor = 1000;

    lambertGreenCube.scale.x = Math.sin(t/tDivisor) +1;
    lambertRedCube.scale.x = Math.cos(t/tDivisor) +1;
    lambertGreenCube.rotation.x = t/tDivisor/0.5;
    lambertRedCube.rotation.x = t/tDivisor/0.5;
    lambertGreenCube.rotation.y = t/tDivisor;
    lambertRedCube.rotation.y = t/tDivisor;
    lambertGreenCube.rotation.z = t/tDivisor;
    lambertRedCube.rotation.z = t/tDivisor;
    lambertGreenCube.position.x = -Math.sin(t/tDivisor);
    lambertRedCube.position.x = Math.sin(t/tDivisor);
    lambertGreenCube.position.y = -Math.cos(t/tDivisor);
    lambertRedCube.position.y = Math.cos(t/tDivisor);
    lambertGreenCube.position.z = -Math.cos(t/tDivisor);
    lambertRedCube.position.z = Math.cos(t/tDivisor);

    phongGreenCube.scale.y = Math.sin(t/tDivisor) +1;
    phongRedCube.scale.y = Math.cos(t/tDivisor) +1;
    phongGreenCube.rotation.x = -t/tDivisor;
    phongRedCube.rotation.x = -t/tDivisor;
    phongGreenCube.rotation.y = -t/tDivisor;
    phongRedCube.rotation.y = -t/tDivisor;
    phongGreenCube.rotation.z = -t/tDivisor;
    phongRedCube.rotation.z = -t/tDivisor;
    phongGreenCube.position.x = Math.sin(-t/tDivisor/0.5) * 0.5;
    phongRedCube.position.x = -Math.sin(-t/tDivisor/0.5) * 0.5;
    phongGreenCube.position.z = Math.sin(-t/tDivisor/0.5) * 0.5;
    phongRedCube.position.z = -Math.sin(-t/tDivisor/0.5) * 0.5;
    phongGreenCube.position.y = Math.cos(-t/tDivisor/0.5) * 0.5;
    phongRedCube.position.y = -Math.cos(-t/tDivisor/0.5) * 0.5;


    basicGreenCube.scale.z = Math.sin(t/tDivisor) +1;
    basicRedCube.scale.z = Math.cos(t/tDivisor) +1;
    basicGreenCube.rotation.x = -t/tDivisor/2;
    basicRedCube.rotation.x = t/tDivisor/2;
    basicGreenCube.rotation.y = t/tDivisor/2;
    basicRedCube.rotation.y = -t/tDivisor/2;
    basicGreenCube.rotation.z = t/tDivisor/0.2;
    basicRedCube.rotation.z = t/tDivisor/0.2;
    basicGreenCube.position.x = Math.sin(t/tDivisor/2) * 2;
    basicRedCube.position.x = -Math.sin(t/tDivisor/2) * 2;
    basicGreenCube.position.y = Math.cos(t/tDivisor/2) * 2;
    basicRedCube.position.y = -Math.cos(t/tDivisor/2) * 2;
    basicGreenCube.position.z = -Math.cos(t/tDivisor/2) * 2;
    basicRedCube.position.z = -Math.cos(t/tDivisor/2) * 2;

    customBlueSphere.scale.x = Math.sin(t/tDivisor/4);
    customBlueSphere.scale.y = Math.sin(t/tDivisor/4);
    customBlueSphere.scale.z = Math.sin(t/tDivisor/4);
    renderer.render( scene, camera );

    originPointLight.intensity = Math.sin(t/tDivisor/0.2);
    rotatingPointLight.position.x = Math.sin(t/tDivisor/5) * 5;
    rotatingPointLight.position.y = Math.cos(t/tDivisor/5) * 5;
    rotatingPointLight.position.z = Math.sin(t/tDivisor/5) * 5;
    requestAnimationFrame( animate );
}
if ( WEBGL.isWebGLAvailable() ) {
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}