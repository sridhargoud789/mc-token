## MundoCryptoToken

MundoCryptoToken based on the tokenomics.

| Token Total Supply    | 1_000_000_000       |
| --------------------- | ------------------- |
| Airdrop:              | 6% of Total Supply  |
| Future Private Sale:  | 13% of Total Supply |
| Seed Phase:           | 6% of Total Supply  |
| Foundation Treasury:  | 13% of Total Supply |
| Ecosystem Incentives: | 33% of Total Supply |
| Marketing:            | 12% of Total Supply |
| Partners:             | 5% of Total Supply  |
| Team:                 | 9% of Total Supply  |
| Liquidity:            | 3% of Total Supply  |

---

## MundoCryptoAirdrop

MundoCryptoAirdrop allows the owner to distribute reward tokens to different addresses. It also allows to reclaim tokens from the contract to avoid locking of the tokens inside the contract.

### airdroppingToken

```solidity
contract IERC20 airdroppingToken
```

### ZeroAddress

```solidity
error ZeroAddress()
```

_Revert with an error when the address is the zero address_

### ParamslengthMismatch

```solidity
error ParamslengthMismatch()
```

_Revert if the length of two arrays are not same._

### ZeroValuedInputParam

```solidity
error ZeroValuedParam(string paramName)
```

_Revert with an error when the param is zero valued._

| Name      | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| paramName | string | The parameter which is zero valued. |

### constructor

```solidity
constructor(contract IERC20 _token) public
```

Set the ERC20 token which will be distributed.

Parameters:

| Name    | Type            | Description                                |
| ------- | --------------- | ------------------------------------------ |
| \_token | contract IERC20 | The ERC20 token which will be distributed. |

### distributeRewards

```solidity
function distributeRewards(address[] calldata _recipients, uint256[] calldata _amounts) external
```

_External function to distribute tokens from the contract. Only the caller with owner access can call the function._

Parameters:

| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| \_recipients | address[] | The recipients addresses to which the tokens are being distributed. |
| \_amounts    | uint256[] | The token amounts to send to each recipient addresses.              |

### withdrawTokens

```solidity
function withdrawTokens(address beneficiary) external
```

_External function to withdraw tokens inside the contract. Only the caller with owner access can call this function._

Parameters:

| Name        | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| beneficiary | address | Address of account to send the tokens to. |
