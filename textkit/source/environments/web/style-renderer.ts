
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { StyleRendererProtocol, PortableColor }
        from "../../protocols"
    import { WebStyleSettings, WebTextDecorationLineStyle
           , WebTextDecorationLineType, mergeNewWebStyleOptionsWithThePreviousSettings
           }
        from "./style"
    import { convertPortableColorToCSSColor }
        from "../tools/css-portable-color-implementation"
    import { LINE_BREAK_CHARACTER }
        from "../../constants/characters"
    import { CSSStyleOptimizer }
        from "../tools/css-optimizer"
    import { INDENTATION }
        from "../tools/indentation"

//
// ─── ANSI TERMINAL STYLE RENDERER ───────────────────────────────────────────────
//

    export class WebStyleRenderer implements StyleRendererProtocol<WebStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #optimizer: CSSStyleOptimizer

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( optimize: boolean = true ) {
                this.#optimizer =
                    new CSSStyleOptimizer( optimize )
            }

        //
        // ─── DEFAULT STYLE ───────────────────────────────────────────────
        //

            get defaultStyle ( ) {
                return {
                    textColor:          "factory" as PortableColor,
                    backgroundColor:    "factory" as PortableColor,
                    bold:               false,
                    italic:             false,
                    underline:          false,
                    blink:              false,
                    line:               "none" as WebTextDecorationLineType,
                    lineStyle:          "solid" as WebTextDecorationLineStyle,
                }
            }

        //
        // ─── RENDER STYLES ───────────────────────────────────────────────
        //

            public renderLeftStylingInfo ( style: WebStyleSettings ): string {
                const css =
                    convertWebSettingsToInlineCSS( style )
                const attribute =
                    this.#optimizer.generateAttribute( css )

                return `<span${attribute}>`
            }

            public renderRightStylingInfo ( ): string {
                return "</span>"
            }

        //
        // ─── MERGER ──────────────────────────────────────────────────────
        //

            public margeNewStyleOptionsWithPreviosuStyleState (
                    style:      WebStyleSettings,
                    options:    Partial<WebStyleSettings>,
                ): WebStyleSettings {

                //
                return mergeNewWebStyleOptionsWithThePreviousSettings(
                    style, options
                )
            }

        //
        // ─── ENCODE CHARACTER ────────────────────────────────────────────
        //

            public encodeCharacterForStyledRender ( char: string ) {
                switch ( char ) {
                    case "&":
                        return "&amp;"
                    case "<":
                        return "&lt;"
                    case ">":
                        return "&gt;"
                    default:
                        return char
                }
            }

        //
        // ─── WRAP AND FINALIZE ROOT LINES ────────────────────────────────
        //

            public wrapRootLinesAndFinalizeRender ( width: number, lines: string[ ] ): string {
                const renderedParts =
                    new Array<string> ( lines.length + 2 )

                // header
                const headerStyleTag =
                    this.#optimizer.generateHeaderStyleTag( "" )
                renderedParts[ 0 ] =
                    "<textkit-area>" + headerStyleTag

                // body
                for ( let i = 1; i <= lines.length; i++ ) {
                    renderedParts[ i ] =
                        `${ INDENTATION }<textkit-row>${ lines[ i ] }</textkit-row>`
                }

                // footer
                renderedParts[ lines.length + 1 ] =
                    "</textkit-area>"

                //
                return renderedParts.join( LINE_BREAK_CHARACTER )
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── RENDER STYLE ───────────────────────────────────────────────────────────────
//

    function convertWebSettingsToInlineCSS ( style: WebStyleSettings ) {
        const serializedProperties =
            new Array<string> ( )

        // line decoration
        if ( style.underline || style.line !== "none" ) {
            const lineType =
                style.underline ? "underline" : style.line
            const lineDecorationSerialized =
                `${ style.lineStyle } ${lineType}`
            serializedProperties.push( lineDecorationSerialized )
        }

        // color
        if ( style.textColor !== "factory" ) {
            const serializedColor =
                convertPortableColorToCSSColor( style.textColor )
            serializedProperties.push( `color: ${ serializedColor }` )
        }

        // background color
        if ( style.backgroundColor !== "factory" ) {
            const serializedColor =
                convertPortableColorToCSSColor( style.backgroundColor )
            serializedProperties.push( `background-color: ${ serializedColor }` )
        }

        // italic
        if ( style.italic ) {
            serializedProperties.push( "font-style: italic" )
        }

        // bold
        if ( style.bold ) {
            serializedProperties.push( "font-weight: bold" )
        }

        // done
        return serializedProperties.join( "; " )
    }

// ────────────────────────────────────────────────────────────────────────────────
