// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const airdropContractFactory = await hre.ethers.getContractFactory(
		'MundoCryptoAirdrop'
	)

	const airdropContract = await airdropContractFactory.deploy(
		'0x61Ea51AE6ff1834E4B4929666a0532C20a5C72b2'
	)

	await airdropContract.deployTransaction.wait(5)

	console.log('MundoCryptoAirdrop deployed to:', airdropContract.address)

	await hre.run('verify:verify', {
		address: airdropContract.address,
		contract: 'contracts/MundoCryptoAirdrop.sol:MundoCryptoAirdrop',
		constructorArguments: ['0x61Ea51AE6ff1834E4B4929666a0532C20a5C72b2'],
	})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
