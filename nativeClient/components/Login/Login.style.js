import {StyleSheet, TextInput, Text } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    form: {
        flex: 2,
        alignItems: 'center',
    },
    formInput: {
        textAlign: "center",
        alignSelf: 'stretch',
        color: '#eeeee4',
    },
    title: {
        flex: 1,
        fontSize: 32,
        fontWeight: '700',
        color: '#eeeee4',
        marginTop: 64,
    },
    txt: {
        color: '#444441',
        fontWeight: '700',
    },
    btn: {
        borderRadius: 8,
        height: 35,
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#eeeee4",
    }
});