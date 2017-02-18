export interface Cell {

    isSoft(): boolean;

}

export class SoftCell implements Cell {

    public isSoft(): boolean {
        return true;
    }

}