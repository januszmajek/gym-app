import { Text, View } from 'react-native';
import { Button, Switch } from "react-native-paper";


const HomeScreen = () => {
    // const theme = useTheme();

    return (
        <View style={{marginTop: 500}}>
            <Text>Home Screen</Text>
            <View>
                <Button>Essa</Button>
                <Switch />
            </View>
        </View>

    );
};
export default HomeScreen;