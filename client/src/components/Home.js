import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        futureCuts: 0,
        futureCutsBefore: 0,
        payItForward: [],
        donatedTrans: [],
        blink: false
    };
  }

  componentWillMount() {
    let f = 0;
    let fArr = []
    axios.get('/payItForward')
    .then(data => {
      if (data.data.payItForward.length > 0) {
        data.data.payItForward.forEach(elem => {
          if (elem.service === "Pay It Forward") {
            fArr.unshift(elem)
            f = f + elem.amount;
          }
        })
        
        this.setState({
          payItForward: fArr,
          futureCuts: f,
          futureCutsBefore: f
        })
      } else {
        console.log("Empty Pay It Forward")
      }
    })
    .catch(err => {
      console.log(err)
    })

    setInterval(() => {
      this.getData()
    }, 200)
  }

  header() {
    return (
      <div className="container header-container">
              <p className="text-center headerTitle font-weight-bold">Text or Say "Hello" to</p>
          <div className="number-container">
              <div className="number">
                <p className="phoneNumber text-center">1.209.502.2186</p>
                </div>
          </div>
      </div>
    )
  }

  services() {
    let image2 = ["https://i.imgur.com/VHwCEUa.jpg", "https://i.imgur.com/qZ8sLDY.jpg"];
    
    return (
        <div className="container service-container">  
              <section>
                <img className="bottom" src={image2[1]} width="900px" />
                <img className="top" src={image2[0]} width="900px" />
              </section>
        </div>  
    )
  }

  cueBlink() {
    setTimeout(() => {
      this.setState({
        blink: false
      })
      console.log('Switch False')
    }, 200)
}

  getData() {
    const { futureCutsBefore } = this.state
    let f = 0;
    let fArr = []
    axios.get('/payItForward')
    .then(data => {
      if (data.data.payItForward.length > 0) {
        data.data.payItForward.forEach(elem => {
          if (elem.service === "Pay It Forward") {
            fArr.unshift(elem)
            f = f + elem.amount;
          }
        })
        if (f !== futureCutsBefore) {
          this.setState({
            blink: true,
            futureCuts: f,
            futureCutsBefore: f,
            payItForward: fArr,
          })
          this.cueBlink()
        } else {
          this.setState({
            futureCuts: f,
            futureCutsBefore: f,
            payItForward: fArr,
          })
        }
      } else {
        console.log("Empty Pay It Forward")
      }
    })
    .catch(err => {
      console.log(err)
    })

  }

  totalGross() {
    const { futureCuts, blink } = this.state
      function commafy( num ) {
        var str = num.toString().split('.');
        if (str[0].length >= 4) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 4) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }
    
    return (
      <div className="container">
        <div className="grossNumberContainer p2">
          <p className={blink === true ? "grossNumber2BIG text-center font-weight-bold " : "grossNumber2 text-center font-weight-bold"}>{commafy(futureCuts)} Total Haircuts</p>
        </div>
       </div>
    )
  }

  liveFeed() {
    const { payItForward } = this.state
    let timeStamp = (time) => {
          var fix = new Date(time)
          var fakeTime = fix.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          return fakeTime

    }

    return (
        <div className="container liveFeedContainer">
          <table className="table table-dark table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Future Haircuts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{payItForward.length > 0 ? `${timeStamp(payItForward[0].timestamp)}` : "-" }</td>
                <td>{payItForward.length > 0 ? `xxx-xxx-${payItForward[0].phoneNumber.toString().substr(-4, payItForward[0].phoneNumber.length)}` : "-" }</td>
                <td>{payItForward.length > 0 ? `${payItForward[0].amount}` : "-" }</td>
              </tr>
              <tr>
                <td>{payItForward.length > 1 ? `${timeStamp(payItForward[1].timestamp)}` : "-" }</td>
                <td>{payItForward.length > 1 ? `xxx-xxx-${payItForward[1].phoneNumber.toString().substr(-4, payItForward[1].phoneNumber.length)}` : "-" }</td>
                <td>{payItForward.length > 1 ? `${payItForward[1].amount}` : "-" }</td>
              </tr>
              <tr>
                <td>{payItForward.length > 2 ? `${timeStamp(payItForward[2].timestamp)}` : "-" }</td>
                <td>{payItForward.length > 2 ? `xxx-xxx-${payItForward[2].phoneNumber.toString().substr(-4, payItForward[2].phoneNumber.length)}` : "-" }</td>
                <td>{payItForward.length > 2 ? `${payItForward[2].amount}` : "-" }</td>
              </tr>
            </tbody>
          </table>
        </div>
    )
  }

  renderView() {
      return (
          <div className="container-fluid">
            {this.header()}
            {this.totalGross()}
            {this.liveFeed()}
            {this.services()}
          </div>
      )
  }

  render() {
    return (
      this.renderView()
    );
  }
}

export default App;
