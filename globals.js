const pageTypes = ['lohp','adp','cmsStudioExplore','cmsStudioLOHP','search'];
var testRunningID ='';

module.exports = class Globals {
    constructor() {
        this.pages = {};
        this.pageTypes = pageTypes;
        this.testRunningID = testRunningID;
        for(var index in pageTypes) {
            var pageTypeName = pageTypes[index];
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
        }
        this.pages.lohp.url = 'https://www.shutterstock.com';
        this.pages.adp.url = 'https://www.shutterstock.com/image-photo/happy-owner-carry-new-labrador-retriever-780540799';
        this.pages.search.url = 'https://www.shutterstock.com/search/dog';
        this.pages.cmsStudioExplore.url = 'https://www.shutterstock.com/explore/royalty-free-images';
        this.pages.cmsStudioLOHP.url = 'https://www.shutterstock.com/discover/test-home-page';
    }
}