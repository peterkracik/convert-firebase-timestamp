'use strict';

import { expect, assert } from 'chai';
import { convertTimestamps, convertTimestampsPipe, convertTimestamp, WithTimestampsAsDates, Timestamp } from '../dist/index';
import { of } from 'rxjs';

describe('ConvertTimeStamp class', () => {
	it('should return string', () => {
		const param: string = 'This is my param.';
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'string', 'is string');
		expect(returnValue).to.equal(param, 'returns the value passed as a parameter');
	});
	it('should return null', () => {
		const param = null;
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'null', 'is string');
		expect(returnValue).to.equal(param, 'returns the value passed as a parameter');
	});
	it('should return undefined', () => {
		const param = undefined;
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'undefined', 'is string');
		expect(returnValue).to.equal(param, 'returns the value passed as a parameter');
	});
	it('should return Date', () => {
		const d = Date();
		const param = { seconds: 1589952118, nanoseconds: 12345, toDate: () => d };
		const returnValue: any = convertTimestamps(param);
		expect(returnValue).to.equal(d, 'Check return value');
	});
	it('should return array', () => {
		const d = Date();
		const param = [
			{
				id: 'my id 1',
				currentDateProperty: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
			},
			{
				id: 'my id 2',
				currentDateProperty: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
			},
		];
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'array', 'is type date');
		expect(returnValue[0].id).to.equal(param[0].id, 'Check id value');
		expect(returnValue[1].id).to.equal(param[1].id, 'Check id value');
		assert.typeOf(returnValue[0].currentDateProperty, 'string', 'is type date');
		assert.typeOf(returnValue[1].currentDateProperty, 'string', 'is type date');
		expect(returnValue[0].currentDateProperty).to.equal(d, 'Check id value');
		expect(returnValue[1].currentDateProperty).to.equal(d, 'Check id value');
	});
	it('should return array', () => {
		const d = Date();
		const param = [
			{
				id: 'my id 1',
				dates: {
					date_one: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
					date_two: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
				}
			}
		];
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'array', 'is type date');
		expect(returnValue[0].id).to.equal(param[0].id, 'Check id value');
		assert.typeOf(returnValue[0].dates.date_one, 'string', 'is type date');
		assert.typeOf(returnValue[0].dates.date_two, 'string', 'is type date');
		expect(returnValue[0].dates.date_one).to.equal(d, 'Check id value');
		expect(returnValue[0].dates.date_two).to.equal(d, 'Check id value');
	});
	it('should return multpiple', () => {
		const d = Date();
		const param = {
			id: 'my id 1',
			date_one: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
			date_two: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
		};
		const returnValue: any = convertTimestamps(param);
		expect(returnValue.id).to.equal(param.id, 'Check id value');
		assert.typeOf(returnValue.date_one, 'string', 'is type date');
		assert.typeOf(returnValue.date_two, 'string', 'is type date');
		expect(returnValue.date_one).to.equal(d, 'Check id value');
		expect(returnValue.date_two).to.equal(d, 'Check id value');
	});
	it('should return inner array', () => {
		const d = Date();
		const param = [
			{
				id: 'my id 1',
				dates: [
					{ seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
					{ seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
				]
			}
		];
		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'array', 'is type date');
		expect(returnValue[0].id).to.equal(param[0].id, 'Check id value');
		assert.typeOf(returnValue[0].dates[0], 'string', 'is type date');
		assert.typeOf(returnValue[0].dates[1], 'string', 'is type date');
		expect(returnValue[0].dates[0]).to.equal(d, 'Check id value');
		expect(returnValue[0].dates[1]).to.equal(d, 'Check id value');
	});
	it('should convert currentDateProperty', () => {
		const d = Date();
		const param = {
			id: 'my id',
			currentDateProperty: {seconds: 1589952118, nanoseconds: 12345, toDate: () => d }
		};
		const returnValue: any = convertTimestamps(param);
		expect(returnValue.id).to.equal(param.id, 'Check id value');
		assert.typeOf(returnValue.currentDateProperty, 'string', 'is type date');
		expect(returnValue.currentDateProperty).to.equal(d, 'Check id value');
	});
	it('should work in pipe', () => {
		const d = Date();
		const param = {
			id: 'my id',
			currentDateProperty: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
			someOtherDate: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
		};

		of(param).pipe(
			convertTimestampsPipe()
		).subscribe((returnValue:any) => {
			expect(returnValue.id).to.equal(param.id, 'Check id value');
			assert.typeOf(returnValue.currentDateProperty, 'string', 'is type date');
			expect(returnValue.currentDateProperty).to.equal(d, 'Check id value');
			assert.typeOf(returnValue.someOtherDate, 'string', 'is type date');
			expect(returnValue.someOtherDate).to.equal(d, 'Check id value');
		});

	});
	it('array should work in pipe', () => {
		const d = Date();
		const param = [
			{
				id: 'my id',
				currentDateProperty: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
				someOtherDate: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
			},
			{
				id: 'my id',
				currentDateProperty: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
				someOtherDate: { seconds: 1589952118, nanoseconds: 12345, toDate: () => d },
			}
		];

		of(param).pipe(
			convertTimestampsPipe()
		).subscribe((returnValue:any) => {
			expect(returnValue[0].id).to.equal(param[0].id, 'Check id value');
			expect(returnValue[1].id).to.equal(param[1].id, 'Check id value');
			assert.typeOf(returnValue[0].currentDateProperty, 'string', 'is type date');
			assert.typeOf(returnValue[1].currentDateProperty, 'string', 'is type date');
			expect(returnValue[0].currentDateProperty).to.equal(d, 'Check id value');
			expect(returnValue[1].currentDateProperty).to.equal(d, 'Check id value');
			assert.typeOf(returnValue[0].someOtherDate, 'string', 'is type date');
			assert.typeOf(returnValue[1].someOtherDate, 'string', 'is type date');
			expect(returnValue[0].someOtherDate).to.equal(d, 'Check id value');
			expect(returnValue[1].someOtherDate).to.equal(d, 'Check id value');
		});
	});

	it('should work for timestamp value', () => {
		const d = Date();
		const param = { seconds: 1589952118, nanoseconds: 12345, toDate: () => d };

		const returnValue: any = convertTimestamp(param);
		assert.typeOf(returnValue, 'string', 'is type date');
		expect(returnValue).to.equal(d, 'Check date value');
	});

	it('should work for any other value', () => {
		const param = { val: 'test'};

		const returnValue: any = convertTimestamp(param);
		assert.typeOf(returnValue, 'object', 'is object date');
		expect(returnValue.val).to.equal(param.val, 'Check date value');
	});

	it('should work for any other value', () => {
		const d = Date();
		const param = {
			'date': {
				'seconds': 1588284000,
				'nanoseconds': 0,
				toDate: () => d
			},
			'days': [
				{
					'date': {
						'seconds': 1588284000,
						'nanoseconds': 0,
						toDate: () => d
					},
					'from': {
						'seconds': 1588312800,
						'nanoseconds': 0,
						toDate: () => d
					},
					'to': {
						'seconds': 1588341600,
						'nanoseconds': 0,
						toDate: () => d
					},
					'note': '',
					'lunch': true
				},
				{
					'date': {
						'seconds': 1588543200,
						'nanoseconds': 0,
						toDate: () => d
					},
					'from': {
						'seconds': 1588572000,
						'nanoseconds': 0,
						toDate: () => d
					},
					'to': {
						'seconds': 1588600800,
						'nanoseconds': 0,
						toDate: () => d
					},
					'note': '',
					'lunch': true,
					toDate: () => d
				}
			]
		};

		const returnValue: any = convertTimestamps(param);
		assert.typeOf(returnValue, 'object', 'is object date');
		expect(returnValue.date).to.equal(d, 'Check date value');
		expect(returnValue.days[0].to).to.equal(d, 'Check date value');
		expect(returnValue.days[0].from).to.equal(d, 'Check date value');
		expect(returnValue.days[1].to).to.equal(d, 'Check date value');
		expect(returnValue.days[1].from).to.equal(d, 'Check date value');
	});
});

describe('TypeScript Mapping', () => {
	it('should accept Dates in place of Timestamps', () => {
		const inObject: WithTimestampsAsDates<{ a: Timestamp }> = { a: new Date() };
		const inArray: WithTimestampsAsDates<Timestamp[]> = [
			new Date(),
			new Date(),
		];
		const inTupel: WithTimestampsAsDates<[Timestamp, symbol, Timestamp]> = [
			new Date(),
			Symbol.for('example'),
			new Date(),
		];
		const asNull: WithTimestampsAsDates<null> = null;
		const asUndefined: WithTimestampsAsDates<undefined> = undefined;
		const asSelf: WithTimestampsAsDates<Timestamp> = new Date();
		const nested: WithTimestampsAsDates<{
			a: {
				b: Timestamp[];
				c: string;
			};
			x: Timestamp;
		}> = {
			a: {
				b: [new Date()],
				c: '...',
			},
			x: new Date(),
		};

		// simply make sure TypeScript acceps the above - no assertions necessary.
		expect([
			inObject,
			inArray,
			inTupel,
			asNull,
			asUndefined,
			asSelf,
			nested
		])
	});
});
