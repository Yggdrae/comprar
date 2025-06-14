import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function Button({title, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={style.container} {...rest}>
            <Text style={style.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        backgroundColor: "#2C48B1",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
        color: "#FFF",
        fontWeight: "600",
    }
})