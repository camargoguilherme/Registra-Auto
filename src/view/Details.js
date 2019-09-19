import React, { Component } from 'react';
import {
	View,
	Picker

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import MyPicker from '../components/MyPicker';
import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import MyImagesSlider from '../components/MyImagesSlider';


import { styles } from '../config/styles';
import strings from '../config/strings';
import colors from '../config/colors';
import time from '../util/time';

import logo from '../assets/images/logo.png';

const dataType = [
	{ label: 'Carro', value: 'carro' },
	{ label: 'Moto', value: 'moto' },
	{ label: 'Pickup', value: 'pickup' },
	{ label: 'Utilitario', value: 'utilitario' },
]

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chevrolet_3100.JPG/800px-Chevrolet_3100.JPG'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Chevrolet_Astra_2.0_GLS_2006_%2816088287360%29.jpg/800px-Chevrolet_Astra_2.0_GLS_2006_%2816088287360%29.jpg'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2019_Chevrolet_Blazer_RS_3.6L%2C_front_8.18.19.jpg/1280px-2019_Chevrolet_Blazer_RS_3.6L%2C_front_8.18.19.jpg'
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chevrolet_car_in_Avenida_Paulista.jpg/800px-Chevrolet_car_in_Avenida_Paulista.jpg'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chevrolet_C-20_Crew_Cab_1993_%2816844862924%29.jpg/800px-Chevrolet_C-20_Crew_Cab_1993_%2816844862924%29.jpg'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d75',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg/1024px-2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg'
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b6',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chevrolet_Opala_Caravan_late.jpg/1280px-Chevrolet_Opala_Caravan_late.jpg'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f67',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chevrolet_Celta_2013.jpg/800px-Chevrolet_Celta_2013.jpg'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d78',
		url: 'https://upload.wikimedia.org/wikipedia/pt/2/2e/Chevette_1985.png'
	},
];

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			plate: '',
			model: '',
			now: null,
			data: [...DATA],
			errorMessagePlate: '',
			errorMessagePassword: '',
			loading: false,
			rightIcon: 'eye-slash',
			isPassword: true
		}
		setInterval(() => {
			this.setState({ now: time.dateHourToString() })
		}, 1000)
	}

	handleChange = (field, value) => {
		this.setState({ [field]: value })
	}

	render() {
		let { loading, type, now, plate, data} = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
				<View style={[styles.formDetails, styles.form, { flexDirection: 'column' }]}>
					<MyImagesSlider
						data={data}
					/>
					<View style={{ flexDirection: 'row' }}>
						<View style={[styles.inputContainer]}>
							<MyInput
								label={strings.LICENSE_PLATE_LABEL}
								placeholder={strings.LICENSE_PLATE_PLACEHOLDER}
								errorMessage={this.state.errorMessageEmail}
								icon={{ name: 'envelope', size: 24, color: 'gray' }}
								onChangeText={text => this.handleChange('plate', text)}
								value={plate} />

							<MyPicker
								selectedValue={type}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({ type: itemValue })
								}
								data={dataType} />
						</View>
						<View style={styles.inputContainer}>
							<MyInput
								label={strings.MODEL_LABEL}
								placeholder={strings.MODEL_PLACEHOLDER}
								errorMessage={this.state.errorMessageEmail}
								icon={{ name: 'envelope', size: 24, color: 'gray' }}
								onChangeText={text => this.handleChange('model', text)}
								value={this.state.model} />

							<MyPicker
								selectedValue={type}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({ type: itemValue })
								}
								data={dataType} />
						</View>
					</View>
					<View style={styles.inputContainer}>
						<MyInput
							containerStyle={{ marginVertical: 35 }}
							inputContainerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
							label={strings.DATE_TIME}
							editable={false}
							placeholder={now}
							inputStyle={{ textAlign: 'center' }}
							errorMessage={this.state.errorMessageEmail}
							icon={{ name: 'envelope', size: 24, color: 'gray' }} />
					</View>
				</View>
				<View style={[styles.buttonLinkContainer, { flexDirection: 'row' }]}>
					<MyButton
						title={strings.SAVE}
						onPress={this.handleLoginPress}
						loading={loading}
						containerStyle={styles.button}
						buttonStyle={{ backgroundColor: colors.SUCCESS }} />
				</View>
			</View>
		);
	}
}
