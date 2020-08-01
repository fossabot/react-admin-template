/**
 * @description: 局部store
 * @author: jkSUn
 * @date: 2020/5/13 14:11
 */
import { observable, action } from 'mobx';
import Store from '../../../store';

class Sample {
	@observable count = 0;
	@observable someInfo = {};

	@action
	onCountUpdate(count) {
		this.count = count;
	}

	@action
	onSomeInfoChanged(data) {
		this.someInfo = data;
	}
}

Store.page.sample = new Sample();

export default Store.page.sample = new Sample();
