    var HOST = location.origin.replace(/^http/, 'ws')
    var ws = new WebSocket(HOST);

    ws.onopen = function () {
        ws.send('connected')
    }

    ws.onmessage = function (ev) {
        var payload = JSON.parse(ev.data);
        for(var index in payload.globals.pageTypes){
            var currentPage = payload.globals.pageTypes[index].name;
            document.querySelector("#" + currentPage + "Score").innerHTML = payload.globals.pages[currentPage].currentAverage.toFixed(2);
            document.querySelector("#" + currentPage + "Runs").innerHTML = payload.globals.pages[currentPage].noOfRuns;

            if(payload.globals.pages[currentPage].opportunitiesArray.length > 0){
                document.querySelector("#" + currentPage + "Opportunities").innerHTML = formatOpsString(payload.globals.pages[currentPage].opportunitiesArray);
            }

            document.querySelectorAll("." + currentPage + "URL").forEach(el => {
                el.href = payload.globals.pages[currentPage].url;
                el.innerHTML = payload.globals.pages[currentPage].url;
            });
        }
        
        showActiveTest(payload.globals.testRunningID);

    }

    function formatOpsString(opportunities){
        var opString = '';
        for(var index in opportunities){   
            if(opportunities[index] && opportunities[index].overallSavingsMs > 0){
              opString += "<span style=\"font-weight:bold\">"+ opportunities[index].description + "</span> |  Count: <span style=\"color:red\">" + opportunities[index].count + "</span> |  Time Savings: <span style=\"color:red\">" + opportunities[index].overallSavingsMs.toFixed(2) + " ms</span><br></br>";
            }
        }
        return opString;
    }

    function showActiveTest(ID){
         document.querySelectorAll('.textScores span').forEach(el => {
            el.style.color = 'black';
         });    

         document.querySelectorAll('.score').forEach(el => {
            el.style.color = '#f54336';
         });    

         document.querySelectorAll('.running').forEach(el => {
            el.style.display = 'none';
         });
        

        if(ID != '') {
            document.querySelector("#"+ID).style.color = 'white';
            document.querySelector("#"+ID+"Score").style.color = 'white';
            document.querySelector("#"+ID+"Runs").style.color = 'white';
            document.querySelector("#"+ID+"Running").style.display = 'inline';
        }
    }