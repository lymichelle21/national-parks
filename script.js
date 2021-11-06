// Formatting parameters
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

// Explore Parks by Activities
function form2() {
  $("#backend-activities-form").submit(event => {
    event.preventDefault();
    const term = $("#activities_form").val();
    console.log(term);
    getActivities(term)
  });
}
$(form2);

function getActivities(term) {
  const params = {
    id: `${term}`,
    api_key: ""
  };
  const queryString = formatQueryParams(params);
  const url = "https://developer.nps.gov/api/v1/activities/parks" + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => activities_results(responseJson))
}

function activities_results(responseJson) {
  console.log(responseJson);
  $("#results_list").empty();
  $("#results_list").append("<h2>Results:</h2><br>");
  for (let i = 0; i < responseJson.data.length; i++) {
      for (let x = 0; x < responseJson.data[i].parks.length; x++) {
          $("#results_list").append(
              `<h4><a target="_blank" href="${responseJson.data[i].parks[x].url}">${responseJson.data[i].parks[x].fullName}</a></h4>
              <br>`
            );
        }
  }

  $("#results").removeClass("hidden");
}

// Explore Parks by State
function form() {
  $("#backend-parks-form").submit(event => {
    event.preventDefault();
    const term = $("#park_form").val();
    console.log(term);
    getParks(term);
  });
}

$(form);

function getParks(term) {
  const params = {
    stateCode: `${term}`,
    api_key: ""
  };
  const queryString = formatQueryParams(params);
  const url = "https://developer.nps.gov/api/v1/parks" + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => park_results(responseJson))
}

function park_results(responseJson) {
  console.log(responseJson);
  $("#results_list").empty();
  $("#results_list").append("<h2>Results:</h2>");

  for (let i = 0; i < responseJson.data.length; i++) {
      $("#results_list").append(
      `<h3>${responseJson.data[i].fullName}</h3>
      ${responseJson.data[i].description}
      <br>
      <br>
      <a target="_blank" href="${responseJson.data[i].url}">Learn More</a>
      <br>
      <br>`
    );
  }

  $("#results").removeClass("hidden");
}

// Explore Parks by Sights
function form3() {
  $("#backend-cams-form").submit(event => {
    event.preventDefault();
    const term = $("#cams_form").val();
    console.log(term);
    getCams(term)
  });
}

$(form3);

function getCams(term) {
  const params = {
    parkCode: `${term}`,
    api_key: ""
  };
  const queryString = formatQueryParams(params);
  const url = "https://developer.nps.gov/api/v1/webcams" + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => cams_results(responseJson))
}

function cams_results(responseJson) {
  console.log(responseJson);
  $("#results_list").empty();
  $("#results_list").append("<h2>Results:</h2>");
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results_list").append(
      `<h3>${responseJson.data[i].title}</h3>
      ${responseJson.data[i].description}
      <br>
      <h6><a target="_blank" href="${responseJson.data[i].url}">Live webcams</a></h6>
      <br>`)
      for (let x = 0; x < responseJson.data[i].images.length; x++) {
        $("#results_list").append(
        `<img src="${responseJson.data[i].images[x].url}" width="50%">
        <br><br>`
        );
      }
  }
  $("#results").removeClass("hidden");
}
