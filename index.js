import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const defaultPort = 8000;
const weatherApiKey = process.env.API_KEY; //a30421e52596479d96eac16c7f635891

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("weather.ejs");
});

app.post("/get-geocode", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName
    );
    res.render("weather.ejs", { cityData: response.data.results });
  } catch (err) {
    console.log(err);
  }
});

app.post("/get-weather", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${weatherApiKey}`
    );
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${weatherApiKey}`
    );
    const forecastList = forecast.data.list;

    const uniqueDates = new Set();
    const filteredForecast = [];

    forecastList.forEach((element) => {
      const dateString = element.dt_txt.split(" ")[0];

      if (!uniqueDates.has(dateString)) {
        uniqueDates.add(dateString);
        filteredForecast.push(element);
      }
    });

    res.render("weather.ejs", {
      data: result.data,
      forecast: filteredForecast,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(defaultPort, "0.0.0.0", () => {
  console.log(`App is running on port: ${defaultPort}`);
});
