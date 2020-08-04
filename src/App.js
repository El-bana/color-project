import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

export default class App extends Component {
	findePalette(id) {
		return seedColors.find(function (palette) {
			return palette.id === id;
		});
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<PaletteList palettes={seedColors} {...routeProps} />
					)}
				/>
				<Route
					exact
					path='/palette/:id'
					render={(routeProps) => (
						<Palette
							Palette={generatePalette(
								this.findePalette(routeProps.match.params.id),
							)}
						/>
					)}
				/>
				<Route
					path='/palette/:paletteId/:colorId/'
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(
								this.findePalette(routeProps.match.params.paletteId),
							)}
						/>
					)}
				/>
			</Switch>
			// <div className='App'>
			// 	<Palette Palette={generatePalette(seedColors[5])} />
			// </div>
		);
	}
}
