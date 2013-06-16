var Compliments = function(filename){
  jQuery.ajax(filename, this.parseCompliments.bind(this))
}
Compliments.prototype.parseCompliments = function(data){
  console.log(data);
}


var compliments = new Compliments('compliments.json');