
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as http
        from "http"

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

    const htmlStyle = (`
        <html><head><title>Testing TextKit</title></head><body>
        <style>
            textkit-row {
            display: block;
            white-space: pre;
            font-family: monospace;
            line-height: 1;
            }
        </style>
    `)

//
// ─── SHAPE ──────────────────────────────────────────────────────────────────────
//

    function generateShape ( renderer: TextKit.StyleRendererProtocol<any> ) {
        const text =
            new TextKit.LineView("Hello, World!", renderer, { textColor: "red" })

        const bird =
            TextKit.ShapeView.initArendelleBird( renderer )
        bird.addStyle({ textColor: "blue" })

        const canvas =
            new TextKit.CanvasView( 40, 15, renderer )

        canvas.add( text, 5, 1, 0 )
        canvas.add( text, 20, 1, 0 )
        canvas.add( bird, 2, 3, 0 )
        canvas.add( text, 10, 7, 1 )

        return canvas.styledForm
    }

//
// ─── RENDERS ────────────────────────────────────────────────────────────────────
//

    const webRender = generateShape(
        new TextKit.Environments.Web.WebStyleRenderer( )
    )

    const terminalRender = generateShape(
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )
    )

//
// ─── SERVER ─────────────────────────────────────────────────────────────────────
//

    const server = new http.Server(( req, res ) => {
        res.statusCode = 200,
        res.setHeader("Content-Type", "text/html")
        res.end(htmlStyle + webRender + "</body></html>")
        process.exit( 0 )
    })

    server.listen( 9090, "127.0.0.1" )

    console.clear( )
    console.log( "Running the test Web Renderer server on port 9090, rendering:")
    console.log( terminalRender )

// ────────────────────────────────────────────────────────────────────────────────
