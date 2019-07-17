
var count;
var checkcounter = 0;
var x = document.getElementById("sound");

 function playAudio() { 
   x.play(); 
 } 

setInterval(function(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           checkcounter = count;
           var result = JSON.parse(xhttp.responseText);
           count = result.length;
           if(count !== checkcounter){
               //// value must change to trigger here
               
               $(document).ready(function(){
                $('.toast').toast('show');
                $('#toastmessage').text(result[count-1].text);
                var presentminute = new Date();
                presentminute = presentminute.getMinutes();
                var postedminute = result[count-1].createdAt.slice(14,16);
                var minute = parseInt(presentminute)-parseInt(postedminute);
                $('#questiontime').text(minute+" mins ago"); 
                playAudio();
                });
               
           }
        }
    };
    xhttp.open("GET", "https://api-helpages.herokuapp.com/questions/", true);
    xhttp.send();     
    
},1000);
    


