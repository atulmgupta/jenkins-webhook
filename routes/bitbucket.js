var express = require("express");
var router = express.Router();
var _ = require("underscore");
const http = require("http");
const https = require("https");
var jenkins_addr = "jenkins.com";
var JENKINS_HOME = "/var/jenkins_home";
var JOBS_DIR = "/job/";
var username = "";
var password = "";
var auth = username + ":" + password;

var test_env = {
  host: jenkins_addr,
  path: JOBS_DIR + "test.demo.com/build?token=",
  auth: auth
};

var envOptions = {
  "development-test": test_env
};

function triggerJob(branchName) {
  console.log("trigger build for branch ", branchName);
  var jobToTrigger = envOptions[branchName];
  var url =
    "https://" +
    jobToTrigger.auth +
    "@" +
    jobToTrigger.host +
    jobToTrigger.path;
  console.log("Check url to hit", url);
  https
    .get(url, res => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);
      return res.statusCode;
    })
    .on("error", e => {
      console.error(e);
    });
}
router.post("/", function(req, res, next) {
  console.log("Start From Here");
  console.log("Check Bitbucket Request Here", req.params);
  console.log("Check Bitbucket Request Here", req.query);
  if (!_.isUndefined(req.body)) {
    if (!_.isUndefined(req.body.push)) {
      if (!_.isEmpty(req.body.push.changes)) {
        if (
          !_.isUndefined(req.body.push.changes[0].new) &&
          !_.isUndefined(req.body.push.changes[0].new.name)
        ) {
          /**
           * Get branch Name to trigger Env
           */
          var branchName = req.body.push.changes[0].new.name;
          return res.send(triggerJob(branchName));
        }
      } else {
        console.log("No Changes Detected");
      }
    } else {
      console.log("Push Event Doesnt Trigerred");
    }
  }
  console.log(
    "Check Bitbucket Request Here",
    req.body.push.changes[0].new.name
  );
  res.send("you called bitbucket here");
});
router.post;
function triggerJenkins() {}
module.exports = router;
