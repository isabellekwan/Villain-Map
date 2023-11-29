// make location class
export class Location {
    count: number;
    constructor(public name: string, public longitude: number, public latitude: number){
        this.count = 0;
    }
  }