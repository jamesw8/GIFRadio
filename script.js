var count = 0;
var selected = Array.apply(null, Array(203)).map(Boolean.prototype.valueOf,false);

//api call
/*$.getJSON("http://localhost:8000/gifs", function(data) {
    var json = $.parseJSON(data);
  }
);*/


$.ajax({
  url: "http://localhost:8000/gifs",
  dataType: "text",
  success: function(data) {
    var json = $.parseJSON(data);
    for (var i=0; i<20; i++) {
      document.getElementById("cell"+i).innerHTML = "<img class=\"giph\" src=\""+json.gifs[i]+">";
    }
  }
});

//onclick table
var clickFcn = function(i) {
  var name = "#cell"+i;
  $(name).click(function() {
    console.log(count);
    if (selected[i]) {
      $(name).removeClass('select');
      $(name).addClass('not-select');
      selected[i] = !selected[i];
      count--;
    }
    else if (count<5) {
      $(name).removeClass('not-select');
      $(name).addClass('select');
      count++;
      selected[i] = !selected[i];
    }
  });
}

for (var i=0; i<20; i++) {
  clickFcn(i);
}