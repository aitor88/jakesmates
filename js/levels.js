// --- JOKOAREN KONFIGURAZIOA ---
// Archivo dedicado a almacenar todos los datos de los niveles del juego.

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
