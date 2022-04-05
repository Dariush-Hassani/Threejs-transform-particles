const convertToRadian = (num) => num * 0.0174532925;

const transformAnimation = (initialGeometry, targetGeometry, meshName, scene, isMobile) => {
    let duration = 2500;
    let frame = isMobile ? 40 : 30;
    let limit = (duration / frame);

    let initialPositions = [...initialGeometry.attributes.position.array];
    let initialColors = [...initialGeometry.attributes.color.array];

    let targetPositions = [...targetGeometry.attributes.position.array];
    let targetColors = [...targetGeometry.attributes.color.array];

    let geometryPositions = initialPositions;
    let geometryColors = initialColors;

    if (initialPositions.length > targetPositions.length) {
        geometryPositions = geometryPositions.slice(0, targetPositions.length);
        geometryColors = geometryColors.slice(0, targetColors.length);
    }
    else {
        let diff = targetPositions.length - initialPositions.length;
        for(let i = 0; i < diff; i++){
            geometryPositions.push(Math.random());
            geometryColors.push(0);
        }
    }

    let stepPositions = [];
    let stepColors = [];

    for (let i = 0; i < geometryPositions.length; i++) {
        stepPositions.push((targetPositions[i] - geometryPositions[i]) / duration * frame);
        stepColors.push((targetColors[i] - geometryColors[i]) / duration * frame);
    }

    let timer;
    let i = 0;
    timer = setInterval(() => {
        let before = scene.getObjectByName(meshName);
        before.geometry.dispose();
        before.material.dispose();
        scene.remove(before);
        if (i >= limit) {
            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(targetPositions), 3));
            geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(targetColors), 3));
            const material = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: THREE.VertexColors,
            });
            const mesh = new THREE.Points(geometry, material);
            mesh.name = meshName;
            scene.add(mesh);
            clearInterval(timer);
            return;
        } else {
            for (let i = 0; i < geometryPositions.length; i++) {
                geometryPositions[i] += stepPositions[i];
                geometryColors[i] += stepColors[i];
            }
            const geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(geometryPositions), 3));
            geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(geometryColors), 3));
            const material = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: THREE.VertexColors,
            });
            const mesh = new THREE.Points(geometry, material);
            mesh.name = meshName;
            scene.add(mesh);
        }
        i++;
    }, frame);
}