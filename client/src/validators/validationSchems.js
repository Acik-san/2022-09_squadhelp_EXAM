import * as Yup from 'yup';
import valid from 'card-validator';

const Schems = {
  EventSchem: Yup.object().shape({
    eventName: Yup.string('Must be string')
      .matches(/^.{1,64}$/, 'Invalid amount of symbols')
      .required('required'),
    date: Yup.date('Must be date').required('required'),
  }),
  LoginSchem: Yup.object().shape({
    email: Yup.string().email('check email').required('required'),
    password: Yup.string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('required'),
  }),
  RegistrationSchem: Yup.object().shape({
    email: Yup.string().email('check email').required('Email is required'),
    password: Yup.string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('required'),
    confirmPassword: Yup.string()
      .required('confirm password is required')
      .oneOf([Yup.ref('password')], 'confirmation pass must match password'),
    firstName: Yup.string()
      .test(
        'test-firstName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('First Name is required'),
    lastName: Yup.string()
      .test(
        'test-lastName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('Last Name is required'),
    displayName: Yup.string()
      .test(
        'test-displayName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('Display Name is required'),
    role: Yup.string()
      .matches(/(customer|creator)/)
      .required('Role is required'),
    agreeOfTerms: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  }),
  ContestSchem: Yup.object({
    nameVenture: Yup.string().min(3),
    contestType: Yup.string()
      .matches(/(name|tagline|logo)/)
      .required(),
    title: Yup.string()
      .test(
        'test-title',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('title of contest required'),
    industry: Yup.string().required('industry required'),
    focusOfWork: Yup.string()
      .test(
        'test-focusOfWork',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('focus of work required'),
    targetCustomer: Yup.string()
      .test(
        'test-targetCustomer',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('target customers required'),
    styleName: Yup.string().min(1),
    typeOfName: Yup.string().min(1),
    typeOfTagline: Yup.string().min(1),
    brandStyle: Yup.string().min(1),
    file: Yup.mixed(),
  }),
  filterSchem: Yup.object().shape({
    typeIndex: Yup.number().oneOf[(1, 2, 3, 4, 5, 6, 7)],
    contestId: Yup.string(),
    awardSort: Yup.string().matches(/(desc|asc)/),
    industry: Yup.string(),
  }),
  LogoOfferSchema: Yup.object().shape({
    offerData: Yup.mixed().required('required'),
  }),
  TextOfferSchema: Yup.object().shape({
    offerData: Yup.string()
      .test(
        'test-offerData',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('suggestion is required'),
  }),
  PaymentSchema: Yup.object().shape({
    number: Yup.string()
      .test('test-cardNumber', 'Credit Card number is invalid', value =>
        valid.number(value, { type: 'visa' })
      )
      .required('required'),
    name: Yup.string()
      .min(1, 'required atleast one symbol')
      .required('required'),
    cvc: Yup.string()
      .test('test-cvc', 'cvc is invalid', value => valid.cvv(value).isValid)
      .required('required'),
    expiry: Yup.string()
      .test(
        'test-expiry',
        'expiry is invalid',
        value => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  CashoutSchema: Yup.object().shape({
    sum: Yup.number()
      .min(5, 'min sum is 5$')
      .typeError('must be a number')
      .required('required'),
    number: Yup.string()
      .test('test-cardNumber', 'Credit Card number is invalid', value =>
        valid.number(value, { type: 'visa' })
      )
      .required('required'),
    name: Yup.string().min(1).required('required'),
    cvc: Yup.string()
      .test('test-cvc', 'cvc is invalid', value => valid.cvv(value).isValid)
      .required('required'),
    expiry: Yup.string()
      .test(
        'test-expiry',
        'expiry is invalid',
        value => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  UpdateUserSchema: Yup.object().shape({
    firstName: Yup.string()
      .test(
        'test-firstName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    lastName: Yup.string()
      .test(
        'test-lastName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    displayName: Yup.string()
      .test(
        'test-displayName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    file: Yup.mixed(),
  }),
  MessageSchema: Yup.object({
    message: Yup.string()
      .test(
        'test-message',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
  }),
  CatalogSchema: Yup.object({
    catalogName: Yup.string()
      .test(
        'test-catalogName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
  }),
};

export default Schems;
