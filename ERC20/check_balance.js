Archit.deployed().then(instance => {
  console.log("Token contract address:", instance.address)
  return instance.balanceOf("0x4f4Bc330e0Ab8D434A810585668243e9bb9c71f1")
}).then(balance => {
  console.log("Account balance (wei):", balance.toString())
  console.log("Account balance (ABT):", (BigInt(balance.toString()) / BigInt(1e18)).toString())
}).catch(error => {
  console.error("Error:", error.message)
})
