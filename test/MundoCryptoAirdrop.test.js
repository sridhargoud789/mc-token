const { expect } = require('chai')
const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')

let accounts,
	owner,
	alice,
	bob,
	charlie,
	david,
	user,
	mockToken,
	airdropContract

describe('MundoCryptoAirdrop', () => {
	beforeEach(async () => {
		accounts = await ethers.getSigners()
		owner = accounts[0]
		alice = accounts[1]
		bob = accounts[2]
		charlie = accounts[3]
		david = accounts[4]
		user = accounts[5]

		const mockTokenContractFactory = await ethers.getContractFactory(
			'MockToken'
		)
		mockToken = await mockTokenContractFactory.deploy()

		const airdropContractFactory = await ethers.getContractFactory(
			'MundoCryptoAirdrop'
		)
		airdropContract = await airdropContractFactory.deploy(mockToken.address)

		await mockToken.mint(
			airdropContract.address,
			BigNumber.from(10_00_000).mul(BigNumber.from(10).pow(18))
		)
	})

	describe('Deployment', () => {
		it('will not deploy if the token address is zero address', async () => {
			const airdropContractFactory = await ethers.getContractFactory(
				'MundoCryptoAirdrop'
			)

			await expect(
				airdropContractFactory.deploy(ethers.constants.AddressZero)
			).to.be.revertedWith('ZeroAddress')
		})

		it('will allocate proper tokens to the addresses', async () => {
			expect(await airdropContract.airdroppingToken()).to.be.equal(
				mockToken.address
			)
			expect(await airdropContract.owner()).to.be.equal(owner.address)
		})
	})

	describe('Distribute Rewards', () => {
		it('will revert if the caller is not the owner', async () => {
			await expect(
				airdropContract.connect(user).distributeRewards([], [])
			).to.be.revertedWith('Ownable: caller is not the owner')
		})

		it('will revert if the lenghts of addresses and amounts are not same/mismatched', async () => {
			await expect(
				airdropContract
					.connect(owner)
					.distributeRewards([alice.address], [1, 2])
			).to.be.revertedWith('ParamslengthMismatch')
		})

		it('will revert if one of the addresses is Zero Address', async () => {
			await expect(
				airdropContract
					.connect(owner)
					.distributeRewards([ethers.constants.AddressZero], [1])
			).to.be.revertedWith('ZeroAddress')
		})

		it('will revert if one of the amounts is Zero', async () => {
			await expect(
				airdropContract
					.connect(owner)
					.distributeRewards([alice.address], [0])
			).to.be.revertedWith('ZeroValuedParam')
		})

		it('successfully distribute tokens', async () => {
			const addresses = [
				alice.address,
				bob.address,
				charlie.address,
				david.address,
			]
			const amounts = [
				BigNumber.from(100).mul(BigNumber.from(10).pow(18)),
				BigNumber.from(150).mul(BigNumber.from(10).pow(18)),
				BigNumber.from(50).mul(BigNumber.from(10).pow(18)),
				BigNumber.from(1).mul(BigNumber.from(10).pow(18)),
			]
			await airdropContract
				.connect(owner)
				.distributeRewards(addresses, amounts)

			for (let idx = 0; idx < addresses.length; idx++) {
				const address = addresses[idx]
				const amount = amounts[idx]

				expect(await mockToken.balanceOf(address)).to.be.equal(amount)
			}
		})
	})

	describe('Withdraw Reward Tokens', () => {
		it('will revert if the caller is not the owner', async () => {
			await expect(
				airdropContract.connect(user).withdrawTokens(user.address)
			).to.be.revertedWith('Ownable: caller is not the owner')
		})

		it("won't claim any tokens if the contract balance is zero", async () => {
			await airdropContract.connect(owner).withdrawTokens(owner.address)
			await airdropContract.connect(owner).withdrawTokens(owner.address)

			expect(await mockToken.balanceOf(owner.address)).to.be.equal(
				BigNumber.from(10_00_000).mul(BigNumber.from(10).pow(18))
			)
		})

		it('successfully withdraw reward tokens', async () => {
			await airdropContract.connect(owner).withdrawTokens(owner.address)

			expect(await mockToken.balanceOf(owner.address)).to.be.equal(
				BigNumber.from(10_00_000).mul(BigNumber.from(10).pow(18))
			)
		})
	})
})
