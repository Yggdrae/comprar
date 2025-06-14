import { FilterStatus } from "@/types/FilterStatus";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { StatusIcon } from "./StatusIcon";


interface FilterProps extends TouchableOpacityProps {
    status: FilterStatus;
    isActive: boolean;
}

export default function Filter({ status, isActive, ...rest }: FilterProps) {
    return (
        <TouchableOpacity style={[style.container, { opacity: isActive ? 1 : 0.5}]} {...rest}>
            <StatusIcon status={status} />
            <Text style={style.title}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    },
    title: {
        fontSize: 12,
        fontWeight: "600",
    }
})