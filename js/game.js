// --- JOKOAREN EGOERA ---
let gameState = {
    currentLevel: 0,
    lives: gameConfig.initialLives,
    sequence: [],
    currentStep: 0,
    boardLocked: false,
    musicPlaying: false
};

// --- DOM-EKO ELEMENTUAK ---
const dom = {
    gameBoard: document.getElementById('game-board'),
    messageBar: document.getElementById('message-bar'),
    levelDisplay: document.getElementById('level-display'),
    livesDisplay: document.getElementById('lives-display'),
    mario: document.getElementById('mario'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modal-content'),
    modalMessage: document.getElementById('modal-message'),
    modalButton: document.getElementById('modal-button'),
    levelupAnimation: document.getElementById('levelup-animation'),
    confettiContainer: document.getElementById('confetti-container'),
    musicToggleBtn: document.getElementById('music-toggle-btn'),
    backgroundMusic: document.getElementById('background-music'),
    restartBtn: document.getElementById('restart-btn')
};

// --- SOINUAK ---
const sounds = {
    jump: new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 } }).toDestination(),
    coin: new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 } }).toDestination(),
    wrong: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.1 } }).toDestination(),
    levelUp: new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.1 } }).toDestination(),
    gameOver: new Tone.Synth({ oscillator: { type: 'fmsquare' }, envelope: { attack: 0.1, decay: 0.8, sustain: 0, release: 0.1 } }).toDestination(),
    swoosh: new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.005, decay: 0.2, sustain: 0 } }).toDestination(),
    confetti: new Tone.Synth({ oscillator: { type: 'fmsine' }, envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.1 } }).toDestination()
};

// --- LOGIKA NAGUSIA ---

function startGame() {
    gameState.currentLevel = 0;
    gameState.lives = gameConfig.initialLives;
    gameState.boardLocked = false;
    updateLivesDisplay();
    showLevelIntro();
}

function setupLevel() {
    gameState.currentStep = 0;
    gameState.boardLocked = false;
    dom.gameBoard.innerHTML = '';

    // CAMBIO: La lógica ahora elige una pregunta aleatoria del array del nivel
    const levelArray = gameConfig.levels[gameState.currentLevel];
    if (!levelArray) {
        winGame();
        return;
    }
    const levelData = levelArray[Math.floor(Math.random() * levelArray.length)];
    
    // El resto de la función sigue igual, trabajando con el 'levelData' seleccionado
    let correctItems = [];
    let displayItems = [];
    
    switch(levelData.type) {
        case 'sequence':
        case 'sequence_by':
        case 'even':
        case 'odd':
            correctItems = generateNumberSequence(levelData);
            displayItems = [...correctItems, ...generateDistractors(correctItems, levelData.distractors, levelData.max || 25)];
            break;
        case 'addition':
        case 'subtraction':
        case 'mixed_ops':
            correctItems = generateMathProblems(levelData);
            const mathDistractors = generateDistractors(correctItems.map(p => p.answer), levelData.distractors, levelData.maxNum * 2);
            displayItems = [...correctItems, ...mathDistractors.map(d => ({ text: d, answer: d, type: 'distractor' }))];
            break;
        case 'color_find':
            correctItems = Array(levelData.count).fill(levelData.color);
            const colorDistractors = generateDistractors(correctItems, levelData.distractors, 0, colorNames);
            displayItems = [...correctItems, ...colorDistractors];
            break;
        case 'color_sequence':
            correctItems = levelData.values;
            const colorSeqDistractors = generateDistractors(correctItems, levelData.distractors, 0, colorNames);
            displayItems = [...correctItems, ...colorSeqDistractors];
            break;
    }
    
    gameState.sequence = correctItems;
    shuffleArray(displayItems);
    
    setGridColumns(displayItems.length);
    displayItems.forEach(item => createBlock(item));
}

function createBlock(item) {
    const block = document.createElement('div');
    block.classList.add('block');
    
    const blockInner = document.createElement('div');
    blockInner.classList.add('block-inner');

    const content = document.createElement('span');
    content.classList.add('block-content');
    
    let blockValue;

    if (typeof item === 'object' && item.text) { 
        content.textContent = item.text;
        blockValue = item.answer;
        if (String(item.text).length >= 4) {
            content.classList.add('small-font');
        }
    } else if (colorNames.includes(item)) { 
        blockValue = item;
        blockInner.style.backgroundColor = colorMap[item].hex;
        block.dataset.color = item;
    } else { 
        content.textContent = item;
        blockValue = item;
        if (String(item).length >= 3) {
            content.classList.add('small-font');
        }
    }

    blockInner.appendChild(content);
    block.appendChild(blockInner);
    block.addEventListener('click', () => handleBlockClick(block, blockValue));
    dom.gameBoard.appendChild(block);
}

