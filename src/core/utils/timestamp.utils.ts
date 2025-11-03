/*Return current unix timestamp */
const unix_ts_now = () => {
	return Math.floor(+new Date(new Date().toLocaleString('fr-CA', { dateStyle: 'short' })) / 1000);
};

const unix_ts_now_time = () => {
	return Math.floor(+new Date() / 1000);
};

const unix_ts_end = () => {
	return Math.floor(+new Date('2200-01-01 00:00:00') / 1000);
};

const convert_date_unix_ts = (date: Date) => {
	return Math.floor(+new Date(date) / 1000);
};

const mongo_ts_opts = {
	toObject: { virtuals: true },
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', currentTime: () => unix_ts_now_time() }
};
const isQuarterlyMonth = (date = new Date()) => {
	const month = date.getMonth(); // 0 = Jan, ..., 11 = Dec
	const quarterlyStartMonths = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct
	if (quarterlyStartMonths.includes(month)) return 3;
	const nextQuarterMonth = quarterlyStartMonths.find((qm) => qm > month);
	const monthsRemaining = nextQuarterMonth !== undefined ? nextQuarterMonth - month : 12 - month;
	return monthsRemaining;
};

const quarterlyMonth = (date = new Date()) => {
	const month = date.getMonth(); // 0 = Jan, ..., 11 = Dec
	const quarterlyStartMonths = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct
	const quarterStart = quarterlyStartMonths.reduce((prev, curr) => (month >= curr ? curr : prev), 0);
	if (month === quarterStart) return 0;
	return quarterStart + 3 - month;
};

// Format date as YYYY-MM-DD manually, then append time from toLocaleTimeString
const formatDateTime = (timestamp: number): string => {
	const d = new Date(timestamp * 1000);
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	const time = d.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	});
	return `${yyyy}-${mm}-${dd}, ${time}`;
};

const formatDateLocal = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const formatDateToDDMMYYYY = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${day}-${month}-${year}`;
};

function formatTimeToNA(time: string | null | undefined): string {
	if (!time || !time.includes(':')) {
		return 'NA';
	}

	const [hours, minutes] = time.split(':').map((num) => Number(num) || 0);

	if (hours === 0 && minutes === 0) {
		return 'NA';
	}

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function minutesToHHMM(minutes: number): string {
	// Handle no data case
	if (!minutes || isNaN(minutes)) return '00:00';
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

const formatToLongDateWithSuffix = (dateInput?: Date | string): string => {
	const date = dateInput ? new Date(dateInput) : new Date();

	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	const daySuffix = day % 10 === 1 && day !== 11 ? 'ˢᵗ' : day % 10 === 2 && day !== 12 ? 'ⁿᵈ' : day % 10 === 3 && day !== 13 ? 'ʳᵈ' : 'ᵗʰ';

	return `${day}${daySuffix} ${month} ${year}`;
};
const formatToLongDateWithSuffixDate = (dateInput?: Date | string): string => {
	let date: Date;

	if (typeof dateInput === 'string') {
		const [day, month, year] = dateInput.split('-').map(Number);
		date = new Date(year, month - 1, day); // month is 0-based
	} else {
		date = dateInput ? new Date(dateInput) : new Date();
	}

	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	const daySuffix = day % 10 === 1 && day !== 11 ? 'ˢᵗ' : day % 10 === 2 && day !== 12 ? 'ⁿᵈ' : day % 10 === 3 && day !== 13 ? 'ʳᵈ' : 'ᵗʰ';

	return `${day}${daySuffix} ${month} ${year}`;
};

const formatMonthRangeFromISOString = (isoDate?: any): string => {
	const date = new Date(isoDate);

	const monthName = date.toLocaleString('default', { month: 'long' }); // e.g., July
	const shortYear = date.getFullYear().toString(); // e.g., "25"

	const startDay = '01';
	const day = date.getDate();
	const endDay = day < 10 ? '0' + day : day.toString();

	return `${monthName}-${shortYear} (Day ${startDay} to ${endDay})`;
};

const formatMonthRangeFromISOStringDate = (startIso: string, endIso: string): string => {
	const parseDate = (iso: string) => {
		const [day, month, year] = iso.split('-').map(Number);
		return new Date(year, month - 1, day);
	};

	const suffix = (d: number): string => {
		if (d % 100 >= 11 && d % 100 <= 13) return 'th';
		switch (d % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};

	const formatWithSuffix = (date: Date): string => {
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();
		return `${month} ${day}${suffix(day)} ${year}`;
	};

	const startDate = parseDate(startIso);
	const endDate = parseDate(endIso);

	if (startDate.getTime() === endDate.getTime()) {
		// Same day
		return formatWithSuffix(startDate);
	}

	if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
		// Same month + year → include suffixes
		const month = startDate.toLocaleString('default', { month: 'long' });
		const year = startDate.getFullYear();
		const startDay = startDate.getDate();
		const endDay = endDate.getDate();
		return `${month} ${startDay}${suffix(startDay)} - ${endDay}${suffix(endDay)} ${year}`;
	}

	// Different months or years
	return `${formatWithSuffix(startDate)} - ${formatWithSuffix(endDate)}`;
};

function isWeekend(timestamp: number): boolean {
	const date = new Date(timestamp * 1000); // convert seconds → ms
	const day = date.getDay();
	return day === 0 || day === 6;
}

function toISTMidnightEpoch(date: Date): number {
	// clone to avoid mutation
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);

	// getTime() gives UTC timestamp, adjust back to IST
	const offsetSeconds = d.getTimezoneOffset() * 60;
	return Math.floor(d.getTime() / 1000) - offsetSeconds;
}
function getISTMidnight(date: Date): Date {
	const d = new Date(date);
	// shift to IST
	const istOffset = 5.5 * 60; // IST offset in minutes
	const utc = d.getTime() + d.getTimezoneOffset() * 60000;
	const ist = new Date(utc + istOffset * 60000);
	// set midnight IST
	ist.setHours(0, 0, 0, 0);
	return ist;
}

export {
	unix_ts_now,
	unix_ts_now_time,
	unix_ts_end,
	convert_date_unix_ts,
	mongo_ts_opts,
	quarterlyMonth,
	isQuarterlyMonth,
	formatDateTime,
	formatDateLocal,
	formatToLongDateWithSuffix,
	formatDateToDDMMYYYY,
	formatMonthRangeFromISOString,
	isWeekend,
	formatTimeToNA,
	minutesToHHMM,
	formatToLongDateWithSuffixDate,
	formatMonthRangeFromISOStringDate,
	toISTMidnightEpoch,
	getISTMidnight
};
