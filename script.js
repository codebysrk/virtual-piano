const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

function playNote(freq) {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = freq;

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.5
    );

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}

const keys = document.querySelectorAll(".white, .black");

function pressKey(e) {
    e.stopPropagation();
    if (e.type === "touchstart") e.preventDefault();

    const key = e.currentTarget;
    const freq = key.dataset.freq;

    if (!freq) return;

    playNote(freq);

    key.classList.add("active");
    setTimeout(() => key.classList.remove("active"), 150);
}

keys.forEach((key) => {
    key.addEventListener("mousedown", pressKey);
    key.addEventListener("touchstart", pressKey);
});
