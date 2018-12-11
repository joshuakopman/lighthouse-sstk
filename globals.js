var pageTypes = require('./pageTypes');
var testRunningID ='';

module.exports = class Globals {
    constructor() {
        this.pages = {};
        this.pageTypes = pageTypes;
        this.testRunningID = testRunningID;
        for(var index in this.pageTypes) {
            var pageTypeName = pageTypes[index].name;
            var pageTypeUrl = pageTypes[index].url;
            this.pages[pageTypeName] = {};
            this.pages[pageTypeName].url = '';
            this.pages[pageTypeName].currentAverage = 0;
            this.pages[pageTypeName].noOfRuns = 0;
            this.pages[pageTypeName].currentScore = 0;
            this.pages[pageTypeName].currentBuffer = [];
            this.pages[pageTypeName].dayReset = false;
            this.pages[pageTypeName].opportunities = new Map();
            this.pages[pageTypeName].opportunitiesArray = [];
            this.pages[pageTypeName].startTime = new Date();
            this.pages[pageTypeName].pageType = pageTypeName;
            this.pages[pageTypeName].url = pageTypeUrl;
        }
    }
}