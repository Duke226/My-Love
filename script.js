// Prevent pinch zoom on mobile
document.addEventListener('touchmove', function (e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

let currentPage = 1;
let musicPlaying = true;

// Initialize music on page load
// Initialize music on page load
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundMusic');
    const overlay = document.getElementById('startOverlay');

    // Set volume to 50%
    audio.volume = 0.5;

    const startExperience = () => {
        // Hide overlay with transition
        if (overlay) overlay.classList.add('hidden');

        // Try to play audio
        audio.muted = false;
        audio.play().then(() => {
            musicPlaying = true;
            updateMusicButton();
        }).catch(error => {
            console.log("Audio play failed on click");
        });
    };

    // Add click listener to the overlay
    if (overlay) {
        overlay.addEventListener('click', startExperience);
        overlay.addEventListener('touchstart', startExperience, { passive: true });

        // Also allow any click on the document to start it if overlay fails to cover
        document.addEventListener('click', startExperience, { once: true });
    } else {
        // Fallback if overlay is missing
        startExperience();
    }
});

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicToggle');

    if (audio.paused) {
        audio.play();
        musicPlaying = true;
    } else {
        audio.pause();
        musicPlaying = false;
    }

    updateMusicButton();

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

function updateMusicButton() {
    const musicBtn = document.getElementById('musicToggle');

    if (musicPlaying) {
        musicBtn.textContent = '🔊 Music On';
        musicBtn.classList.remove('disabled');
    } else {
        musicBtn.textContent = '🔇 Music Off';
        musicBtn.classList.add('disabled');
    }
}

function nextPage() {
    const currentPageEl = document.getElementById('page' + currentPage);
    currentPage++;
    const nextPageEl = document.getElementById('page' + currentPage);

    if (nextPageEl) {
        // Add exit animation class
        currentPageEl.style.animation = 'flipOutY 0.6s forwards';

        setTimeout(() => {
            currentPageEl.classList.add('hidden');
            currentPageEl.style.animation = ''; // Reset

            nextPageEl.classList.remove('hidden');
            // Add entrance animation
            nextPageEl.style.animation = 'flipInY 0.8s backwards';
        }, 500); // Wait for half the animation
    }
}

function selectRating(rating) {
    // Remove previously selected rating
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selected class to clicked button
    event.target.closest('.rating-btn').classList.add('selected');

    // Move to next page after a short delay
    setTimeout(() => {
        nextPage();
    }, 300);

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function showYesResponse() {
    const responseDiv = document.getElementById('responseMessage');
    responseDiv.innerHTML = `
        <h2>💍 YES! 💍</h2>
        <p>You've made me the happiest person alive!</p>
        <p>I love you more than words can express.</p>
        <p>Forever starts today! 💕</p>
    `;
    responseDiv.classList.add('show');

    // Create confetti
    createConfetti();

    // Haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function moveButton(button) {
    if (event) {
        event.preventDefault();
    }

    const padding = 50;
    const randomX = Math.random() * (window.innerWidth - padding * 2) + padding;
    const randomY = Math.random() * (window.innerHeight - padding * 2) + padding;

    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.zIndex = '99';
}

// 3D Heart Decoration Logic
function create3DHearts() {
    const scene = document.createElement('div');
    scene.className = 'scene-3d';
    document.body.appendChild(scene);

    const count = 30;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-3d heart-shape';

        // Random properties for natural feel
        const xStart = Math.random() * 100 + 'vw';
        const xEnd = (Math.random() * 100 - 50) + 'vw';
        const zStart = (Math.random() * 500 - 250) + 'px';
        const zEnd = (Math.random() * 500 - 250) + 'px';
        const duration = 15 + Math.random() * 20 + 's';
        const delay = Math.random() * -20 + 's';
        const scale = 0.5 + Math.random() * 1;

        heart.style.setProperty('--x-start', xStart);
        heart.style.setProperty('--x-end', xEnd);
        heart.style.setProperty('--z-start', zStart);
        heart.style.setProperty('--z-end', zEnd);

        // Inline styles for variety
        heart.style.left = xStart;
        heart.style.animationDuration = duration;
        heart.style.animationDelay = delay;
        heart.style.transform = `scale(${scale}) rotate(-45deg)`;

        // Slightly different colors
        const hue = 340 + Math.random() * 40; // Pinks to Creams
        heart.style.background = `radial-gradient(circle at 30% 30%, hsl(${hue}, 80%, 70%), hsl(${hue}, 90%, 60%))`;

        // Add pseudo-elements dynamically via JS? No, CSS is cleaner.
        // But we need the ::before and ::after to inherit the background.
        // The CSS handles background: inherit, so we just set it on the parent.

        scene.appendChild(heart);
    }
}

