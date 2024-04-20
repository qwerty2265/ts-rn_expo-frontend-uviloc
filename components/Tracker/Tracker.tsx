import { View } from "react-native"
import styles from "./tracker.style"
import CustomText from "../CustomText";
import React from "react";
import { COLORS, SIZE } from "../../constants";
import { TimeType } from "../../types/time";

interface TrackerProps {
    name: string,
    lastTimeSeen: TimeType,
    location: string,
    distance: string,
}

const Tracker: React.FC<TrackerProps> = ({ name, lastTimeSeen, location, distance }) => {
    const formattedTime = `${lastTimeSeen.hours}:${lastTimeSeen.minutes} · ${lastTimeSeen.day}.${lastTimeSeen.month}.${lastTimeSeen.year}`;

    return (
        <View style={styles.tracker}>
            <View style={styles.trackerInfo}>
                <CustomText bold size={SIZE.large}>{name}</CustomText>
                <View style={{flexDirection: 'row'}}>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{formattedTime}</CustomText>
                </View>
            </View>
            <CustomText>{distance}</CustomText>
        </View>
    )
}

export default Tracker;