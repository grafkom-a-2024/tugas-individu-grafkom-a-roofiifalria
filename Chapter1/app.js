// Inisialisasi scene, kamera, dan renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Membuat geometry untuk jam (contoh menggunakan lingkaran sebagai dasar jam)
const geometry = new THREE.CircleGeometry(5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const clockFace = new THREE.Mesh(geometry, material);
scene.add(clockFace);

// Tambahkan jarum jam (contoh sebagai garis)
const hourHandGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);
const hourHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
hourHand.position.y = 1;
scene.add(hourHand);

// Atur posisi kamera
camera.position.z = 10;

// Animasi
function animate() {
    requestAnimationFrame(animate);

    // Putar jarum jam untuk simulasi waktu berjalan
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();

    hourHand.rotation.z = -hours * (Math.PI / 6) - (minutes * Math.PI / 360);

    renderer.render(scene, camera);
}

animate();

// Resizing handler
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});