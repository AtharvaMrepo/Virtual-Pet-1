//Create variables here
var dog,dogImage,happydogImage,Database,foodStock,foodCount

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png")
  happydogImage = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  Database = firebase.database()

  dog = createSprite(250,250,50,50)

  dog.addImage(dogImage)
  dog.scale = 0.23

  foodStock=Database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
background("green")
  drawSprites();

  //add styles here
  fill("white")
  textSize(20)
  text("available foodStock = "+ foodCount,250,100)
  text("Note: Press UP ARROW to feed DRAGO milk",200,50)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodCount);
    dog.addImage(happydogImage);

  }


}
function readStock(data){
foodCount = data.val();


}

function writeStock(x){
  if(x <= 0){
    x = 0
 
  }
  else{
    x = x-1
  }
Database.ref('/').update({
  Food:x
})

}



