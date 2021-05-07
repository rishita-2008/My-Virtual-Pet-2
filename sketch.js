var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastfed;
var feedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  lastFed=database.ref('feedTime');

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed.on("value",function(data){
    feedTime=data.val();
  })
  
 
  //write code to display text lastFed time here
  fill("black");
  textSize(15)
  if(feedTime>=12){
    text("Last Fed:"+feedTime % 12+"pm", 370,30 )
  } else if(feedTime==0){
    text("Last Fed: 12am", 370,30)
  } else {text("last Fed:"+feedTime+"am",370,30)}

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood();
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
