import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button,Text, View } from 'react-native';

const Category = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
  
  
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
        
      />
      </View>
  
    );
  };

  export default Category;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });