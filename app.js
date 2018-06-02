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
        }).done(function (proData2) {
          console.log(proData2);
          var coSponsor = (proData2.results[0].roles[0].bills_cosponsored);
          var sponsor = (proData2.results[0].roles[0].bills_sponsored);
          var committes = (proData2.results[0].roles[0].committees[i].name); 
          var subcommittees = (proData2.results[0].roles[0].subcommittees[i].name); 
          var voteParty = (proData2.results[0].roles[0].votes_with_party_pct);
          var voteMissed = (proData2.results[0].roles[0].missed_votes_pct);
          console.log(committes);
        
          $.ajax({
            url: "https://api.propublica.org/congress/v1/members/" + MemID2 + ".json",
            type: "GET",
            dataType: 'json',
            headers: { 'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw' }
          }).done(function (proData) {
            console.log(proData);
            var coSponsor2 = (proData.results[0].roles[0].bills_cosponsored);
            var sponsor2 = (proData.results[0].roles[0].bills_sponsored);
            var committes2 = (proData.results[0].roles[0].committees[i].name); 
            var subcommittees2 = (proData.results[0].roles[0].subcommittees[i].name); 
            var voteParty2 = (proData.results[0].roles[0].votes_with_party_pct);
            var voteMissed2 = (proData.results[0].roles[0].missed_votes_pct);
            //senatorInformation = proData;
          });
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
            senatorBtn.attr('type', "button").attr('class', 'btn btn-primary').attr('data-index', 0).text(officials[0].name);
            senatorBtn.on("click", function () {
              //
              $(".senator-info").empty();
              var index = $(this).attr('data-index');
              var img = $("<img src=" + senatorData[0].photo + " class='senatorProfile'>");
              // $("img").attr("width", "180").attr("height","120");
              var info = '<br/> Party: ' + senatorData[0].party + '<br/>' + 'Website: <a href="' + senatorData[0].urls + '">' + senatorData[0].urls + '</a><br/>' + 'Phones: ' + senatorData[0].phones + '</br>' + coSponsor + '</br>' + committes + '</br>' + sponsor + '</br>' + subcommittees + '</br>' + voteMissed + voteParty;
              $(".senator-info").append(img).append(info);
            });
            $('.results').append(senatorBtn);
          
          var senatorBtn2 = $('<button>');
            senatorBtn2.attr('type', "button").attr('class', 'btn btn-primary').attr('data-index', 1).text(officials[1].name);
            senatorBtn2.on("click", function () {
              //
              $(".senator-info").empty();
              var index2 = $(this).attr('data-index');
              var img2 = $("<img src=" + senatorData[1].photo + " class='senatorProfile'>");
              // $("img").attr("width", "180").attr("height","120");
              var info2 = '<br/> Party: ' + senatorData[1].party + '<br/>' + 'Website: <a href="' + senatorData[1].urls + '">' + senatorData[1].urls + '</a><br/>' + 'Phones: ' + senatorData[1].phones + '</br>' + coSponsor2 + '</br>' + committes2 + '</br>' + sponsor2 + '</br>' + subcommittees2 + '</br>' + voteMissed2 + voteParty2;
              $(".senator-info").append(img2).append(info2);
            });
            $('.results').append(senatorBtn2);
          
        }
          
          //senatorInformation = proData;
        });
        
      });
 
      }); 
    });
  });
  

  function getSenators(zip) {
    //first api call
  }
