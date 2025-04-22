const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);


const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);


const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 3.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

camera.position.z = 5;


let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };


const colorCombinations = [
  0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
  0x800000, 0x008000, 0x000080, 0x808000, 0x800080, 0x008080,
  0x000000, 0x333333, 0x666666, 0x999999, 0xcccccc, 0xffffff,
  0x990000, 0x009900
];


function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorCombinations.length);
  return colorCombinations[randomIndex];
}


function checkIntersection(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.updateMatrixWorld();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(torusKnot);
  if (intersects.length > 0) {

    torusKnot.material.color.setHex(getRandomColor());
  }
}


window.addEventListener('click', checkIntersection);


function onMouseDown(event) {
  isDragging = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
  if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

  
    torusKnot.position.x += deltaX * 0.01;
    torusKnot.position.y -= deltaY * 0.01;

  
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
}

function onMouseUp() {
  isDragging = false;
}


window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);


const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

 
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.015;


  controls.update();

  renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
});
