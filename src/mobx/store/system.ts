import { makeAutoObservable } from 'mobx';

class System {
	systemName = 'React Admin Template';

	constructor() {
		makeAutoObservable(this);
	}

	onSetSystemName(name: string): void {
		console.log(name);
		this.systemName = name;
	}
}

// export default
module.exports = new System();
