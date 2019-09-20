import React, { Component } from 'react';
import {
	View,
	Picker,
	Alert,
} from 'react-native';

import MyPicker from '../components/MyPicker';
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import MyImagesSlider from '../components/MyImagesSlider';


import { styles } from '../config/styles';
import strings from '../config/strings';
import colors from '../config/colors';
import time from '../util/time';


const dataType = [
	{ label: 'SELECIONE' },
	{ label: 'Carro', value: 'carro' },
	{ label: 'Moto', value: 'moto' },
	{ label: 'Pickup', value: 'pickup' },
	{ label: 'Utilitario', value: 'utilitario' },
]

import { connect } from 'react-redux';
import { setField, saveVehicle, setAllFields, resetForm, } from '../actions';

class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			now: null,
			type: '',
			model: '',
			errorMessagePlate: '',
			errorMessagePassword: '',
			isLoading: false,
			rightIcon: 'eye-slash',

		}
		setInterval(() => {
			this.setState({ now: time.dateHourToString() })
		}, 1000)
	}

	componentDidMount() {

		const { navigation, setAllFields, resetForm } = this.props;
		const { params } = navigation.state;

		if (params && params.editItem) {
			setAllFields(params.editItem)
		} else {
			resetForm();
		}
	}

	render() {
		let { isLoading, now } = this.state;
		const { vehicleForm, setField, saveVehicle, navigation } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
				<View style={[styles.formDetails, styles.form, { flexDirection: 'column' }]}>
					<MyImagesSlider />
					<View style={{ flexDirection: 'row' }}>
						<View style={[styles.inputContainer]}>
							<MyInput
								label={strings.LICENSE_PLATE_LABEL}
								placeholder={strings.LICENSE_PLATE_PLACEHOLDER}
								errorMessage={this.state.errorMessageEmail}
								autoCapitalize='characters'
								icon={{ name: 'envelope', size: 24, color: 'gray' }}
								onChangeText={itemValue => setField('plate', itemValue)}
								value={vehicleForm.plate} />

							<MyPicker
								label={strings.TYPE_LABEL}
								data={dataType}
								mode='dropdown'
								onValueChange={(itemValue, itemPosition) => {
									this.setState({type: itemValue})
									//setField('type', itemValue)
									alert(itemValue)
								}}
								selectedValue={this.state.type}
							/>
						</View>
						<View style={styles.inputContainer}>
							<MyInput
								label={strings.MODEL_LABEL}
								placeholder={strings.MODEL_PLACEHOLDER}
								errorMessage={this.state.errorMessageEmail}
								icon={{ name: 'envelope', size: 24, color: 'gray' }}
								onChangeText={itemValue => setField('model', itemValue)}
								value={vehicleForm.model}
							/>

							<MyPicker
								label={strings.COLOR_LABEL}
								data={dataType}
								mode='dialog'
								selectedValue={vehicleForm.color}
								onValueChange={(itemValue, itemPosition) => alert(itemValue) /*setField('color', itemValue)*/}
							/>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<MyInput
							containerStyle={{ marginVertical: 10 }}
							inputContainerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
							label={strings.DATE_TIME}
							editable={false}
							value={vehicleForm.entry_date || now}
							onChangeText={itemValue => setField('entry_date', itemValue)}
							inputStyle={{ textAlign: 'center' }}
							errorMessage={this.state.errorMessageEmail}
							icon={{ name: 'envelope', size: 24, color: 'gray' }} />
					</View>
				</View>
				<View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
					<MyButton
						title={strings.SAVE}
						onPress={async () => {
							this.setState({ isLoading: true })

							try {
								await saveVehicle(vehicleForm);
							} catch (error) {
								Alert.alert('Erro', error.message);
							} finally {
								this.setState({ isLoading: false })
							}

						}}
						loading={isLoading}
						containerStyle={styles.button}
						buttonStyle={{ backgroundColor: colors.SUCCESS }} />
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		vehicleForm: state.vehicleForm
	})
}

const mapDispatchToProps = {
	setField,
	saveVehicle,
	setAllFields,
	resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
