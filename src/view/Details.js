import React, { Component } from 'react';
import {
	View,
	Alert,
	TouchableOpacity
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

const dataColor = [
	{ label: 'SELECIONE' },
	{ label: 'Azul', value: 'azul', hex: '#0000FF' },
	{ label: 'Verde', value: 'verde', hex: '#00FF00' },
	{ label: 'Vermelho', value: 'vermelho', hex: '#FF0000' },
	{ label: 'Preto', value: 'preto', hex: '#000000' },
]

import { connect } from 'react-redux';
import { setField, saveVehicle, setAllFields, resetForm, } from '../actions';

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

	dateEntry = () => setInterval( () => {
		this.setState({time: this.time.dateHourToString()})
		// if(!this.state.isEdit && this.state.isLoading){
		// 	this.props.setField('entryDate', time.dateHourToString());
		// 	this.props.setField('id', time.dateNow());
		// }
	}, 1000);

	componentDidMount() {
		const { navigation, setAllFields, resetForm } = this.props;
		const { params } = navigation.state;

		if (params && params.editItem) {
			setAllFields(params.editItem)
			this.setState((prevState) => {
				return { isEdit: !prevState.isEdit};
			})
		} else {
			resetForm();
			this.dateEntry();
		}
	}

	componentWillUnmount() {
		clearInterval(this.dateEntry);
	}

	handleSave = () => {
		this.setState({ isLoading: true })
		console.log('state', this.state)
		const { saveVehicle, vehicleForm, navigation } = this.props;
		if(!this.state.isEdit){
			this.props.setField('entryDate', time.dateHourToString());
			this.props.setField('id', time.dateNow());
		}
		
		saveVehicle(vehicleForm).then(() => {
			this.setState({ isLoading: false });
			navigation.pop();
		}).catch((error) => {
			Alert.alert('Erro', error.message);
		})
	}

	render() {
		let { isLoading } = this.state;
		const { setField, vehicleForm } = this.props

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
								key='picker_type'
								label={strings.TYPE_LABEL}
								data={dataType}
								mode='dialog'
								selectedValue={vehicleForm.type}
								onValueChange={(itemValue, itemPosition) => setField('type', itemValue)}
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
								key='picker_color'
								label={strings.COLOR_LABEL}
								data={dataColor}
								mode='dialog'
								selectedValue={vehicleForm.color}
								onValueChange={(itemValue, itemPosition) => {
									setField('color', itemValue);
								}}
							/>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<MyInput
							containerStyle={{ marginVertical: 10 }}
							inputContainerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
							label={strings.DATE_TIME}
							editable={false}
							value={vehicleForm.entryDate || this.state.time}
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

const mapStateToProps = ({ vehicleForm }) => {
	return ({
		vehicleForm
	})
}

const mapDispatchToProps = {
	setField,
	saveVehicle,
	setAllFields,
	resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
