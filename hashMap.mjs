import { linkedList, node } from "./linkedList.mjs";

function hashMap() {
	return {
		buckets: new Array(16).fill(null),

		hash(key) {
			let hashCode = 0;

			const primeNumber = 31;
			for (let i = 0; i < key.length; i++) {
				hashCode = primeNumber * hashCode + key.charCodeAt(i);
			}
			return hashCode;
		},

		set(key, value) {
            let hash = this.hash(key);
			let place = hash % this.buckets.length;
            
			if (this.buckets[place] === null) {
                this.buckets[place] = linkedList(hash, value, null);
			} else {
                if (this.buckets[place].containsKey(hash)) {
                    let index = this.buckets[place].findKey(hash);
                    if (this.buckets[place].size()===1){
                        this.buckets.splice(place,1,null);
                        this.buckets[place] = linkedList(hash, value, null);
                    }else{
                        this.buckets[place].removeAt(index);
                        this.buckets[place].insertAt(hash, value, index);}
                    } else {
                        this.buckets[place].append(hash, value);
                    }
                }
                const load_factor = 0.75;
                if (
                     (this.values().length/this.buckets.length) > load_factor) {
                        this.reHashAll();
                }
		},
		reHashAll() {
			const data = this.entries();
			this.clear();
            let len = this.buckets.length;
            this.buckets = new Array(len*2).fill(null);
			data.forEach((element) => {
                let newPlace = element[0]%this.buckets.length;
                this.buckets[newPlace] = linkedList(element[0], element[1], null);
			});
		},
		get(key) {
			let hash = this.hash(key);
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					if (this.buckets[i].containsKey(hash)) {
						let index = this.buckets[i].findKey(hash);
						return this.buckets[i].at(index);
					} else {
						return null;
					}
				}
			}
		},
		has(key) {
			let hash = this.hash(key);
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					if (this.buckets[i].containsKey(hash)) {
						return true;
					} else {
						return null;
					}
				}
			}
		},
		remove(key) {
			let hash = this.hash(key);
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					if (this.buckets[i].containsKey(hash)) {
						let index = this.buckets[i].findKey(hash);
						this.buckets[i].removeAt(index);
						return true;
					} else {
						return null;
					}
				}
			}
		},
		clear() {
			for (let i = 0; i < this.buckets.length; i++) {
				this.buckets[i] = null;
			}
		},
		keys() {
			let arr = [];
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					let tmp = node(
						this.buckets[i].key,
						this.buckets[i].value,
						this.buckets[i].next
					);
					while (tmp) {
						arr.push(tmp.key);
						tmp = tmp.next;
					}
				}
			}
			return arr;
		},
		values() {
			let arr = [];
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					let tmp = node(
						this.buckets[i].key,
						this.buckets[i].value,
						this.buckets[i].next
					);
					while (tmp) {
						arr.push(tmp.value);
						tmp = tmp.next;
					}
				}
			}
			return arr;
		},
		entries() {
			let arr = [];
			for (let i = 0; i < this.buckets.length; i++) {
				if (this.buckets[i]) {
					let tmp = node(
						this.buckets[i].key,
						this.buckets[i].value,
						this.buckets[i].next
					);
					while (tmp) {
						arr.push([tmp.key, tmp.value]);
						tmp = tmp.next;
					}
				}
			}
			return arr;
		},
	};
}

