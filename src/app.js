App = {
    contract_address: "0x758A948ED54c6fdd197EEC8F1984973dC0D82428",
    web3Provider: null,
    contracts: {},

    init: function() {
        console.log('App init ...');
        return App.initWeb3();
    },

    initWeb3: function() {
      if (window.ethereum) {
        console.log("Try to create new web3");
        window.web3 = new Web3(ethereum);
        try {
          ethereum.enable();
        } catch (error) {
          console.error("Failed to enable etherium");
        }
      } else if (window.web3) {
        console.log("Try to create legacy web3")
        window.web3 = new Web3(web3.currentProvider);
      } else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying Status!'
        );
      }
      console.log("Successfully inited web3");
      return App.initContracts();
    },
    
    initContracts: function() {
      $.getJSON("LDToken.json", function(contract_json) {
        App.contracts.ldTokenContract = new window.web3.eth.Contract(contract_json.abi, App.contract_address);
        App.renderTokenBalance();
        App.renderEtherBalance();
      });
    },

    renderTokenBalance: function() {
      const balance_el = document.getElementById('user-balance');
      App.contracts.ldTokenContract.methods.totalSupply().call().then((balance) => {
        console.log(`Balance: ${balance}`);
        balance_el.textContent = balance;
        return App.renderEtherBalance();
      });
      App.mintTokensHandler();
    },

    renderEtherBalance: function() {
      const balance_el = document.getElementById('ether-balance');
      const my_address = web3.currentProvider.selectedAddress;
      window.web3.eth.getBalance(my_address, function(err, result) {
        if (err) {
          console.log(err)
        } else {
          balance = web3.utils.fromWei(result, "ether") + " ETH";
          balance_el.textContent = balance;
        }
      });

    },

    mintTokensHandler: function() {
      const mint_button = document.getElementById('mint-button');
      mint_button.addEventListener('click', () => {
        const amount = document.getElementById('mint-inbox');
        const my_address = web3.currentProvider.selectedAddress;
        App.contracts.ldTokenContract.methods
          ._mint(my_address, amount.value)
          .send({'from': my_address})
          .on('receipt', function(receipt) {
            console.log('Successfully minted');
            amount.value = "";
            App.renderTokenBalance();
          });
      });
    }
}

$(function() {
    $(window).load(function() {
        App.init();
    })
});