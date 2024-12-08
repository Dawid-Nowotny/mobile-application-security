import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs initialRouteName="index">
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Contacts',
                    tabBarIcon: () => <MaterialIcons name="contacts" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="CameraScreen"
                options={{
                    title: 'Camera',
                    tabBarIcon: () => <MaterialIcons name="camera-alt" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="LocationScreen"
                options={{
                    title: 'LocationScreen',
                    tabBarIcon: () => <MaterialIcons name="location-on" size={24} color="black" />,
                }}
            />
        </Tabs>
    )
}