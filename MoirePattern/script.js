const canvas = document.getElementById('moireCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouseX = 0.5;
let mouseY = 0.5;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => {
    mouseX = e.clientX / width;
    mouseY = e.clientY / height;
});

function drawMoire(time) {
    ctx.clearRect(0, 0, width, height);
    const spacing = 20;
    const lineCount = Math.ceil(Math.max(width, height) / spacing) + 10;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.4;

    // Base lines (fixed angle)
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI / 4); // 45 degrees
    for (let i = -lineCount; i < lineCount; i++) {
        const offset = i * spacing;
        ctx.beginPath();
        ctx.moveTo(-width, offset);
        ctx.lineTo(width, offset);
        ctx.stroke();
    }
    ctx.restore();

    // Moving overlay lines
    const angleOffset = (mouseX - 0.5) * Math.PI / 4; // ~45 degree range
    const spacingOffset = (mouseY - 0.5) * 10;

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI / 4 + angleOffset); // user-controlled angle
    for (let i = -lineCount; i < lineCount; i++) {
        const offset = i * (spacing + spacingOffset);
        ctx.beginPath();
        ctx.moveTo(-width, offset);
        ctx.lineTo(width, offset);
        ctx.stroke();
    }
    ctx.restore();
}

function animate(time) {
    drawMoire(time);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
