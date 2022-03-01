import React, { Component } from "react";
import Token from "./contracts/Token.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";
import Terms from './terms';





import "./App.css";
import WaveLoading from "react-loadingg/lib/WaveLoading";



class App extends Component {
  state = { loaded: false, kycAddress: "0x12434", tokenSaleAddress: null, userTokens: 0 };






  conversion = (event) => {
    const { getEthPriceNow } = require('get-eth-price');
    const checkvalue = document.getElementById('converted').value;
    if (checkvalue != 0) {
      let amountUSD = document.getElementById('converted').value;
      getEthPriceNow()

        .then(data => {
          var rawdata = JSON.stringify(data);
          var prices = rawdata.split(',')
          var usd = prices[1].match(/\d+/g);
          var ethusd = parseInt(usd[0]);
          document.getElementById('sendAmount').value = (amountUSD / ethusd).toFixed(3);
          document.getElementById('output').value = (amountUSD / ethusd).toFixed(3);






        })
    } else {
      let amountETH = document.getElementById('sendAmount').value;
      document.getElementById('output').value = amountETH;

    }



  }











  componentDidMount = async () => {
    try {

      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.TokenInstance = new this.web3.eth.Contract(
        Token.abi,
        Token.networks[this.networkId] && Token.networks[this.networkId].address
      );

      this.TokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address
      );

      this.KycContractInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({ loaded: true, tokenSaleAddress: MyTokenSale.networks[this.networkId].address }, this.updateUserTokens);

      document.addEventListener('keyup', this.conversion);





    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };



  updateUserTokens = async () => {
    let userTokens = await this.TokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({ userTokens: userTokens });
  }

  listenToTokenTransfer = () => {
    this.TokenInstance.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens);
  }

  handleMoreTokensPurchase = async (e) => {
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    await this.TokenSaleInstance.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: Math.round(transferAmount * Math.pow(10, 18)) })
      ;
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  transferHandler = async (e) => {
    e.preventDefault();
    let transferAmountinEth = e.target.sendAmount.value;
    let transferAmount = transferAmountinEth * Math.pow(10, 18);
    return transferAmount;



  }



  handleKycWhitelisting = async () => {
    await this.KycContractInstance.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] });
    alert("KYC for " + this.state.kycAddress + " is completed");
  }


  render() {


    if (!this.state.loaded) {
      return <WaveLoading color='#000000' size='large' />;
    }
    return (





      <div className="App">
        <div class="App-header"><a href="https://theascendantproject.com/">Ascendant</a></div>

        <h1>Zelda Gold Rupee(ZGR) Token Sale</h1>
        <p>Get your tokens today</p>
        <p>Buyer: {this.accounts}</p>
        <h2>KYC Whitelisting</h2>
        <p>
          The Kingdom of Hyrule bestow upon thee the rarest rupee in all the land for your heroic deeds, and in good faith that you will not smash any more expensive pots. Seriously. Stop doing that. This token can be redeemed at any store in Hyrule and will never expire.
          It is the highest symbol of wealth this kingdom shall recognize.
        </p>
        <p>
          Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
          <button type="button" onClick={this.handleKycWhitelisting}>Add To Whitelist</button>
        </p>
        <Terms />

        <h2>Buy Tokens</h2>
        <p>You currently have {(this.state.userTokens) / Math.pow(10, 18)} ZGR</p>
        <p>If you want to buy tokens, send wei to this address: {this.state.tokenSaleAddress} </p>
        <form onSubmit={this.handleMoreTokensPurchase}>
          <input type='email' id='email' placeholder='Email' required></input>
          <br></br>
          <br></br>
          <input id='converted' type="number" name="funding" placeholder="USD" />
          <input type='number' placeholder='ETH' id='sendAmount' min='0' step='.000000000000000001' />
          <input id='output' type="text" name="token" placeholder="ZGR" />
          <button id="buy" type="submit">Buy More ZGR Tokens</button>
          <button id='download' type="button">Download Contract</button>
          <br></br>
          <br></br>
          <div class='authorization'>
            <input type='checkbox' required></input><p class='authorization'>By checking this box you are agreeing that your email address will represent your electronic signature.</p>
          </div>

        </form>



      </div>
    );
  }


}
export default App;
