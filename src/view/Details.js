import React, { Component } from 'react';
import {
	View,
	Alert,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import MyPicker from '../components/MyPicker';
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import MyImagesSlider from '../components/MyImagesSlider';

import strings from '../config/strings';
import colors from '../config/colors';
import metrics from '../config/metrics';
import time from '../util/time';
import { translate } from '../locales';

const dataType = [
	{ label: translate('REGISTER') },
	{ label: 'Carro', value: 'carro' },
	{ label: 'Moto', value: 'moto' },
	{ label: 'Pickup', value: 'pickup' },
	{ label: 'Utilitario', value: 'utilitario' },
]

const dataColor = [
	{ label: 'SELECIONE' },
	{ label: translate('BLUE'), value: 'azul', hex: '#0000FF' },
	{ label: translate('GREEN'), value: 'verde', hex: '#00FF00' },
	{ label: translate('RED'), value: 'vermelho', hex: '#FF0000' },
	{ label: translate('BLACK'), value: 'preto', hex: '#000000' },
]

import { connect } from 'react-redux';
import { setField, saveVehicle, setAllFields, resetForm, selectPhotoTapped } from '../actions';

class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
			isEdit: false,
			errorMessagePlate: '',
			errorMessagePassword: '',
			isLoading: false,
		}
		this.time = time;
	}



	componentDidMount() {
		const { navigation, setAllFields, resetForm } = this.props;
		const { params } = navigation.state;

		this.dateEntry = setInterval(() => {
			this.setState({ time: this.time.dateHourToString() })
			if (!this.state.isEdit) {
				this.props.setField('entryDate', time.dateHourToString());
				this.props.setField('id', time.dateNow());
			}
		}, 1000);

		if (params && params['editItem']) {
			setAllFields(params.editItem)
			this.setState({ isEdit: true })
			clearInterval(this.dateEntry);
		} else {
			resetForm();
		}

	}

	componentWillUnmount() {
		clearInterval(this.dateEntry);
	}

	handleSave = () => {
		this.setState({ isLoading: true })
		const { saveVehicle, vehicle, navigation } = this.props;

		saveVehicle(vehicle).then(() => {
			this.setState({ isLoading: false });
			navigation.pop();
		}).catch((error) => {
			Alert.alert('Erro', error.message);
		})
	}

	render() {
		let { isLoading, isEdit } = this.state;
		const { setField, vehicle } = this.props
		if (isEdit) {
			console.log(this.state);
			// 	alert(JSON.stringify(this.state))
		}
		return (
			<View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
				<View style={[styles.formDetails, styles.form, { flexDirection: 'column' }]}>
					<View style={{ height: '30%' }}>
						<MyImagesSlider />
					</View>
					<View style={[styles.inputContainer]}>
						<MyInput
							style={styles.propsStyle}
							label={strings.LICENSE_PLATE_LABEL}
							placeholder={strings.LICENSE_PLATE_PLACEHOLDER}
							errorMessage={this.state.errorMessageEmail}
							autoCapitalize='characters'
							icon={{ name: 'envelope', size: 24, color: 'gray' }}
							onChangeText={itemValue => setField('plate', itemValue)}
							value={vehicle.plate} />
						<MyInput
							style={styles.propsStyle}
							label={strings.MODEL_LABEL}
							placeholder={strings.MODEL_PLACEHOLDER}
							errorMessage={this.state.errorMessageEmail}
							icon={{ name: 'envelope', size: 24, color: 'gray' }}
							onChangeText={itemValue => setField('model', itemValue)}
							value={vehicle.model}
						/>

						<MyPicker
							styles={styles.propsStyle}
							key='picker_type'
							label={strings.TYPE_LABEL}
							data={dataType}
							mode='dialog'
							selectedValue={vehicle.type}
							onValueChange={(itemValue, itemPosition) => setField('type', itemValue)}
						/>

						<MyPicker
							styles={styles.propsStyle}
							key='picker_color'
							label={strings.COLOR_LABEL}
							data={dataColor}
							mode='dialog'
							selectedValue={vehicle.color}
							onValueChange={(itemValue, itemPosition) => {
								setField('color', itemValue);
							}}
						/>
						<MyInput
							style={{ width: '100%' }}
							containerStyle={{ marginVertical: 10 }}
							inputContainerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
							label={strings.DATE_TIME}
							editable={false}
							value={this.state.isEdit ? vehicle.entryDate : this.state.time}
							inputStyle={{ textAlign: 'center' }}
							errorMessage={this.state.errorMessageEmail}
							icon={{ name: 'envelope', size: 24, color: 'gray' }} />
					</View>
				</View>
				<View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
					<MyButton
						title={strings.SAVE}
						loading={isLoading}
						disabled={isLoading}
						disabledStyle={{ backgroundColor: colors.SUCCESS }}
						containerStyle={styles.button}
						buttonStyle={{ backgroundColor: colors.SUCCESS }}
						onPress={this.handleSave}
					/>
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
		height: metrics.DEVICE_HEIGHT * 0.75,
		flexDirection: 'row'
	},

	buttonContainer: {
		flexDirection: 'column',
		marginTop: -45,
		width: metrics.DEVICE_WIDTH * 0.75,
		alignSelf: 'center',
		alignItems: 'flex-end',
		marginVertical: 10
	},

	inputContainer: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginBottom: 0,
	},

	propsStyle: {
		width: '49%',
	}

});

const mapStateToProps = ({ vehicle }) => {
  return { vehicle: vehicle['vehicle'] };
}

const mapDispatchToProps = {
	setField,
	saveVehicle,
	setAllFields,
	resetForm,
	selectPhotoTapped
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
