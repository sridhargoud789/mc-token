const { expect } = require('chai')
const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')

let accounts, owner, alice, tokenContract

const tokenTotalSupply = BigNumber.from(1_000_000_000).mul(
	BigNumber.from(10).pow(18)
)
const airdropAllocation = tokenTotalSupply.mul(6).div(100)
const privateSaleAllocation = tokenTotalSupply.mul(13).div(100)
const seedSaleAllocation = tokenTotalSupply.mul(6).div(100)
const foundationTreasuryAllocation = tokenTotalSupply.mul(13).div(100)
const ecosystemIncentivesAllocation = tokenTotalSupply.mul(33).div(100)
const marketingAllocation = tokenTotalSupply.mul(12).div(100)
const partnerAllocation = tokenTotalSupply.mul(5).div(100)
const teamAllocation = tokenTotalSupply.mul(9).div(100)
const liquidityAllocation = tokenTotalSupply.mul(3).div(100)

describe('MundoCryptoToken', () => {
	beforeEach(async () => {
		accounts = await ethers.getSigners()
		owner = accounts[0]
		alice = accounts[1]

		const tokenContractFactory = await ethers.getContractFactory(
			'MundoCryptoToken'
		)
		tokenContract = await tokenContractFactory.deploy()

		expect(tokenTotalSupply).to.be.equal(
			airdropAllocation
				.add(seedSaleAllocation)
				.add(privateSaleAllocation)
				.add(foundationTreasuryAllocation)
				.add(ecosystemIncentivesAllocation)
				.add(marketingAllocation)
				.add(partnerAllocation)
				.add(teamAllocation)
				.add(liquidityAllocation)
		)
	})

	describe('Deployment', () => {
		it('will return correct token info', async () => {
			expect(await tokenContract.name()).to.be.equal('MundoCryptoToken')
			expect(await tokenContract.symbol()).to.be.equal('MCT')
			expect(await tokenContract.decimals()).to.be.equal(18)
			expect(await tokenContract.totalSupply()).to.be.equal(
				tokenTotalSupply
			)
		})
	})
})
