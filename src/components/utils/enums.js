function EnumList(...list) {
	let obj = Object.create(null);
    let i = list.length;
    let key;
	
	while (i-- > 0) {
        key = list[i].replace(/[^\w\d_$]/, '');
        Object.defineProperty(obj, key, {value: i + 1, writable: false});
        Object.defineProperty(obj, i + 1, {value: list[i], writable: false});
    }
    obj._keys = list;
	return obj;
} 

export default EnumList;