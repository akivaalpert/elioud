const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bgCanvas'),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const group = new THREE.Group();

// Create particles
const particleCount = 5000;
const particles = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 20);
  positions.push((Math.random() - 0.5) * 20);
  positions.push((Math.random() - 0.5) * 20);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
group.add(particleSystem);

// Torus Knot
const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const torusKnot = new THREE.Mesh(geometry, material);
group.add(torusKnot);

scene.add(group);

// Animation
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.002;
  group.rotation.x += 0.002;
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
