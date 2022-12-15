const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var fruta, corda, corda2, corda3, link, link2, link3, fundoimg, frutaimg, coelhoimg, coelho, cortar, cortar2, cortar3, balao;
var coelhocome, coelhopisca, coelhotriste;
var somFundo, mute, somCome, somChora, somCorta, somSopro
var widthC,heightC, movel;
let engine;
let world;
var ground;
function preload() {
  coelhoimg=loadImage("midias/Rabbit-01.png")
  frutaimg=loadImage("midias/melon.png")
  fundoimg=loadImage("midias/background.png")
  coelhocome=loadAnimation("midias/eat_0.png","midias/eat_1.png","midias/eat_2.png","midias/eat_3.png","midias/eat_4.png")
  coelhopisca=loadAnimation("midias/blink_1.png","midias/blink_2.png","midias/blink_3.png")
  coelhotriste=loadAnimation("midias/sad_1.png","midias/sad_2.png","midias/sad_3.png")
  coelhocome.playing=true
  coelhopisca.playing=true
  coelhotriste.playing=true
  coelhocome.looping=false
  coelhotriste.looping=false
  somFundo=loadSound("midias/sound1.mp3")
  somCome=loadSound("midias/eating_sound.mp3")
  somChora=loadSound("midias/sad.wav")
  somCorta=loadSound("midias/rope_cut.mp3")
  somSopro=loadSound("midias/air.wav")
}

function setup() {
  somFundo.play()
  somFundo.setVolume(0.2)
  movel=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(movel){
    widthC=displayWidth
    heightC=displayHeight
    createCanvas(widthC+80, heightC)
  }else{
    widthC=windowWidth
    heightC=windowHeight
    createCanvas(widthC, heightC)
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 580, 600, 20);
  fruta = Bodies.circle(250, 200, 15)
  corda = new Rope(8, { x: 300, y: 50 })
  corda2 = new Rope(4, { x: width/2-90, y: 30 })
  corda3 = new Rope(6, { x: width/2+110, y: 140 })
  Composite.add(corda.body, fruta)
  link = new Link(corda, fruta)
  link2 = new Link(corda2, fruta)
  link3 = new Link(corda3, fruta)
  coelhopisca.frameDelay=30
  coelhocome.frameDelay=20
  coelho=createSprite(width/2-250,520)
  coelho.addAnimation("coelho piscando",coelhopisca)
  coelho.addAnimation("coelho comendo",coelhocome)
  coelho.addAnimation("coelho triste", coelhotriste)
  coelho.scale=0.2
  cortar=createImg("midias/cut_btn.png")
  cortar.position(280,50)
  cortar.size(45,45)
  cortar.mouseClicked(corte)
  cortar2=createImg("midias/cut_btn.png")
  cortar2.position(width/2-100,30)
  cortar2.size(45,45)
  cortar2.mouseClicked(corte2)
  cortar3=createImg("midias/cut_btn.png")
  cortar3.position(width/2+70,120)
  cortar3.size(45,45)
  cortar3.mouseClicked(corte3)
  //balao=createImg("midias/balloon.png")
  //balao.position(7,200)
  //balao.size(150,110)
  //balao.mouseClicked(sopro)
  mute=createImg("midias/mute.png")
  mute.position(10,10)
  mute.size(40,40)
  mute.mouseClicked(mutar)
}

function draw() {
  background(fundoimg);
  corda.exibir()
  corda2.exibir()
  corda3.exibir()
  imageMode(CENTER)
  if(fruta!==null){
     image(frutaimg,fruta.position.x, fruta.position.y, 70,70)

  }
 if(colidiu(fruta,coelho)==true){
coelho.changeAnimation("coelho comendo")
somCome.play()
 }
 if(fruta!==null&&fruta.position.y>=550){
 coelho.changeAnimation("coelho triste")
 fruta=null
 somChora.play()
 }
  Engine.update(engine);

  drawSprites()
}

function corte(){
  corda.break()
  link.desanexar()
  link=null
  somCorta.play()
}
function corte2(){
  corda2.break()
  link2.desanexar()
  link2=null
  somCorta.play()
}
function corte3(){
  corda3.break()
  link3.desanexar()
  link3=null
  somCorta.play()
}
function colidiu(melancia,bunny){
if(melancia!==null){
var distancia=dist(melancia.position.x,melancia.position.y,bunny.position.x,bunny.position.y)
if(distancia<=80){
World.remove(world,fruta)
fruta=null
return true
}else{
return false
}}

}
function sopro(){
Body.applyForce(fruta,{x:0,y:0},{x:0.02,y:0})
somSopro.play()
}
function mutar(){
  if(somFundo.isPlaying()){
    somFundo.stop()
  }else{
  somFundo.play()
  somFundo.setVolume(0.2)
  }
}