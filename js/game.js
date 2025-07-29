// --- JOKOAREN KONFIGURAZIOA ---
const colorMap = {
    GORRIA: { name: 'GORRIA', hex: '#E52521' },
    URDINA: { name: 'URDINA', hex: '#3A5CFF' },
    BERDEA: { name: 'BERDEA', hex: '#4CAF50' },
    HORIA: { name: 'HORIA', hex: '#F7B000' },
    LARANJA: { name: 'LARANJA', hex: '#FFA500' },
    MOREA: { name: 'MOREA', hex: '#800080' },
};
const colorNames = Object.keys(colorMap);

const gameConfig = {
    initialLives: 3,
    levels: [
        // Oinarrizkoak
        { type: 'sequence', values: [1, 2, 3], distractors: 3, message: 'Egin salto 1etik 3ra ordenan' }, // 1
        { type: 'color_find', color: 'GORRIA', count: 3, distractors: 4, message: 'Aurkitu 3 bloke GORRI' }, // 2
        { type: 'sequence', values: [1, 2, 3, 4, 5], distractors: 3, message: 'Orain 1etik 5era' }, // 3
        { type: 'even', count: 4, max: 10, distractors: 4, message: 'Salto egin zenbaki BIKOITIETAN!' }, // 4
        { type: 'odd', count: 4, max: 10, distractors: 4, message: 'Orain zenbaki BAKOITIETAN!' }, // 5
        // Zailtasun ertaina
        { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA'], distractors: 4, message: 'Jarraitu sekuentzia: GORRI, URDIN, BERDE' }, // 6
        { type: 'sequence', values: [8, 7, 6, 5], distractors: 4, message: 'Atzerantz! 8tik 5era' }, // 7
        { type: 'addition', count: 4, maxNum: 5, distractors: 4, message: 'Ebatzi GEHIKETAK!' }, // 8
        { type: 'sequence_by', start: 2, step: 2, count: 5, distractors: 3, message: '2tik 2ra zenbatzen' }, // 9
        { type: 'color_find', color: 'BERDEA', count: 4, distractors: 5, message: 'Aurkitu 4 bloke BERDE' }, // 10
        // Zailagoak
        { type: 'subtraction', count: 4, maxNum: 10, distractors: 4, message: 'Ebatzi KENKETAK!' }, // 11
        { type: 'sequence_by', start: 5, step: 5, count: 4, distractors: 4, message: '5etik 5era zenbatzen' }, // 12
        { type: 'sequence', values: [11, 12, 13, 14, 15], distractors: 4, message: 'Jarraitu 11tik 15era!' }, // 13
        { type: 'color_sequence', values: ['HORIA', 'BERDEA', 'URDINA', 'GORRIA'], distractors: 3, message: 'Sekuentzia luzeagoa!' }, // 14
        { type: 'addition', count: 5, maxNum: 10, distractors: 4, message: 'Gehiketa zailagoak!' }, // 15
        // Aditu maila
        { type: 'sequence_by', start: 10, step: 10, count: 5, distractors: 3, message: '10etik 10era, 50era arte!' }, // 16
        { type: 'subtraction', count: 5, maxNum: 15, distractors: 4, message: 'Kenketa gehiago!' }, // 17
        { type: 'sequence', values: [20, 19, 18, 17, 16, 15], distractors: 4, message: 'Atzerantz 20tik!' }, // 18
        { type: 'color_find', color: 'URDINA', count: 5, distractors: 5, message: 'Aurkitu 5 bloke URDIN' }, // 19
        { type: 'mixed_ops', count: 5, maxNum: 12, distractors: 4, message: 'Azken erronka: ebatzi denak!' }, // 20
    ]
};

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
    backgroundMusic: document.getElementById('background-music')
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
    setupLevel();
}

function setupLevel() {
    gameState.currentStep = 0;
    gameState.boardLocked = false;
    dom.gameBoard.innerHTML = '';

    const levelData = gameConfig.levels[gameState.currentLevel];
    if (!levelData) {
        winGame();
        return;
    }

    dom.messageBar.textContent = levelData.message;
    dom.levelDisplay.textContent = `Maila: ${gameState.currentLevel + 1}`;
    
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
    
    // CAMBIO: La lógica de la cuadrícula se aplica ANTES de crear los bloques
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

    const levelData = gameConfig.levels[gameState.currentLevel];
    let expectedValue = gameState.sequence[gameState.currentStep];
    if (typeof expectedValue === 'object') expectedValue = expectedValue.answer;

    let isCorrect = false;
    if (levelData.type === 'color_find') {
        if (blockValue === levelData.color) isCorrect = true;
    } else if (levelData.type === 'color_sequence') {
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

    dom.levelupAnimation.style.display = 'block';
    dom.levelupAnimation.classList.add('play');

    sounds.swoosh.triggerAttack(Tone.now() + 0.7);
    sounds.levelUp.triggerAttackRelease('C5', '0.4', Tone.now() + 0.8);
    
    setTimeout(createConfetti, 800);

    setTimeout(() => {
        dom.levelupAnimation.style.display = 'none';
        dom.levelupAnimation.classList.remove('play');

        dom.modalMessage.textContent = 'Maila gaindituta!';
        dom.modalButton.textContent = 'Hurrengo Maila';
        dom.modalMessage.style.display = 'block';
        dom.modalButton.style.display = 'block';

        dom.modalButton.onclick = () => {
            hideModal();
            if (gameConfig.levels[gameState.currentLevel]) {
                 setupLevel();
            } else {
                 winGame();
            }
        };
    }, 2000);
}

function gameOver() {
    showModal('Uh oh! Jokoa amaitu da', 'Berriro Jokatu', startGame);
}

function winGame() {
    showModal('Zorionak! Irabazi duzu!', 'Berriro Jokatu', startGame);
}

// --- FUNTZIO LAGUNTZAILEAK ---

function createConfetti() {
    dom.confettiContainer.innerHTML = '';
    const confettiCount = 30;
    const confettiColors = ['#E52521', '#3A5CFF', '#F7B000', '#4CAF50', '#FFFFFF'];
    
    sounds.confetti.triggerAttackRelease('C6', '0.2');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        
        confetti.style.setProperty('--x', `${x}px`);
        confetti.style.setProperty('--y', `${y}px`);
        confetti.style.setProperty('--color', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
        confetti.style.animationDelay = `${Math.random() * 0.2}s`;
        
        dom.confettiContainer.appendChild(confetti);
    }
}

/**
 * CAMBIO: Lógica simplificada para crear siempre una cuadrícula cuadrada (NxN).
 */
function setGridColumns(itemCount) {
    // Calcula la raíz cuadrada y la redondea hacia arriba para obtener el tamaño del lado.
    // Ej: 9 items -> sqrt(9) = 3 -> 3x3.
    // Ej: 10 items -> sqrt(10) = 3.16 -> ceil = 4 -> 4x4.
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
    
    dom.modalMessage.textContent = message;
    dom.modalButton.textContent = buttonText;
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
    showModal('Zenbakien Jauziak', 'Jolasten Hasi!', async () => {
        await Tone.start();
        startGame();
    });

    window.addEventListener('resize', () => {
        const itemCount = dom.gameBoard.children.length;
        if (itemCount > 0) {
            setGridColumns(itemCount);
        }
    });
};
