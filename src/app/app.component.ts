import { Component } from '@angular/core'
import { Name } from './models/name.model'
import { Store } from '@ngxs/store'
import { CreateName, DeleteName, UpdateName } from './actions/name.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // COMPONENT STORE
  namesStore: Name[] = ["Atharva", "Dhruv", "Tanmay"];

  // NGXS STORE
  constructor(public store: Store) {
  }

  // CREATE
  createName: string;

  create() {
    this.componentCreate()
    this.ngxsCreate();
  }

  componentCreate() {
    this.namesStore = [this.createName, ...this.namesStore]
  }

  ngxsCreate() {
    this.store.dispatch(new CreateName(this.createName))
  }

  // READ
  readIndex: number;
  readValue: string;

  readValueFromNGXS: string;

  read() {
    this.componentRead();
    this.ngxsRead();
  }

  componentRead() {
    this.readValue = this.namesStore[this.readIndex]
  }

  ngxsRead() {
    this.store.select(state => state.namesStore.names).subscribe(names => {
      this.readValueFromNGXS = names[this.readIndex]
    })
  }


  // UPDATE
  updateIndex: number;
  updateName: string;

  update() {
    this.componentUpdate();
    this.ngxsUpdate();
  }

  componentUpdate() {
    this.namesStore[this.updateIndex] = this.updateName
  }

  ngxsUpdate() {
    this.store.dispatch(new UpdateName({ index: this.updateIndex, newName: this.updateName }))
  }

  // DELETE
  deleteIndex: number;


  delete() {
    this.componentDelete();
    this.ngxsDelete();
  }

  componentDelete() {
    this.namesStore.splice(this.deleteIndex, 1)
  }

  ngxsDelete() {
    this.store.dispatch(new DeleteName(this.deleteIndex));
  }
}