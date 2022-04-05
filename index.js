const rootDiv = document.getElementById("root");
const meshName = 'mesh'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
const renderer = new THREE.WebGLRenderer();
const render = () => renderer.render(scene, camera);
const controls = new THREE.OrbitControls(camera, rootDiv);

const isMobile = window.innerWidth < 768;
const initialSphereGeometry = createSphereGeometry(isMobile ? 4 : 5, isMobile ? 4000 : 8192);
const initialCubeGeometry = createCubeGeometry(isMobile ? 4 : 6 ,isMobile ? 4000 : 8664);
let currentGeometry = 'sphere';

const initialCamera = () => {
  camera.position.z = 6;
  camera.position.x = 10;
  camera.position.y = 4;
  camera.lookAt(0, 0, 0);
};

const initialScene = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  rootDiv.appendChild(renderer.domElement);
  initialCamera();

  let geometry = initialSphereGeometry;
  const material = new THREE.PointsMaterial({ 
    size: 0.05,
    vertexColors: THREE.VertexColors,
  });
  const mesh = new THREE.Points(geometry, material);
  mesh.name = meshName;
  scene.add(mesh);

};
const animate = () => {
  requestAnimationFrame(animate);
  render();
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

initialScene();
animate();
window.addEventListener("resize", resize);

document.getElementById('transform').addEventListener('click',()=>{
  debugger
  if(currentGeometry === 'cube'){
    currentGeometry ='sphere';
    transformAnimation(initialCubeGeometry,initialSphereGeometry,meshName,scene,isMobile);
  }
  else if(currentGeometry === 'sphere'){
    currentGeometry = 'cube';
    transformAnimation(initialSphereGeometry,initialCubeGeometry,meshName,scene,isMobile);
  }
})
