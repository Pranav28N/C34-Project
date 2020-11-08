//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock

function preload(){
 dogImage = loadImage("images/dogImg.png")
 happyDogImage = loadImage("images/dogImg1.png")
}




function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  dog = createSprite(250,250)
  dog.addImage("t",dogImage)
  dog.scale = 0.2
  happyDog = createSprite(250,250)
  happyDog.addImage("k",happyDogImage)
  happyDog.scale = 0.2
  happyDog.visible = false
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.visible = false
    happyDog.visible = true
  }
  if(keyWentUp(UP_ARROW)){
    dog.visible = true
    happyDog.visible = false
  }
  textSize(20)
  fill("black")
  text("Press Up Arrow key to feed the dog",100,100)
  text("Food Remaining :" + foodS,150,150)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
    x = x-1
  }
  database.ref('/').update({
   Food:x
  })
}



