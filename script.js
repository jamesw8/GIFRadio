var count = 0;
var selected = Array(20).fill(false);
var gifs = Array(20).fill("");

$.ajax({
  url: "http://localhost:8000/gifs",
  dataType: "text",
  success: function(data) {
    var json = $.parseJSON(data);
    for (var i=0; i<20; i++) {
      document.getElementById("cell"+i).innerHTML = "<img class=\"giph\" src=\""+json.gifs[i]+"\">";
      gifs[i] = json.gifs[i];
    }
  }
});

//onclick table
var clickFcn = function(i) {
  var name = "#cell"+i;
  $(name).click(function() {
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

$("#submit").click(function() {
  var toSubmit = [];
  for (var i=0; i<gifs.length; i++) {
    if (selected[i]) {
      toSubmit.push(gifs[i]);

    }
  }
  console.log(toSubmit);
  $.post("http://localhost:8000/songs", {"gif_urls": toSubmit}, function(data, success) {
    var songs = data.tracks;

    var newPage1 = `<h1 class="info">Most Popular Tags</h1>
    <table><tr>`;

    var newPage2 = ``;
    for (var i=0; i<10; i++) {
      newPage2 += "<td class=\"keyword\">"+data.keywords[i]+"</td>";
      if (i==4) {
        newPage2 += "</tr><tr>";
      }
    }
    
    var newPage3 = `</tr></table>
    <h1 class="info">Recommended Songs</h1>
    <div class="container">
      <table>
      <th>Artist</th><th>Song</th>`;

    var newPage4 = ``;
      for (var i=0; i<songs.length; i++) {
        var data = songs[i].split(', by ');
        if (i==0) {
          newPage4 += "<tr><td class=\"keyword first-row-songs\">"+data[1]+"</td><td class=\"keyword first-row-songs\">"+data[0]+"</td></tr>";
        }
        else {
          newPage4 += "<tr><td class=\"keyword\">"+data[1]+"</td><td class=\"keyword\">"+data[0]+"</td></tr>";
        }
      }

    var newPage5 = `</table>
    </div>`;
    var newPage = newPage1 + newPage2 + newPage3 + newPage4 + newPage5;
    document.getElementById("content").innerHTML = newPage;
  });
});