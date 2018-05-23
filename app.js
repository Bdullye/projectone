$(document).ready(function() {
  $('.searchBtn').on('click', function(event) {
    event.preventDefault();
    var zipCode = $('#zipcode')
      .val()
      .trim();

    // update these based off of the html
    var address = 'Alaska';
    var stateCode = 'AK';

    var members = 'W000802';
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        zipCode +
        '&js?key=AIzaSyClDYOjw-C_6U6CbMT5fTM1X0atNlJksPA',
      type: 'GET',
      dataType: 'json',
    }).done(function(data) {
      console.log(data);
      var state = data.results[0].formatted_address
        .replace(/ /g,'')
        .split(',')[1]
        .substring(0, 2);
      console.log(state);
      $.ajax({
        url: 'https://api.propublica.org/congress/v1/members/senate/' +
          state +
          '/current.json',
        type: 'GET',
        dataType: 'json',
        headers: {
          'X-API-Key': 'cuph598ZH7Aqoo7VuNPeQ2a4UNbzOSsKpnJJl6jw',
        },
      }).done(function(proData) {
        var officials = proData.results.map(official =>
          $('<button/>')
          .prop('type', 'button')
          .prop('class', 'btn btn-primary')
          .text(official.name)
          .on('click', function(event) {
            $('body').append(JSON.stringify(official));
          })
        );
        $('body').append(officials);
      });
    });
  });
});
