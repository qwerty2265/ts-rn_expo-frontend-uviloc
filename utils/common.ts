import { TimeType } from "../types/time";

const generateRandomString = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      	result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const convertUTCToLocalTime = (utcDateString: string): TimeType => {
    const date = new Date(utcDateString);
    const timezoneOffset = date.getTimezoneOffset() / 60; 
    const localDate = new Date(date.getTime() + timezoneOffset);

    const time: TimeType = {
        hours: localDate.getHours().toString().padStart(2, '0'),
        minutes: localDate.getMinutes().toString().padStart(2, '0'),
        day: localDate.getDate().toString().padStart(2, '0'),
        month: (localDate.getMonth() + 1).toString().padStart(2, '0'),
        year: localDate.getFullYear().toString()
    };

    return time;
};

export { generateRandomString, convertUTCToLocalTime };