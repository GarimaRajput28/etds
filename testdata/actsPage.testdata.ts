// ─────────────────────────────────────────────────────────────
//  Test Data — Acts Page
//  All test data lives here — never hardcode in spec or page files
//  Script picks the FIRST available match at runtime
// ─────────────────────────────────────────────────────────────

export const actsPageData = {

    // Finance Act years to try — script picks first one that loads sections
    financeActYears: ['2025', '2024', '2023'],

    // Sections to compare — script picks first available pair
    compareSections: [
        { base: 'Section - 1', compare: 'Section - 5' },
        { base: 'Section - 2', compare: 'Section - 6' },
        { base: 'Section - 3', compare: 'Section - 7' },
    ],

    // Expected section count patterns per year — used for validation
    sectionCountPatterns: {
        '2025': /939 Section/,
        '2024': /\d+ Section/,  // any count acceptable for older years
        '2023': /\d+ Section/,
    } as Record<string, RegExp>,

    // Page heading — stays constant
    pageHeading: 'Income-tax Act, 1961',

    // URL
    pageUrl: '/income-tax-act-1961',
};