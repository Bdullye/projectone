$(document).ready(function(){

    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        var zipCode = "";
        console.log(zipCode);

        // update these based off of the html
        var address = "Alaska";
        var stateCode = "AK";

        //var senatorInformtion = null;

        var members = "W000802";
         $.ajax({
            url:"https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo&address=" + address + "&includeOffices=true&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody",
            type: "GET",
            dataType: 'json',
          }).done(function(googleData){
              console.log(googleData);

              
            $.ajax({
                url: "https://api.propublica.org/congress/v1/members/senate/" + stateCode + "/current.json",
                type: "GET",
                dataType: 'json',
                headers: {'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw'}
              }).done(function(proData){
                console.log(proData);
                //senatorInformation = proData;
              });
          });
    });
});
