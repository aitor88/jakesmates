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
        // 1. MAILA (2x2)
        [
            { type: 'sequence', values: [1, 2], distractors: 2, message: 'Sakatu ordenan: 1, 2' },
            { type: 'color_find', color: 'GORRIA', count: 2, distractors: 2, message: 'Sakatu 2 GORRI' },
            { type: 'sequence', values: [3, 4], distractors: 2, message: 'Sakatu ordenan: 3, 4' },
            { type: 'color_find', color: 'URDINA', count: 2, distractors: 2, message: 'Sakatu 2 URDIN' },
            { type: 'addition', count: 1, maxNum: 2, distractors: 3, message: 'Ebatzi gehiketa' }
        ],
        // 2. MAILA (2x2)
        [
            { type: 'sequence', values: [1, 2, 3], distractors: 1, message: 'Sakatu ordenan: 1, 2, 3' },
            { type: 'sequence', values: [4, 3, 2], distractors: 1, message: 'Atzerantz: 4, 3, 2' },
            { type: 'color_find', color: 'BERDEA', count: 3, distractors: 1, message: 'Sakatu 3 BERDE' },
            { type: 'even', count: 2, max: 4, distractors: 2, message: 'Aukeratu BIKOITIAK' },
            { type: 'odd', count: 2, max: 5, distractors: 2, message: 'Aukeratu BAKOITIAK' }
        ],
        // 3. MAILA (3x3)
        [
            { type: 'sequence', values: [1, 2, 3, 4], distractors: 5, message: 'Sakatu ordenan: 1, 2, 3, 4' },
            { type: 'color_find', color: 'HORIA', count: 4, distractors: 5, message: 'Sakatu 4 HORI' },
            { type: 'addition', count: 3, maxNum: 4, distractors: 6, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [5, 6, 7], distractors: 6, message: 'Sakatu ordenan: 5, 6, 7' },
            { type: 'subtraction', count: 3, maxNum: 5, distractors: 6, message: 'Emaitza txikienetik handienera' }
        ],
        // 4. MAILA (3x3)
        [
            { type: 'even', count: 5, max: 10, distractors: 4, message: 'Aukeratu 5 BIKOITI' },
            { type: 'odd', count: 5, max: 11, distractors: 4, message: 'Aukeratu 5 BAKOITI' },
            { type: 'sequence', values: [8, 7, 6, 5], distractors: 5, message: 'Atzerantz: 8, 7, 6, 5' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA'], distractors: 6, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence_by', start: 2, step: 2, count: 4, distractors: 5, message: 'Jarraitu seriea: 2, 4...' }
        ],
        // 5. MAILA (3x3)
        [
            { type: 'addition', count: 4, maxNum: 6, distractors: 5, message: 'Emaitza txikienetik handienera' },
            { type: 'subtraction', count: 4, maxNum: 8, distractors: 5, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [10, 11, 12, 13], distractors: 5, message: 'Sakatu ordenan: 10...13' },
            { type: 'sequence_by', start: 10, step: 10, count: 4, distractors: 5, message: 'Jarraitu seriea: 10, 20...' },
            { type: 'color_find', color: 'MOREA', count: 5, distractors: 4, message: 'Sakatu 5 MORE' }
        ],
        // 6. MAILA (3x3)
        [
            { type: 'sequence', values: [10, 11, 12, 13, 14], distractors: 4, message: 'Sakatu ordenan: 10...14' },
            { type: 'even', count: 6, max: 12, distractors: 3, message: 'Aukeratu 6 BIKOITI' },
            { type: 'odd', count: 6, max: 13, distractors: 3, message: 'Aukeratu 6 BAKOITI' },
            { type: 'color_find', color: 'LARANJA', count: 6, distractors: 3, message: 'Sakatu 6 LARANJA' },
            { type: 'sequence', values: [9, 10, 11, 12, 13], distractors: 4, message: 'Sakatu ordenan: 9...13' }
        ],
        // 7. MAILA (4x4)
        [
            { type: 'addition', count: 5, maxNum: 10, distractors: 11, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [15, 14, 13, 12, 11], distractors: 11, message: 'Atzerantz: 15...11' },
            { type: 'color_sequence', values: ['URDINA', 'GORRIA', 'URDINA', 'BERDEA'], distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'subtraction', count: 5, maxNum: 12, distractors: 11, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [15, 16, 17, 18], distractors: 12, message: 'Sakatu ordenan: 15...18' }
        ],
        // 8. MAILA (4x4)
        [
            { type: 'sequence_by', start: 5, step: 5, count: 6, distractors: 10, message: 'Jarraitu seriea: 5, 10...' },
            { type: 'mixed_ops', count: 6, maxNum: 10, distractors: 10, message: 'Emaitza txikienetik handienera' },
            { type: 'color_find', color: 'GORRIA', count: 8, distractors: 8, message: 'Sakatu GORRI guztiak' },
            { type: 'sequence_by', start: 3, step: 3, count: 5, distractors: 11, message: 'Jarraitu seriea: 3, 6...' },
            { type: 'subtraction', count: 6, maxNum: 15, distractors: 10, message: 'Emaitza txikienetik handienera' }
        ],
        // 9. MAILA (4x4)
        [
            { type: 'mixed_ops', count: 7, maxNum: 12, distractors: 9, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [20, 21, 22, 23, 24], distractors: 11, message: 'Sakatu ordenan: 20...24' },
            { type: 'even', count: 9, max: 20, distractors: 7, message: 'Aukeratu 9 BIKOITI' },
            { type: 'odd', count: 9, max: 21, distractors: 7, message: 'Aukeratu 9 BAKOITI' },
            { type: 'mixed_ops', count: 7, maxNum: 13, distractors: 9, message: 'Emaitza txikienetik handienera' }
        ],
        // 10. MAILA (4x4)
        [
            { type: 'color_sequence', values: ['G', 'U', 'B', 'H'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence', values: [30, 29, 28, 27, 26], distractors: 11, message: 'Atzerantz: 30...26' },
            { type: 'sequence_by', start: 10, step: 10, count: 5, distractors: 11, message: 'Jarraitu seriea: 10, 20...' },
            { type: 'color_sequence', values: ['U', 'H', 'U', 'G'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence', values: [28, 29, 30, 31, 32], distractors: 11, message: 'Sakatu ordenan: 28...32' }
        ],
        // 15. MAILA (5x5)
        [
            { type: 'addition', count: 8, maxNum: 20, distractors: 17, message: 'Emaitza txikienetik handienera' },
            { type: 'subtraction', count: 8, maxNum: 25, distractors: 17, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence_by', start: 4, step: 4, count: 7, distractors: 18, message: 'Jarraitu seriea: 4, 8...' },
            { type: 'sequence', values: [40, 41, 42, 43, 44, 45], distractors: 19, message: 'Sakatu ordenan: 40...45' },
            { type: 'mixed_ops', count: 9, maxNum: 15, distractors: 16, message: 'Emaitza txikienetik handienera' }
        ],
        // 20. MAILA (5x5)
        [
            { type: 'sequence', values: [60, 59, 58, 57, 56, 55, 54], distractors: 18, message: 'Atzerantz: 60...54' },
            { type: 'even', count: 13, max: 26, distractors: 12, message: 'Aukeratu 13 BIKOITI' },
            { type: 'odd', count: 13, max: 27, distractors: 12, message: 'Aukeratu 13 BAKOITI' },
            { type: 'mixed_ops', count: 12, maxNum: 30, distractors: 13, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence_by', start: 100, step: -5, count: 8, distractors: 17, message: 'Atzerantz 5etik 5era' }
        ],
        // 25. MAILA (6x6)
        [
            { type: 'addition', count: 15, maxNum: 40, distractors: 21, message: 'Emaitza txikienetik handienera' },
            { type: 'subtraction', count: 15, maxNum: 50, distractors: 21, message: 'Emaitza txikienetik handienera' },
            { type: 'sequence', values: [100, 101, 102, 103, 104, 105, 106], distractors: 29, message: 'Sakatu ordenan: 100...106' },
            { type: 'mixed_ops', count: 16, maxNum: 40, distractors: 20, message: 'Emaitza txikienetik handienera' },
            { type: 'color_sequence', values: ['G', 'U', 'B', 'H', 'L', 'M', 'G'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 29, message: 'Jarraitu koloreen ordena' }
        ],
        // 30. MAILA (6x6)
        [
            { type: 'mixed_ops', count: 18, maxNum: 50, distractors: 18, message: 'Azken erronka: Emaitza txikienetik handienera' },
            { type: 'sequence', values: [200, 199, 198, 197, 196, 195], distractors: 30, message: 'Atzerantz: 200...195' },
            { type: 'even', count: 20, max: 40, distractors: 16, message: 'Aukeratu 20 BIKOITI' },
            { type: 'odd', count: 20, max: 41, distractors: 16, message: 'Aukeratu 20 BAKOITI' },
            { type: 'sequence_by', start: 25, step: 25, count: 10, distractors: 26, message: 'Jarraitu seriea: 25, 50...' }
        ]
    ]
};
