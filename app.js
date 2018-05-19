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
            url:"https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo&texas&includeOffices=true&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody",
            type: "GET",
            dataType: 'json',
          }).done(function(data){
          console.log(data)
          });
    });
});
function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": "texas",
      "levels": [
        "country"
      ],
      "roles": [
        "legislatorLowerBody",
        "legislatorUpperBody"
      ],
      "resource": {}
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
