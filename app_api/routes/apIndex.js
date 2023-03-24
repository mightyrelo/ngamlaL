/*There are three levels of endpoints; collection, document and subdocument. At each level of endpoint we define crud operations that are appropriate
for the level. For the collection level we define read and create, for document we define read,update and delete. This pattern repeats itself for a subdoc */
const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
  secret: 'thisIsSecret',
  algorithms:  ["RS256", "HS256"],
  userProperty: 'payload'
});


const mCtrl = require('../controllers/Ms');
const smCtrl = require('../controllers/SMs');
const authCtrl = require('../controllers/authentication');
const productsCtrl = require('../controllers/Products');
const custCtrl = require('../controllers/Customers');
const quoteCtrl = require('../controllers/Quotations');
const invCtrl = require('../controllers/Invoices');
const compCtrl = require('../controllers/Companies');



//model/collection routes
//list
router
  .route('/ms')
  .get(mCtrl.mReadAll)
  .post(auth, mCtrl.mCreateOne);
//instances/document routes
router
  .route('/ms/:mId')
  .get(mCtrl.mReadOne)
  .put(mCtrl.mUpdateOne)
  .delete(auth, mCtrl.mDeleteOne);

//submodel routes
//list
router
  .route('/ms/:mId/sms')
  .get(smCtrl.smReadAll)
  .post(auth, smCtrl.smCreateOne);
router
  .route('/ms/:mId/sms/new')
  .get(smCtrl.smCreateOne)
//instance
router
  .route('/ms/:mId/sms/:smId')
  .get(smCtrl.smReadOne)
  .put(smCtrl.smUpdateOne)
  .delete(smCtrl.smDeleteOne);

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

router
   .route('/products')
   .get(productsCtrl.productsReadAll)
   .post(productsCtrl.productsCreateOne)
 
 
router
   .route('/products/:productid')
   .get(productsCtrl.productsReadOne)
   .put(productsCtrl.productsUpdateOne)
   .delete(productsCtrl.productsDeleteOne)

router
    .route('/products/name/:productName')
    .get(productsCtrl.productsReadByName);

router
    .route('/products/userName/:userName')
    .get(productsCtrl.productsReadByUserName);

//level one - customer collection
router
  .route('/customers')
  .get(custCtrl.customersReadAll)
  .post(custCtrl.customersCreateOne);

//level two - customer document
router
   .route('/customers/:customerId')
   .get(custCtrl.customersReadOne)
   .put(custCtrl.customersUpdateOne)
   .delete(custCtrl.customersDeleteOne);

router
    .route('/customers/name/:name')
    .get(custCtrl.customersReadByName);


    //level three - quotaton collection
router
.route('/customers/:customerId/quotations')
.get(quoteCtrl.quotationsReadAll)
.post(auth, quoteCtrl.quotationsCreateOne);

//level four = quotation document
router
 .route('/customers/:customerId/quotations/:quotationId')
 .get(quoteCtrl.quotationsReadOne)
 .put(quoteCtrl.quotationsUpdateOne)
 .delete(auth, quoteCtrl.quotationsDeleteOne);


 router
 .route('/customers/:customerid/invoices')
 .get(invCtrl.invoicesReadAll);

router.post('/customers/:customerid/quotations/:quotationid/invoice', invCtrl.invoicesCreateOne);


router
 .route('/customers/:customerid/invoices/:invoiceid')
 .get(invCtrl.invoicesReadOne)
 .put(invCtrl.invoicesUpdateOne)
 .delete(invCtrl.invoicesDeleteOne);

//level one - customer collection
router
.route('/companies')
.get(compCtrl.companiesReadAll)
.post(compCtrl.companiesCreateOne);

//level two = customer document
router
 .route('/companies/:companyId')
 .get(compCtrl.companiesReadOne)
 .put(compCtrl.companiesUpdateOne)
 .delete(compCtrl.companiesDeleteOne);







module.exports = router;
