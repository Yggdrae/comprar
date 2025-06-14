import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input({...rest}: TextInputProps) {
    return (
        <TextInput style={style.container} placeholderTextColor="#74798B" {...rest} />
    )
}

const style = StyleSheet.create({
    container: {
        height: 48,
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#C3C5CB",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
        justifyContent: "center",
    }
})