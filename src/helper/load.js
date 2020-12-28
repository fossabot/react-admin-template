import Loadable from 'react-loadable';
import LoadingComponent from '../components/loading-component';

export default (callback) =>
	Loadable({
		loader: () => callback(),
		loading: LoadingComponent,
	});
