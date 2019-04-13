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
const basicMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const customMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vs').textContent.trim(),
    fragmentShader: document.getElementById('fs').textContent.trim()
});
console.log(customMaterial);
const cube1 = new THREE.Mesh(geometry, basicMaterial);
const cube2 = new THREE.Mesh(geometry, customMaterial);
cube1.position.x = 1;
cube2.position.x = -1;
scene.add( cube1 );
scene.add( cube2 );

camera.position.z = 5;

function animate(t) {
    const tDivisor = 1000;

    cube1.rotation.x = t/tDivisor;
    cube2.rotation.x = t/tDivisor;
    cube1.rotation.y = t/tDivisor;
    cube2.rotation.y = t/tDivisor;
    cube1.position.x = Math.sin(t/tDivisor);
    cube2.position.x = -Math.sin(t/tDivisor);
    cube1.position.y = Math.cos(t/tDivisor);
    cube2.position.y = -Math.cos(t/tDivisor);
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
}
if ( WEBGL.isWebGLAvailable() ) {
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}