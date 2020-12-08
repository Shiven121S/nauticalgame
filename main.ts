scene.onOverlapTile(SpriteKind.Projectile, myTiles.tile2, function (sprite, location) {
    tiles.setTileAt(location, myTiles.tile3)
    statusbar.value += 8
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . b b b b . . . . . . . . . 
        . . . b b b b . . . . . . . . . 
        . . . b b b b . . . . . . . . . 
        . . . b b b b . . . . . . . . . 
        `, mySprite, 0, 70)
    statusbar.value += -5
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    mySprite.vx = 75
})
function start_next_level () {
    tiles.setTilemap(tilemap`level`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(59, 5))
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
    tiles.coverAllTiles(myTiles.tile2, myTiles.tile3)
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
        mySprite.vx = Dark_Submarine.vx * -1
    }
})
function Main_Menu_Maker () {
    blockMenu.showMenu(["Play", "Instructions"], MenuStyle.List, MenuLocation.BottomHalf)
    blockMenu.setColors(1, 8)
    blockMenu.setControlsEnabled(true)
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.vx = 30
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.vx = -30
})
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
            statusbar = statusbars.create(100, 5, StatusBarKind.Health)
            statusbar.setPosition(80, 5)
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
            controller.moveSprite(mySprite, 0, 40)
            scene.cameraFollowSprite(mySprite)
            start_next_level()
            mySprite.startEffect(effects.fountain)
            mySprite.setVelocity(-30, 0)
            for (let index2 = 0; index2 < 6; index2++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            statusbar_created = true
            mySprite.setFlag(SpriteFlag.ShowPhysics, true)
        })
    } else {
        game.showLongText("You play as a research submarine. Every second you lose energy. Use \"ENTER\" or \"X\" to shoot out a projectile. This will drain a little energy. This projectile must collide with the energy plants. Doing this will give you more energy. Press the \"LEFT\" or \"RIGHT\" arrow keys to switch directions. Hold down \"LEFT\" or \"RIGHT\" to move faster in that direction. This will cost you extra energy. Avoid the Dark Submarines by moving up or down. Colliding with them will drain some energy.", DialogLayout.Full)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 400)
    statusbar.value += -5
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    mySprite.vx = -75
})
let Level = 0
let Dark_Submarine: Sprite = null
let mySprite: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
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
game.onUpdate(function () {
    if (mySprite && mySprite.x == 16) {
        start_next_level()
        Level += 1
        statusbar.value += 10
        if (Level == 2) {
            for (let index = 0; index < 5; index++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            game.showLongText("YOU HAVE TRAVELED ONE NAUTICAL MILE", DialogLayout.Bottom)
        } else if (Level == 3) {
            for (let index = 0; index < 5; index++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            game.showLongText("YOU HAVE TRAVELED TWO NAUTICAL MILES", DialogLayout.Bottom)
        } else if (Level == 4) {
            for (let index = 0; index < 4; index++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            game.showLongText("YOU HAVE TRAVELED THREE NAUTICAL MILES", DialogLayout.Bottom)
        } else if (Level == 5) {
            for (let index = 0; index < 3; index++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            game.showLongText("YOU HAVE TRAVELED FOUR NAUTICAL MILES", DialogLayout.Bottom)
        } else if (Level == 6) {
            for (let index = 0; index < 3; index++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 59), 7), myTiles.tile2)
            }
            game.showLongText("YOU HAVE BEATEN THE GAME", DialogLayout.Bottom)
            game.over(true, effects.bubbles)
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (statusbar_created == true) {
        if (Level == 1) {
            Dark_Submarine = sprites.create(img`
                ................................
                ................................
                ................................
                ................................
                ................................
                .................fff............
                ...............cff1f............
                ...............cff1f............
                ...............c.fff............
                ...............ff...............
                ..............ffff..............
                .....fcccccccccccccccccccccccc..
                ....ffceeeceeeceeeceeeceeeceeec.
                ....ffce1efe1efe1efe1efe1efe1ec.
                ....ffceeeceeeceeeceeeceeeceeec.
                ....ffccccccccccccccccccccccccc.
                ....ffcccccccccccccccccccccccff.
                .....fffffffffffffffffffffffff..
                ..............ccc...............
                .............ccccc..............
                .............fffff..............
                ................................
                ................................
                `, SpriteKind.Enemy)
            Dark_Submarine.setVelocity(60, 0)
            tiles.placeOnTile(Dark_Submarine, tiles.getTileLocation(0, randint(4, 7)))
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (statusbar_created == true) {
        if (mySprite.vx == 75) {
            statusbar.value += -3
        } else if (mySprite.vx == -75) {
            statusbar.value += -3
        } else {
            statusbar.value += -1
        }
    }
})
