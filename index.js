// creating an http server
// using express
// is node default library? => no

// const express = require("express");

// const app = express();

// app.get("/", function (req, res) {});

// app.listen(3000);

//Hospital management

const express = require("express");

const app = express();

const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  //write logic
  const johnKidneys = users[0].kidneys;
  const numOfKidneys = johnKidneys.length;
  let numOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numOfHealthyKidneys = numOfHealthyKidneys + 1;
    }
  }
  const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;
  res.json({
    numOfKidneys,
    numOfHealthyKidneys,
    numOfUnhealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

//removing all the unhealthy kidneys
app.delete("/", function (req, res) {
  //you should return a 411
  //only if at least one unhealthy kidney is there do this, else return 411
  if (isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({ msg: "done" });
  } else {
    res.status(411).json({
      msg: "You have no bad kidneys",
    });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  let atLeastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atLeastOneUnhealthyKidney = true;
    }
  }
  return atLeastOneUnhealthyKidney;
}

app.listen(3000);
