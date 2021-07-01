

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from ".."
    import { ShapeView }
        from "../views/shape-view"
    import { insertJoinersInBetweenArrayItems }
        from "../../../tools/array"

//
// ─── CONCAT HORIZONTALLY ────────────────────────────────────────────────────────
//

    export function concatMonoStyledViewsHorizontally <EnvironmentStyleSettings extends Object> (
            boxes:  MonoStyleViews<EnvironmentStyleSettings>[ ],
            joiner: ShapeView<EnvironmentStyleSettings>
        ): MonoStyleViews<EnvironmentStyleSettings> {

        //
        if ( boxes.length === 0 ) {
            return ShapeView.initEmptyBox( boxes[ 0 ].styleRenderer )
        }
        if ( boxes.length === 1 ) {
            return boxes[ 0 ]
        }

        // getting the desired box size
        let newBaseline = 0
        let heightBelowNewBaseline = 0
        for ( const box of boxes ) {
            if ( box.baseline > newBaseline ) {
                newBaseline =
                    box.baseline
            }
            if ( ( box.height - 1 - box.baseline ) > heightBelowNewBaseline ) {
                heightBelowNewBaseline =
                    box.height - 1 - box.baseline
            }
        }

        const newHeight =
            newBaseline + heightBelowNewBaseline + 1

        // boxesWithPadding
        const boxesWithJoiner =
            insertJoinersInBetweenArrayItems( boxes, joiner )

        // boxesWithPaddings
        const boxesWithAppropriatePaddings =
            boxesWithJoiner.map( box => {
                const topPadding =
                    newBaseline - box.baseline
                const bottomPadding =
                    newHeight - box.height - topPadding
                return box.applyMargin(
                    topPadding, 0, bottomPadding, 0
                )
            })

        // join
        const rows =
            boxesWithAppropriatePaddings[ 0 ].lines.length
        const columns =
            boxesWithAppropriatePaddings.length
        const newLines =
            new Array<string> ( rows )

        for ( let row = 0; row < rows; row++ ) {
            const lineColumns =
                new Array<string> ( columns )
            for ( let column = 0; column < columns; column++ ) {
                lineColumns[ column ] =
                    boxesWithAppropriatePaddings[ column ].lines[ row ]
            }
            newLines[ row ] =
                lineColumns.join( "" )
        }

        // the new space box
        return new ShapeView(
            newLines, newBaseline, boxes[ 0 ].styleRenderer, { }, true
        )
    }

// ────────────────────────────────────────────────────────────────────────────────
