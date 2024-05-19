function linkedList (key,next) {return {
    key : key,
    next: next,


    append(key) {
        if(this.next === null) {
            this.next = (node(key,null))
        }
        else if(this === null) {
             this.key = key;
             this.next = null;
        }
        else {
        let tmp = this.next;
        while(tmp.next){
            tmp = tmp.next;
        }
        if(tmp.next ===null) {
            tmp.next =(node(key,null))
        }}
    },

    prepend(key) {
        let tmp = this.next;
        this.next = node(this.key,tmp);

    },
    
    size(){
        if (this.key === null) {
            return 0 
        }
        else {
            let counter = 1;
            let tmp = this;
            while(tmp.next){
                tmp = tmp.next;
                counter++;
            }
            return counter
        }
    },

    head(){
        return this.key
    },

    tail(){
        if(this.next === null) {
            return this.key;
        }
        let tmp = this.next;
        while(tmp.next) {
            tmp = tmp.next;
        }
        return tmp.key
    },

    at(index){
        if(index === 0 ) {
            return this.key
        }
        else if (index < 0) {return undefined}
        else {
            let tmp = this.next;
            for (let i=1; i<index;i++){
                tmp = tmp.next;
            }
            return tmp.key;
        }
    },

    pop(){
        if (this.next === null) {
            this.key = null;
        } else {
            let tmp = this.next;
            while (tmp.next.next){
               tmp = tmp.next; 
            }
            tmp.next = null
        }
    },

    containsKey(target){
        let tmp = node(this.key, this.next);
        while (tmp) {
            if (tmp.key === target) {
                return true
            }
            else {
                tmp = tmp.next;
            }
        }
        return false;
    },


    findKey(target){
        let counter = 0;
        let tmp = node(this.key, this.next);
        while (tmp) {
            if (tmp.key === target) {
                return counter
            }
            else {
                tmp = tmp.next;
                counter ++
            }
        }
        return false;
    },

    insertAt(key, index) {
        if (index === 0) {this.prepend(key)}
        else {
            let tmp = node(this.key, this.next)
            for (let i =1; i<index; i++) {
                tmp = tmp.next
            }
            if(!tmp===null||!tmp === undefined){
            let tmpNext = tmp.next
            tmp.next = node(key, tmpNext)}
            else {tmp.next = null}
        }
    },

    removeAt(index) {
        if (index === this.size()) {this.pop()}
        else if(index === 0){
            if(!this.next===null&&!this.key===null)
            {this.key = this.next.key;
            this.next = this.next.next;}
            else {
                this.key = null;
                this.next = null
            }}
        else {
            let tmp = node(this.key, this.next)
            for (let i =1; i<index; i++) {
                tmp = tmp.next;
            }
            tmp.next = tmp.next.next

        }}
}}

function node(key,next) {return {
    key : key,
    next : next,
}}


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

		set(key) {
            let hash = this.hash(key);
			let place = hash % this.buckets.length;
            
			if (this.buckets[place] === null) {
                this.buckets[place] = linkedList(hash, null);
			} else {
                if (this.buckets[place].containsKey(hash)) {
                    let index = this.buckets[place].findKey(hash);
                    if (this.buckets[place].size()===1){
                        this.buckets.splice(place,1,null);
                        this.buckets[place] = linkedList(hash, null);
                    }else{
                        this.buckets[place].removeAt(index);
                        this.buckets[place].insertAt(hash, index);}
                    } else {
                        this.buckets[place].append(hash);
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
	};
}

