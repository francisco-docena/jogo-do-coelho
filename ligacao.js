class Link {
    constructor(bodyA, bodyB) {
      //restrição entre o ultimo retangulo e a frutaria
      //tirar 2 do tamanho da matriz (retangulo e fruta)
      var lastlink = bodyA.body.bodies.length - 2;
      this.link = Constraint.create({
        bodyA: bodyA.body.bodies[lastlink],
        pointA: { x: 0, y: 0 },
        bodyB: bodyB,
        pointB: { x: 0, y: 0 },
        length: -10,
        stiffness: 0.01,
      });
      World.add(world, this.link);
    }
  
    desanexar() {
      World.remove(world, this.link);
    }
  }