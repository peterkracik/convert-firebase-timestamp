'use strict';

import { expect, assert } from 'chai';
import { convertTimestamps, convertAllTimestamps, convertValue } from '../dist/index';
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
			convertAllTimestamps()
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
			convertAllTimestamps()
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

		const returnValue: any = convertValue(param);
		assert.typeOf(returnValue, 'string', 'is type date');
		expect(returnValue).to.equal(d, 'Check date value');
	});

	it('should work for any other value', () => {
		const param = { val: 'test'};

		const returnValue: any = convertValue(param);
		assert.typeOf(returnValue, 'object', 'is object date');
		expect(returnValue.val).to.equal(param.val, 'Check date value');
	});
});
