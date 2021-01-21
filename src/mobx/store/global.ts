import { makeAutoObservable } from 'mobx';

class Global {
	private permissions: { [key: string]: boolean };

	constructor() {
		this.permissions = {};

		makeAutoObservable(this);
	}

	setPermissions(permissions: { [key: string]: boolean }) {
		this.permissions = permissions;
	}

	changePermissions(permissions: { [key: string]: boolean }) {
		this.permissions = { ...this.permissions, ...permissions };
	}
}

// module.exports = new Global();

export default new Global();
