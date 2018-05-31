$(document).ready(function () {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDc6SV15WjITnz3pM65DHn9UdBMHxNfQRY",
  authDomain: "stay-civil.firebaseapp.com",
  databaseURL: "https://stay-civil.firebaseio.com",
  projectId: "stay-civil",
  storageBucket: "",
  messagingSenderId: "721910789320"
};
firebase.initializeApp(config);

var database = firebase.database();
var searchAnalytics = {};
  var senatorData = [];
  $(".searchBtn").on("click", function (event) {
    event.preventDefault();
    var zipCode = $("#zipcode").val().trim();
    $(".results").empty();
    console.log(zipCode);

    $.ajax({
      url: "https://www.googleapis.com/civicinfo/v2/representatives?address=" + zipCode + "&levels=country&roles=legislatorUpperBody&key=AIzaSyDJ0c90sjJFsOWJYVeCj44tdedOKuguVoo",
      type: "GET",
      dataType: 'json',
    }).done(function (googleData) {
      console.log(googleData);
      console.log(googleData.officials.length);
      console.log(googleData.officials);
      var stateCode = googleData.normalizedInput.state;
      console.log(googleData.normalizedInput.state);
      var officials = googleData.officials;
      var officialsLength = googleData.officials.length;
      for (i = 0; i < officialsLength; i++) {
        senatorData[i] = {
          name: officials[i].name,
          party: officials[i].party,
          photo: officials[i].photoUrl,
          phones: officials[i].phones,
          urls: officials[i].urls,
        };
        //$('<button type="button" class="btn btn-primary" />').text(officials[i].name).appendTo('.results');
        var senatorBtn = $('<button>');
        senatorBtn.attr('type', "button").attr('class', 'btn btn-primary').attr('data-index', i).text(officials[i].name);
        senatorBtn.on("click", function () {
          //
          $(".senator-info").empty();
          var index = $(this).attr('data-index');
          var img = $("<img src=" + senatorData[index].photo + " class='senatorProfile'>");
          // $("img").attr("width", "180").attr("height","120");
          var info = '<br/> Party: ' + senatorData[index].party + '<br/>' + 'Website: <a href="' + senatorData[index].urls + '">' + senatorData[index].urls + '</a><br/>' + 'Phones: ' + senatorData[index].phones;
          $(".senator-info").append(img).append(info);
        });
        $('.results').append(senatorBtn);
      }
      searchAnalytics.state = googleData.normalizedInput.state;
      searchAnalytics.zip = zipCode;
      searchAnalytics.queryCount = 1;
      
      var stateZips = database.ref(googleData.normalizedInput.state).orderByChild("zip");//.equalTo(zipCode);
      var dbZip = false;
      console.log(stateZips);
      for (i = 0; i < stateZips.length; i++) {
        if (stateZips[i].zip == zipCode){
          stateZips[i].queryCount = parseInt(stateZips[i].queryCount) + 1;
          dbZip = true;
        }
      }

      if (!dbZip){
        database.ref(googleData.normalizedInput.state).push(searchAnalytics);
      }else {
        database.ref(googleData.normalizedInput.state).update(stateZips);
      }

      $.ajax({
        url: "https://api.propublica.org/congress/v1/members/senate/" + stateCode + "/current.json",
        type: "GET",
        dataType: 'json',
        headers: { 'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw' }
      }).done(function (proData) {
        console.log(proData);
        var MemID1 = proData.results[0].id
        var MemID2 = proData.results[1].id
        console.log('line 62' + JSON.stringify(proData.results[0]));
        console.log('line 63' + JSON.stringify(proData.results[1]));
        //senatorInformation = proData;
        $.ajax({
          url: "https://api.propublica.org/congress/v1/members/" + MemID1 + ".json",
          type: "GET",
          dataType: 'json',
          headers: { 'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw' }
        }).done(function (proData) {
          console.log(proData);
          //senatorInformation = proData;
        });
        $.ajax({
          url: "https://api.propublica.org/congress/v1/members/" + MemID2 + ".json",
          type: "GET",
          dataType: 'json',
          headers: { 'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw' }
        }).done(function (proData) {
          console.log(proData);
          //senatorInformation = proData;
        });
      });
    });
  });

  function getSenators(zip) {
    //first api call
  }
});