function handleBlockClick(blockElement, blockValue) {
    if (gameState.boardLocked || blockElement.classList.contains('used')) return;

    // Para obtener el tipo de nivel, necesitamos volver a seleccionar una pregunta (o guardarla)
    // Manera sencilla: simplemente coger la primera pregunta del nivel para saber el tipo
    const levelType = gameConfig.levels[gameState.currentLevel][0].type;
    const levelColor = gameConfig.levels[gameState.currentLevel][0].color;


    let expectedValue = gameState.sequence[gameState.currentStep];
    if (typeof expectedValue === 'object') expectedValue = expectedValue.answer;

    let isCorrect = false;
    if (levelType === 'color_find') {
        if (blockValue === levelColor) isCorrect = true;
    } else if (levelType === 'color_sequence') {
        if (blockValue === expectedValue) isCorrect = true;
    } else {
        if (blockValue === expectedValue) isCorrect = true;
    }

    if (isCorrect) {
        handleCorrectClick(blockElement);
    } else {
        handleWrongClick();
    }
}

function handleCorrectClick(blockElement) {
    sounds.coin.triggerAttackRelease('G5', '0.1');
    blockElement.classList.add('used', 'correct');
    animateMarioJump(blockElement);
    gameState.currentStep++;
    
    if (gameState.currentStep >= gameState.sequence.length) {
        gameState.boardLocked = true;
        setTimeout(levelUp, 1000);
    }
}

function handleWrongClick() {
    sounds.wrong.triggerAttackRelease('C3', '0.5');
    gameState.lives--;
    updateLivesDisplay();
    if (gameState.lives <= 0) {
        gameState.boardLocked = true;
        setTimeout(gameOver, 500);
    }
}

function levelUp() {
    gameState.currentLevel++;
    
    dom.modal.style.display = 'flex';
    dom.modalMessage.style.display = 'none';
    dom.modalButton.style.display = 'none';
    dom.modalMessage.classList.remove('visible');
    dom.modalButton.classList.remove('visible');

    dom.levelupAnimation.style.display = 'block';
    dom.levelupAnimation.classList.add('play');

    setTimeout(() => {
        dom.modalContent.classList.add('shake');
        sounds.swoosh.triggerAttack();
    }, 900);

    setTimeout(() => {
        dom.modalContent.classList.remove('shake');
        createSparkles();
        sounds.levelUp.triggerAttackRelease('C5', '0.4');
    }, 1200);

    setTimeout(() => {
        dom.levelupAnimation.style.display = 'none';
        dom.levelupAnimation.classList.remove('play');

        dom.modalMessage.textContent = 'Maila gaindituta!';
        dom.modalButton.textContent = 'Hurrengo Maila';
        dom.modalMessage.style.display = 'block';
        dom.modalButton.style.display = 'block';
        dom.modalMessage.classList.add('visible');
        dom.modalButton.classList.add('visible');

        dom.modalButton.onclick = () => {
            hideModal();
            showLevelIntro();
        };
    }, 2500);
}

function showLevelIntro() {
    if (!gameConfig.levels[gameState.currentLevel]) {
        winGame();
        return;
    }

    dom.gameBoard.innerHTML = '';
    dom.gameBoard.style.display = 'flex';
    dom.gameBoard.style.justifyContent = 'center';
    dom.gameBoard.style.alignItems = 'center';

    // CAMBIO: Obtener el mensaje de una pregunta aleatoria para mostrarlo
    const levelArray = gameConfig.levels[gameState.currentLevel];
    const randomQuestionForIntro = levelArray[Math.floor(Math.random() * levelArray.length)];
    dom.messageBar.textContent = randomQuestionForIntro.message;
    dom.levelDisplay.textContent = `Maila: ${gameState.currentLevel + 1}`;

    const startButton = document.createElement('button');
    startButton.id = 'start-level-btn';
    startButton.textContent = 'Hasi!';
    startButton.onclick = () => {
        dom.gameBoard.style.display = 'grid';
        setupLevel();
    };

    dom.gameBoard.appendChild(startButton);
}

function gameOver() {
    showModal('Uh oh! Jokoa amaitu da', 'Berriro Jokatu', startGame);
}

function winGame() {
    showModal('Zorionak! Irabazi duzu!', 'Berriro Jokatu', startGame);
}

// --- FUNTZIO LAGUNTZAILEAK ---

function createSparkles() {
    dom.confettiContainer.innerHTML = '';
    const sparkleCount = 40;
    const sparkleColors = ['#F7B000', '#FFFFFF', '#FFA500'];
    
    sounds.confetti.triggerAttackRelease('C6', '0.2');

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--x', `${x}px`);
        sparkle.style.setProperty('--y', `${y}px`);
        sparkle.style.setProperty('--color', sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
        sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
        sparkle.style.width = `${Math.random() * 8 + 4}px`;
        sparkle.style.height = sparkle.style.width;
        
        dom.confettiContainer.appendChild(sparkle);
    }
}

function setGridColumns(itemCount) {
    const cols = Math.ceil(Math.sqrt(itemCount));
    dom.gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}


