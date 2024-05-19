function linkedList (key,value,next) {return {
    key : key,
    value : value,
    next: next,


    append(key, value) {
        if(this.next === null) {
            this.next = (node(key,value,null))
        }
        else if(this === null) {
             this.key = key;
             this.value = value;
             this.next = null;
        }
        else {
        let tmp = this.next;
        while(tmp.next){
            tmp = tmp.next;
        }
        if(tmp.next ===null) {
            tmp.next =(node(key, value,null))
        }}
    },

    prepend(key, value) {
        let tmp = this.next;
        this.next = node(this.key,this.value,tmp);
        this.value = value;

    },
    
    size(){
        if (this.value === null) {
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
        return this.value
    },

    tail(){
        if(this.next === null) {
            return this.value;
        }
        let tmp = this.next;
        while(tmp.next) {
            tmp = tmp.next;
        }
        return tmp.value
    },

    at(index){
        if(index === 0 ) {
            return this.value
        }
        else if (index < 0) {return undefined}
        else {
            let tmp = this.next;
            for (let i=1; i<index;i++){
                tmp = tmp.next;
            }
            return tmp.value;
        }
    },

    pop(){
        if (this.next === null) {
            this.key = null;
            this.value = null;
        } else {
            let tmp = this.next;
            while (tmp.next.next){
               tmp = tmp.next; 
            }
            tmp.next = null
        }
    },

    containsKey(target){
        let tmp = node(this.key, this.value, this.next);
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

    containsValue(target){
        let tmp = node(this.key, this.value, this.next);
        while (tmp) {
            if (tmp.value === target) {
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
        let tmp = node(this.key, this.value, this.next);
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

    findValue(target){
        let counter = 0;
        let tmp = node(this.key, this.value, this.next);
        while (tmp) {
            if (tmp.value === target) {
                return counter
            }
            else {
                tmp = tmp.next;
                counter ++
            }
        }
        return false;
    },

    toString(){
        let str="";
        let tmp = node(this.key, this.value, this.next);
        while(tmp.next){
            str += `(${tmp.key}:${tmp.value}) -> `
            tmp.value = tmp.next.value;
            tmp.next = tmp.next.next;
        }
        if(tmp.next === null) {
            str += `(${tmp.key}:${tmp.value}) -> null`
        }
        return str
    },

    insertAt(key, value, index) {
        if (index === 0) {this.prepend(key, value)}
        else {
            let tmp = node(this.key, this.value, this.next)
            for (let i =1; i<index; i++) {
                tmp = tmp.next
            }
            if(!tmp===null||!tmp === undefined){
            let tmpNext = tmp.next
            tmp.next = node(key, value, tmpNext)}
            else {tmp.next = null}
        }
    },

    removeAt(index) {
        if (index === this.size()) {this.pop()}
        else if(index === 0){
            if(!this.next===null&&!this.key===null)
            {this.key = this.next.key;
            this.value = this.next.value;
            this.next = this.next.next;}
            else {
                this.key = null;
                this.value = null;
                this.next = null
            }}
        else {
            let tmp = node(this.key, this.value, this.next)
            for (let i =1; i<index; i++) {
                tmp = tmp.next;
            }
            tmp.next = tmp.next.next

        }}
}}

function node(key, value,next) {return {
    key : key,
    value : value,
    next : next,
}}

export{ linkedList, node }
