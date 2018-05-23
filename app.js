$(document).ready(function(){

    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        var zipCode = $("#zipcode").val().trim();
        console.log(zipCode);
        

        // update these based off of the html
        var address = "Alaska";
       // var stateCode = "AK";

        //var senatorInformtion = null;

        var members = "W000802";
         $.ajax({
            url:"https://www.googleapis.com/civicinfo/v2/representatives?address=" + zipCode + "&levels=country&roles=legislatorUpperBody&key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo",
            type: "GET",
            dataType: 'json',
          }).done(function(googleData){
              console.log(googleData);
              console.log(googleData.officials.length);
              var stateCode = googleData.normalizedInput.state;
              console.log(googleData.normalizedInput.state);
              var officials = googleData.officials;
              var officialsLength = googleData.officials.length;
              for (i = 0; i < officialsLength; i++) {
                $('<button type="button" class="btn btn-primary" />').text(officials[i].name).appendTo('body');
              }

              
            $.ajax({
                url: "https://api.propublica.org/congress/v1/members/senate/" + stateCode + "/current.json",
                type: "GET",
                dataType: 'json',
                headers: {'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw'}
              }).done(function(proData){
                console.log(proData);
                var MemID1 = proData.results[0].id
                var MemID2 = proData.results[1].id
                //senatorInformation = proData;
                 $.ajax({
                  url: "https://api.propublica.org/congress/v1/members/" + MemID1 + ".json",
                  type: "GET",
                  dataType: 'json',
                  headers: {'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw'}
                }).done(function(proData){
                  console.log(proData);
                  //senatorInformation = proData;
                }); 
                $.ajax({
                  url: "https://api.propublica.org/congress/v1/members/" + MemID2 + ".json",
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
});