function updateLivesDisplay() {
    dom.livesDisplay.innerHTML = Array(gameState.lives).fill('<span class="heart">❤</span>').join('');
}

function animateMarioJump(targetBlock) {
    const boardRect = dom.gameBoard.getBoundingClientRect();
    const blockRect = targetBlock.getBoundingClientRect();
    const marioHeight = dom.mario.offsetHeight;
    const targetX = blockRect.left - boardRect.left + (blockRect.width / 2);
    dom.mario.style.left = `${targetX}px`;
    dom.mario.style.bottom = `${dom.gameBoard.offsetHeight - blockRect.top + boardRect.top}px`;
    sounds.jump.triggerAttackRelease('C4', '0.1');
}

function showModal(message, buttonText, buttonAction) {
    dom.levelupAnimation.style.display = 'none';
    dom.modalMessage.style.display = 'block';
    dom.modalButton.style.display = 'block';
    dom.modalMessage.classList.remove('visible');
    dom.modalButton.classList.remove('visible');
    
    dom.modalMessage.textContent = message;
    dom.modalButton.textContent = buttonText;
    dom.modalMessage.classList.add('visible');
    dom.modalButton.classList.add('visible');
    
    dom.modalButton.onclick = () => {
        hideModal();
        buttonAction();
    };
    dom.modal.style.display = 'flex';
}

function hideModal() { dom.modal.style.display = 'none'; }
function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } }

function generateNumberSequence(levelData) {
    switch(levelData.type) {
        case 'sequence': return levelData.values;
        case 'sequence_by': return Array.from({length: levelData.count}, (_, i) => levelData.start + i * levelData.step);
        case 'even': return generateNumberSet(levelData.count, levelData.max, n => n % 2 === 0 && n > 0);
        case 'odd': return generateNumberSet(levelData.count, levelData.max, n => n % 2 !== 0);
        default: return [];
    }
}

function generateMathProblems(levelData) {
    const problems = [];
    for (let i = 0; i < levelData.count; i++) {
        let n1, n2, answer, text;
        const forceAddition = levelData.type === 'addition' || (levelData.type === 'mixed_ops' && Math.random() > 0.5);
        
        if (forceAddition) {
            n1 = Math.ceil(Math.random() * levelData.maxNum);
            n2 = Math.ceil(Math.random() * levelData.maxNum);
            answer = n1 + n2;
            text = `${n1}+${n2}`;
        } else { // Subtraction
            n1 = Math.ceil(Math.random() * levelData.maxNum) + levelData.maxNum;
            n2 = Math.ceil(Math.random() * levelData.maxNum);
            answer = n1 - n2;
            text = `${n1}-${n2}`;
        }
        problems.push({ text, answer });
    }
    return problems;
}

function generateNumberSet(count, max, condition) {
    const numbers = new Set();
    while(numbers.size < count) {
        const rand = Math.floor(Math.random() * max) + 1;
        if(condition(rand)) numbers.add(rand);
    }
    return Array.from(numbers).sort((a,b) => a-b);
}

function generateDistractors(correctItems, count, max, itemPool) {
    const distractors = new Set();
    const pool = itemPool || Array.from({length: max}, (_, i) => i + 1);
    while(distractors.size < count) {
        const randItem = pool[Math.floor(Math.random() * pool.length)];
        if(!correctItems.includes(randItem)) distractors.add(randItem);
    }
    return Array.from(distractors);
}

function toggleMusic() {
    if (dom.backgroundMusic.src && dom.backgroundMusic.src.includes('http')) { 
        if (gameState.musicPlaying) {
            dom.backgroundMusic.pause();
            dom.musicToggleBtn.textContent = '🔇';
        } else {
            dom.backgroundMusic.play().catch(e => console.error("Musika ezin da erreproduzitu:", e));
            dom.musicToggleBtn.textContent = '🔊';
        }
        gameState.musicPlaying = !gameState.musicPlaying;
    } else if (dom.backgroundMusic.src) { 
         if (gameState.musicPlaying) {
            dom.backgroundMusic.pause();
            dom.musicToggleBtn.textContent = '🔇';
        } else {
            dom.backgroundMusic.play().catch(e => console.error("Musika ezin da erreproduzitu:", e));
            dom.musicToggleBtn.textContent = '🔊';
        }
        gameState.musicPlaying = !gameState.musicPlaying;
    }
    else {
        console.log("Ez da musikaren URL-rik ezarri.");
    }
}

// --- JOKOAREN HASIERA ---
window.onload = () => {
    dom.musicToggleBtn.addEventListener('click', toggleMusic);
    dom.restartBtn.addEventListener('click', startGame);

    showModal('Zenbakien Jauziak', 'Jolasten Hasi!', async () => {
        await Tone.start();
        showLevelIntro();
    });

    window.addEventListener('resize', () => {
        const itemCount = dom.gameBoard.children.length;
        if (itemCount > 0) {
            setGridColumns(itemCount);
        }
    });
};
