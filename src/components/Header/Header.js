import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
// import { useEthers, useEtherBalance } from "@usedapp/core";
import Sidebar from "react-sidebar";
import HeaderSidebarContent from "./HeaderSidebarContent";
import { formatEther } from "@ethersproject/units";
import logo from "../../assets/images/logo.png";
import homeIcon from "../../assets/images/home.svg";
import missionsIcon from "../../assets/images/missions.svg";
import battleIcon from "../../assets/images/battle.svg";
import armoryIcon from "../../assets/images/armory.svg";
import realestateIcon from "../../assets/images/buildings.svg";
import techlabIcon from "../../assets/images/techlab.svg";
import alliesIcon from "../../assets/images/allies.svg";
import profileIcon from "../../assets/images/profile.svg";
import mobilemenu from "../../assets/images/mobilemenu.svg";

const Desktop = ({ children }) => {
	const isDesktop = useMediaQuery({ minWidth: 992 });
	return isDesktop ? children : null;
};

const TabletMobile = ({ children }) => {
	const isMobile = useMediaQuery({ maxWidth: 991 });
	return isMobile ? children : null;
};

const Header = () => {
	const [account, setAccount] = React.useState("");

	const [show, setShow] = React.useState(false);

	const onConnectWallet = async () => {
		const accounts = await window.ethereum.enable();
		setAccount(accounts[0]);
	};

	return (
		<div className="header">
			<Navbar expand="lg">
				<Navbar.Brand as={Link} to="/">
					<img src={logo} alt="logo" className="logo" />
				</Navbar.Brand>
				<Desktop>
					<Nav className="mx-auto">
						<Nav.Link as={NavLink} to="/home">
							<img src={homeIcon} alt="homeIcon" />
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/missions">
							<img src={missionsIcon} alt="homeIcon" />
							MISSIONS
						</Nav.Link>
						<Nav.Link as={NavLink} to="/battle">
							<img src={battleIcon} alt="homeIcon" />
							Battle
						</Nav.Link>
						<Nav.Link as={NavLink} to="/armory">
							<img src={armoryIcon} alt="homeIcon" />
							Armory
						</Nav.Link>
						<Nav.Link as={NavLink} to="/realestate">
							<img src={realestateIcon} alt="homeIcon" />
							Real estate
						</Nav.Link>
						<Nav.Link as={NavLink} to="/techlab">
							<img src={techlabIcon} alt="homeIcon" />
							Tech lab
						</Nav.Link>
						<Nav.Link as={NavLink} to="/alliesenemies">
							<img src={alliesIcon} alt="homeIcon" />
							Allies
						</Nav.Link>
					</Nav>
					{/* {account !== "" ? (
						<div className="header__eth">
							{account.slice(0, 6)}...
							{account.slice(account.length - 4, account.length)}
						</div>
					) : (
						<Nav.Link
							as={"div"}
							onClick={onConnectWallet}
							className="header__walletBtn"
						>
							Connect Wallet
						</Nav.Link>
					)} */}

					<Nav className="justify-content-center">
						<Nav.Link as={NavLink} to="/profile">
							<img src={profileIcon} alt="homeIcon" />
							Pascal James
						</Nav.Link>
					</Nav>
				</Desktop>
			</Navbar>
			<TabletMobile>
				<Sidebar
					sidebar={<HeaderSidebarContent onSetOpen={() => setShow(false)} />}
					open={show}
					onSetOpen={() => setShow(false)}
					sidebarClassName="sidebar"
					pullRight
				>
					<button onClick={() => setShow(true)} className="header__mobilemenu">
						<img src={mobilemenu} alt="mobilemenu" />
					</button>
				</Sidebar>
			</TabletMobile>
		</div>
	);
};

export default Header;
