import { map } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';

/**
 * rxjs pipe to convert timestamps
 */
export function convertTimestampsPipe<T>(): MonoTypeOperatorFunction<T> {
	return input$ => input$.pipe(
		map( (val:any) => convertTimestamps(val) )
	);
}

/**
 * convert any timestamp properties to js date format
 * @param firebaseObject
 */
export function convertTimestamps<T>(firebaseObject: T|T[]): T|T[] {
	if (!firebaseObject) return firebaseObject;
	// if (typeof firebaseObject === 'undefined') return firebaseObject;

	// if an array was passed
	if (Array.isArray(firebaseObject)) {
		return firebaseObject.map((item: any) => convertTimestamps(item))
	}

	// if its a map (object)
	if (firebaseObject instanceof Object) {

		// iterate object properties
		for (const [key, value] of Object.entries(firebaseObject)) {

			// convert simple properties
			if (value && isTimestamp(value)) {
				firebaseObject = {
					...firebaseObject,
					[key]: convertTimestamp(value)
				};
				continue;
			}

			// recursively convert items inside array
			if (value && Array.isArray(value)) {
				firebaseObject = {
					...firebaseObject,
					[key]: value.map(item => isTimestamp(item) ? convertTimestamp(item) : convertTimestamps(item))
				};
				continue;
			}

			// recursively convert inner objects (maps)
			if (value && typeof value === 'object') {
				firebaseObject = {
					...firebaseObject,
					[key]: convertTimestamps(value)
				}
				continue;
			}

		}
	}
	return firebaseObject;
};

/**
 * convert any value
 * @param value
 */
export function convertTimestamp<T extends object>(value: T): T | Date {
	if (value === null || typeof value === 'undefined') return value;

	if (isTimestamp(value)) {
		try {
			return (value as Timestamp).toDate();
		} catch {
			return value;
		}
	}

	return value;
}

/**
 * verify if value is timestamp
 * @param value
 */
function isTimestamp(value: any): boolean {
	if (value.hasOwnProperty('seconds') &&
		value.hasOwnProperty('nanoseconds') &&
		typeof value.toDate === 'function'
	) {
		return true;
	}

	return false
}

/**
 * helper
 */
interface Timestamp {
	toDate(): Date;
}
