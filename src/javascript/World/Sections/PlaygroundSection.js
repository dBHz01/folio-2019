import * as THREE from 'three'

export default class PlaygroundSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('playgroundSection')
            // this.debugFolder.open()
        }

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.resources.items.areaResetTexture.magFilter = THREE.NearestFilter
        this.resources.items.areaResetTexture.minFilter = THREE.LinearFilter

        this.setStatic()
        this.setBricksWalls()
        // this.setBowling()
    }

    setStatic()
    {
        this.objects.add({
            base: this.resources.items.playgroundStaticBase.scene,
            collision: this.resources.items.playgroundStaticCollision.scene,
            floorShadowTexture: this.resources.items.playgroundStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x, this.y, 0),
            mass: 0
        })
    }

    setBricksWalls()
    {
        // Set up
        this.brickWalls = {}
        this.brickWalls.x = this.x + 15
        this.brickWalls.y = this.y + 50
        this.brickWalls.items = []

        // Brick options
        this.brickWalls.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 0.1),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: - 0.15, alpha: 0.35 },
            mass: 0.5,
            soundName: 'brick'
        }

        this.brickWalls.items.push(
            this.walls.add({
                object: this.brickWalls.brickOptions,
                shape:
                {
                    type: 'rectangle',
                    widthCount: 60,
                    heightCount: 2,
                    position: new THREE.Vector3(this.brickWalls.x - 6, this.brickWalls.y, 0),
                    offsetWidth: new THREE.Vector3(0, 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0),
                    rotation: new THREE.Vector3(0, 0, 0),
                }
            }),
            this.walls.add({
                object: this.brickWalls.brickOptions,
                shape:
                {
                    type: 'rectangle',
                    widthCount: 60,
                    heightCount: 2,
                    position: new THREE.Vector3(this.brickWalls.x - 12, this.brickWalls.y, 0),
                    offsetWidth: new THREE.Vector3(0, 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0),
                    rotation: new THREE.Vector3(0, 0, 0),
                }
            }),
        )

        let drawS = (pos, r1, r2, reverse) => {
            reverse = reverse == true ? -1 : 1;
            for (let theta = 0; theta <= Math.PI; theta += Math.PI / 60) {
                this.brickWalls.items.push(
                    this.walls.add({
                        object: this.brickWalls.brickOptions,
                        shape:
                        {
                            type: 'rectangle',
                            widthCount: 1,
                            heightCount: 2,
                            position: new THREE.Vector3(this.brickWalls.x - pos - reverse * r1 * Math.sin(theta), this.brickWalls.y + r1 * Math.cos(theta), 0),
                            offsetWidth: new THREE.Vector3(0, 1.05, 0),
                            offsetHeight: new THREE.Vector3(0, 0, 0.45),
                            randomOffset: new THREE.Vector3(0, 0, 0),
                            randomRotation: new THREE.Vector3(0, 0, 0),
                            rotation: new THREE.Vector3(0, 0, reverse * theta),
                        }
                    }),
                    this.walls.add({
                        object: this.brickWalls.brickOptions,
                        shape:
                        {
                            type: 'rectangle',
                            widthCount: 1,
                            heightCount: 2,
                            position: new THREE.Vector3(this.brickWalls.x - pos - reverse * r2 * Math.sin(theta), this.brickWalls.y + r2 * Math.cos(theta), 0),
                            offsetWidth: new THREE.Vector3(0, 1.05, 0),
                            offsetHeight: new THREE.Vector3(0, 0, 0.45),
                            randomOffset: new THREE.Vector3(0, 0, 0),
                            randomRotation: new THREE.Vector3(0, 0, 0),
                            rotation: new THREE.Vector3(0, 0, reverse * theta),
                        }
                    }),
                )
            }
    
            for (let theta = 0; theta <= Math.PI; theta += Math.PI / 60) {
                this.brickWalls.items.push(
                    this.walls.add({
                        object: this.brickWalls.brickOptions,
                        shape:
                        {
                            type: 'rectangle',
                            widthCount: 1,
                            heightCount: 2,
                            position: new THREE.Vector3(this.brickWalls.x - pos + reverse * r1 * Math.sin(theta), this.brickWalls.y + r1 + r2 + r1 * Math.cos(theta), 0),
                            offsetWidth: new THREE.Vector3(0, 1.05, 0),
                            offsetHeight: new THREE.Vector3(0, 0, 0.45),
                            randomOffset: new THREE.Vector3(0, 0, 0),
                            randomRotation: new THREE.Vector3(0, 0, 0),
                            rotation: new THREE.Vector3(0, 0, -1 * reverse * theta),
                        }
                    }),
                    this.walls.add({
                        object: this.brickWalls.brickOptions,
                        shape:
                        {
                            type: 'rectangle',
                            widthCount: 1,
                            heightCount: 2,
                            position: new THREE.Vector3(this.brickWalls.x - pos + reverse * r2 * Math.sin(theta), this.brickWalls.y + r1 + r2 + r2 * Math.cos(theta), 0),
                            offsetWidth: new THREE.Vector3(0, 1.05, 0),
                            offsetHeight: new THREE.Vector3(0, 0, 0.45),
                            randomOffset: new THREE.Vector3(0, 0, 0),
                            randomRotation: new THREE.Vector3(0, 0, 0),
                            rotation: new THREE.Vector3(0, 0, -1 * reverse * theta),
                        }
                    }),
                )
            }
        }

        drawS(40, 20, 14, false)
        drawS(90, 20, 14, true)

        for (let gap = -25; gap < 25; gap += 1) {
            this.brickWalls.items.push(
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x - 120, this.brickWalls.y + gap, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, Math.PI / 2),
                    }
                }),
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x - 152, this.brickWalls.y + gap, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, Math.PI / 2),
                    }
                }),
            )
        }
        for (let gap = -25; gap < 19; gap += 1) {
            this.brickWalls.items.push(
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x - 126, this.brickWalls.y + gap, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, Math.PI / 2),
                    }
                }),
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x - 146, this.brickWalls.y + gap, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, Math.PI / 2),
                    }
                }),
            )
        }
        for (let gap = -145; gap < -126; gap += 1) {
            this.brickWalls.items.push(
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x + gap, this.brickWalls.y + 19, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, 0),
                    }
                }),
            )
        }
        for (let gap = -151; gap < -120; gap += 1) {
            this.brickWalls.items.push(
                this.walls.add({
                    object: this.brickWalls.brickOptions,
                    shape:
                    {
                        type: 'rectangle',
                        widthCount: 1,
                        heightCount: 2,
                        position: new THREE.Vector3(this.brickWalls.x + gap, this.brickWalls.y + 25, 0),
                        offsetWidth: new THREE.Vector3(0, 1.05, 0),
                        offsetHeight: new THREE.Vector3(0, 0, 0.45),
                        randomOffset: new THREE.Vector3(0, 0, 0),
                        randomRotation: new THREE.Vector3(0, 0, 0),
                        rotation: new THREE.Vector3(0, 0, 0),
                    }
                }),
            )
        }




        // Reset
        this.brickWalls.reset = () =>
        {
            for(const _wall of this.brickWalls.items)
            {
                for(const _brick of _wall.items)
                {
                    _brick.collision.reset()
                }
            }
        }

        // Reset area
        this.brickWalls.resetArea = this.areas.add({
            position: new THREE.Vector2(this.brickWalls.x, this.brickWalls.y),
            halfExtents: new THREE.Vector2(2, 2)
        })
        this.brickWalls.resetArea.on('interact', () =>
        {
            this.brickWalls.reset()
        })

        // Reset label
        this.brickWalls.areaLabelMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaResetTexture }))
        this.brickWalls.areaLabelMesh.position.x = this.brickWalls.x
        this.brickWalls.areaLabelMesh.position.y = this.brickWalls.y
        this.brickWalls.areaLabelMesh.matrixAutoUpdate = false
        this.brickWalls.areaLabelMesh.updateMatrix()
        this.container.add(this.brickWalls.areaLabelMesh)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder.add(this.brickWalls, 'reset').name('brickWalls reset')
        }
    }

    setBowling()
    {
        this.bowling = {}
        this.bowling.x = this.x + 15
        this.bowling.y = this.y + 4

        this.bowling.pins = this.walls.add({
            object:
            {
                base: this.resources.items.bowlingPinBase.scene,
                collision: this.resources.items.bowlingPinCollision.scene,
                offset: new THREE.Vector3(0, 0, 0.1),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: { sizeX: 1.4, sizeY: 1.4, offsetZ: - 0.15, alpha: 0.35 },
                mass: 0.1,
                soundName: 'bowlingPin'
                // sleep: false
            },
            shape:
            {
                type: 'triangle',
                widthCount: 4,
                position: new THREE.Vector3(this.bowling.x - 25, this.bowling.y, 0),
                offsetWidth: new THREE.Vector3(0, 1, 0),
                offsetHeight: new THREE.Vector3(0.65, 0, 0),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0)
            }
        })

        this.bowling.ball = this.objects.add({
            base: this.resources.items.bowlingBallBase.scene,
            collision: this.resources.items.bowlingBallCollision.scene,
            offset: new THREE.Vector3(this.bowling.x - 5, this.bowling.y, 0),
            rotation: new THREE.Euler(Math.PI * 0.5, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.15, alpha: 0.35 },
            mass: 1,
            soundName: 'bowlingBall'
            // sleep: false
        })

        // Reset
        this.bowling.reset = () =>
        {
            // Reset pins
            for(const _pin of this.bowling.pins.items)
            {
                _pin.collision.reset()
            }

            // Reset ball
            this.bowling.ball.collision.reset()
        }

        // Reset area
        this.bowling.resetArea = this.areas.add({
            position: new THREE.Vector2(this.bowling.x, this.bowling.y),
            halfExtents: new THREE.Vector2(2, 2)
        })
        this.bowling.resetArea.on('interact', () =>
        {
            this.bowling.reset()
        })

        // Reset label
        this.bowling.areaLabelMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaResetTexture }))
        this.bowling.areaLabelMesh.position.x = this.bowling.x
        this.bowling.areaLabelMesh.position.y = this.bowling.y
        this.bowling.areaLabelMesh.matrixAutoUpdate = false
        this.bowling.areaLabelMesh.updateMatrix()
        this.container.add(this.bowling.areaLabelMesh)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder.add(this.bowling, 'reset').name('bowling reset')
        }
    }
}
