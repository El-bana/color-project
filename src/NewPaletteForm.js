import React, { Component } from "react";
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import { colors } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
	main: {
		height: "calc(100vh - 100px)",
	},
};

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentColor: "purple",
			colorName: "",
			colors: [],
		};

		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.editColorName = this.editColorName.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase(),
			),
		);
		ValidatorForm.addValidationRule("isColorUnique", (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor),
		);
	}

	updateCurrentColor(newColor) {
		this.setState({
			currentColor: newColor,
		});
	}

	addNewColor() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.colorName,
		};
		this.setState({
			colors: [...this.state.colors, newColor],
			colorName: "",
		});
	}

	editColorName(evt) {
		this.setState({
			colorName: evt.target.value,
		});
	}

	render() {
		return (
			<div className={this.props.classes.main}>
				<PersistentDrawerLeft
					color={this.state.currentColor}
					handleUpadte={this.updateCurrentColor}
					handleSubmit={this.addNewColor}
					colorName={this.state.colorName}
					handleChange={this.editColorName}
				/>
				{this.state.colors.map((clr) => (
					<DraggableColorBox color={clr.color} name={clr.name} />
				))}
			</div>
		);
	}
}

export default withStyles(styles)(NewPaletteForm);
