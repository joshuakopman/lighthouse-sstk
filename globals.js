var Globals = {};

Globals.pageTypes = ['lohp','adp','cmsStudio','cmsBase','search'];
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

Globals.cmsStudio = {};
Globals.cmsStudio.currentAverage = 0;
Globals.cmsStudio.noOfRuns = 0;
Globals.cmsStudio.currentScore = 0;
Globals.cmsStudio.currentBuffer = [];
Globals.cmsStudio.dayReset = false;
Globals.cmsStudio.opportunities = new Map();
Globals.cmsStudio.opportunitiesArray = [];
Globals.cmsStudio.startTime = new Date();
Globals.cmsStudio.pageType = 'cmsStudio';
Globals.cmsStudio.url = 'https://www.shutterstock.com/discover/studio-country-roads';

Globals.cmsBase = {};
Globals.cmsBase.currentAverage = 0;
Globals.cmsBase.noOfRuns = 0;
Globals.cmsBase.currentScore = 0;
Globals.cmsBase.currentBuffer = [];
Globals.cmsBase.dayReset = false;
Globals.cmsBase.opportunities = new Map();
Globals.cmsBase.opportunitiesArray = [];
Globals.cmsBase.startTime = new Date();
Globals.cmsBase.pageType = 'cmsBase';
Globals.cmsBase.url = 'https://www.shutterstock.com/explore/baseweb-country-roads';

module.exports = Globals;
