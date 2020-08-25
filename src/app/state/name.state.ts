import { Name } from '../models/name.model';
import { State, Action, StateContext, Selector } from '@ngxs/store'
import { CreateName, DeleteName, UpdateName } from '../actions/name.actions'
import { Injectable } from '@angular/core';

export class NamesStateModel {
    names: Name[]
}

@State<NamesStateModel>({
    name: 'namesStore',
    defaults: {
        names: ["Atharva", "Dhruv", "Tanmay"]
    }
})
@Injectable()
export class NamesState {
    @Selector()
    static getNames(state: NamesStateModel) {
        return state.names
    }

    @Action(CreateName)
    add({ getState, patchState }: StateContext<NamesStateModel>, { payload }: CreateName) {
        const state = getState();
        patchState({
            names: [payload, ...state.names]
        })
    }


    @Action(DeleteName)
    remove({ getState, patchState }: StateContext<NamesStateModel>, { payload }: DeleteName) {
        const newArr = [];
        const oldNames = getState().names;
        for (let i = 0; i < oldNames.length; i++) {
            if (i !== payload) {
                newArr.push(oldNames[i])
            }
        }
        patchState({
            names: newArr
        })
    }

    @Action(UpdateName)
    update({ getState, patchState }: StateContext<NamesStateModel>, { payload }: UpdateName) {
        const newArr = [];
        const oldNames = getState().names;
        for (let i = 0; i < oldNames.length; i++) {
            if (i === payload.index) {
                newArr.push(payload.newName)
            } else {
                newArr.push(oldNames[i])
            }
        }
        patchState({
            names: newArr
        })
    }



}