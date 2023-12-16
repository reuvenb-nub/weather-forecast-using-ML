const express = require("express");
const { exec } = require("child_process");
var cors = require("cors");
var bodyParser = require("body-parser");

// Replace 'example.py' with your Python script
const pythonScript = "predict.py";

// Parameters to pass to the Python script
const a = 83;
const b = 7.1;
const c = 240;
const d = 10000;
const e = 909;

const app = express();
const port = 3029;

app.use(cors());
app.use(bodyParser.json());

// Wrap the exec call in a Promise
const executePythonScript = (
  pythonScript,
  humidity,
  speed,
  deg,
  visibility,
  pressure
) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ${pythonScript} ${humidity} ${speed} ${deg} ${visibility} ${pressure}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        resolve(stdout);
      }
    );
  });
};

app.get("/", async (req, res) => {
  // Call the function and handle the result
  await executePythonScript(pythonScript, a, b, c, d, e)
    .then((result) => {
      console.log(result);

      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
});

app.post("/add", async (req, res) => {
  // Call the function and handle the result
  const a = req.body.humidity;
  const b = req.body.speed;
  const c = req.body.deg;
  const d = req.body.visibility;
  const e = req.body.pressure;

  await executePythonScript(pythonScript, a, b, c, d, e)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
