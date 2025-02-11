const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('n') || 'love';
const customText = urlParams.get('t') || 'YAY!! You made my heart skip a beat! 💖'; /

document.getElementById('name').textContent = name;
document.getElementById('final-message').textContent = customText;

const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const response = document.getElementById('response');

// Love-themed color palette
const colors = ['#ff4d6d', '#ffcccb', '#ffafcc', '#ff6b6b', '#ffdde1'];

// events when love thing
const events = [
    () => { // Confetti explosion from button
        explodeConfetti(noBtn.getBoundingClientRect());
        noBtn.textContent = ["UwU", "NOPE!", "TRY HARDER", "😈"][Math.floor(Math.random()*4)];
    },
    () => { // Button spin
        noBtn.style.transform = 'rotate(360deg)';
        noBtn.style.transition = 'transform 1s';
        setTimeout(() => noBtn.style.transform = '', 1000);
    },
    () => { // Heart rain
        createHeartRain();
    },
    () => { // Background color flash
        document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => document.body.style.background = '#ffdde1', 500);
    },
    () => { // Button bounce
        noBtn.style.animation = 'bounce 0.5s';
        setTimeout(() => noBtn.style.animation = '', 500);
    },
    () => { // Love-themed emoji explosion
        spawnFloatingEmojis(["💖", "💘", "💝", "💕", "💓"]);
    },
    () => { // Button switching
        switchButtons();
    },
    () => { // Shrink "No" button
        shrinkNoButton();
    },
    () => { // Random love texts
        spawnLoveTexts();
    }
];

// Random chaos on every "No" click
noBtn.addEventListener('click', () => {
    // Random event
    events[Math.floor(Math.random() * events.length)]();
    
    // Yes button grows and changes color
    yesBtn.style.transform = `scale(${1 + (Math.random()*0.5)})`;
    yesBtn.style.background = colors[Math.floor(Math.random() * colors.length)];
});

// "Yes" button click
yesBtn.addEventListener('click', () => {
    // Reset all effects
    document.body.style.background = '#ffdde1';
    document.body.style.animation = '';
    noBtn.style.transform = '';
    noBtn.style.animation = '';
    noBtn.textContent = 'NO ❌';
    document.querySelectorAll('.chaos-emoji, .heart, .love-text').forEach(elem => elem.remove());

    // Show response
    response.classList.remove('hidden');
    noBtn.remove();
    yesBtn.remove();
});

// Chaos functions
function explodeConfetti(rect) {
    for(let i=0; i<20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'chaos-emoji';
        confetti.style.left = rect.left + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.textContent = ['✨','🎉','💥','🌟'][Math.floor(Math.random()*4)];
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
        
        // Animate
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 20;
        confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)` },
            { transform: `translate(${Math.cos(angle)*velocity}vh, ${Math.sin(angle)*velocity}vh) rotate(360deg)` }
        ], { duration: 1000, easing: 'ease-out' }).onfinish = () => confetti.remove();
    }
}

function spawnFloatingEmojis(emojis) {
    emojis.forEach(emoji => {
        const elem = document.createElement('div');
        elem.className = 'chaos-emoji';
        elem.style.left = Math.random() * window.innerWidth + 'px';
        elem.textContent = emoji;
        elem.style.color = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(elem);
        setTimeout(() => elem.remove(), 3000);
    });
}

function createHeartRain() {
    for(let i=0; i<20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
        heart.textContent = '💖💓💓';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

function switchButtons() {
    const buttons = document.querySelector('.buttons');
    buttons.style.flexDirection = buttons.style.flexDirection === 'row-reverse' ? 'row' : 'row-reverse';
}

function shrinkNoButton() {
    const currentScale = parseFloat(noBtn.style.transform.replace('scale(', '').replace(')', '')) || 1;
    noBtn.style.transform = `scale(${currentScale * 0.8})`;
}

function spawnLoveTexts() {
    const texts = ["WHY NOTT", "BRUHH", "YOU'RE MEANNN", "YOU HAVE NO CHOICE💖", "PLEASE BE MINEE", "PLSSS?"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const loveText = document.createElement('div');
    loveText.className = 'love-text';
    loveText.style.left = Math.random() * window.innerWidth + 'px';
    loveText.style.top = Math.random() * window.innerHeight + 'px';
    loveText.textContent = text;
    document.body.appendChild(loveText);
    setTimeout(() => loveText.remove(), 3000);
}

// Add bounce
const style = document.createElement('style');
style.textContent = `
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`;
document.head.appendChild(style);
