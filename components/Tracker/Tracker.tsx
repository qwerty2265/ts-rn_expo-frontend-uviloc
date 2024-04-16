import { View } from "react-native"
import styles from "./tracker.style"
import CustomText from "../CustomText";
import React from "react";
import { COLORS, SIZE } from "../../constants";

interface TrackerProps {
    name: string,
    lastTimeSeen: string,
    location: string,
    distance: string,
}

const Tracker: React.FC<TrackerProps> = ({ name, lastTimeSeen, location, distance }) => {
    return (
        <View style={styles.tracker}>
            <View style={styles.trackerInfo}>
                <CustomText bold size={SIZE.large}>{name}</CustomText>
                <View style={{flexDirection: 'row'}}>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{lastTimeSeen}</CustomText>
                    <CustomText bold color={COLORS.text} size={SIZE.xSmall}> · </CustomText>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{location}</CustomText>
                </View>
            </View>
            <CustomText>{distance}</CustomText>
        </View>
    )
}

export default Tracker;