'use strict';

class TextScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTypes: [],
    };
  }

  componentDidMount() {
    fetch('/types') // or whatever URL you want
      .then(response => response.json())
      .then(data => { 
        let pageTypes = data.pageTypes; 
        this.setState({ pageTypes : pageTypes }); 
      })
  }

  render() {
      const pageTypes = this.state.pageTypes;
      
      return(
        pageTypes.map((pageType) =>
             <TextScore pageTypeName={pageType.name} pageTypeTitle={pageType.title} />
        )
      );
  }
}

class TextScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span id={this.props.pageTypeName}>
          <span>Today's Lighthouse performance score average for {this.props.pageTypeTitle} is: </span>
          <span id={this.props.pageTypeName + "Score"} className="score"></span>. 
          <span>This script has run </span>
          <span id={this.props.pageTypeName + "Runs"} className="score"></span> times. 
          <span id={this.props.pageTypeName + "Running"} className="running"><img src="https://az620379.vo.msecnd.net/images/loading.gif" className="spinner"/></span>  
          <br></br>
        </span>
    );
  }
}

let domContainer = document.querySelector('#textScoresContainer');
ReactDOM.render(<TextScores />, domContainer);