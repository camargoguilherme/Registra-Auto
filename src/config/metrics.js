import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window');

const multipleContent= 0.065
const multipleContainer= 0.08

const metrics = {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  CONTAINER_INPUT: height * multipleContainer,
  CONTAINER_INPUT: height * multipleContainer,
  INPUT_HEIGHT: height * multipleContent,
  BUTTON_HEIGHT: height * multipleContent
};

export default metrics;