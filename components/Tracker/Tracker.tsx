import { View } from "react-native"
import styles from "./tracker.style"
import CustomText from "../CustomText";
import React from "react";
import { COLORS, SIZE } from "../../constants";
import { TimeType } from "../../types/time";

interface TrackerProps {
    name: string,
    lastTimeSeen: TimeType | string,
    location: string,
    distance: string,
}

const Tracker: React.FC<TrackerProps> = ({ name, lastTimeSeen, location, distance }) => {
    let formattedTime = '';
    if (typeof lastTimeSeen === 'object') {
        formattedTime = `${lastTimeSeen.hours}:${lastTimeSeen.minutes} · ${lastTimeSeen.day}.${lastTimeSeen.month}.${lastTimeSeen.year}`;
    } 
    else {
        formattedTime = lastTimeSeen;
    }

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