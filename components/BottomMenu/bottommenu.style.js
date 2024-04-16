import { StyleSheet } from "react-native";
import { COLORS, Z_INDEX } from "../../constants";

const styles = StyleSheet.create({
    bottomMenu: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        zIndex: Z_INDEX.content_1,
    },
    bottomMenuPage: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
    profileForm : {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        maxWidth: 300,
    },
    profileFormButton : {
        marginTop: 15,
        backgroundColor: COLORS.accent,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        cursor: 'pointer'
    }
})

export default styles;