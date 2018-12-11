var Globals = {};

Globals.pageTypes = ['lohp','adp','cmsStudioExplore','cmsStudioLOHP','search'];
Globals.testRunningID ='';

Globals.lohp = {};
Globals.lohp.currentAverage = 0;
Globals.lohp.noOfRuns = 0;
Globals.lohp.currentScore = 0;
Globals.lohp.currentBuffer = [];
Globals.lohp.dayReset = false;
Globals.lohp.opportunities = new Map();
Globals.lohp.opportunitiesArray = [];
Globals.lohp.startTime = new Date();
Globals.lohp.pageType = 'lohp';
Globals.lohp.url = 'https://www.shutterstock.com';

Globals.adp = {};
Globals.adp.currentAverage = 0;
Globals.adp.noOfRuns = 0;
Globals.adp.currentScore = 0;
Globals.adp.currentBuffer = [];
Globals.adp.dayReset = false;
Globals.adp.opportunities = new Map();
Globals.adp.opportunitiesArray = [];
Globals.adp.startTime = new Date();
Globals.adp.pageType = 'adp';
Globals.adp.url = 'https://www.shutterstock.com/image-photo/happy-owner-carry-new-labrador-retriever-780540799';

Globals.search = {};
Globals.search.currentAverage = 0;
Globals.search.noOfRuns = 0;
Globals.search.currentScore = 0;
Globals.search.currentBuffer = [];
Globals.search.dayReset = false;
Globals.search.opportunities = new Map();
Globals.search.opportunitiesArray = [];
Globals.search.startTime = new Date();
Globals.search.pageType = 'search';
Globals.search.url = 'https://www.shutterstock.com/search/dog';

Globals.cmsStudioExplore = {};
Globals.cmsStudioExplore.currentAverage = 0;
Globals.cmsStudioExplore.noOfRuns = 0;
Globals.cmsStudioExplore.currentScore = 0;
Globals.cmsStudioExplore.currentBuffer = [];
Globals.cmsStudioExplore.dayReset = false;
Globals.cmsStudioExplore.opportunities = new Map();
Globals.cmsStudioExplore.opportunitiesArray = [];
Globals.cmsStudioExplore.startTime = new Date();
Globals.cmsStudioExplore.pageType = 'cmsStudioExplore';
Globals.cmsStudioExplore.url = 'https://www.shutterstock.com/explore/royalty-free-images';

Globals.cmsStudioLOHP = {};
Globals.cmsStudioLOHP.currentAverage = 0;
Globals.cmsStudioLOHP.noOfRuns = 0;
Globals.cmsStudioLOHP.currentScore = 0;
Globals.cmsStudioLOHP.currentBuffer = [];
Globals.cmsStudioLOHP.dayReset = false;
Globals.cmsStudioLOHP.opportunities = new Map();
Globals.cmsStudioLOHP.opportunitiesArray = [];
Globals.cmsStudioLOHP.startTime = new Date();
Globals.cmsStudioLOHP.pageType = 'cmsStudioLOHP';
Globals.cmsStudioLOHP.url = 'https://www.shutterstock.com/discover/test-home-page';

module.exports = Globals;
