namespace SpriteKind {
    export const OTP = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const LavaGoal = SpriteKind.create()
    export const EnemyBoss = SpriteKind.create()
    export const myBullets = SpriteKind.create()
    export const Guides = SpriteKind.create()
    export const myPlayer = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Goal, function (sprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    tiles.placeOnRandomTile(sprite, sprites.vehicle.roadIntersection3)
    info.changeScoreBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.OTP, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroyAllSpritesOfKind(SpriteKind.Guides)
    game.splash("You saved Gabriella from the maze!")
    game.splash("But you are not safe yet...")
    game.splash("Find the coin in order to level up")
    game.splash("If you touch the lava / water walls... your death will be imminent.")
    game.splash("Watch your lives...")
    info.setLife(3)
    Render.getRenderSpriteInstance().setKind(SpriteKind.myPlayer)
    lavaMap = tilemap`Lava_Map`
    tiles.setCurrentTilemap(lavaMap)
    tiles.placeOnRandomTile(Render.getRenderSpriteInstance(), assets.tile`myTile`)
    lavaCoin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.LavaGoal)
    tiles.placeOnRandomTile(lavaCoin, assets.tile`myTile0`)
    animation.runImageAnimation(
    lavaCoin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    500,
    true
    )
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.myBullets, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite)
})
scene.onHitWall(SpriteKind.myPlayer, function (sprite, location) {
    if (lavaMap) {
        tiles.placeOnRandomTile(sprite, assets.tile`myTile`)
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyBoss, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(Render.getRenderSpriteInstance(), assets.tile`myTile0`)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.myBullets, SpriteKind.EnemyBoss, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbar.value += -10
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    if (info.score() >= 4) {
        game.splash("Congratulations on Beating the Hidden Gem Level. You have 3 levels left!")
        game.splash("Find Gabriella!!")
        sprites.destroy(otherSprite)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        tiles.setCurrentTilemap(tilemap`Map1_NoGem`)
        tiles.placeOnRandomTile(Render.getRenderSpriteVariable(), assets.tile`myTile`)
        Gabriella = sprites.create(img`
            . f f f . f f f f . f f f . 
            f f f f f c c c c f f f f f 
            f f f f b c c c c b f f f f 
            f f f c 3 c c c c 3 c f f f 
            . f 3 3 c c c c c c 3 3 f . 
            . f c c c c 4 4 c c c c f . 
            . f f c c 4 4 4 4 c c f f . 
            . f f f b f 4 4 f b f f f . 
            . f f 4 1 f 4 4 f 1 4 f f . 
            . . f f 4 4 4 4 4 4 f f . . 
            . . e f e 4 4 4 4 e f e . . 
            . e 4 f b 3 3 3 3 b f 4 e . 
            . 4 d f 3 3 3 3 3 3 c d 4 . 
            . 4 4 f 6 6 6 6 6 6 f 4 4 . 
            . . . . f f f f f f . . . . 
            . . . . f f . . f f . . . . 
            `, SpriteKind.OTP)
        Gabriella.sayText("Troy Bolton, My Hero!!!!!")
        tiles.placeOnRandomTile(Gabriella, assets.tile`myTile0`)
        Guide1 = sprites.create(assets.image`Guide`, SpriteKind.Guides)
        tiles.placeOnTile(Guide1, tiles.getTileLocation(20, 16))
        Guide1.sayText("You are almost there, hint: take a right..")
        Guide2 = sprites.create(assets.image`Guide`, SpriteKind.Guides)
        tiles.placeOnTile(Guide2, tiles.getTileLocation(9, 19))
        Guide2.sayText("You have your lost your way, turn around.")
    } else {
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
        gem = sprites.create(assets.image`CollectibleGem`, SpriteKind.Goal)
        tiles.placeOnRandomTile(gem, assets.tile`myTile1`)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverMessage(true, "YOU DESTROYED THE FINAL BOSS!! CONGRATULATIONS")
    game.gameOver(true)
})
function createEnemies () {
    enemyTeamMember = sprites.create(assets.image`Red Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember, tiles.getTileLocation(4, 8))
    enemyTeamMember.setVelocity(60, 0)
    enemyTeamMember.setBounceOnWall(true)
    enemyTeamMember2 = sprites.create(assets.image`Blue Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember2, tiles.getTileLocation(2, 3))
    enemyTeamMember2.setVelocity(0, 75)
    enemyTeamMember2.setBounceOnWall(true)
    enemyTeamMember3 = sprites.create(assets.image`Orange Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember3, tiles.getTileLocation(9, 15))
    enemyTeamMember3.setVelocity(60, 0)
    enemyTeamMember3.setBounceOnWall(true)
    enemyTeamMember4 = sprites.create(assets.image`Brown Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember4, tiles.getTileLocation(9, 8))
    enemyTeamMember4.setVelocity(60, 0)
    enemyTeamMember4.setBounceOnWall(true)
    enemyTeamMember5 = sprites.create(assets.image`Green Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember5, tiles.getTileLocation(15, 8))
    enemyTeamMember5.setVelocity(60, 0)
    enemyTeamMember5.setBounceOnWall(true)
    enemyTeamMember6 = sprites.create(assets.image`Red Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember6, tiles.getTileLocation(14, 19))
    enemyTeamMember6.setVelocity(0, 65)
    enemyTeamMember6.setBounceOnWall(true)
    enemyTeamMember7 = sprites.create(assets.image`Blue Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember7, tiles.getTileLocation(16, 28))
    enemyTeamMember7.setVelocity(0, 20)
    enemyTeamMember7.setBounceOnWall(true)
    enemyTeamMember8 = sprites.create(assets.image`Orange Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember8, tiles.getTileLocation(23, 11))
    enemyTeamMember8.setVelocity(50, 0)
    enemyTeamMember8.setBounceOnWall(true)
    enemyTeamMember9 = sprites.create(assets.image`Brown Gus`, SpriteKind.Enemy)
    tiles.placeOnTile(enemyTeamMember9, tiles.getTileLocation(24, 21))
    enemyTeamMember9.setVelocity(0, 55)
    enemyTeamMember9.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.myPlayer, SpriteKind.LavaGoal, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.showLongText("You have reached the final level. Time to BEAT THE BOSS. Watch out for his green explosive lava that will harm you if touched.", DialogLayout.Full)
    Render.getRenderSpriteInstance().setKind(SpriteKind.Player)
    info.setLife(5)
    bossMap = tilemap`Final_Level`
    tiles.setCurrentTilemap(bossMap)
    tiles.placeOnRandomTile(Render.getRenderSpriteInstance(), assets.tile`myTile0`)
    boss = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ....7.fd11111111df......
        ...7..fd11111111df......
        ...7..fd11111111df......
        ...7..fddd1111dddff.....
        ...77.fbdbfddfbdbfcf....
        ...777fcdcf11fcdcfbf....
        ....77fffbdb1bdffcf.....
        ....fcb1bcffffff........
        ....f1c1c1ffffff........
        ....fdfdfdfffff.........
        .....f.f.f..............
        ........................
        ........................
        ........................
        `, SpriteKind.EnemyBoss)
    tiles.placeOnRandomTile(boss, assets.tile`myTile`)
    boss.follow(Render.getRenderSpriteInstance(), 15)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.value = 250
    statusbar.attachToSprite(boss)
})
info.onLifeZero(function () {
    game.setGameOverMessage(false, "YOU DIED FROM STRESS")
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.play(music.stringPlayable("C5 B C5 B - - - - ", 250), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite, effects.warmRadial, 1000)
    game.splash("You found the hidden gem!")
    game.splash("You now have a score to keep track of.")
    game.splash("Get to a score of 5 and you will re-enter the maze")
    info.setScore(0)
    tiles.setCurrentTilemap(tilemap`Unlock_Game_Map`)
    tiles.placeOnRandomTile(Render.getRenderSpriteVariable(), assets.tile`myTile`)
    gem = sprites.create(assets.image`CollectibleGem`, SpriteKind.Goal)
    tiles.placeOnTile(gem, tiles.getTileLocation(1, 1))
    createEnemies()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bossMap) {
        bullets = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Render.getRenderSpriteInstance(), 50, 0)
        bullets.setKind(SpriteKind.myBullets)
        bullets.follow(boss, 50)
    }
})
let projectile: Sprite = null
let bullets: Sprite = null
let boss: Sprite = null
let bossMap: tiles.TileMapData = null
let enemyTeamMember9: Sprite = null
let enemyTeamMember8: Sprite = null
let enemyTeamMember7: Sprite = null
let enemyTeamMember6: Sprite = null
let enemyTeamMember5: Sprite = null
let enemyTeamMember4: Sprite = null
let enemyTeamMember3: Sprite = null
let enemyTeamMember2: Sprite = null
let enemyTeamMember: Sprite = null
let gem: Sprite = null
let Guide2: Sprite = null
let Guide1: Sprite = null
let Gabriella: Sprite = null
let statusbar: StatusBarSprite = null
let lavaCoin: Sprite = null
let lavaMap: tiles.TileMapData = null
game.splash("Welcome to Maze Galore!")
game.splash("Your first task is to find the hidden gem in order to unlock the ending.")
game.splash("If you do not find the hidden gem, you will be trapped forever in this maze.")
tiles.setCurrentTilemap(tilemap`Map1_Gem`)
tiles.placeOnRandomTile(Render.getRenderSpriteVariable(), assets.tile`myTile`)
let hiddenGem = sprites.create(assets.image`Gem`, SpriteKind.Food)
tiles.placeOnRandomTile(hiddenGem, assets.tile`myTile1`)
game.onUpdateInterval(1250, function () {
    if (bossMap) {
        projectile = sprites.createProjectileFromSprite(assets.image`EnemyShot`, boss, 50, 0)
        projectile.follow(Render.getRenderSpriteInstance(), 50)
    }
})
