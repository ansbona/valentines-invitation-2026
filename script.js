document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const envelope = document.getElementById('btn-open-envelope');
    const sceneEnvelope = document.getElementById('scene-envelope');
    const sceneLetter = document.getElementById('scene-letter');
    const sceneDashboard = document.getElementById('scene-dashboard');
    const scenePersonalLetter = document.getElementById('scene-personal-letter');
    
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    
    // Response Elements (Inline)
    const noResponseContainer = document.getElementById('no-response-container');
    const noText = document.getElementById('no-text');
    const noGif = document.getElementById('no-gif');
    
    // Dashboard Elements
    const cardReadPersonal = document.getElementById('card-read-personal');
    const cardMusic = document.getElementById('card-music');
    const bgMusic = document.getElementById('bg-music');
    const musicStatus = document.getElementById('music-status');
    const btnBackDashboard = document.getElementById('btn-back-dashboard');

    // --- State & Data ---
    let isPlaying = false;

    // 🟣 DATA: The list of 9 sad GIFs and Texts
    const noMessages = [
        { text: "Sure na ba ean? 🥺", gif: "assets/sad-1.gif" },
        { text: "Sige na po pweaseeeee 💔", gif: "assets/sad-2.gif" },
        { text: "Cry na ako nyean huhu... 🌸", gif: "assets/sad-3.gif" },
        { text: "Sad na me huhu", gif: "assets/sad-4.gif" }, 
        { text: "Me looking at the screen after you clicked no", gif: "assets/sad-5.gif" },
        { text: "Look at my sadge face... 😿", gif: "assets/sad-6.gif" },
        { text: "Okie lang aqou ack", gif: "assets/sad-7.gif" },
        { text: "Just one chance? ✨", gif: "assets/sad-8.gif" },
        { text: "Sure na sure? 🙏", gif: "assets/sad-9.gif" }
    ];

    // --- Interaction Logic ---

    // 1. Open Envelope
    envelope.addEventListener('click', () => {
        sceneEnvelope.classList.remove('active');
        sceneEnvelope.classList.add('hidden');
        
        sceneLetter.classList.remove('hidden');
        setTimeout(() => sceneLetter.classList.add('active'), 50);
    });

    // 2. Handle "No" Selection (Inline Shuffle)
    btnNo.addEventListener('click', () => {
        // Unhide the container if it's currently hidden
        noResponseContainer.classList.remove('hidden');

        // Pick a RANDOM message from the list
        const randomIndex = Math.floor(Math.random() * noMessages.length);
        const selectedMessage = noMessages[randomIndex];

        // Update Content
        noText.textContent = selectedMessage.text;
        noGif.src = selectedMessage.gif;

        // Reset Animation (Hack to make it pop every time you click)
        noResponseContainer.style.animation = 'none';
        noResponseContainer.offsetHeight; /* Trigger reflow */
        noResponseContainer.style.animation = 'slideDown 0.4s ease-out';
    });

    // 3. Handle "Yes" Selection
    btnYes.addEventListener('click', () => {
        sceneLetter.classList.remove('active');
        sceneLetter.classList.add('hidden');
        
        sceneDashboard.classList.remove('hidden');
        setTimeout(() => sceneDashboard.classList.add('active'), 50);
    });

    // 4. Dashboard: Read PERSONAL Letter
    cardReadPersonal.addEventListener('click', () => {
        sceneDashboard.classList.remove('active');
        sceneDashboard.classList.add('hidden');
        
        scenePersonalLetter.classList.remove('hidden');
        setTimeout(() => scenePersonalLetter.classList.add('active'), 50);
    });

    // 5. Back Button (Personal Letter -> Dashboard)
    btnBackDashboard.addEventListener('click', () => {
        scenePersonalLetter.classList.remove('active');
        scenePersonalLetter.classList.add('hidden');
        
        sceneDashboard.classList.remove('hidden');
        setTimeout(() => sceneDashboard.classList.add('active'), 50);
    });

    // 6. Dashboard: Play Music
    cardMusic.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicStatus.textContent = "Play a Song";
            cardMusic.style.background = "var(--white)";
            isPlaying = false;
        } else {
            bgMusic.play();
            musicStatus.textContent = "Playing...";
            cardMusic.style.background = "#F8BBD0"; 
            isPlaying = true;
        }
    });
});