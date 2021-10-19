import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import PageTitle from "../../components/Common/PageTitle";
import BankInputField from "../../components/Bank/BankInputField";
import BankOutline from "../../components/Bank/BankOutline";
import credits from "../../assets/images/credits.svg";

import bankAbi from "../../deployments/testnet/Bank.json";
import ERC20abi from "../../deployments/testnet/ERC20.json";
import stakeReward from "../../deployments/testnet/StakingRewards.json";

const bankAddress = "0xDcc10D823A099Ead0F4c1eFa76341d2D30f8fc4d";
const creditTokenAddress = "0x561277A9c06C3B20ECfD2892CbDdC2Cd6EE7E9de";
const gameTokenAddress = "0xdC97423e9c6129640Fe72ca6909E8D032029C1e0";
const baseURL = "https://api.coingecko.com/api/v3";

const BankPage = () => {
	const [creditBalance, setCreditBalance] = useState("0");
	const [gameTokenBalance, setGameTokenBalance] = useState("0");
	const [harmonyPrice, setHarmonyPrice] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCreditBalance(creditTokenAddress);
		getGameTokenBalance(gameTokenAddress);
		getHarmonyPrice();
	}, []);

	async function getHarmonyPrice() {
		const priceData = await axios.get(
			`${baseURL}/simple/price?ids=harmony&vs_currencies=usd`
		);
		setHarmonyPrice(priceData.data.harmony.usd);
	}

	async function requestAccount() {
		await window.ethereum.request({ method: "eth_requestAccounts" });
	}

	async function onDeposit(amount, tokenAddress) {
		if (typeof window.ethereum !== "undefined") {
			setLoading(true);
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			if (!checingAllowance(tokenAddress, amount)) {
				const contract20 = new ethers.Contract(
					tokenAddress,
					ERC20abi.abi,
					signer
				);

				await contract20.allowance(bankAddress, 10000);
			}

			const contract = new ethers.Contract(bankAddress, bankAbi.abi, signer);
			const t = await contract.depositToken(tokenAddress, amount, 0);
			await t.wait(1);
			setLoading(false);
			console.log("depositToken: ", t);
		}
	}

	const getCreditBalance = async (tokenAddress) => {
		if (typeof window.ethereum !== "undefined") {
			setLoading(true);
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract20 = new ethers.Contract(
				tokenAddress,
				ERC20abi.abi,
				signer
			);
			const balance = await contract20.balanceOf(account);
			const value = parseFloat(ethers.utils.formatEther(balance));
			console.log("Balance: ", value);

			setCreditBalance(value);
			setLoading(false);
		}
	};

	const getGameTokenBalance = async (tokenAddress) => {
		if (typeof window.ethereum !== "undefined") {
			setLoading(true);
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract20 = new ethers.Contract(
				tokenAddress,
				ERC20abi.abi,
				signer
			);
			const balance = await contract20.balanceOf(account);
			const value = parseFloat(ethers.utils.formatEther(balance));
			console.log("Balance: ", value);
			setGameTokenBalance(value);
			setLoading(false);
		}
	};

	async function withdrawToken() {
		if (typeof window.ethereum !== "undefined") {
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			// const contract20 = new ethers.Contract(
			// 	tokenAddress,
			// 	ERC20abi.abi,
			// 	signer
			// );

			// await contract20.approve(bankAddress, 9900);
			const contract = new ethers.Contract(bankAddress, bankAbi.abi, signer);
			const t = await contract.withdrawToken(creditTokenAddress, 25, 0);
			await t.wait(1);
			console.log("withdrawToken: ", t);
		}
	}

	async function claimReward(amount, tokenAddresses) {
		if (typeof window.ethereum !== "undefined") {
			setLoading(true);
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(bankAddress, bankAbi.abi, signer);
			const t = await contract.claimRewards(tokenAddresses, true);
			await t.wait(1);
			setLoading(false);
			console.log("claimReward: ", t);
		}
	}

	const handleSingleStake = (value) => {
		onDeposit(value, gameTokenAddress);
	};

	const handleLpStake = (value) => {
		onDeposit(value, creditTokenAddress);
	};

	const handleClaimStake = (value) => {
		claimReward(value, [creditTokenAddress, gameTokenAddress]);
	};

	const checingAllowance = async (tokenAddress, amount) => {
		const [account] = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract20 = new ethers.Contract(tokenAddress, ERC20abi.abi, signer);

		const allow = await contract20.allowance(account, bankAddress);
		return allow > amount;
	};

	return (
		<LoadingOverlay active={loading} spinner text="Waiting...">
			<div className="bank">
				{/* <button onClick={onClickERC20}>onClickERC20</button> */}
				{/* <button onClick={getCreditBalance}>get Balance</button>
			<button onClick={withdrawToken}>Withdraw Token</button>
			<button onClick={claimReward}>Claim Token</button> */}

				<PageTitle title="Bank" />
				<div className="bank__credit">
					<div>
						<p>YOUR CREDIT</p>
					</div>
					<div className="d-flex">
						<img src={credits} alt="credits" />
						{<h4>{creditBalance}</h4>}
					</div>
				</div>
				<div className="bank__content">
					<div className="row flex-lg-row flex-column-reverse no-gutters">
						<div className="col">
							<BankInputField
								label="SINGLE STAKE GAME"
								placeholder="Enter amount"
								className="mt-5"
								btnLabel="Stake"
								handleClickButton={handleSingleStake}
							/>
							<BankInputField
								label="lP / GAME ONE"
								placeholder="Enter amount"
								className="mt-5"
								btnLabel="Stake"
								handleClickButton={handleLpStake}
							/>
							<BankInputField
								label="UNCLAIMED CREDIT "
								placeholder="Enter amount"
								className="mt-5"
								btnLabel="Claim"
								handleClickButton={handleClaimStake}
							/>
						</div>
						<div className="col d-flex justify-content-center justify-content-lg-end">
							<BankOutline
								creditBalance={creditBalance}
								gameTokenBalance={gameTokenBalance}
								harmonyPrice={harmonyPrice}
							/>
						</div>
					</div>
				</div>
			</div>
		</LoadingOverlay>
	);
};

export default BankPage;
