function getGuessToken(){
    return new Promise(resolve=>{
                fetch("https://api.twitter.com/1.1/guest/activate.json", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-csrf-token": "47dbc4c75f89f364dc892b577615267f",
    "x-twitter-active-user": "no",
    "x-twitter-client-language": "en"
  },
  "referrer": "https://twitter.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(async res=>{
   resolve((await res.json())['guest_token'])
});
    })
}
function transzh(tweetId){
    return new Promise(async resolve=>{
        fetch(`https://api.twitter.com/1.1/strato/column/None/tweetId=${tweetId},destinationLanguage=None,translationSource=Some(Google),feature=None,timeout=None,onlyCached=None/translation/service/translateTweet`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    
    "x-csrf-token": "3a6740c2a386401ce76e75892164872e",
    "x-guest-token": await getGuessToken(),
    "x-twitter-active-user": "yes",
    "x-twitter-client-language": "zh-CN"
  },
  "referrer": "https://twitter.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(async res=>{
    let resText = await res.text();
    if(resText.match(/translation/) === null){
        return resolve("");
    }
    let resJson = JSON.parse(resText)
    // let resJson = await res.json();
    console.log(resJson)
    resolve(resJson['translation']);
})
    })
}
