import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

/**
 * rxjs pipe to convert timestamps
 */
export function convertTimestampsPipe<T>(): OperatorFunction<T, WithTimestampsAsDates<T>> {
	return input$ => input$.pipe(
		map( (val:any) => convertTimestamps(val) )
	);
}

/**
 * convert any timestamp properties to js date format
 * @param firebaseObject
 */
export function convertTimestamps<T>(firebaseObject: T): WithTimestampsAsDates<T> {
	if (!firebaseObject) return firebaseObject as WithTimestampsAsDates<T>;
	// if (typeof firebaseObject === 'undefined') return firebaseObject;

	// if an array was passed
	if (Array.isArray(firebaseObject)) {
		return firebaseObject.map((item) => convertTimestamps(item)) as WithTimestampsAsDates<T>
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
	return firebaseObject as WithTimestampsAsDates<T>;
};

/**
 * convert any value
 * @param value
 */
export function convertTimestamp<T extends object>(value: T): WithTimestampsAsDates<T> {
	if (value === null || typeof value === 'undefined') return value;

	if (isTimestamp(value)) {
		try {
			return value.toDate() as WithTimestampsAsDates<T>;
		} catch {
			return value as WithTimestampsAsDates<T>;
		}
	}

	return value as WithTimestampsAsDates<T>;
}

/**
 * verify if value is timestamp
 * @param value
 */
function isTimestamp(value: any): value is Timestamp {
	if (value?.hasOwnProperty('seconds') &&
		value?.hasOwnProperty('nanoseconds') &&
		typeof value?.toDate === 'function'
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

type WithTimestampsAsDates<T> = DeepReplace<T, [Timestamp, Date]>;

/**
 * replace occurrences of `M[x][0]` in `T` with `M[x][1]` recursively
 * @example
 * ```
 * const u: DeepReplace<
 *   {
 *     a: {
 *       b: [Timestamp];
 *       c: string;
 *     };
 *     x: Timestamp;
 *   },
 *   [Timestamp, Date]
 * > = {
 *   a: {
 *     b: [new Date()],
 *     c: "...",
 *   },
 *   x: new Date(),
 * };
 * ```
 * @note https://stackoverflow.com/a/60437613
 */
type DeepReplace<T, M extends [any, any]> = {
  [P in keyof T]: T[P] extends M[0]
    ? Replacement<M, T[P]>
    : T[P] extends object
    ? DeepReplace<T[P], M>
    : T[P];
};

type Replacement<M extends [any, any], T> = M extends any
  ? [T] extends [M[0]]
    ? M[1]
    : never
  : never;
