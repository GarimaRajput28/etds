// ─────────────────────────────────────────────────────────────
//  ETDS Constants — single source of truth for URLs and labels
//  Update here and it applies everywhere automatically
// ─────────────────────────────────────────────────────────────

export const ROUTES = {
    home:             '/web/guest/home',
    login:            '/login',
    incomeTaxAct:     '/income-tax-act-1961',
    taxpayerCharter:  '/documents/d/guest/taxpayer-charter',
    taxEServices:     '/tax-e-services',
    mediaGallery:     '/media-gallery',
};

// Exact accessible names as they appear in the DOM (from page snapshot)
export const NAV_LABELS = {
    home:               'Home link',
    aboutUs:            'About Us collapsed',
    taxLaws:            'Tax Laws & Rules collapsed',
    taxInformation:     'Tax Information & Services link',
    taxEServices:       'Tax e-Services link',
    mediaGallery:       'Media Gallery link',
    taxpayerCharter:    "Taxpayers' Charter",          // straight apostrophe
    taxpayerCharterLang:"Taxpayers' Charter LANG#en_US",
};