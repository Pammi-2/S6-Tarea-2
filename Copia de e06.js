window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let angleOffset = 0;
    let targetAngle = 0;
    let rotating = false;
    let figuras = [];

    function dibujarComposicion(x, y) {
        function dibujarcirc(radio, x, y, startAngle, endAngle) {
            ctx.beginPath();
            ctx.arc(x, y, radio, startAngle + angleOffset, endAngle + angleOffset);
            ctx.strokeStyle = "#F2EBD5"; 
            ctx.lineWidth = 8;
            ctx.stroke();
        }
        
        for (let i = 0; i < 9; i++) {
            let radio = 15 + i * 20;
            dibujarcirc(radio, x + 40, y + 3, 0, Math.PI / 2);
            dibujarcirc(radio, x - 40, y, Math.PI * 3 / 2, Math.PI * 2);
            dibujarcirc(radio, x + 17, y + 60, Math.PI / 2, Math.PI);
            dibujarcirc(radio, x - 43, y + 57, Math.PI, Math.PI * 3 / 2);
        }
    }

    function actualizarCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        figuras.forEach(figura => dibujarComposicion(figura.x, figura.y));
    }

    function envolturaDelEvento(eventData) {
        targetAngle += Math.PI / 16; 
        if (!rotating) {
            rotating = true;
            animateRotation();
        }
        if (figuras.length > 0) {
            figuras[figuras.length - 1] = { x: eventData.clientX, y: eventData.clientY };
        }
        actualizarCanvas();
    }

    function animateRotation() {
        if (!rotating) return;
        angleOffset += (targetAngle - angleOffset) * 0.2;
        if (Math.abs(targetAngle - angleOffset) < 0.01) {
            angleOffset = targetAngle;
            rotating = false;
        } else {
            requestAnimationFrame(animateRotation);
        }
    }

    window.addEventListener('mousemove', envolturaDelEvento);
    
    window.addEventListener('click', function (event) {
        figuras.push({ x: event.clientX, y: event.clientY });
        actualizarCanvas();
    });
};