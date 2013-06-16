var Compliments = function(filename){
  this.container = jQuery('#compliment');
  this.body = jQuery('body');
  this.list = jQuery('#complimentList');
  this.delay = 10000;
  jQuery.get(filename, this.parseCompliments.bind(this));
  jQuery(window).keyup(this.keyChange.bind(this));
}
Compliments.prototype.keyChange = function(event){
  switch(event.keyCode){
    //prev
    case 38:
    case 37:
      var index = this.currentIndex - 1;
      if(index < 0){
        index = this.compliments.length-1;
      }
      break;
    //next
    case 39:
    case 40:
      var index = this.currentIndex + 1;
      if(index >= this.compliments.length){
        index = 0;
      }
      break;
  }
  if(index){
    if(this.timeoutThing){
      clearTimeout(this.timeoutThing);
    }
    this.switchCompliment(index);
  }
}
Compliments.prototype.parseCompliments = function(data){
  this.colors = data.colors;
  this.compliments = data.compliments;
  
  //create the list
  for(var i=0;i < this.compliments.length; i++){
    var item = jQuery('<div></div>');
    item.data('index', i);
    item.click(this.switchClick.bind(this));
    this.list.append(item);
  }
  
  //hashhashhash
  if(location.hash){
    var complimentIndex = location.hash.substring(1);
    this.switchCompliment(parseInt(complimentIndex));
  } else {
    this.rotateCompliment();
  }
}
Compliments.prototype.switchClick = function(event){
  var index = jQuery(event.target).data('index');
  
  if(index){
    if(this.timeoutThing){
      clearTimeout(this.timeoutThing);
    }
    this.switchCompliment(index);
  }
}
Compliments.prototype.rotateCompliment = function(){
  //fade out old text
  this.container.fadeOut(200, this.switchCompliment.bind(this));
}
Compliments.prototype.switchCompliment = function(index){
  //obtain the new colour and compliment
  var color = this.colors[Math.floor(Math.random()*this.colors.length)];
  
  //get the compliment
  if(!index){
    var index = Math.floor(Math.random()*this.compliments.length);
    //History.pushState({state:1}, "Odd Compliment #"+History.getHash(), '#'+History.getHash());
    this.timeoutThing = setTimeout(this.rotateCompliment.bind(this), this.delay);
  }
  
  //set the hash
  window.location.hash = index;
  this.currentIndex = index;
  
  //get the compliment
  var compliment = this.compliments[index];
  
  //update the container with the text
  this.container.text(compliment);
  
  //change the background color
  this.body.animate({backgroundColor:color},150);
  this.centralise();
  this.container.fadeIn();
}
Compliments.prototype.centralise = function(){
  var height = this.container.height();
  var bHeight = jQuery(window).height();
  var offset = (bHeight/2)-(height/2);
  this.container.css({marginTop:offset+'px'});
}


var compliments = new Compliments('compliments.json');