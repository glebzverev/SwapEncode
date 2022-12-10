const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
require('dotenv').config()
const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
const USDC = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C"
const {encodePackedWithSelector} = require("./swapEncoder");

const params = {
    tokenIn: USDC,
    tokenOut: WETH,
    fee: 500,
    recipient: "0x3604226674A32B125444189D21A51377ab0173d1",
    deadline: Math.floor(Date.now() / 1000) + (60 * 100),
    amountIn: 100 * 10**6,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }

  const dtypes = {
    tokenIn: "address",
    tokenOut: "address",
    fee: "uint256",
    recipient: "address",
    deadline: "uint256",
    amountIn: "uint256",
    amountOutMinimum: "uint256",
    sqrtPriceLimitX96: "uint160",
}

async function main() {
    const selector = "0x414bf389"
    const data = encodePackedWithSelector(selector, params, dtypes)
    console.log(data)
    await web3.eth.accounts.signTransaction({
        to: swapRouterAddress,
        value: '0',
        gasLimit: 10000000,
        data: data
    }, process.env.WALLET_SECRET)
    .then((signed)=>{
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
        });      
    }

main()
