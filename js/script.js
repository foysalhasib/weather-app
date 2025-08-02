
    async function getWeather() {
      const city = document.getElementById("city").value.trim(); // ইনপুট থেকে শহরের নাম নেওয়া
      if (!city) return alert("Please enter a city name"); // ইনপুট খালি থাকলে এলার্ট

      try {
        // শহরের নাম দিয়ে latitude ও longitude বের করা
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geo.json();
        if (!geoData.results) return alert("City not found"); // শহর না পেলে এলার্ট

        const { latitude, longitude } = geoData.results[0]; // lat/lon নেওয়া
        // আবহাওয়ার API কল
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
        const data = await res.json();

        const weather = data.current_weather;
        const humidity = data.hourly.relativehumidity_2m[0];

        document.getElementById("temp").innerText = `${weather.temperature}°C`; // তাপমাত্রা দেখায়
        document.getElementById("desc").innerText =
          weather.weathercode === 0 ? "Clear" :
          weather.weathercode <= 3 ? "Cloudy" : "Rainy"; // আবহাওয়ার টাইপ
        document.getElementById("humidity").innerText = `${humidity}%`; // আর্দ্রতা
        document.getElementById("wind").innerText = `${weather.windspeed} km/h`; // বাতাসের গতি
        document.getElementById("icon").innerText =
          weather.weathercode === 0 ? "☀️" :
          weather.weathercode <= 3 ? "⛅" : "🌧️"; // আইকন

      } catch (err) {
        alert("Something went wrong!"); // কোনো সমস্যা হলে এলার্ট
        console.log(err); // কনসোলে এরর দেখানো
      }
    }
 