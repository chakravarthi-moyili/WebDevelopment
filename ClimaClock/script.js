function time() {
    let ndate = new Date();
    let day = ndate.getDate(); // get the day of the month (1-31)
    if (day < 10) {
      day = "0" + day;
    }
    let month = ndate.getMonth() + 1; // get the month (1-12)
    if (month < 10) {
      month = "0" + month;
    }
    let year = ndate.getFullYear();
  
    let dateElement = document.querySelector("#date");
    let monthElement = document.querySelector("#month");
    let yearElement = document.querySelector("#year");
  
    dateElement.innerHTML = day;
    monthElement.innerHTML = month;
    yearElement.innerHTML = year;
  
    let clock = new Date();
    let hrs = clock.getHours();
    let ampm = document.querySelectorAll("#spans input[name='ampm']");
    if (hrs < 12) {
      ampm[0].checked = true;
    } else {
      ampm[1].checked = true;
    }
    if (hrs > 12) {
      hrs = hrs - 12;
    }
    if (hrs < 10) {
      hrs = "0" + hrs;
    }
    let mins = clock.getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    let secs = clock.getSeconds();
    if (secs < 10) {
      secs = "0" + secs;
    }
    let hour = document.querySelector("#hour");
    let min = document.querySelector("#min");
    let sec = document.querySelector("#sec");
    hour.innerHTML = hrs;
    min.innerHTML = mins;
    sec.innerHTML = secs;
  
    let dayOfWeek = ndate.getDay();
    let wdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    let dayOfWeekRadio = document.querySelector(`#wday input[id="${wdays[dayOfWeek]}"]`);
    if (dayOfWeekRadio) {
      dayOfWeekRadio.checked = true;
    }
  }
  setInterval(time, 1000);

document.addEventListener('DOMContentLoaded', () => {
  let apiKey = '5604317b84f98fba3a6b5399846f331c'; // Replace with your OpenWeatherMap API key

  // Function to fetch weather data and update temperature display by live location
  const updateTemperatureByLocation = (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Weather data not available');
              }
              return response.json();
          })
          .then(data => {
              const temperatureValue = data.main.temp;
              const tempElement = document.querySelector('.temp1');

              if (tempElement) {
                  tempElement.textContent = `${temperatureValue.toFixed(0)} °C`; // Ensure temperature has 1 decimal place
              } else {
                  console.error('Element with class "temp1" not found.');
              }
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
          });
  };

  // Function to handle geolocation success
  const geoSuccess = position => {
      const { latitude, longitude } = position.coords;
      updateTemperatureByLocation(latitude, longitude);
  };

  // Function to handle geolocation error
  const geoError = error => {
      console.error('Error getting geolocation:', error);
  };

  // Check if geolocation is available
  if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
      console.error('Geolocation is not available.');
  }

  // Update temperature every 30 minutes (1800000 milliseconds)
  setInterval(() => {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, 1800000); // 30 minutes interval
});
