import uniqid from 'uniqid';

export default class List {
    construtor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
    }

    // deleteItem(id) {
    //     const index = this.items.findIndex(el => {

    //     })
    //     this.items.splice()
    // }
}