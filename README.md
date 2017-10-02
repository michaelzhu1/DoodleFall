# DoodleFall

***
## Background and Overview
DoodleFall is inspire by the popular mobile game "Doodle Jump". However, unlike "Doodle Jump", user is trying to make the Doodle staying alive by falling downwards. The game is tentatively set to 20 levels.The sprite loses some health if it touches spikes that's coming down from the ceiling or the lava block. The game is sadly over when the sprite fall to the bottom of the screen of or run out of health.

## Functionality & MVP
* Choose the main character the user wants to control
* Control the Doodle by pressing "<" or ">" keys
* Record the highest score (most number of levels reached going down)
* Hear sound when the game is over

In addition, this project will also include:
* An About modal describing the basic instruction
## WireFrames
This app will consist of a single screen with the simulation canvas, HP bar on the upper left corner, and level on the upper right corner next to the username. User will be able to select the sprite they would like to control. About button is for the instruction modal.

![wireframe](/Users/michael_zhu/Desktop/DoodleFall/doc/doodlefall_wireframe.png)

## Architecture and Technologies
This project will be implemented with the following technologies:
* Vanilla Javascript for overall structure and game logic
* DOM manipulation and rendering
* Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be four scripts involved in this project:

`game.js`: this script will handle the gameplay
`player.js`: this script will handle player interaction with the sprite and keeps track of the sprite's status
`blockbase.js`: this script will contain different kinds of blocks in the game, for examples: `lavaBlock`, `grassBlock`, `brickBlock` and `springBlock`
`blackgenerator.js`: this script will be responsible for randomly generating different blocks for the container

## Implementation Timeline
### Day 1:
Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above. Learn about Web Audio API to see if it's worth implementing. Goals for the day:
* Get `webpack` serving files and frame out index.html
* Start with `player.js` and `game.js`
* Implement "Start button"
* learn about how to display image and control the sprite properly
### Day 2
* Complete `player.js` and `game.js` module (constructor, update/move function, color)
* Find the appropriate images for the game and style them accordingly
* Get the blocks to move upward
* Get collision graphics working when sprite stand on the block or hit the spiky ceiling
### Day 3
* Complete `blockbase.js`
* Add different audio depends on which block the sprite lands on, and game over
* Have a functional game so that the sprite can move around and land on different blocks
### Day 4: Style the frontend, making it polished and professional
* Complete `blockgenerator.js`
* Style everything nicely
* Add instruction Modal and About
* Add LinkedIn and GitHub links
***
## Bonus Feature
* Sprite regain some of its health when it lands on a special "healthBlock"
* User can get items such as extra life or making itself smaller
* Two player can play at the same time to compete against each other
