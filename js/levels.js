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
            { type: 'find_smallest', count: 4, max: 10, message: 'Zein da txikiena?' },
            { type: 'color_find', color: 'URDINA', count: 2, distractors: 2, message: 'Sakatu 2 URDIN' },
            { type: 'find_result_add', question: [1, 2], distractors: 3, message: 'Zenbat da 1 + 2?' }
        ],
        // 2. MAILA (2x2)
        [
            { type: 'sequence', values: [1, 2, 3], distractors: 1, message: 'Sakatu ordenan: 1, 2, 3' },
            { type: 'sequence', values: [4, 3, 2], distractors: 1, message: 'Atzerantz: 4, 3, 2' },
            { type: 'color_find', color: 'BERDEA', count: 3, distractors: 1, message: 'Sakatu 3 BERDE' },
            { type: 'find_greatest', count: 4, max: 10, message: 'Zein da handiena?' },
            { type: 'find_result_sub', question: [5, 2], distractors: 3, message: 'Zenbat da 5 - 2?' }
        ],
        // 3. MAILA (3x3)
        [
            { type: 'sequence', values: [1, 2, 3, 4], distractors: 5, message: 'Sakatu ordenan: 1, 2, 3, 4' },
            { type: 'color_find', color: 'HORIA', count: 4, distractors: 5, message: 'Sakatu 4 HORI' },
            { type: 'find_result_add', question: [3, 4], distractors: 8, message: 'Zenbat da 3 + 4?' },
            { type: 'sequence', values: [5, 6, 7], distractors: 6, message: 'Sakatu ordenan: 5, 6, 7' },
            { type: 'find_smallest', count: 9, max: 20, message: 'Zein da txikiena?' }
        ],
        // 4. MAILA (3x3)
        [
            { type: 'even', count: 5, max: 10, distractors: 4, message: 'Sakatu 5 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 5, max: 11, distractors: 4, message: 'Sakatu 5 BAKOITI, txikienetik handienera' },
            { type: 'sequence', values: [8, 7, 6, 5], distractors: 5, message: 'Atzerantz: 8, 7, 6, 5' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA'], distractors: 6, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence_by', start: 2, step: 2, count: 4, distractors: 5, message: 'Jarraitu seriea: 2, 4...' }
        ],
        // 5. MAILA (3x3)
        [
            { type: 'find_result_add', question: [5, 4], distractors: 8, message: 'Zenbat da 5 + 4?' },
            { type: 'find_result_sub', question: [9, 3], distractors: 8, message: 'Zenbat da 9 - 3?' },
            { type: 'sequence', values: [10, 11, 12, 13], distractors: 5, message: 'Sakatu ordenan: 10...13' },
            { type: 'sequence_by', start: 10, step: 10, count: 4, distractors: 5, message: 'Jarraitu seriea: 10, 20...' },
            { type: 'color_find', color: 'MOREA', count: 5, distractors: 4, message: 'Sakatu 5 MORE' }
        ],
        // 6. MAILA (3x3)
        [
            { type: 'sequence', values: [10, 11, 12, 13, 14], distractors: 4, message: 'Sakatu ordenan: 10...14' },
            { type: 'even', count: 6, max: 12, distractors: 3, message: 'Sakatu 6 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 6, max: 13, distractors: 3, message: 'Sakatu 6 BAKOITI, txikienetik handienera' },
            { type: 'color_find', color: 'LARANJA', count: 6, distractors: 3, message: 'Sakatu 6 LARANJA' },
            { type: 'sequence', values: [9, 10, 11, 12, 13], distractors: 4, message: 'Sakatu ordenan: 9...13' }
        ],
        // 7. MAILA (4x4)
        [
            { type: 'find_result_add', question: [8, 7], distractors: 15, message: 'Zenbat da 8 + 7?' },
            { type: 'sequence', values: [15, 14, 13, 12, 11], distractors: 11, message: 'Atzerantz: 15...11' },
            { type: 'color_sequence', values: ['URDINA', 'GORRIA', 'URDINA', 'BERDEA'], distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'find_result_sub', question: [15, 6], distractors: 15, message: 'Zenbat da 15 - 6?' },
            { type: 'sequence', values: [15, 16, 17, 18], distractors: 12, message: 'Sakatu ordenan: 15...18' }
        ],
        // 8. MAILA (4x4)
        [
            { type: 'sequence_by', start: 5, step: 5, count: 6, distractors: 10, message: 'Jarraitu seriea: 5, 10...' },
            { type: 'find_greatest', count: 16, max: 50, message: 'Zein da handiena?' },
            { type: 'color_find', color: 'GORRIA', count: 8, distractors: 8, message: 'Sakatu GORRI guztiak' },
            { type: 'sequence_by', start: 3, step: 3, count: 5, distractors: 11, message: 'Jarraitu seriea: 3, 6...' },
            { type: 'find_smallest', count: 16, max: 50, message: 'Zein da txikiena?' }
        ],
        // 9. MAILA (4x4)
        [
            { type: 'find_result_add', question: [10, 9], distractors: 15, message: 'Zenbat da 10 + 9?' },
            { type: 'sequence', values: [20, 21, 22, 23, 24], distractors: 11, message: 'Sakatu ordenan: 20...24' },
            { type: 'even', count: 9, max: 20, distractors: 7, message: 'Sakatu 9 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 9, max: 21, distractors: 7, message: 'Sakatu 9 BAKOITI, txikienetik handienera' },
            { type: 'find_result_sub', question: [18, 7], distractors: 15, message: 'Zenbat da 18 - 7?' }
        ],
        // 10. MAILA (4x4)
        [
            { type: 'color_sequence', values: ['G', 'U', 'B', 'H'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence', values: [30, 29, 28, 27, 26], distractors: 11, message: 'Atzerantz: 30...26' },
            { type: 'sequence_by', start: 10, step: 10, count: 5, distractors: 11, message: 'Jarraitu seriea: 10, 20...' },
            { type: 'color_sequence', values: ['U', 'H', 'U', 'G'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 12, message: 'Jarraitu koloreen ordena' },
            { type: 'sequence', values: [28, 29, 30, 31, 32], distractors: 11, message: 'Sakatu ordenan: 28...32' }
        ],
        // 11. MAILA (4x4)
        [
            { type: 'find_result_add', question: [11, 8], distractors: 15, message: 'Zenbat da 11 + 8?' },
            { type: 'find_result_sub', question: [20, 5], distractors: 15, message: 'Zenbat da 20 - 5?' },
            { type: 'sequence', values: [21, 22, 23, 24], distractors: 12, message: 'Sakatu ordenan: 21...24' },
            { type: 'even', count: 8, max: 16, distractors: 8, message: 'Sakatu 8 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 8, max: 17, distractors: 8, message: 'Sakatu 8 BAKOITI, txikienetik handienera' }
        ],
        // 12. MAILA (4x4)
        [
            { type: 'sequence_by', start: 4, step: 4, count: 5, distractors: 11, message: 'Jarraitu seriea: 4, 8...' },
            { type: 'find_greatest', count: 16, max: 60, message: 'Zein da handiena?' },
            { type: 'sequence', values: [25, 24, 23, 22, 21], distractors: 11, message: 'Atzerantz: 25...21' },
            { type: 'color_find', color: 'HORIA', count: 9, distractors: 7, message: 'Sakatu 9 HORI' },
            { type: 'sequence_by', start: 6, step: 6, count: 4, distractors: 12, message: 'Jarraitu seriea: 6, 12...' }
        ],
        // 13. MAILA (4x4)
        [
            { type: 'color_sequence', values: ['G', 'G', 'U', 'U'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 12, message: 'Jarraitu: G, G, U, U' },
            { type: 'find_result_add', question: [15, 5], distractors: 15, message: 'Zenbat da 15 + 5?' },
            { type: 'find_result_sub', question: [22, 7], distractors: 15, message: 'Zenbat da 22 - 7?' },
            { type: 'sequence', values: [30, 31, 32, 33], distractors: 12, message: 'Sakatu ordenan: 30...33' },
            { type: 'color_sequence', values: ['B', 'H', 'G'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 13, message: 'Jarraitu koloreen ordena' }
        ],
        // 14. MAILA (4x4)
        [
            { type: 'even', count: 10, max: 20, distractors: 6, message: 'Sakatu 10 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 10, max: 21, distractors: 6, message: 'Sakatu 10 BAKOITI, txikienetik handienera' },
            { type: 'sequence', values: [35, 34, 33, 32], distractors: 12, message: 'Atzerantz: 35...32' },
            { type: 'find_smallest', count: 16, max: 40, message: 'Zein da txikiena?' },
            { type: 'color_find', color: 'BERDEA', count: 10, distractors: 6, message: 'Sakatu 10 BERDE' }
        ],
        // 15. MAILA (5x5)
        [
            { type: 'find_result_add', question: [12, 13], distractors: 24, message: 'Zenbat da 12 + 13?' },
            { type: 'find_result_sub', question: [20, 8], distractors: 24, message: 'Zenbat da 20 - 8?' },
            { type: 'sequence_by', start: 4, step: 4, count: 7, distractors: 18, message: 'Jarraitu seriea: 4, 8...' },
            { type: 'sequence', values: [40, 41, 42, 43, 44, 45], distractors: 19, message: 'Sakatu ordenan: 40...45' },
            { type: 'find_smallest', count: 25, max: 50, message: 'Zein da txikiena?' }
        ],
        // 16. MAILA (5x5)
        [
            { type: 'sequence', values: [45, 44, 43, 42, 41, 40, 39], distractors: 18, message: 'Atzerantz: 45...39' },
            { type: 'color_sequence', values: ['M', 'L', 'B', 'H'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 21, message: 'Jarraitu koloreak' },
            { type: 'find_greatest', count: 25, max: 80, message: 'Zein da handiena?' },
            { type: 'even', count: 12, max: 24, distractors: 13, message: 'Sakatu 12 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 12, max: 25, distractors: 13, message: 'Sakatu 12 BAKOITI, txikienetik handienera' }
        ],
        // 17. MAILA (5x5)
        [
            { type: 'find_result_add', question: [20, 15], distractors: 24, message: 'Zenbat da 20 + 15?' },
            { type: 'find_result_sub', question: [30, 11], distractors: 24, message: 'Zenbat da 30 - 11?' },
            { type: 'sequence', values: [50, 51, 52, 53], distractors: 21, message: 'Sakatu ordenan: 50...53' },
            { type: 'color_find', color: 'URDINA', count: 13, distractors: 12, message: 'Sakatu 13 URDIN' },
            { type: 'sequence', values: [45, 46, 47, 48, 49], distractors: 20, message: 'Sakatu ordenan: 45...49' }
        ],
        // 18. MAILA (5x5)
        [
            { type: 'sequence', values: [60, 59, 58, 57, 56], distractors: 20, message: 'Atzerantz: 60...56' },
            { type: 'find_smallest', count: 25, max: 100, message: 'Zein da txikiena?' },
            { type: 'sequence_by', start: 3, step: 3, count: 8, distractors: 17, message: 'Jarraitu seriea: 3, 6...' },
            { type: 'color_sequence', values: ['G', 'U', 'G', 'U', 'G'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 20, message: 'Jarraitu sekuentzia' },
            { type: 'sequence_by', start: 11, step: 1, count: 8, distractors: 17, message: 'Sakatu ordenan: 11...18' }
        ],
        // 19. MAILA (5x5)
        [
            { type: 'even', count: 14, max: 28, distractors: 11, message: 'Sakatu 14 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 14, max: 29, distractors: 11, message: 'Sakatu 14 BAKOITI, txikienetik handienera' },
            { type: 'find_result_add', question: [22, 11], distractors: 24, message: 'Zenbat da 22 + 11?' },
            { type: 'find_result_sub', question: [35, 15], distractors: 24, message: 'Zenbat da 35 - 15?' },
            { type: 'sequence', values: [70, 69, 68, 67], distractors: 21, message: 'Atzerantz: 70...67' }
        ],
        // 20. MAILA (5x5)
        [
            { type: 'find_greatest', count: 25, max: 150, message: 'Zein da handiena?' },
            { type: 'sequence', values: [70, 71, 72, 73, 74, 75], distractors: 19, message: 'Sakatu ordenan: 70...75' },
            { type: 'color_sequence', values: ['G', 'B', 'U', 'H', 'M'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 20, message: 'Jarraitu kolore guztiak' },
            { type: 'sequence_by', start: 100, step: -10, count: 7, distractors: 18, message: 'Atzerantz 10etik 10era' },
            { type: 'find_smallest', count: 25, max: 150, message: 'Zein da txikiena?' }
        ],
        // 21. MAILA (5x5)
        [
            { type: 'sequence', values: [81, 82, 83, 84, 85], distractors: 20, message: 'Sakatu ordenan: 81...85' },
            { type: 'find_result_add', question: [30, 25], distractors: 24, message: 'Zenbat da 30 + 25?' },
            { type: 'color_find', color: 'HORIA', count: 14, distractors: 11, message: 'Sakatu 14 HORI' },
            { type: 'find_result_sub', question: [45, 12], distractors: 24, message: 'Zenbat da 45 - 12?' },
            { type: 'sequence', values: [90, 89, 88, 87], distractors: 21, message: 'Atzerantz: 90...87' }
        ],
        // 22. MAILA (6x6)
        [
            { type: 'find_greatest', count: 36, max: 100, message: 'Zein da handiena?' },
            { type: 'even', count: 18, max: 36, distractors: 18, message: 'Sakatu 18 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 18, max: 37, distractors: 18, message: 'Sakatu 18 BAKOITI, txikienetik handienera' },
            { type: 'sequence_by', start: 20, step: -2, count: 10, distractors: 26, message: 'Atzerantz 2tik 2ra' },
            { type: 'color_sequence', values: ['U', 'M', 'U', 'M', 'U'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 31, message: 'Jarraitu sekuentzia' }
        ],
        // 23. MAILA (6x6)
        [
            { type: 'sequence', values: [88, 89, 90, 91, 92, 93], distractors: 30, message: 'Sakatu ordenan: 88...93' },
            { type: 'find_result_add', question: [40, 30], distractors: 35, message: 'Zenbat da 40 + 30?' },
            { type: 'find_result_sub', question: [60, 25], distractors: 35, message: 'Zenbat da 60 - 25?' },
            { type: 'sequence', values: [99, 98, 97, 96, 95], distractors: 31, message: 'Atzerantz: 99...95' },
            { type: 'find_smallest', count: 36, max: 100, message: 'Zein da txikiena?' }
        ],
        // 24. MAILA (6x6)
        [
            { type: 'color_find', color: 'LARANJA', count: 18, distractors: 18, message: 'Sakatu 18 LARANJA' },
            { type: 'sequence_by', start: 25, step: 25, count: 6, distractors: 30, message: 'Jarraitu seriea: 25, 50...' },
            { type: 'sequence', values: [100, 99, 98, 97, 96, 95], distractors: 30, message: 'Atzerantz: 100...95' },
            { type: 'even', count: 20, max: 40, distractors: 16, message: 'Sakatu 20 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 20, max: 41, distractors: 16, message: 'Sakatu 20 BAKOITI, txikienetik handienera' }
        ],
        // 25. MAILA (6x6)
        [
            { type: 'find_greatest', count: 36, max: 500, message: 'Zein da handiena?' },
            { type: 'sequence', values: [101, 102, 103, 104, 105], distractors: 31, message: 'Sakatu ordenan: 101...105' },
            { type: 'color_sequence', values: ['G', 'U', 'B', 'G', 'U', 'B'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 30, message: 'Jarraitu sekuentzia luzea' },
            { type: 'find_result_add', question: [50, 50], distractors: 35, message: 'Zenbat da 50 + 50?' },
            { type: 'find_result_sub', question: [100, 25], distractors: 35, message: 'Zenbat da 100 - 25?' }
        ],
        // 26. MAILA (6x6)
        [
            { type: 'sequence', values: [110, 111, 112, 113, 114], distractors: 31, message: 'Sakatu ordenan: 110...114' },
            { type: 'sequence_by', start: 50, step: -5, count: 8, distractors: 28, message: 'Atzerantz 5etik 5era' },
            { type: 'find_smallest', count: 36, max: 200, message: 'Zein da txikiena?' },
            { type: 'color_find', color: 'MOREA', count: 20, distractors: 16, message: 'Sakatu 20 MORE' },
            { type: 'sequence', values: [120, 119, 118, 117], distractors: 32, message: 'Atzerantz: 120...117' }
        ],
        // 27. MAILA (6x6)
        [
            { type: 'even', count: 22, max: 44, distractors: 14, message: 'Sakatu 22 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 22, max: 45, distractors: 14, message: 'Sakatu 22 BAKOITI, txikienetik handienera' },
            { type: 'find_result_add', question: [60, 40], distractors: 35, message: 'Zenbat da 60 + 40?' },
            { type: 'find_result_sub', question: [100, 30], distractors: 35, message: 'Zenbat da 100 - 30?' },
            { type: 'find_greatest', count: 36, max: 1000, message: 'Zein da handiena?' }
        ],
        // 28. MAILA (6x6)
        [
            { type: 'sequence', values: [130, 131, 132, 133, 134, 135], distractors: 30, message: 'Sakatu ordenan: 130...135' },
            { type: 'color_sequence', values: ['G', 'H', 'U', 'B', 'G', 'H'].map(c => colorNames.find(name => name.startsWith(c))), distractors: 30, message: 'Jarraitu sekuentzia' },
            { type: 'sequence_by', start: 100, step: -2, count: 12, distractors: 24, message: 'Atzerantz 2tik 2ra' },
            { type: 'find_smallest', count: 36, max: 150, message: 'Zein da txikiena?' },
            { type: 'sequence', values: [150, 149, 148, 147, 146], distractors: 31, message: 'Atzerantz: 150...146' }
        ],
        // 29. MAILA (6x6)
        [
            { type: 'find_result_add', question: [75, 25], distractors: 35, message: 'Zenbat da 75 + 25?' },
            { type: 'find_result_sub', question: [90, 45], distractors: 35, message: 'Zenbat da 90 - 45?' },
            { type: 'even', count: 24, max: 48, distractors: 12, message: 'Sakatu 24 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 24, max: 49, distractors: 12, message: 'Sakatu 24 BAKOITI, txikienetik handienera' },
            { type: 'find_greatest', count: 36, max: 300, message: 'Zein da handiena?' }
        ],
        // 30. MAILA (6x6)
        [
            { type: 'find_result_add', question: [100, 100], distractors: 35, message: 'Azken erronka: 100 + 100?' },
            { type: 'sequence', values: [200, 199, 198, 197, 196, 195], distractors: 30, message: 'Atzerantz: 200...195' },
            { type: 'even', count: 25, max: 50, distractors: 11, message: 'Sakatu 25 BIKOITI, txikienetik handienera' },
            { type: 'odd', count: 25, max: 51, distractors: 11, message: 'Sakatu 25 BAKOITI, txikienetik handienera' },
            { type: 'sequence_by', start: 25, step: 25, count: 10, distractors: 26, message: 'Jarraitu seriea: 25, 50...' }
        ]
    ]
};