// Call the function
create3DHearts();

// Flower Decoration Logic
function createFlowers() {
    const scene = document.createElement('div');
    scene.className = 'flower-container';
    document.body.appendChild(scene);

    const count = 20; // Number of flowers

    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';

        // Randomly pick flower type
        const isRose = Math.random() > 0.5;
        const innerShape = document.createElement('div');
        innerShape.className = isRose ? 'flower-shape flower-rose' : 'flower-shape';
        flower.appendChild(innerShape);

        // Random properties
        const left = Math.random() * 100 + 'vw';
        const size = 20 + Math.random() * 30 + 'px';
        const duration = 20 + Math.random() * 15 + 's';
        const delay = Math.random() * -20 + 's';
        const sway = (Math.random() * 100 - 50) + 'px'; // How much it moves left/right
        const rotation = (Math.random() * 720 - 360) + 'deg';

        flower.style.left = left;
        flower.style.width = size;
        flower.style.height = size;
        flower.style.animation = `floatFlower ${duration} linear infinite`;
        flower.style.animationDelay = delay;

        // Set CSS variables for unique path
        flower.style.setProperty('--sway', sway);
        flower.style.setProperty('--rotation', rotation);

        scene.appendChild(flower);
    }
}

// Extra Styles & Interactions

// Fireflies Logic
function createFireflies() {
    const fireflyCount = 20; // Number of fireflies

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.position = 'fixed';
        firefly.style.width = '4px';
        firefly.style.height = '4px';
        firefly.style.backgroundColor = '#ffeeb0';
        firefly.style.borderRadius = '50%';
        firefly.style.pointerEvents = 'none';

        // Custom animation properties
        const dx = (Math.random() - 0.5) * window.innerWidth + 'px';
        const dy = (Math.random() - 0.5) * window.innerHeight + 'px';
        const dx2 = (Math.random() - 0.5) * window.innerWidth + 'px';
        const dy2 = (Math.random() - 0.5) * window.innerHeight + 'px';
        const duration = 10 + Math.random() * 20 + 's';
        const delay = Math.random() * -10 + 's';

        // Add custom variables for movement
        firefly.style.setProperty('--dx', dx);
        firefly.style.setProperty('--dy', dy);
        firefly.style.setProperty('--dx2', dx2);
        firefly.style.setProperty('--dy2', dy2);
        firefly.style.setProperty('animation-duration', duration);
        firefly.style.setProperty('animation-delay', delay);

        // Add animation directly if not in CSS class (CSS class handles animation name)
        firefly.style.animation = `moveFirefly ${duration} infinite alternate, flashFirefly 3s infinite`;

        document.body.appendChild(firefly);
    }
}

// Call previous functions
createFlowers();
createFireflies();

// 3D Tilt Effect
document.addEventListener('mousemove', (e) => {
    const box = document.querySelector('.proposal-box:not(.hidden)');
    if (!box) return;

    if (window.innerWidth < 800) return; // Disable on small screens for performance

    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    const xAxis = (halfWidth - e.pageX) / 40;
    const yAxis = (halfHeight - e.pageY) / 40;

    box.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(20px)`;
    box.style.boxShadow = `${-xAxis}px ${-yAxis}px 50px rgba(0, 0, 0, 0.4), 
                           inset 0 0 0 1px rgba(255,255,255,0.8)`;
});
// Reset tilt on mouse leave
document.addEventListener('mouseleave', () => {
    const box = document.querySelector('.proposal-box:not(.hidden)');
    if (box) {
        box.style.transform = 'rotateY(0deg) rotateX(0deg)';
        box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)';
    }
});

// Sparkle Cursor
document.addEventListener('mousemove', (e) => {
    createSparkle(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
});

function createSparkle(x, y) {
    // Throttle sparkles for performance
    if (Math.random() > 0.2) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    // Random direction for movement
    const moveX = (Math.random() - 0.5) * 50 + 'px';
    const moveY = (Math.random() - 0.5) * 50 + 'px';
    sparkle.style.setProperty('--mx', moveX);
    sparkle.style.setProperty('--my', moveY);

    // Random color
    const colors = ['gold', 'white', '#ff6b9d', '#ffed4a'];
    sparkle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;
    sparkle.style.width = Math.random() * 8 + 4 + 'px';
    sparkle.style.height = sparkle.style.width;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Call previous functions
createFlowers();

function createConfetti() {
    const confettiCount = window.innerWidth < 600 ? 50 : 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.background = ['#ff6b9d', '#667eea', '#764ba2', '#ff8787', '#FFD700'][Math.floor(Math.random() * 5)];
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s ease-in forwards`;
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = (5 + Math.random() * 10) + 'px';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}
