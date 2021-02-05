window.addEventListener("load", init);
window.addEventListener("resize", init);

function init() {
    let rot = 0;
    const mouse = new THREE.Vector2();

    const canvas = document.querySelector("#myCanvas");
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x061E3D);
    // scene.fog = new THREE.Fog(0x061E3D, 1, 1000);

    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight
    );
    camera.position.set(20, 90, 500);
    const controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    const directionalLight = new THREE.DirectionalLight(0xc7b198);
    directionalLight.position.set(-500, 400, 2100);
    scene.add(directionalLight);

    const light = new THREE.AmbientLight(0xdddddd, 0.5); // soft white light
    scene.add(light);

    const meshList = [];
    const IcoGeometry = new THREE.IcosahedronGeometry(10, 0);
    const IcoMaterial = new THREE.MeshToonMaterial({
        color: 0x5eb1e0
    });
    const IcoMesh = new THREE.Mesh(IcoGeometry, IcoMaterial);
    scene.add(IcoMesh);
    meshList.push(IcoMesh);

    const stars = new THREE.Object3D();
    for (let i = 0; i < 800; i++) {
        const geometry = new THREE.IcosahedronGeometry(Math.random() * 2, 0);
        const material = new THREE.MeshToonMaterial({
            color: 0xcccccc
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * 700;
        mesh.position.y = (Math.random() - 0.5) * 700;
        mesh.position.z = (Math.random() - 0.5) * 700;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;

        stars.add(mesh);
    }

    scene.add(stars);
    const raycaster = new THREE.Raycaster();
    canvas.addEventListener("mousemove", handleMouseMove);

    tick();

    function handleMouseMove(event) {
        const element = event.currentTarget;
        const x = event.clientX - element.offsetLeft;
        const y = event.clientY - element.offsetTop;

        const w = element.offsetWidth;
        const h = element.offsetHeight;

        mouse.x = (x / w) * 2 - 1;
        mouse.y = -(y / h) * 2 + 1;
    }

    function tick() {
        rot += Math.random() * 0.8;
        const radian = (rot * Math.PI) / 180;
        IcoMesh.position.x = 250 * Math.sin(radian);
        IcoMesh.position.y = 100 * Math.cos(radian);
        IcoMesh.position.z = -100 * Math.cos(radian);
        IcoMesh.rotation.x += 0.005;
        IcoMesh.rotation.y += 0.005;
        IcoMesh.rotation.z -= 0.005;

        raycaster.setFromCamera(mouse, camera);
        const intr = raycaster.intersectObjects(meshList);

        meshList.map((mesh) => {
            if (intr.length > 0 && mesh === intr[0].object) {
                rot += 6;
            } else {
                return;
            }
        });

        controls.update();
        stars.rotation.y += 0.0009;
        stars.rotation.z -= 0.0003;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}