import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { styles } from '../config/styles';

export default function MySearchBar(props) {
  return (
    <SearchBar
      {...props}
    />
  );
}
