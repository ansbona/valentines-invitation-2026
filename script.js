document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const envelope = document.getElementById('btn-open-envelope');
    const sceneEnvelope = document.getElementById('scene-envelope');
    const sceneLetter = document.getElementById('scene-letter');
    const sceneDashboard = document.getElementById('scene-dashboard');
    const scenePersonalLetter = document.getElementById('scene-personal-letter');
    const letterContent = document.querySelector('.letter-content'); // Needed for boundaries
    
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
    let yesScale = 1; // Tracks how big the Yes button is

    // 🟣 DATA: The list of sad GIFs and Texts
    const noMessages = [
        { text: "Are you sure? 🥺", gif: "assets/sad-1.gif" },
        { text: "Please think again! 💔", gif: "assets/sad-2.gif" },
        { text: "But I bought flowers... 🌸", gif: "assets/sad-3.gif" },
        { text: "Don't break my heart 😭", gif: "assets/sad-4.gif" }, 
        { text: "I'll make you cookies! 🍪", gif: "assets/sad-5.gif" },
        { text: "Look at this sad face... 😿", gif: "assets/sad-6.gif" },
        { text: "I'm going to cry... 💧", gif: "assets/sad-7.gif" },
        { text: "Just one chance? ✨", gif: "assets/sad-8.gif" },
        { text: "Okay, but what if I say please? 🙏", gif: "assets/sad-9.gif" }
    ];

    // --- Interaction Logic ---

    // 1. Open Envelope
    envelope.addEventListener('click', () => {
        sceneEnvelope.classList.remove('active');
        sceneEnvelope.classList.add('hidden');
        
        sceneLetter.classList.remove('hidden');
        setTimeout(() => sceneLetter.classList.add('active'), 50);
    });

    // 2. Handle "No" Selection (Shuffle + Grow + Move)
    btnNo.addEventListener('click', () => {
        // A. Show Inline Feedback
        noResponseContainer.classList.remove('hidden');

        // B. Pick Random Message/GIF
        const randomIndex = Math.floor(Math.random() * noMessages.length);
        const selectedMessage = noMessages[randomIndex];
        noText.textContent = selectedMessage.text;
        noGif.src = selectedMessage.gif;

        // Reset Animation
        noResponseContainer.style.animation = 'none';
        noResponseContainer.offsetHeight; 
        noResponseContainer.style.animation = 'slideDown 0.4s ease-out';

        // C. Make YES Button Bigger
        yesScale += 0.2; // Increase size by 20% each click
        btnYes.style.transform = `scale(${yesScale})`;

        // D. Make NO Button Move Randomly
        // 1. Make it absolute so it can move freely inside the container
        btnNo.style.position = "absolute";
        
        // 2. Calculate available space within the letter card
        // We subtract the button's own size so it doesn't overflow
        const maxX = letterContent.offsetWidth - btnNo.offsetWidth - 20; // 20px padding buffer
        const maxY = letterContent.offsetHeight - btnNo.offsetHeight - 20;

        // 3. Generate random coordinates
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // 4. Apply new coordinates
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
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
