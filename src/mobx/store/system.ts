import { makeAutoObservable } from 'mobx';

class System {
	private count: number;
	private systemName: string;

	constructor() {
		this.count = 0;
		this.systemName = 'React Admin Template';

		makeAutoObservable(this);
	}

	onSetCount(num: number) {
		this.count += num;
	}

	onSetSystemName(name: string): void {
		console.log(name);
		this.systemName = name;
	}
}

// export default
module.exports = new System();
