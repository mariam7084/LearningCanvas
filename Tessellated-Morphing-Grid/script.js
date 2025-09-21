const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
let width, height;
const spacing = 60;
const amplitude = 20;
const frequency = 0.002;

let points = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initGrid();
}

function initGrid() {
    points = [];
    for (let y = 0; y <= height + spacing; y += spacing) {
        for (let x = 0; x <= width + spacing; x += spacing) {
            points.push({
                x: x,
                y: y,
                offsetX: Math.random() * 1000,
                offsetY: Math.random() * 1000
            });
        }
    }
}

function drawGrid(time) {
    ctx.clearRect(0, 0, width, height);

    // Galaxy gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#1f0033");
    gradient.addColorStop(0.4, "#3a0ca3");
    gradient.addColorStop(0.7, "#7209b7");
    gradient.addColorStop(1, "#ff006e");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;

    for (let p of points) {
        let px = p.x + Math.sin(time * frequency + p.offsetX) * amplitude;
        let py = p.y + Math.cos(time * frequency + p.offsetY) * amplitude;

        // Draw lines to neighbors
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let nx = p.x + dx * spacing;
                let ny = p.y + dy * spacing;

                let neighbor = points.find(pt => pt.x === nx && pt.y === ny);
                if (neighbor) {
                    let npx = neighbor.x + Math.sin(time * frequency + neighbor.offsetX) * amplitude;
                    let npy = neighbor.y + Math.cos(time * frequency + neighbor.offsetY) * amplitude;

                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(npx, npy);
                    ctx.stroke();
                }
            }
        }
    }
}

function animate(time) {
    drawGrid(time);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(animate);
