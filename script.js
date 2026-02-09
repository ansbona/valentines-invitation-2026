document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const envelope = document.getElementById('btn-open-envelope');
    const sceneEnvelope = document.getElementById('scene-envelope');
    const sceneLetter = document.getElementById('scene-letter');
    const sceneDashboard = document.getElementById('scene-dashboard');
    const scenePersonalLetter = document.getElementById('scene-personal-letter');
    const letterContent = document.querySelector('.letter-content');
    
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    
    // Response Elements
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
    let yesFontSize = 1; // Base font size in rem

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

        // C. Make YES Button Bigger (BY INCREASING FONT SIZE)
        // This pushes the layout around so text doesn't get covered
        yesFontSize += 0.5; // Increase by 0.5rem each time
        btnYes.style.fontSize = `${yesFontSize}rem`;

        // D. Make NO Button Move Randomly
        btnNo.style.position = "absolute";
        
        // Calculate available space
        const maxX = letterContent.offsetWidth - btnNo.offsetWidth - 20;
        const maxY = letterContent.offsetHeight - btnNo.offsetHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

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

    // 4. Dashboard Logic
    cardReadPersonal.addEventListener('click', () => {
        sceneDashboard.classList.remove('active');
        sceneDashboard.classList.add('hidden');
        scenePersonalLetter.classList.remove('hidden');
        setTimeout(() => scenePersonalLetter.classList.add('active'), 50);
    });

    btnBackDashboard.addEventListener('click', () => {
        scenePersonalLetter.classList.remove('active');
        scenePersonalLetter.classList.add('hidden');
        sceneDashboard.classList.remove('hidden');
        setTimeout(() => sceneDashboard.classList.add('active'), 50);
    });

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
