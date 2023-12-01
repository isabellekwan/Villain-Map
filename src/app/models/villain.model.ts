//make villain class for villain service
export class Villain {
    constructor(public name: string, public reportName: string, public reportNumber: string, 
        public location: Location, public time: Date, public imageUrl:string, public extraDetails: string, public status: string) {
      }

}