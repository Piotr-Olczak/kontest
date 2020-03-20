import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormElement from 'components/FormElements/FormElement';
import { DebugJson } from 'helpers/debugJson';

const SampleFormElements: React.FC = () => {
  return (
    <Formik
      initialValues={{
        sampleName: '',
        samplePassword: '',
        sampleEmail: '',
        samplePesel: '',
        sampleIdNo: '',
        samplePostcode: '',
        sampleBankAccNo: '',
        sampleMonth: '',
        sampleDay: '',
        sampleYear: '',
        sampleCheckbox: false,
        sampleRadio: '5'
      }}
      onSubmit={() => {}}
    >
      {formikProps => (
        <Form className="form-elements form-elements--sample">
          <FormElement>
            <label className="form-element__label" htmlFor="sampleName">
              Imie (text):
            </label>
            <Field id="sampleName" type="text" name="sampleName" />
          </FormElement>
          <FormElement
            validationStatus="invalid"
            validationMessage="To pole powinno by adresem email"
          >
            <label className="form-element__label" htmlFor="sampleEmail">
              Email (email):
            </label>
            <Field id="sampleEmail" type="email" name="sampleEmail" />
          </FormElement>
          <FormElement validationStatus="valid">
            <label className="form-element__label" htmlFor="samplePesel">
              PESEL (pesel):
            </label>
            <Field id="samplePesel" type="text" name="samplePesel" />
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleIdNo">
              Nr dok. tozsamosci (ID no):
            </label>
            <Field id="sampleIdNo" type="text" name="sampleIdNo" />
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="samplePostcode">
              Kod pocztowy (xx-xxx):
            </label>
            <Field id="samplePostcode" type="text" name="samplePostcode" />
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleBankAccNo">
              Nr konta bankowego (polskie)
            </label>
            <Field id="sampleBankAccNo" type="text" name="sampleBankAccNo" />
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleMonth">
              Miesiąc:
            </label>
            <Field id="sampleMonth" component="select" name="sampleMonth">
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </Field>
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleDay">
              Dzień:
            </label>
            <Field id="sampleDay" component="select" name="sampleDay">
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </Field>
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleYear">
              Rok:
            </label>
            <Field id="sampleYear" component="select" name="sampleYear">
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
            </Field>
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="samplePassword">
              Password:
            </label>
            <Field id="samplePassword" type="password" name="samplePassword" />
          </FormElement>
          <FormElement>
            <p className="form-element__label">Checkbox:</p>
            <Field id="sampleCheckbox" type="checkbox" name="sampleCheckbox" />
            <label htmlFor="sampleCheckbox">Zgadzam się na zgodę</label>
          </FormElement>
          <FormElement>
            <p className="form-element__label">Options</p>
            <Field
              id="sampleRadio1"
              type="radio"
              name="sampleRadio"
              value="5"
            />
            <label htmlFor="sampleRadio1">Option 1</label>
            <Field
              id="sampleRadio2"
              type="radio"
              name="sampleRadio"
              value="6"
            />
            <label htmlFor="sampleRadio2">Option 2</label>
          </FormElement>
          <FormElement>
            <label className="form-element__label" htmlFor="sampleTextarea">
              Textarea:
            </label>
            <Field
              id="sampleTextarea"
              component="textarea"
              name="sampleTextarea"
            />
          </FormElement>
          <DebugJson {...formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default SampleFormElements;
