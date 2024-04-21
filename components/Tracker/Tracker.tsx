import { View } from "react-native"
import styles from "./tracker.style"
import CustomText from "../CustomText";
import React from "react";
import { COLORS, SIZE } from "../../constants";
import { TimeType } from "../../types/time";

interface TrackerProps {
    name: string,
    lastTimeSeen: TimeType | string,
    location:  string,
    distance: number,
}

const Tracker: React.FC<TrackerProps> = ({ name, lastTimeSeen, location, distance }) => {
    let formattedTime = '';
    let distanceText = '';
    let distanceTextColor = COLORS.text;
    if (typeof lastTimeSeen === 'object') {
        formattedTime = `${lastTimeSeen.hours}:${lastTimeSeen.minutes} · ${lastTimeSeen.day}.${lastTimeSeen.month}.${lastTimeSeen.year}`;
    } 
    else {
        formattedTime = lastTimeSeen;
    }

    if (distance < 50) {
        distanceText = 'With you';
        distanceTextColor = COLORS.accent;
    }
    else if (distance < 1000) {
        distanceText = `${distance.toFixed(0)}m`;
    } 
    else {
        distanceText = `${(distance / 1000).toFixed(1)}km`;
    }

    return (
        <View style={styles.tracker}>
            <View style={styles.trackerInfo}>
                <CustomText bold size={SIZE.large}>{name}</CustomText>
                <View style={{flexDirection: 'row'}}>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{formattedTime}</CustomText>
                    <CustomText color={COLORS.secondary} size={SIZE.xSmall}>{location}</CustomText>
                </View>
            </View>
            <CustomText style={{color: distanceTextColor }}>{distanceText}</CustomText>
        </View>
    )
} 

export default Tracker;