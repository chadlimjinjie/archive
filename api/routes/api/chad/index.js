const express = require('express');
const axios = require('axios');

const authenticateToken = require('/home/runner/api/routes/api/auth/authenticateToken');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.get('/net-worth', authenticateToken, async (req, res) => {
  const response = await axios.get('https://www.investing.com/portfolio/service/getStatisticJson/?portfolio_id=29426381&h=8fb8a863d1335b0464ebea91badf8c85&cur_id=19&chart=market&timeFrame=time_1d', {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "G_AUTHUSER_H=0; portfolioStateundefined=; portfolioState7617568ce236b20cf9581b20ca400bee=29426381:open; PHPSESSID=c1boc1c6mv6kk4cacd3sav90dd; adBlockerNewUserDomains=1640826289; StickySession=id.98047464140.292www.investing.com; udid=afdd5a02403fbd433ee73278b26a66ac; logglytrackingsession=5af68f86-f860-45fc-b283-e28cd270740f; G_ENABLED_IDPS=google; G_AUTHUSER_H=0; finbox-visitor-id=v-440332a885fc; finboxio-production:refresh=ad38c371-168c-4f3c-8f79-3dfbc0440414; finboxio-production:refresh.sig=SXHyYq44q9zeX7mYn9hcX2Z32m8; session_id=1644121435.8935922009; _im_session_id=1644121435.8935922009; user_id=1644121435.8935922009; _im_last_pv=1644121435.6207312562; _im_session_data=; isUserNoticedNewAlertPopup=1; sideBlockTimeframe=1day; r_p_s_n=1; finboxio-production:jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozODQ0NzcsInZpc2l0b3JfaWQiOiJ2LTZiNzhiMmIyNWMwZSIsImZpcnN0X3NlZW4iOiIyMDIyLTAyLTA1VDE1OjAzOjUzLjYzNFoiLCJwcmV2aWV3X2FjY2VzcyI6eyJhc3NldHNfdmlld2VkIjpbXSwiYXNzZXRzX21heCI6NSwidmFsaWRfdW50aWwiOiIyMDIyLTAyLTA2VDAzOjAzOjUzLjYzM1oifSwicm9sZXMiOlsidXNlciIsImludmVzdGluZyJdLCJib29zdHMiOltdLCJyZWdpb25zIjpbXSwic2NvcGVzIjpbInJvbGU6dXNlciIsInJvbGU6aW52ZXN0aW5nIl0sImV4cCI6MTY0Njc4NzI0NiwiaWF0IjoxNjQ2Nzg2OTQ2fQ.Z4ivBmkIHTm0xuZCGGmEULgBH_GULlm0TH78PrMarP8; finboxio-production:jwt.sig=wj64tXOXC1VTB3eYqbuWHyUcLio; SideBlockUser=a%3A2%3A%7Bs%3A10%3A%22stack_size%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Bi%3A8%3B%7Ds%3A6%3A%22stacks%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Ba%3A4%3A%7Bi%3A0%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bi%3A8961%3Bs%3A10%3A%22pair_title%22%3Bs%3A18%3A%22Singapore+Airlines%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A28%3A%22%2Fequities%2Fsingapore-airlines%22%3B%7Di%3A1%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A3%3A%22525%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A18%3A%22%2Fetfs%2Fspdr-s-p-500%22%3B%7Di%3A2%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bi%3A1175152%3Bs%3A10%3A%22pair_title%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A34%3A%22%2Findices%2Fus-30-futures%3Fcid%3D1175152%22%3B%7Di%3A3%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A7%3A%221120992%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A47%3A%22%2Fcertificates%2Fsg-ftse-mib-gross-tr-5x-s-18jun21%22%3B%7D%7D%7D%7D; comment_notification_222349881=1; Adsfree_conversion_score=2; adsFreeSalePopUp7617568ce236b20cf9581b20ca400bee=1; gtmFired=OK; __cflb=0H28vY1WcQgbwwJpSvieGrGKQeedqqt7XsXtwvjdw5e; geoC=SG; smd=afdd5a02403fbd433ee73278b26a66ac-1647675070; __cf_bm=.CvJVcJqpW_G_0uXROJ9VD3f55c9kBK9baajlAxrJQA-1647675086-0-AaYZcOjlPhfdtibzMAgWU/TE9x2FP7xn/4s6YXZaveiLaC9R4HmiGJz63I9v6q2GeA+Tyx+Xj4Al6aJK1d3bQVok/Z1EZCaGp4CsKKz8U1kBlHT7hliODThVw6TvpWmGrxLNe00Z+fmz/HwMDbKH/qrvBMbu9wa41UHe79ZfUmvH; nyxDorf=YmZjMWc3YiA%2BYDw3ZisxMDVgZiMyN2FnZmU%3D; firstUdid=0; ses_id=MnxkJW9gNj4wdGFnMmNlZTdkPmYwMzoxYWgyOTcxMCYxJT8xZzBhJzc4YC5hYjEtZWEwZmVlZ2Y9bzQ6ZmMzNTI%2FZDNvaDZtMG9hOzI3ZTU3Mz5tMDI6P2FpMjg3MDBsMTM%2FOGdhYTA3Z2A4YTkxa2V3MCxlIWd2PW80ZGYnM3QyPWQlbz82aDBlYWgyaWVhNzI%2BNjAxOmxhNTI2NzkwKDF6",
            "Referer": "https://www.investing.com/portfolio/?portfolioID=Y2QzaW48MmxkND0yYDszMA%3D%3D",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
  switch (response.status) {
        case 200:
            // console.log('Success');
            // console.log(response.data);
            let opened = response.data.list.opened[Object.keys(response.data.list.opened)[0]];
            // let market = opened.market;
            // let cost = opened.cost;
            res.send(opened);
            break;
        default:
            console.log('Error');
            break;
    }
});

module.exports = router;