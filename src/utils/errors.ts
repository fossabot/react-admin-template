// eslint-disable-next-line max-classes-per-file
export class ApiRequestError {
	code: number;
	message: string;

	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}

	toString() {
		return `${this.code} ${this.message}`;
	}
}

export class ApiResponseError {
	code: number;
	message: string;
	data: any;

	constructor(code: number, message: string, data?: any) {
		this.code = code;
		this.message = message;
		this.data = data;
	}

	toString() {
		return `${this.code} ${this.message}`;
	}
}
