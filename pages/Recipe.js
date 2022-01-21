import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button,Text, View } from 'react-native';
import NavBar from '../components/NavBar'


const Recipe = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <NavBar navigation={navigation}/>

        <StatusBar style="auto" />

      </View>
  
    );
  };

  export default Recipe;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });