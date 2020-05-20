# Convert firebase timestamps

Script that converts firebase timestamp values to the JS date format

* converts each timestamp within a document (object), also inside its maps and array
* converts single value
* possible to call in rxjs pipe

## update document


**document**
```typescript
 return this.db.collection('my-collection').doc(id).snapshotChanges().pipe(
    map(doc => convertTimestamps(doc.payload)
)
```
**single value**
```typescript
return this.db.collection('my-collection').doc(id).snapshotChanges().pipe(
    map(doc => {
		const data = doc.payload.data();
		data.date = convertValue(data.date);
		return data;
	})
)
```
**in pipe**
```typescript
return this.db.collection('my-collection').doc(id).snapshotChanges().pipe(
	convertAllTimestamps()
    map(doc => {
		...
		return data;
	})
)
```