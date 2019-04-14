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
const tetrahedronGeometry = new THREE.TetrahedronGeometry(1, 0);
const octahedronGeometry = new THREE.OctahedronGeometry(0.5, 0);

// Materials
const basicGreenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
const basicRedMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const lambertGreenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent :true, opacity: 1});
const lambertRedMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent :true, opacity: 1});
const phongGreenMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, specular: 0xffffff, shininess: 300});
const phongRedMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0xffffff, shininess: 300});
const phongEmissiveGreenMaterial = new THREE.MeshPhongMaterial({color: 0x88ff00, emissive: 0x008800, specular: 0xffffff, shininess: 300});
const phongEmissiveRedMaterial = new THREE.MeshPhongMaterial({color: 0xff8800, emissive: 0x880000, specular: 0xffffff, shininess: 300});
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

const phongGreenOctahedron = new THREE.Mesh(octahedronGeometry, phongGreenMaterial);
const phongRedOctahedron = new THREE.Mesh(octahedronGeometry, phongRedMaterial);
phongGreenOctahedron.position.x = 0.5;
phongRedOctahedron.position.x = -0.5;
scene.add( phongGreenOctahedron );
scene.add( phongRedOctahedron );

const phongEmissiveGreenTetrahedron = new THREE.Mesh(tetrahedronGeometry, phongEmissiveGreenMaterial);
const phongEmissiveRedTetrahedron = new THREE.Mesh(tetrahedronGeometry, phongEmissiveRedMaterial);
phongEmissiveGreenTetrahedron.position.x = 0.5;
phongEmissiveRedTetrahedron.position.x = -0.5;
scene.add( phongEmissiveGreenTetrahedron );
scene.add( phongEmissiveRedTetrahedron );

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
const rotatingPointLight = new THREE.PointLight(0xffffff, 0.6, 200);
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

    phongGreenOctahedron.rotation.x = -t/tDivisor;
    phongRedOctahedron.rotation.x = -t/tDivisor;
    phongGreenOctahedron.rotation.y = -t/tDivisor;
    phongRedOctahedron.rotation.y = -t/tDivisor;
    phongGreenOctahedron.rotation.z = -t/tDivisor;
    phongRedOctahedron.rotation.z = -t/tDivisor;
    phongGreenOctahedron.position.x = Math.sin(-t/tDivisor/0.5) * 0.5;
    phongRedOctahedron.position.x = -Math.sin(-t/tDivisor/0.5) * 0.5;
    phongGreenOctahedron.position.z = Math.sin(-t/tDivisor/0.5) * 0.5;
    phongRedOctahedron.position.z = -Math.sin(-t/tDivisor/0.5) * 0.5;
    phongGreenOctahedron.position.y = Math.cos(-t/tDivisor/0.5) * 0.5;
    phongRedOctahedron.position.y = -Math.cos(-t/tDivisor/0.5) * 0.5;

    phongEmissiveGreenTetrahedron.rotation.x = -t/tDivisor/0.2;
    phongEmissiveRedTetrahedron.rotation.x = t/tDivisor/0.2;
    phongEmissiveGreenTetrahedron.rotation.y = t/tDivisor/0.1;
    phongEmissiveRedTetrahedron.rotation.y = -t/tDivisor/0.1;
    phongEmissiveGreenTetrahedron.rotation.z = -t/tDivisor/0.3;
    phongEmissiveRedTetrahedron.rotation.z = t/tDivisor/0.3;
    phongEmissiveGreenTetrahedron.position.x = -Math.sin(t/tDivisor/0.5) * 3;
    phongEmissiveRedTetrahedron.position.x = -Math.sin(-t/tDivisor/0.5) * 3;
    phongEmissiveGreenTetrahedron.position.z = -Math.sin(t/tDivisor/0.5) * 3;
    phongEmissiveRedTetrahedron.position.z = -Math.sin(-t/tDivisor/0.5) * 3;
    phongEmissiveGreenTetrahedron.position.y = -Math.cos(t/tDivisor/0.5) * 3;
    phongEmissiveRedTetrahedron.position.y = Math.cos(-t/tDivisor/0.5) * 3;


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

    originPointLight.intensity = Math.sin(t/tDivisor/0.2);
    rotatingPointLight.position.x = Math.sin(t/tDivisor/5) * 5;
    rotatingPointLight.position.y = Math.cos(t/tDivisor/5) * 5;
    rotatingPointLight.position.z = Math.sin(t/tDivisor/5) * 5;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
if ( WEBGL.isWebGLAvailable() ) {
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}