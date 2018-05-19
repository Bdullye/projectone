$(document).ready(function(){

    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        var zipCode = "";
        console.log(zipCode);

        $.ajax({
            url: "https://api.propublica.org/congress/v1/members/senate/TX/current.json",
            type: "GET",
            dataType: 'json',
            headers: {'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw'}
          }).done(function(data){
          console.log(data)
          });

          $.ajax({
            url:"https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS",
            type: "GET",
            dataType: 'json',
          }).done(function(data){
          console.log(data)
          });
    });
});
