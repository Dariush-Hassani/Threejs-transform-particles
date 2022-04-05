let morph = 0 / 8;
const createCubeGeometry = (width, numPoints) => {
    let positions = [];
    let colors = [];
    let min = -width / 2;
    let max = width / 2;

    let step = Math.sqrt(6 / numPoints) * width

    for (let x = min; x <= max; x += width) {
        for (let y = min; y < max; y += step) {
            for (let z = min; z < max; z += step) {
                positions.push(...[x + Math.random() * morph, y, z]);
            }
        }
    }

    for (let y = min; y <= max; y += width) {
        for (let x = min; x < max; x += step) {
            for (let z = min; z < max; z += step) {
                positions.push(...[x, y + Math.random() * morph, z]);
            }
        }
    }

    for (let z = min; z <= max; z += width) {
        for (let y = min; y < max; y += step) {
            for (let x = min; x < max; x += step) {
                positions.push(...[x, y, z + Math.random() * morph]);
            }
        }
    }

    for (let i = 0; i < positions.length / 3; i++) {
        colors.push(...[positions[i * 3] / (max), positions[i * 3 + 1] / max, positions[i * 3 + 2] / max])
    }

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    return geometry;
}

const createSphereGeometry = (radius, numPoints) => {
    let positions = [];
    let colors = [];
    let step = Math.sqrt(64800 / numPoints)
    for (let theta = 0; theta < 180; theta += step) {
        for (let phi = 0; phi < 360; phi += step) {
            let x = (radius * Math.sin(convertToRadian(theta)) * Math.cos(convertToRadian(phi))) + Math.random() * morph;
            let y = (radius * Math.sin(convertToRadian(theta)) * Math.sin(convertToRadian(phi))) + Math.random() * morph;
            let z = (radius * Math.cos(convertToRadian(theta))) + Math.random() * morph
            positions.push(...[x, y, z])
        }
    }
    for (let i = 0; i < positions.length / 3; i++) {
        colors.push(...[positions[i * 3] / radius, positions[i * 3 + 1] / radius, positions[i * 3 + 2] / radius])
    }

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    return geometry;
}
