
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "./main"

//
// ─── BIRD ───────────────────────────────────────────────────────────────────────
//

    export function createSpacedBoxBirdSample ( ) {
        const lines = [
            "  ██████        ",
            "████  ██        ",
            "  ██████        ",
            "  ████████      ",
            "  ██████████████",
            "  ████████████  ",
            "  ████████      ",
            "    ██          ",
        ]

        return new SpacedBox( lines, 4 )
    }

//
// ─── ALIEN ──────────────────────────────────────────────────────────────────────
//

    export function createSpacedBoxAlienSample ( ) {
        const lines = [
            "  ██████████  ",
            "  ████  ████  ",
            "  ██████████  ",
            "    ██████    ",
            "██████████████",
            "██  ██  ██  ██",
            "    ██  ██    ",
            "  ████  ████  ",
        ]

        return new SpacedBox( lines, 4 )
    }

// ────────────────────────────────────────────────────────────────────────────────