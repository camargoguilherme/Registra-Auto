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
	{ label: translate('SELECT') },
	{ label: 'Carro', value: 'carro' },
	{ label: 'Moto', value: 'moto' },
	{ label: 'Pickup', value: 'pickup' },
	{ label: 'Utilitario', value: 'utilitario' },
]

const dataColor = [
	{ label: translate('SELECT') },
	{ label: translate('BLUE'), value: 'azul', hex: '#0000FF' },
	{ label: translate('GREEN'), value: 'verde', hex: '#00FF00' },
	{ label: translate('RED'), value: 'vermelho', hex: '#FF0000' },
	{ label: translate('BLACK'), value: 'preto', hex: '#000000' },
]

import { connect } from 'react-redux';
import {
	setField,
	setAllFields,
	saveVehicle,
	resetForm,
	selectPhotoTapped,
	uploadImages,
	setAllImages,
	resetImages
} from '../actions';

class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
			isLoading: false,
			errorMessagePlate: '',
			errorMessageModel: '',
			errorMessageType: '',
			errorMessageColor: '',
			errorMessagePhotos: '',
		}
		this.time = time;
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;

		this.dateEntry = setInterval(() => {
			this.setState({ time: this.time.dateHourToString() })
		}, 1000);

		if (params && params['vehicle']) {
			clearInterval(this.dateEntry);
			const vehicle = { ...params['vehicle'] };
			vehicle['status'] = !!params['conclude'];

			!!params['conclude'] && this.concludeOption();
			this.props.setAllFields(vehicle);
			this.props.setAllImages(vehicle['images'])
		} else {
			this.props.resetForm();
			this.props.resetImages();
			this.props.setField('id', time.dateNow());
		}
		this.messages();
	}

	componentWillUnmount() {
		clearInterval(this.dateEntry);
		this.props.resetForm();
		this.props.resetImages();
	}

	messages = () => {
		const { plate, model, type, color } = this.props.vehicle;
		let messages = '';
		if (!plate) {
			this.setState({ errorMessagePlate: strings.PLATE_MESSAGE });
			messages += `${strings.PLATE_MESSAGE}\n`;
		} else {
			this.setState({ errorMessagePlate: '' });
		}
		if (!model) {
			this.setState({ errorMessageModel: strings.MODEL_MESSAGE });
			messages += `${strings.MODEL_MESSAGE}\n`;
		} else {
			this.setState({ errorMessageModel: '' });
		}
		if (!type) {
			this.setState({ errorMessageType: strings.TYPE_MESSAGE });
			messages += `${strings.TYPE_MESSAGE}\n`;
		} else {
			this.setState({ errorMessageType: '' })
		}
		if (!color) {
			this.setState({ errorMessageColor: strings.COLOR_MESSAGE });
			messages += `${strings.COLOR_MESSAGE}\n`;
		} else {
			this.setState({ errorMessageColor: '' });
		}
		if (!this.props.images.length) {
			this.setState({ errorMessagePhotos: strings.PHOTO_MESSAGE });
			messages += `${strings.PHOTO_MESSAGE}`;
		} else {
			this.setState({ errorMessagePhotos: '' });
		}
		return messages;
	}

	concludeOption = () => {
		Alert.alert(
			`${strings.CONCLUDE}?`,
			strings.CONCLUDE_MESSAGE,
			[
				{
					text: strings.CANCEL,
					onPress: () => { this.props.navigation.pop() }
				},
				{
					text: strings.CONCLUDE,
					onPress: () => { this.props.selectPhotoTapped() }
				},
			],
			{ cancelable: false },
		)
	}

	handleSave = async () => {
		this.setState({ isLoading: true })
		this.messages();
		let imagesUploaded = [];


		// Condição para saber se o veiculo pode ser gravado no banco
		if (!this.messages()) {
			if (Array.isArray(this.props.images) && this.props.images.length)
				imagesUploaded = await this.props.uploadImages(this.props.vehicle['id'], this.props.images);

			let timeVehicle = this.props.isEdit ? this.props.vehicle['entryDate'] : this.state.time;

			this.props.setAllImages(imagesUploaded);

			if (this.props.vehicle['status']) {
				let departureDate = this.time.dateHourToString();
				this.props.setField('departureDate', departureDate);
				this.props.vehicle['departureDate'] = departureDate;
			}

			this.props.setField('entryDate', timeVehicle);
			this.props.vehicle['entryDate'] = timeVehicle;

			this.props.setField('images', imagesUploaded);
			this.props.vehicle['images'] = [...imagesUploaded];

			this.props.saveVehicle(this.props.vehicle).then(() => {
				this.props.navigation && this.props.navigation.pop();
				this.props.resetForm();
				this.props.resetImages();
			}).catch((error) => {
				Alert.alert('Erro ao salvar', error);
			});
			this.setState({ isLoading: false });
		} else {
			this.setState({ isLoading: false })
			Alert.alert(strings.TITLE_ERRO_DETAIL_MESSAGE, this.messages())
		}

	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
				<View style={[styles.formDetails, styles.form, { flexDirection: 'column' }]}>
					<View style={{ height: '40%' }}>
						<MyImagesSlider />
					</View>
					<View style={[styles.inputContainer]}>
						<MyInput
							style={styles.propsStyle}
							label={strings.LICENSE_PLATE_LABEL}
							placeholder={strings.LICENSE_PLATE_PLACEHOLDER}
							errorMessage={this.state.errorMessageEmail}
							autoCapitalize='characters'
							onChangeText={itemValue => this.props.setField('plate', itemValue)}
							value={this.props.vehicle['plate']}
						/>

						<MyInput
							style={styles.propsStyle}
							label={strings.MODEL_LABEL}
							placeholder={strings.MODEL_PLACEHOLDER}
							errorMessage={this.state.errorMessageEmail}
							autoCapitalize='characters'
							onChangeText={itemValue => this.props.setField('model', itemValue)}
							value={this.props.vehicle['model']}
						/>

						<MyPicker
							styles={styles.propsStyle}
							key='picker_type'
							label={strings.TYPE_LABEL}
							data={dataType}
							mode='dialog'
							selectedValue={this.props.vehicle['type']}
							onValueChange={(itemValue) => this.props.setField('type', itemValue)}
						/>

						<MyPicker
							styles={styles.propsStyle}
							key='picker_color'
							label={strings.COLOR_LABEL}
							data={dataColor}
							mode='dialog'
							selectedValue={this.props.vehicle['color']}
							onValueChange={(itemValue) => this.props.setField('color', itemValue)}
						/>
						<MyInput
							style={{ width: '100%' }}
							containerStyle={{ marginVertical: 10 }}
							inputContainerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
							label={strings.ENTRY_DATE}
							editable={false}
							value={this.props.isEdit ?
								this.props.vehicle['entryDate'] :
								this.state.time}
							inputStyle={{ textAlign: 'center' }} />
					</View>
				</View>
				<View style={[styles.buttonContainer, { flexDirection: 'row' }]}>
					<MyButton
						title={this.props.vehicle['status'] ? strings.CONCLUDE : strings.SAVE}
						loading={this.state.isLoading}
						disabled={this.state.isLoading}
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

const mapStateToProps = ({ vehicle, images }) => {
	return { ...vehicle, vehicle: vehicle['vehicle'], images: images['images'] };
}

const mapDispatchToProps = {
	setField,
	saveVehicle,
	setAllFields,
	resetForm,
	selectPhotoTapped,
	uploadImages,
	setAllImages,
	resetImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
