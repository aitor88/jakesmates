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
        // 1. MAILA
        [
            { type: 'sequence', values: [1, 2, 3], distractors: 3, message: 'Jarraitu sekuentzia: 1, 2, 3' },
            { type: 'sequence', values: [2, 3, 4], distractors: 3, message: 'Jarraitu sekuentzia: 2, 3, 4' },
            { type: 'color_find', color: 'GORRIA', count: 3, distractors: 3, message: 'Aurkitu 3 bloke GORRI' },
            { type: 'sequence', values: [1, 2], distractors: 4, message: 'Jarraitu sekuentzia: 1, 2' },
            { type: 'color_find', color: 'URDINA', count: 3, distractors: 3, message: 'Aurkitu 3 bloke URDIN' }
        ],
        // 2. MAILA
        [
            { type: 'sequence', values: [1, 2, 3, 4], distractors: 3, message: 'Jarraitu sekuentzia: 1...4' },
            { type: 'sequence', values: [3, 4, 5], distractors: 4, message: 'Jarraitu sekuentzia: 3, 4, 5' },
            { type: 'color_find', color: 'BERDEA', count: 4, distractors: 3, message: 'Aurkitu 4 bloke BERDE' },
            { type: 'sequence', values: [5, 6, 7], distractors: 4, message: 'Jarraitu sekuentzia: 5, 6, 7' },
            { type: 'color_find', color: 'HORIA', count: 4, distractors: 4, message: 'Aurkitu 4 bloke HORI' }
        ],
        // 3. MAILA
        [
            { type: 'even', count: 4, max: 8, distractors: 3, message: 'Aukeratu zenbaki BIKOITIAK' },
            { type: 'odd', count: 4, max: 8, distractors: 3, message: 'Aukeratu zenbaki BAKOITIAK' },
            { type: 'sequence', values: [5, 4, 3], distractors: 4, message: 'Atzerantz: 5, 4, 3' },
            { type: 'even', count: 3, max: 10, distractors: 4, message: 'Aukeratu 3 zenbaki BIKOITI' },
            { type: 'odd', count: 3, max: 10, distractors: 4, message: 'Aukeratu 3 zenbaki BAKOITI' }
        ],
        // ... (y así sucesivamente hasta 30 niveles)
        // 4. MAILA
        [
            { type: 'addition', count: 3, maxNum: 3, distractors: 3, message: 'Ebatzi gehiketak' },
            { type: 'sequence', values: [6, 7, 8, 9], distractors: 4, message: 'Jarraitu sekuentzia: 6...9' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA'], distractors: 4, message: 'Jarraitu koloreak' },
            { type: 'addition', count: 3, maxNum: 4, distractors: 4, message: 'Ebatzi gehiketak' },
            { type: 'sequence', values: [8, 7, 6], distractors: 5, message: 'Atzerantz: 8, 7, 6' }
        ],
        // 5. MAILA
        [
            { type: 'sequence_by', start: 2, step: 2, count: 3, distractors: 3, message: '2tik 2ra: 2, 4, 6' },
            { type: 'color_sequence', values: ['BERDEA', 'HORIA', 'BERDEA'], distractors: 4, message: 'Jarraitu koloreak' },
            { type: 'subtraction', count: 3, maxNum: 5, distractors: 3, message: 'Ebatzi kenketak' },
            { type: 'sequence_by', start: 10, step: 10, count: 3, distractors: 3, message: '10etik 10era: 10, 20, 30' },
            { type: 'subtraction', count: 3, maxNum: 6, distractors: 4, message: 'Ebatzi kenketak' }
        ],
        // 6. MAILA
        [
            { type: 'sequence', values: [10, 11, 12], distractors: 4, message: 'Jarraitu sekuentzia: 10, 11, 12' },
            { type: 'even', count: 5, max: 10, distractors: 3, message: 'Aukeratu 5 zenbaki BIKOITI' },
            { type: 'odd', count: 5, max: 10, distractors: 3, message: 'Aukeratu 5 zenbaki BAKOITI' },
            { type: 'color_find', color: 'MOREA', count: 4, distractors: 4, message: 'Aurkitu 4 bloke MORE' },
            { type: 'sequence', values: [9, 10, 11, 12], distractors: 4, message: 'Jarraitu sekuentzia: 9...12' }
        ],
        // 7. MAILA
        [
            { type: 'addition', count: 4, maxNum: 5, distractors: 4, message: 'Ebatzi 4 gehiketa' },
            { type: 'sequence', values: [10, 9, 8, 7], distractors: 4, message: 'Atzerantz: 10...7' },
            { type: 'color_sequence', values: ['URDINA', 'GORRIA', 'URDINA'], distractors: 5, message: 'Jarraitu koloreak' },
            { type: 'addition', count: 4, maxNum: 6, distractors: 4, message: 'Ebatzi 4 gehiketa' },
            { type: 'sequence', values: [15, 14, 13], distractors: 5, message: 'Atzerantz: 15, 14, 13' }
        ],
        // 8. MAILA
        [
            { type: 'sequence_by', start: 5, step: 5, count: 4, distractors: 4, message: '5etik 5era: 5, 10, 15, 20' },
            { type: 'subtraction', count: 4, maxNum: 8, distractors: 4, message: 'Ebatzi 4 kenketa' },
            { type: 'color_find', color: 'LARANJA', count: 4, distractors: 5, message: 'Aurkitu 4 bloke LARANJA' },
            { type: 'sequence_by', start: 3, step: 3, count: 3, distractors: 5, message: '3tik 3ra: 3, 6, 9' },
            { type: 'subtraction', count: 4, maxNum: 9, distractors: 4, message: 'Ebatzi 4 kenketa' }
        ],
        // 9. MAILA
        [
            { type: 'mixed_ops', count: 4, maxNum: 7, distractors: 4, message: 'Nahastuta: Ebatzi eragiketak' },
            { type: 'sequence', values: [13, 14, 15, 16], distractors: 5, message: 'Jarraitu sekuentzia: 13...16' },
            { type: 'even', count: 5, max: 20, distractors: 4, message: 'Aukeratu zenbaki BIKOITIAK' },
            { type: 'odd', count: 5, max: 20, distractors: 4, message: 'Aukeratu zenbaki BAKOITIAK' },
            { type: 'mixed_ops', count: 4, maxNum: 8, distractors: 5, message: 'Nahastuta: Ebatzi eragiketak' }
        ],
        // 10. MAILA
        [
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA', 'HORIA'], distractors: 4, message: 'Jarraitu kolore sekuentzia' },
            { type: 'sequence', values: [20, 19, 18, 17], distractors: 5, message: 'Atzerantz: 20...17' },
            { type: 'sequence_by', start: 10, step: 10, count: 4, distractors: 4, message: '10etik 10era: 10...40' },
            { type: 'color_sequence', values: ['URDINA', 'HORIA', 'URDINA', 'GORRIA'], distractors: 4, message: 'Jarraitu kolore sekuentzia' },
            { type: 'sequence', values: [18, 19, 20], distractors: 6, message: 'Jarraitu sekuentzia: 18, 19, 20' }
        ],
        // 11. MAILA
        [
            { type: 'addition', count: 5, maxNum: 8, distractors: 4, message: 'Ebatzi 5 gehiketa' },
            { type: 'subtraction', count: 5, maxNum: 10, distractors: 4, message: 'Ebatzi 5 kenketa' },
            { type: 'sequence', values: [21, 22, 23], distractors: 6, message: 'Jarraitu sekuentzia: 21, 22, 23' },
            { type: 'even', count: 6, max: 12, distractors: 3, message: 'Aukeratu 6 zenbaki BIKOITI' },
            { type: 'odd', count: 6, max: 13, distractors: 3, message: 'Aukeratu 6 zenbaki BAKOITI' }
        ],
        // 12. MAILA
        [
            { type: 'sequence_by', start: 4, step: 4, count: 4, distractors: 5, message: '4tik 4ra: 4, 8, 12, 16' },
            { type: 'mixed_ops', count: 5, maxNum: 10, distractors: 4, message: 'Nahastuta: Ebatzi 5 eragiketa' },
            { type: 'sequence', values: [25, 24, 23, 22], distractors: 5, message: 'Atzerantz: 25...22' },
            { type: 'color_find', color: 'GORRIA', count: 6, distractors: 4, message: 'Aurkitu 6 bloke GORRI' },
            { type: 'sequence_by', start: 6, step: 6, count: 3, distractors: 6, message: '6tik 6ra: 6, 12, 18' }
        ],
        // 13. MAILA
        [
            { type: 'color_sequence', values: ['GORRIA', 'GORRIA', 'URDINA', 'URDINA'], distractors: 5, message: 'Jarraitu sekuentzia: G, G, U, U' },
            { type: 'addition', count: 5, maxNum: 10, distractors: 5, message: 'Ebatzi 5 gehiketa' },
            { type: 'subtraction', count: 5, maxNum: 12, distractors: 5, message: 'Ebatzi 5 kenketa' },
            { type: 'sequence', values: [30, 31, 32], distractors: 7, message: 'Jarraitu sekuentzia: 30, 31, 32' },
            { type: 'color_sequence', values: ['BERDEA', 'HORIA', 'GORRIA'], distractors: 6, message: 'Jarraitu koloreak' }
        ],
        // 14. MAILA
        [
            { type: 'even', count: 7, max: 14, distractors: 3, message: 'Aukeratu 7 zenbaki BIKOITI' },
            { type: 'odd', count: 7, max: 15, distractors: 3, message: 'Aukeratu 7 zenbaki BAKOITI' },
            { type: 'sequence', values: [30, 29, 28], distractors: 7, message: 'Atzerantz: 30, 29, 28' },
            { type: 'mixed_ops', count: 6, maxNum: 8, distractors: 4, message: 'Nahastuta: Ebatzi 6 eragiketa' },
            { type: 'color_find', color: 'URDINA', count: 7, distractors: 3, message: 'Aurkitu 7 bloke URDIN' }
        ],
        // 15. MAILA
        [
            { type: 'sequence_by', start: 10, step: 10, count: 5, distractors: 4, message: '10etik 10era: 10...50' },
            { type: 'sequence', values: [25, 26, 27, 28], distractors: 6, message: 'Jarraitu sekuentzia: 25...28' },
            { type: 'addition', count: 6, maxNum: 10, distractors: 4, message: 'Ebatzi 6 gehiketa' },
            { type: 'subtraction', count: 6, maxNum: 15, distractors: 4, message: 'Ebatzi 6 kenketa' },
            { type: 'sequence_by', start: 5, step: 5, count: 5, distractors: 5, message: '5etik 5era: 5...25' }
        ],
        // 16. MAILA
        [
            { type: 'sequence', values: [40, 39, 38, 37], distractors: 6, message: 'Atzerantz: 40...37' },
            { type: 'color_sequence', values: ['MOREA', 'LARANJA', 'BERDEA'], distractors: 7, message: 'Jarraitu koloreak' },
            { type: 'mixed_ops', count: 6, maxNum: 12, distractors: 5, message: 'Nahastuta: Ebatzi 6 eragiketa' },
            { type: 'even', count: 8, max: 16, distractors: 3, message: 'Aukeratu 8 zenbaki BIKOITI' },
            { type: 'odd', count: 8, max: 17, distractors: 3, message: 'Aukeratu 8 zenbaki BAKOITI' }
        ],
        // 17. MAILA
        [
            { type: 'addition', count: 7, maxNum: 10, distractors: 4, message: 'Ebatzi 7 gehiketa' },
            { type: 'subtraction', count: 7, maxNum: 18, distractors: 4, message: 'Ebatzi 7 kenketa' },
            { type: 'sequence', values: [50, 51, 52], distractors: 8, message: 'Jarraitu sekuentzia: 50, 51, 52' },
            { type: 'color_find', color: 'BERDEA', count: 8, distractors: 4, message: 'Aurkitu 8 bloke BERDE' },
            { type: 'sequence', values: [45, 46, 47], distractors: 8, message: 'Jarraitu sekuentzia: 45, 46, 47' }
        ],
        // 18. MAILA
        [
            { type: 'sequence', values: [50, 49, 48, 47], distractors: 7, message: 'Atzerantz: 50...47' },
            { type: 'mixed_ops', count: 7, maxNum: 15, distractors: 5, message: 'Nahastuta: Ebatzi 7 eragiketa' },
            { type: 'sequence_by', start: 3, step: 3, count: 5, distractors: 6, message: '3tik 3ra: 3...15' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'GORRIA', 'URDINA'], distractors: 7, message: 'Jarraitu sekuentzia' },
            { type: 'sequence_by', start: 11, step: 1, count: 4, distractors: 8, message: 'Jarraitu sekuentzia: 11...14' }
        ],
        // 19. MAILA
        [
            { type: 'even', count: 9, max: 18, distractors: 3, message: 'Aukeratu 9 zenbaki BIKOITI' },
            { type: 'odd', count: 9, max: 19, distractors: 3, message: 'Aukeratu 9 zenbaki BAKOITI' },
            { type: 'addition', count: 8, maxNum: 12, distractors: 4, message: 'Ebatzi 8 gehiketa' },
            { type: 'subtraction', count: 8, maxNum: 20, distractors: 4, message: 'Ebatzi 8 kenketa' },
            { type: 'sequence', values: [60, 59, 58], distractors: 9, message: 'Atzerantz: 60, 59, 58' }
        ],
        // 20. MAILA
        [
            { type: 'mixed_ops', count: 8, maxNum: 15, distractors: 4, message: 'Azken erronka: 8 eragiketa' },
            { type: 'sequence', values: [70, 71, 72, 73], distractors: 8, message: 'Jarraitu sekuentzia: 70...73' },
            { type: 'color_sequence', values: ['GORRIA', 'BERDEA', 'URDINA', 'HORIA', 'MOREA'], distractors: 7, message: 'Jarraitu kolore guztiak' },
            { type: 'sequence_by', start: 100, step: -10, count: 5, distractors: 7, message: 'Atzerantz 10etik 10era' },
            { type: 'mixed_ops', count: 8, maxNum: 16, distractors: 5, message: 'Azken erronka: 8 eragiketa' }
        ],
        // 21. MAILA
        [
            { type: 'sequence', values: [31, 32, 33, 34], distractors: 8, message: 'Jarraitu sekuentzia: 31...34' },
            { type: 'addition', count: 8, maxNum: 20, distractors: 4, message: 'Ebatzi 8 gehiketa' },
            { type: 'color_find', color: 'HORIA', count: 9, distractors: 4, message: 'Aurkitu 9 bloke HORI' },
            { type: 'subtraction', count: 8, maxNum: 25, distractors: 4, message: 'Ebatzi 8 kenketa' },
            { type: 'sequence', values: [80, 79, 78], distractors: 9, message: 'Atzerantz: 80, 79, 78' }
        ],
        // 22. MAILA
        [
            { type: 'mixed_ops', count: 9, maxNum: 18, distractors: 4, message: 'Nahastuta: 9 eragiketa' },
            { type: 'even', count: 10, max: 20, distractors: 3, message: 'Aukeratu 10 zenbaki BIKOITI' },
            { type: 'odd', count: 10, max: 21, distractors: 3, message: 'Aukeratu 10 zenbaki BAKOITI' },
            { type: 'sequence_by', start: 20, step: -2, count: 5, distractors: 7, message: 'Atzerantz 2tik 2ra' },
            { type: 'color_sequence', values: ['URDINA', 'MOREA', 'URDINA', 'MOREA'], distractors: 8, message: 'Jarraitu sekuentzia' }
        ],
        // 23. MAILA
        [
            { type: 'sequence', values: [88, 89, 90, 91], distractors: 8, message: 'Jarraitu sekuentzia: 88...91' },
            { type: 'addition', count: 9, maxNum: 20, distractors: 5, message: 'Ebatzi 9 gehiketa' },
            { type: 'subtraction', count: 9, maxNum: 30, distractors: 5, message: 'Ebatzi 9 kenketa' },
            { type: 'sequence', values: [99, 98, 97], distractors: 9, message: 'Atzerantz: 99, 98, 97' },
            { type: 'mixed_ops', count: 9, maxNum: 20, distractors: 5, message: 'Nahastuta: 9 eragiketa' }
        ],
        // 24. MAILA
        [
            { type: 'color_find', color: 'LARANJA', count: 10, distractors: 5, message: 'Aurkitu 10 bloke LARANJA' },
            { type: 'sequence_by', start: 25, step: 25, count: 4, distractors: 8, message: '25etik 25era: 25...100' },
            { type: 'sequence', values: [100, 99, 98, 97], distractors: 8, message: 'Atzerantz: 100...97' },
            { type: 'even', count: 12, max: 24, distractors: 4, message: 'Aukeratu 12 zenbaki BIKOITI' },
            { type: 'odd', count: 12, max: 25, distractors: 4, message: 'Aukeratu 12 zenbaki BAKOITI' }
        ],
        // 25. MAILA
        [
            { type: 'mixed_ops', count: 10, maxNum: 20, distractors: 6, message: 'Nahastuta: 10 eragiketa' },
            { type: 'sequence', values: [101, 102, 103], distractors: 10, message: 'Jarraitu sekuentzia: 101, 102, 103' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA', 'GORRIA', 'URDINA'], distractors: 8, message: 'Jarraitu sekuentzia luzea' },
            { type: 'addition', count: 10, maxNum: 25, distractors: 6, message: 'Ebatzi 10 gehiketa' },
            { type: 'subtraction', count: 10, maxNum: 40, distractors: 6, message: 'Ebatzi 10 kenketa' }
        ],
        // 26. MAILA
        [
            { type: 'sequence', values: [110, 111, 112, 113], distractors: 9, message: 'Jarraitu sekuentzia: 110...113' },
            { type: 'sequence_by', start: 50, step: -5, count: 5, distractors: 8, message: 'Atzerantz 5etik 5era' },
            { type: 'mixed_ops', count: 11, maxNum: 22, distractors: 5, message: 'Nahastuta: 11 eragiketa' },
            { type: 'color_find', color: 'MOREA', count: 11, distractors: 5, message: 'Aurkitu 11 bloke MORE' },
            { type: 'sequence', values: [120, 119, 118], distractors: 10, message: 'Atzerantz: 120, 119, 118' }
        ],
        // 27. MAILA
        [
            { type: 'even', count: 13, max: 26, distractors: 3, message: 'Aukeratu 13 zenbaki BIKOITI' },
            { type: 'odd', count: 13, max: 27, distractors: 3, message: 'Aukeratu 13 zenbaki BAKOITI' },
            { type: 'addition', count: 12, maxNum: 25, distractors: 4, message: 'Ebatzi 12 gehiketa' },
            { type: 'subtraction', count: 12, maxNum: 50, distractors: 4, message: 'Ebatzi 12 kenketa' },
            { type: 'mixed_ops', count: 12, maxNum: 25, distractors: 4, message: 'Nahastuta: 12 eragiketa' }
        ],
        // 28. MAILA
        [
            { type: 'sequence', values: [130, 131, 132, 133, 134], distractors: 8, message: 'Jarraitu sekuentzia: 130...134' },
            { type: 'color_sequence', values: ['GORRIA', 'HORIA', 'URDINA', 'BERDEA'], distractors: 9, message: 'Jarraitu sekuentzia' },
            { type: 'sequence_by', start: 100, step: -2, count: 6, distractors: 7, message: 'Atzerantz 2tik 2ra' },
            { type: 'mixed_ops', count: 13, maxNum: 30, distractors: 3, message: 'Nahastuta: 13 eragiketa' },
            { type: 'sequence', values: [150, 149, 148, 147], distractors: 9, message: 'Atzerantz: 150...147' }
        ],
        // 29. MAILA
        [
            { type: 'addition', count: 14, maxNum: 30, distractors: 2, message: 'Ebatzi 14 gehiketa' },
            { type: 'subtraction', count: 14, maxNum: 60, distractors: 2, message: 'Ebatzi 14 kenketa' },
            { type: 'even', count: 15, max: 30, distractors: 1, message: 'Aukeratu 15 zenbaki BIKOITI' },
            { type: 'odd', count: 15, max: 31, distractors: 1, message: 'Aukeratu 15 zenbaki BAKOITI' },
            { type: 'mixed_ops', count: 15, maxNum: 25, distractors: 1, message: 'Nahastuta: 15 eragiketa' }
        ],
        // 30. MAILA
        [
            { type: 'sequence', values: [200, 199, 198, 197, 196], distractors: 10, message: 'Azkena! Atzerantz: 200...196' },
            { type: 'mixed_ops', count: 16, maxNum: 30, distractors: 0, message: 'Azken erronka: 16 eragiketa' },
            { type: 'sequence_by', start: 100, step: 100, count: 4, distractors: 12, message: '100etik 100era: 100...400' },
            { type: 'color_sequence', values: ['GORRIA', 'URDINA', 'BERDEA', 'HORIA', 'LARANJA', 'MOREA'], distractors: 10, message: 'Kolore guztiak!' },
            { type: 'sequence', values: [500, 499, 498], distractors: 13, message: 'Azkena! Atzerantz: 500, 499, 498' }
        ]
    ]
};
