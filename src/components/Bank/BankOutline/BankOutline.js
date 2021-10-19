import React from "react";
import currency from "currency.js";
import Parallegogram from "../../Common/Parallegogram";
import credits from "../../../assets/images/credits.svg";
import line from "../../../assets/images/line.svg";
import bankTotalGame from "../../../assets/images/bank-total-game.svg";

const BankOutline = ({ gameTokenBalance, creditBalance, harmonyPrice }) => {
	return (
		<div className="bankoutline">
			<Parallegogram className="bankoutline__parallegogram ms-5">
				Total value bank
			</Parallegogram>
			<div className="bankoutline__credits">
				<img src={credits} alt="credit" />
				<p>10,256</p>
			</div>
			<div className="bankoutline__line">
				<img src={line} alt="line" />
			</div>
			<Parallegogram className="bankoutline__parallegogram ms-4">
				Total value Locked
			</Parallegogram>
			<div className="bankoutline__locked">
				<div>
					<div className="bankoutline__locked__values">
						<img src={bankTotalGame} alt="bankTotalGame" />
						<p>{gameTokenBalance}</p>
					</div>
					<h6>Game</h6>
				</div>
				<div>
					<div className="bankoutline__locked__values">
						<p>
							{currency(gameTokenBalance * harmonyPrice, {
								separator: ",",
							}).format()}
						</p>
					</div>
					<h6>DOLLARS</h6>
				</div>
			</div>
			<div className="bankoutline__line">
				<img src={line} alt="line" />
			</div>
			<Parallegogram className="bankoutline__parallegogram">
				Total Credit In-game
			</Parallegogram>
			<div className="bankoutline__locked">
				<div>
					<div className="bankoutline__locked__values">
						<img src={credits} alt="credits" style={{ width: 18 }} />
						<p>{creditBalance}</p>
					</div>
					<h6>Credit</h6>
				</div>
				<div>
					<div className="bankoutline__locked__values">
						<p>
							{currency(creditBalance * harmonyPrice, {
								separator: ",",
							}).format()}
						</p>
					</div>
					<h6>DOLLARS</h6>
				</div>
			</div>
		</div>
	);
};

export default BankOutline;
