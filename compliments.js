var Compliments = function(filename){
  jQuery.get(filename, this.parseCompliments.bind(this))
  this.container = jQuery('#compliment');
  this.body = jQuery('body');
  this.delay = 10000;
}
Compliments.prototype.parseCompliments = function(data){
  this.colors = data.colors;
  this.compliments = data.compliments;
  if(location.hash){
    var complimentIndex = location.hash.substring(1);
    this.switchCompliment(parseInt(complimentIndex));
  } else {
    this.rotateCompliment();
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
    window.location.hash = index;
    setTimeout(this.rotateCompliment.bind(this), this.delay);
  }
  
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