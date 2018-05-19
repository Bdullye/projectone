$(document).ready(function(){

    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        var zipCode = "";
        console.log(zipCode);

        var address = "Alaska";
        var members = "W000802";
         $.ajax({
            url:"https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo&address=" + address + "&includeOffices=true&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody",
            type: "GET",
            dataType: 'json',
          }).done(function(data){
              console.log(data);
            $.ajax({
                url: "https://api.propublica.org/congress/v1/members.json",
                type: "GET",
                dataType: 'json',
                headers: {'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw'}
              }).done(function(data){
          console.log(data);
              });
          });
    });
});
