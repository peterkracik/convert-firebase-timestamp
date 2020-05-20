# Convert firebase timestamps

Script that converts firebase timestamp values to the JS date format

* converts each timestamp within a document (object), also inside its maps and array
* converts single value
* possible to call in rxjs pipe

## update document

**document**

```typescript
 return this.db.collection('my-collection').doc(id).snapshotChanges().pipe(
    map(doc => convertTimestamps(doc.payload.data())
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
! don't call it before map, the original document is too large to be convert and it will throw recursion exception

```typescript
return this.db.collection('my-collection').doc(id)
  .snapshotChanges().pipe(
        map(doc => doc.payload.data()),
        convertAllTimestamps(),
    );
)
```