import React, { Component } from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

import MyInput from '../components/MyInput';
import MyImagesSliderConclude from '../components/MyImagesSliderConclude';

import strings from '../config/strings';
import colors from '../config/colors';
import metrics from '../config/metrics';
import { translate } from '../locales';

import {
	setAllFields,
	resetForm,
	setAllImages,
	resetImages
} from '../actions';

import { connect } from 'react-redux';

class Conclude extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
			isLoading: false,
		}
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;

		if (params && params['vehicle']) {
			const vehicle = { ...params['vehicle'] };
			this.props.setAllFields(vehicle);
			this.props.setAllImages(vehicle['images'])
		} else {
			this.props.resetForm();
			this.props.resetImages();
		}
	}

	componentWillUnmount() {
		this.props.resetForm();
		this.props.resetImages();
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
				<View style={[styles.formDetails, styles.form, { flexDirection: 'column' }]}>
					<View style={{ height: '50%' }}>
						<MyImagesSliderConclude />
					</View>
					<View style={[styles.inputContainer]}>
						<MyInput
							style={styles.propsStyle}
							label={strings.LICENSE_PLATE_LABEL}
							autoCapitalize='characters'
							editable={false}
							value={this.props.vehicle['plate']}
						/>

						<MyInput
							style={styles.propsStyle}
							label={strings.MODEL_LABEL}
							editable={false}
							value={this.props.vehicle['model']}
						/>

						<MyInput
							style={styles.propsStyle}
							label={strings.TYPE_LABEL}
							editable={false}
							value={this.props.vehicle['type']}
						/>

						<MyInput
							style={styles.propsStyle}
							label={strings.COLOR_LABEL}
							editable={false}
							value={this.props.vehicle['color']}
						/>

						<MyInput
							style={styles.propsStyle}
							inputStyle={{fontSize: 15}}
							label={strings.ENTRY_DATE}
							editable={false}
							value={this.props.vehicle['entryDate']} />

						<MyInput
							style={styles.propsStyle}
							inputStyle={{fontSize: 15}}
							label={strings.DEPARTURE_DATE}
							editable={false}
							value={this.props.vehicle['departureDate']}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	form: {
		margin: 20,
		padding: 20,
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.4)'
	},

	formDetails: {
		height: metrics.DEVICE_HEIGHT * 0.82,
		flexDirection: 'row'
	},

	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginBottom: 0,
	},

	propsStyle: {
		width: '49%',
	}

});

const mapStateToProps = ({ vehicle, images }) => {
	return { ...vehicle, vehicle: vehicle['vehicle'], images: images['images'] };
}

const mapDispatchToProps = {
	setAllFields,
	resetForm,
	setAllImages,
	resetImages
}


export default connect(mapStateToProps, mapDispatchToProps)(Conclude);
