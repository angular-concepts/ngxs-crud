import { Name } from '../models/name.model';

export class CreateName {
    static readonly type = '[NAME] Create'
    constructor(public payload: Name) {

    }
}

export class DeleteName {
    static readonly type = '[NAME] Delete'
    constructor(public payload: number) {

    }
}

export class UpdateName {
    static readonly type = '[NAME] Update'
    constructor(public payload: { index: number, newName: string }) {

    }
}