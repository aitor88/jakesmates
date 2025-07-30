// --- JOKOAREN EGOERA ---
let gameState = {
    currentLevel: 0,
    lives: gameConfig.initialLives,
    sequence: [],
    currentStep: 0,
    boardLocked: false,
    musicPlaying: false,
    currentQuestionData: null
};

// --- DOM-EKO ELEMENTUAK ---
const dom = {
    gameBoard: document.getElementById('game-board'),
    messageBar: document.getElementById('message-bar'),
    levelDisplay: document.getElementById('level-display'),
    livesDisplay: document.getElementById('lives-display'),
    heartsContainer: document.getElementById('hearts-container'),
    mario: document.getElementById('mario'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modal-content'),
    modalMessage: document.getElementById('modal-message'),
    modalButtonContainer: document.getElementById('modal-button-container'),
    levelupAnimation: document.getElementById('levelup-animation'),
    sparkleContainer: document.getElementById('sparkle-container'),
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
    sparkle: new Tone.Synth({ oscillator: { type: 'fmsine' }, envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.1 } }).toDestination()
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
    dom.gameBoard.style.display = 'grid';

    const levelArray = gameConfig.levels[gameState.currentLevel];
    if (!levelArray) {
        winGame();
        return;
    }
    gameState.currentQuestionData = levelArray[Math.floor(Math.random() * levelArray.length)];
    const levelData = gameState.currentQuestionData;

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
            displayItems = [...correctItems, ...generateDistractors(correctItems, levelData.distractors, levelData.max || 50)];
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
        // CAMBIO: Nuevos tipos de pregunta
        case 'find_result_add':
            correctItems = [levelData.question[0] + levelData.question[1]];
            displayItems = [...correctItems, ...generateDistractors(correctItems, levelData.distractors, levelData.question[0] + levelData.question[1] + 10)];
            break;
        case 'find_result_sub':
            correctItems = [levelData.question[0] - levelData.question[1]];
            displayItems = [...correctItems, ...generateDistractors(correctItems, levelData.distractors, levelData.question[0])];
            break;
        case 'find_greatest':
            const greatestNumbers = generateNumberSet(levelData.count, levelData.max, () => true);
            correctItems = [Math.max(...greatestNumbers)];
            displayItems = greatestNumbers;
            break;
        case 'find_smallest':
            const smallestNumbers = generateNumberSet(levelData.count, levelData.max, () => true);
            correctItems = [Math.min(...smallestNumbers)];
            displayItems = smallestNumbers;
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
    
    let blockValue = item; // Por defecto, el valor es el item mismo

    if (colorNames.includes(item)) { 
        blockInner.style.backgroundColor = colorMap[item].hex;
        block.dataset.color = item;
    } else { 
        content.textContent = item;
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

    const levelData = gameState.currentQuestionData;
    let isCorrect = false;

    // Lógica de validación corregida y robusta
    if (levelData.type === 'color_find') {
        if (blockValue === levelData.color) {
            isCorrect = true;
        }
    } else {
        const expectedValue = gameState.sequence[gameState.currentStep];
        if (blockValue === expectedValue) {
            isCorrect = true;
        }
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
    
    // Lógica de avance corregida
    if (gameState.currentQuestionData.type === 'color_find') {
        // En 'color_find', no usamos currentStep, sino que reducimos la secuencia
        const index = gameState.sequence.indexOf(gameState.currentQuestionData.color);
        if (index > -1) {
            gameState.sequence.splice(index, 1);
        }
    } else {
        gameState.currentStep++;
    }
    
    // Comprobación de fin de nivel unificada
    const isLevelComplete = (gameState.currentQuestionData.type === 'color_find')
        ? gameState.sequence.length === 0
        : gameState.currentStep >= gameState.sequence.length;

    if (isLevelComplete) {
        gameState.boardLocked = true;
        setTimeout(levelUp, 1000);
    }
}

function handleWrongClick() {
    sounds.wrong.triggerAttackRelease('C3', '0.5');
    gameState.boardLocked = true;
    showModal({
        message: 'Erantzun okerra!',
        buttons: [{ text: 'Jarraitu', action: () => {
            gameState.lives--;
            updateLivesDisplay();
            gameState.boardLocked = false;
            if (gameState.lives <= 0) {
                setTimeout(gameOver, 100);
            }
        }, class: 'cancel' }]
    });
}

function levelUp() {
    gameState.currentLevel++;
    const nextAction = gameConfig.levels[gameState.currentLevel] ? setupLevel : winGame;
    
    showModal({
        message: 'Maila gaindituta!',
        buttons: [{ text: 'Hurrengo Maila', action: nextAction, class: 'confirm' }],
        showAnimation: true
    });
}

function gameOver() {
    showModal({
        message: 'Uh oh! Jokoa amaitu da',
        buttons: [{ text: 'Berriro Jokatu', action: startGame, class: 'confirm' }]
    });
}

function winGame() {
    showModal({
        message: 'Zorionak! Irabazi duzu!',
        buttons: [{ text: 'Berriro Jokatu', action: startGame, class: 'confirm' }]
    });
}

// --- FUNTZIO LAGUNTZAILEAK ---

function confirmRestart() {
    showModal({
        message: 'Ziur zaude berrabiarazi nahi duzula?',
        buttons: [
            { text: 'Bai', action: startGame, class: 'confirm' },
            { text: 'Ez', action: () => {}, class: 'cancel' }
        ]
    });
}

function createSparkles() {
    dom.sparkleContainer.innerHTML = '';
    const sparkleCount = 40;
    const sparkleColors = ['#F7B000', '#FFFFFF', '#FFA500'];
    
    sounds.sparkle.triggerAttackRelease('C6', '0.2');

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 120 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--x', `${x}px`);
        sparkle.style.setProperty('--y', `${y}px`);
        sparkle.style.setProperty('--color', sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
        sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
        sparkle.style.width = `${Math.random() * 8 + 4}px`;
        sparkle.style.height = sparkle.style.width;
        
        dom.sparkleContainer.appendChild(sparkle);
    }
}

function setGridColumns(itemCount) {
    const cols = Math.ceil(Math.sqrt(itemCount));
    dom.gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}


function updateLivesDisplay() {
    dom.heartsContainer.innerHTML = '';
    for (let i = 0; i < gameState.lives; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = '❤';
        dom.heartsContainer.appendChild(heart);
    }
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

function showModal({ message, buttons, showAnimation = false }) {
    dom.modalMessage.style.display = 'none';
    dom.modalButtonContainer.innerHTML = '';
    dom.levelupAnimation.style.display = 'none';
    dom.modalContent.classList.remove('shake');
    
    const displayContent = () => {
        dom.modalMessage.textContent = message;
        dom.modalMessage.style.display = 'block';
        dom.modalMessage.classList.add('visible');
        
        buttons.forEach((btnInfo, index) => {
            const button = document.createElement('button');
            button.textContent = btnInfo.text;
            button.classList.add('modal-button', `modal-button-${btnInfo.class}`);
            button.onclick = () => {
                hideModal();
                btnInfo.action();
            };
            dom.modalButtonContainer.appendChild(button);
            setTimeout(() => button.classList.add('visible'), 100 * index);
        });
    };

    if (showAnimation) {
        dom.levelupAnimation.style.display = 'block';
        dom.levelupAnimation.classList.add('play');
        setTimeout(() => dom.modalContent.classList.add('shake'), 900);
        setTimeout(() => {
            dom.modalContent.classList.remove('shake');
            createSparkles();
            sounds.levelUp.triggerAttackRelease('C5', '0.4');
        }, 1200);
        setTimeout(() => {
            dom.levelupAnimation.style.display = 'none';
            dom.levelupAnimation.classList.remove('play');
            displayContent();
        }, 2500);
    } else {
        displayContent();
    }

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

// --- JOKOAREN HASIERA ---
window.onload = () => {
    dom.restartBtn.addEventListener('click', confirmRestart);

    showModal({
        message: 'Zenbakien Jauziak',
        buttons: [{ text: 'Jolasten Hasi!', action: async () => {
            await Tone.start();
            if (dom.backgroundMusic.src && dom.backgroundMusic.src !== window.location.href) {
                dom.backgroundMusic.play().catch(e => console.error("Musika ezin da erreproduzitu:", e));
            }
            startGame();
        }, class: 'confirm' }]
    });

    window.addEventListener('resize', () => {
        const itemCount = dom.gameBoard.children.length;
        if (itemCount > 0) {
            setGridColumns(itemCount);
        }
    });

    document.body.addEventListener('touchmove', function(event) {
        // Se permite el comportamiento por defecto
    }, { passive: true });
};
