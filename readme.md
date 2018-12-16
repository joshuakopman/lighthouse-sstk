# Google Lighthouse Audit Tool

An audit tool to scan given URLs for Lighthouse performance on a set interval and aggregate the results/provide recommendations for improvement.

## Install via Docker
```
docker build -t lighthouse-runner .
docker run -p 80:3000 lighthouse-runner
```
## Install via cli
```
npm i
npm run start  //webpack
node app.js //express and socket server
```

Customize all URLs and Page titles in `pageTypes.js`. Name log files with convention `performance_scores_{pageName}.txt`

## Additional Notes

This app runs a headless instance of Chrome on a throttled (3G mobile) connection
