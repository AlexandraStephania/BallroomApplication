
export class Salon {
    id: number;
    salonName: string;
    address: string;
    capacity: number;
    surface: number;
    danceFloor: boolean;
    terrace: boolean;
    parking: boolean;
    ballroomId: string;
    constructor (
        id: number,
        salonName: string,
        address: string,
        capacity: number,
        surface: number,
        danceFloor: boolean,
        terrace: boolean,
        parking: boolean,
        ballroomId: string
       ) {}

}
