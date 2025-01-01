const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.get('/moon-knight', (req, res) => {
  const list = [];
  axios.get("https://disney.content.edge.bamgrid.com/svc/content/DmcSeriesBundle/version/5.1/region/SG/audience/k-false,l-true/maturity/1870/language/en-GB/encodedSeriesId/4S3oOF1knocS", {
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
  }).then(response => {
    // console.log(res.data)
    if (response.data) {
      let episodes = response.data.data.DmcSeriesBundle.episodes;
      let videos = episodes.videos;
      videos.forEach(video => {
        // console.log(video.text.title.full.program.default.content);
        // console.log(video.mediaMetadata.runtimeMillis / 60000);
        list.push({
          title: video.text.title.full.program.default.content,
          runtimeMins: video.mediaMetadata.runtimeMillis / 60000
        });
      })
    }
    res.send(list);
  })
});

router.get('/loki', (req, res) => {
  const list = [];
  axios.get("https://disney.content.edge.bamgrid.com/svc/content/DmcSeriesBundle/version/5.1/region/SG/audience/k-false,l-true/maturity/1870/language/en-GB/encodedSeriesId/6pARMvILBGzF", {
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
  }).then(response => {
    // console.log(res.data)
    if (response.data) {
      let episodes = response.data.data.DmcSeriesBundle.episodes;
      let videos = episodes.videos;
      videos.forEach(video => {
        // console.log(video.text.title.full.program.default.content);
        // console.log(video.mediaMetadata.runtimeMillis / 60000);
        list.push({
          title: video.text.title.full.program.default.content,
          runtimeMins: video.mediaMetadata.runtimeMillis / 60000
        });
      })
    }
    res.send(list);
  })
});



module.exports = router;