import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import Header from "./components/Header";
import LevelBar from "./components/LevelBar";
import ScoreContainer from "./components/ScoreContainer";
import "./App.scss";

const loading = () => (
	<div className="animated fadeIn pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

function App() {
	return (
		<div className="App">
			<Header />
			<LevelBar />
			<ScoreContainer />
			<React.Suspense fallback={loading()}>
				<Switch>
					{AppRoutes.map((route, idx) => {
						return (
							route.component && (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									render={(props) => (
										<>
											<route.component {...props} />
										</>
									)}
								/>
							)
						);
					})}
					<Redirect from="/" to="/home" />
				</Switch>
			</React.Suspense>
		</div>
	);
}

export default App;
