//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * https://eips.ethereum.org/EIPS/eip-20
 */
contract LDToken {
    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint)) _allowance;

    uint256 _totalSupply;

    string public _name;
    string public _symbol;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function decimals() public pure returns (uint8) {
        return 6;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(
            _balances[msg.sender] >= amount,
            "LDToken: sender does not have enough balance"
        );

        _balances[to] += amount;
        _balances[msg.sender] -= amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_balances[_from] >= _value, "Not enough funds");
        require(_allowance[_from][msg.sender] >= _value, "Tried to transfer more then allowed");

        _allowance[_from][msg.sender] -= _value;
        _balances[_from] -= _value;
        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        _allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return _allowance[_owner][_spender];
    }

    function _mint(address account, uint256 amount) external virtual {
        _balances[account] += amount;
        _totalSupply += amount;

        emit Transfer(address(0), account, amount);
    }
}
