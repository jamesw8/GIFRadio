var count = 0;
var selected = Array.apply(null, Array(203)).map(Boolean.prototype.valueOf,false);

var clickFcn = function(i) {
  var name = "#cell"+i;
  $(name).click(function() {
    if (selected[i]) {
      $(name).removeClass('select');
      $(name).addClass('not-select');
      count--;
    }
    else if (count<5) {
      $(name).removeClass('not-select');
      $(name).addClass('select');
      count++;
    }
    selected[i] = !selected[i];
  });
}

for (var i=0; i<20; i++) {
  clickFcn(i);
}