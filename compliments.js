var Compliments = function(filename){
  jQuery.get(filename, this.parseCompliments.bind(this))
  this.container = jQuery('#compliment');
  this.body = jQuery('body');
  this.delay = 5000;
}
Compliments.prototype.parseCompliments = function(data){
  this.colors = data.colors;
  this.compliments = data.compliments;
  this.rotateCompliment();
}
Compliments.prototype.rotateCompliment = function(){
  //fade out old text
  this.container.fadeOut(200, function(){
      //obtain the new colour and compliment
      var color = this.colors[Math.floor(Math.random()*this.colors.length)];
      var compliment = this.compliments[Math.floor(Math.random()*this.compliments.length)];
      
      //update the container with the text
      this.container.text(compliment);
      
      //change the background color
      this.body.animate({backgroundColor:color},150);
    }.bind(this)
  );
  
}


var compliments = new Compliments('compliments.json');