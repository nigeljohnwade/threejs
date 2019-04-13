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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const basicGreenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const basicRedMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const lambertGreenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
const lambertRedMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
// const customMaterial = new THREE.ShaderMaterial({
//     vertexShader: document.getElementById('vs').textContent.trim(),
//     fragmentShader: document.getElementById('fs').textContent.trim()
// });
const lambertGreenCube = new THREE.Mesh(geometry, lambertGreenMaterial);
const lambertRedCube = new THREE.Mesh(geometry, lambertRedMaterial);
lambertGreenCube.position.x = 1;
lambertRedCube.position.x = -1;
scene.add( lambertGreenCube );
scene.add( lambertRedCube );

const basicGreenCube = new THREE.Mesh(geometry, basicGreenMaterial);
const basicRedCube = new THREE.Mesh(geometry, basicRedMaterial);
basicGreenCube.position.x = 0.75;
basicRedCube.position.x = -0.75;
scene.add( basicGreenCube );
scene.add( basicRedCube );

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set( 5, 5, 5 );
scene.add( light );

camera.position.z = 5;

function animate(t) {
    const tDivisor = 1000;

    lambertGreenCube.rotation.x = t/tDivisor;
    lambertRedCube.rotation.x = t/tDivisor;
    lambertGreenCube.rotation.y = t/tDivisor;
    lambertRedCube.rotation.y = t/tDivisor;
    lambertGreenCube.position.x = Math.sin(t/tDivisor);
    lambertRedCube.position.x = -Math.sin(t/tDivisor);
    lambertGreenCube.position.y = Math.cos(t/tDivisor);
    lambertRedCube.position.y = -Math.cos(t/tDivisor);

    basicGreenCube.rotation.x = t/tDivisor/2;
    basicRedCube.rotation.x = t/tDivisor/2;
    basicGreenCube.rotation.y = t/tDivisor/2;
    basicRedCube.rotation.y = t/tDivisor/2;
    basicGreenCube.position.x = Math.sin(t/tDivisor/2) * 2;
    basicRedCube.position.x = -Math.sin(t/tDivisor/2) * 2;
    basicGreenCube.position.y = Math.cos(t/tDivisor/2) * 2;
    basicRedCube.position.y = -Math.cos(t/tDivisor/2) * 2;
    
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
}
if ( WEBGL.isWebGLAvailable() ) {
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}