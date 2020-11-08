let ball1, ball2, ball3, ball4;

function setup() {
  createCanvas(500, 500);

  ball1 = new Ball(100, 100, 66, 240, 240, 240, 10);
  ball2 = new Ball(200, 100, 21, 240, 0, 0, 3);
  ball3 = new Ball(300, 100, 72, 153, 56, 0, 12);
  ball4 = new Ball(400, 100, 19, 170, 240, 0, 1);
  grass = new Grass();
  cloud = new Cloud();
  windEffect = new WindEffect();
  createP('Press mouse on to apply wind force.');
}

function draw() {
  background(0, 170, 230);
  let gravity1 = createVector(0, 0.2*ball1.mass);
  let gravity2 = createVector(0, 0.2*ball2.mass);
  let gravity3 = createVector(0, 0.2*ball3.mass);
  let gravity4 = createVector(0, 0.2*ball4.mass);
  strokeWeight(4);
  textSize(16);
  text('TENNIS', 370, 130);
  textSize(16);
  text('BASKETBALL', 250, 130);
  textSize(16);
  text('BASEBALL', 160, 130);
  textSize(16);
  text('FOOTBALL', 60, 130);

  let c1 = 0.1; // 마찰계수 M을 정한다
  let friction1 = ball1.vel.copy(); //현재의 속도를 가져온다
  friction1.mult(-1); //마찰력의 방향인 -1을 곱함
  friction1.normalize();
  friction1.mult(c1); //벡터의 크기(길이)를 위에서 정한 마찰계수로 정함
  ball1.applyForce(friction1);

  let c2 = 0.1;
  let friction2 = ball2.vel.copy();
  friction2.mult(-1);
  friction2.normalize();
  friction2.mult(c2);
  ball2.applyForce(friction2);

  let c3 = 0.1
  let friction3 = ball3.vel.copy();
  friction3.mult(-1);
  friction3.normalize();
  friction3.mult(c3);
  ball3.applyForce(friction3);

  let c4 = 0.1
  let friction4 = ball1.vel.copy();
  friction4.mult(-1);
  friction4.normalize();
  friction4.mult(c4);
  ball4.applyForce(friction4);

  ball1.display(); ball1.move(); ball1.checkEdges(); ball1.applyForce(gravity1);
  ball2.display(); ball2.move(); ball2.checkEdges(); ball2.applyForce(gravity2);
  ball3.display(); ball3.move(); ball3.checkEdges(); ball3.applyForce(gravity3);
  ball4.display(); ball4.move(); ball4.checkEdges(); ball4.applyForce(gravity4);

  let wind = createVector(0.2, 0);
  if(mouseIsPressed)  {
    ball1.applyForce(wind); ball2.applyForce(wind); ball3.applyForce(wind); ball4.applyForce(wind);  windEffect.display();
  }
  grass.display();
  cloud.show();
}


class Ball  {
  constructor(x, y, r, red, green, blue, mass)  {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.x = x; this.y = y; this.r = r;
    this.red = red; this.green = green; this.blue = blue;
    this.mass = mass;
  }

  applyForce(force){
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  move()  {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }

  display()  {
    stroke(0);
    strokeWeight(4);
    fill(this.red, this.green, this.blue);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  checkEdges()  {
    if(this.pos.y>height) {
      this.vel.y *= -0.9;
      this.pos.y = height;
      noStroke();
      fill(255,0,0, 100);
      rect(0, 490, 500, 20);
    }
    if(this.pos.x>width)  {
      this.vel.x *= -0.8;
      this.pos.x = width;
      noStroke();
      fill(255,0,0, 100);
      rect(480, 0, 20, 500);
    }
    if(this.pos.x<0)  {
      this.vel.x *= -0.8;
      this.pos.x = 0;
      noStroke();
      fill(255,0,0, 100);
      rect(0, 0, 20, 500);
    }
  }
}


class Grass  {
  display()  {
  for(let i=0; i<width; i++)  {
    fill(0, 255, 0);
    stroke(0);
    strokeWeight(1);
    rect(i*6, 490, 3, 10);

  }
}
}

class Cloud  {
  show()  {
  noStroke();
  fill(255, 200);
    for(let i=0; i< width; i++)  {
  ellipse(20*4*i, 60, 90, 50);
  ellipse(20*4*i, 30, 120, 50);
  ellipse(20*4*i, 0, 90, 50);
  }
  }
}

class WindEffect  {
  display()  {
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(32);
  text('WIND!', 200, 200);
  }
}
