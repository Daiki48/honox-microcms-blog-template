import { formatInTimeZone } from 'date-fns-tz';

export const jstFromUtcDateTime = (utc: string) => {
	return formatInTimeZone(utc, 'Asia/Tokyo', 'yyyy年MM月dd日 HH時mm分ss秒');
};

export const jstFromUtcDate = (utc: string) => {
	return formatInTimeZone(utc, 'Asia/Tokyo', 'yyyy年MM月dd日');
};
