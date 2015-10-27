import IndexCtrl from '../controllers/IndexCtrl.js';

export default (app) => {
    app.get('/hello', IndexCtrl);
};
