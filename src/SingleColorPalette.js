import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.extractShades(this.props.palette, this.props.colorId);
		this.state = {
			format: "hex",
		};
		this.changeFormat = this.changeFormat.bind(this);
	}
	extractShades(palette, colorWanted) {
		let shades = [];
		let colors = palette.colors;
		for (let key in colors) {
			shades = shades.concat(
				colors[key].filter((color) => color.id === colorWanted),
			);
		}
		//return all shades of a given color
		return shades.slice(1);
	}
	changeFormat(val) {
		this.setState({
			format: val,
		});
	}
	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const colorBoxes = this._shades.map((color) => (
			<ColorBox
				key={color.name}
				name={color.name}
				background={color[format]}
				showingFullPalette={false}
			/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleChange={this.changeFormat} showLevels={false} />
				<div className={classes.Colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>Go Back</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
