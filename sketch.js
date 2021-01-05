//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
function preload()
{
  //load images here
  function preload(){
    dog = loadImage("..dogImg.png");
    dog1_img = loadImage("..dogImg1.png");
    
  }
}

function setup() {
  createCanvas(500, 500);
     dog = createSprite(100,200);
  dog.addImage("dog",dog);
  foodStock =database.ref('Food');
  foodStock.on("value",readStock);
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM", 350,30);
  }else if(lastFed=0){
    text("Last Feed :12AM", 350,30);
  }else{
    text("Last Feed :"+ lastFed + "AM", 350,30);
  }
  background(46,139,87);
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
    });
  dispay();
  drawSprites();
  //add styles here

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foods=data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
