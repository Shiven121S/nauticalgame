function start_next_level () {
    tiles.setTilemap(tiles.createTilemap(hex`3c000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202`, img`
        ............................................................
        ............................................................
        222222222222222222222222222222222222222222222222222222222222
        ............................................................
        ............................................................
        ............................................................
        ............................................................
        ............................................................
        `, [myTiles.transparency16,sprites.dungeon.hazardWater,myTiles.tile1], TileScale.Sixteen))
    tiles.placeOnTile(mySprite, tiles.getTileLocation(59, 5))
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        ...........bbb..................
        ...........b1b45................
        ...........b9b455...............
        ...........bbb.55...............
        ...............55...............
        ...............55...............
        ...............44...............
        ..............bbbb..............
        ..5555555555555555555555555555..
        .555555555555555555555555555554.
        55555555555555555555555555555544
        55555555555555555555555555555544
        55555bbb5bbb5bbb5bbb5bbb5bbb5544
        55555b9b4b9b4b9b4b9b4b9b4b9b5544
        55555bbb5bbb5bbb5bbb5bbb5bbb5544
        55555555555555555555555555555544
        44555555555555555555555555555544
        44445555555555555555555555554444
        .444444444444444444444444444444.
        ..4444444444444444444444444444..
        ..............bbb...............
        .............bbbbb..............
        .............ccccc..............
        `)
    if (mySprite.vx > 0) {
        mySprite.vx = mySprite.vx * -1
    }
})
function Main_Menu_Maker () {
    blockMenu.showMenu(["Play", "Instructions"], MenuStyle.List, MenuLocation.BottomHalf)
    blockMenu.setColors(1, 8)
    blockMenu.setControlsEnabled(true)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false, effects.bubbles)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        ..................bbb...........
        ................54b1b...........
        ...............554b9b...........
        ...............55.bbb...........
        ...............55...............
        ...............55...............
        ...............44...............
        ..............bbbb..............
        ..5555555555555555555555555555..
        .455555555555555555555555555555.
        44555555555555555555555555555555
        44555555555555555555555555555555
        44555bbb5bbb5bbb5bbb5bbb5bbb5555
        44555b9b4b9b4b9b4b9b4b9b4b9b5555
        44555bbb5bbb5bbb5bbb5bbb5bbb5555
        44555555555555555555555555555555
        44555555555555555555555555555544
        44445555555555555555555555554444
        .444444444444444444444444444444.
        ..4444444444444444444444444444..
        ..............bbb...............
        .............bbbbb..............
        .............ccccc..............
        `)
    if (mySprite.vx < 0) {
        mySprite.vx = mySprite.vx * -1
    }
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "Play") {
        blockMenu.closeMenu()
        blockMenu.setControlsEnabled(false)
        textSprite.destroy(effects.bubbles, 700)
        Level = 1
        timer.after(1500, function () {
            scene.setBackgroundColor(1)
            statusbar = statusbars.create(50, 5, StatusBarKind.Health)
            Level_display = textsprite.create("Nautical Mile: " + Level, 0, 8)
            Level_display.setMaxFontHeight(8)
            Level_display.setFlag(SpriteFlag.RelativeToCamera, true)
            statusbar.setPosition(31, 10)
            Level_display.setPosition(110, 10)
            statusbar.value = 100
            statusbar.max = 100
            mySprite = sprites.create(img`
                ...........bbb..................
                ...........b1b45................
                ...........b9b455...............
                ...........bbb.55...............
                ...............55...............
                ...............55...............
                ...............44...............
                ..............bbbb..............
                ..5555555555555555555555555555..
                .555555555555555555555555555554.
                55555555555555555555555555555544
                55555555555555555555555555555544
                55555bbb5bbb5bbb5bbb5bbb5bbb5544
                55555b9b4b9b4b9b4b9b4b9b4b9b5544
                55555bbb5bbb5bbb5bbb5bbb5bbb5544
                55555555555555555555555555555544
                44555555555555555555555555555544
                44445555555555555555555555554444
                .444444444444444444444444444444.
                ..4444444444444444444444444444..
                ..............bbb...............
                .............bbbbb..............
                .............ccccc..............
                `, SpriteKind.Player)
            scene.cameraFollowSprite(mySprite)
            start_next_level()
            mySprite.startEffect(effects.fountain)
            mySprite.setVelocity(-30, 0)
            for (let index2 = 0; index2 < 6; index2++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            statusbar_created = true
        })
    }
})
let Level_display: TextSprite = null
let statusbar: StatusBarSprite = null
let Level = 0
let mySprite: Sprite = null
let textSprite: TextSprite = null
let statusbar_created = false
statusbar_created = false
scene.setBackgroundColor(8)
textSprite = textsprite.create("NAUTICAL", 0, 1)
textSprite.startEffect(effects.bubbles)
textSprite.setMaxFontHeight(12)
textSprite.setPosition(70, -20)
story.spriteMoveToLocation(textSprite, 70, 15, 50)
timer.after(800, function () {
    Main_Menu_Maker()
})
game.onUpdateInterval(1000, function () {
    if (statusbar_created == true) {
        statusbar.value += -1
    }
})
