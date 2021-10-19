import React from "react";
import classNames from "classnames";

import Button from "../../Common/Button";

const BankInputField = ({
	className,
	label,
	placeholder,
	btnLabel,
	handleClickButton,
}) => {
	const [value, setValue] = React.useState("");

	const onClickBtn = () => {
		if (value !== "") {
			handleClickButton(value);
		}
	};

	return (
		<div className={classNames("bankInputField", className)}>
			<div className="w-100">
				<label>{label}</label>
				<div className="bankInputField__inputbox">
					<input
						className="form-control"
						placeholder={placeholder}
						value={value}
						type="number"
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			</div>
			<Button
				className="bankInputField__btn"
				type="warning"
				onClick={onClickBtn}
				disabled={value === ""}
			>
				{btnLabel}
			</Button>
		</div>
	);
};

export default BankInputField;
