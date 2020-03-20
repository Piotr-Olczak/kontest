import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';
import { editPlayerDeclarationsFormGroupShape } from 'interfaces/forms/formGroupShape';

const EditPlayerDeclarationsFormGroup: React.FC<
  editPlayerDeclarationsFormGroupShape
> = props => {
  const {
    ownerFundsDeclaration,
    privateBankingDeclaration,
    politicalVipDeclaration,
    errors
  } = props;
  return (
    <FormGroup title="Oświadczenia">
      <FormElement extraClasses="form-element--full">
        <Field
          id="ownerFundsDeclaration"
          type="checkbox"
          name="ownerFundsDeclaration"
          checked={ownerFundsDeclaration}
        />
        <label htmlFor="ownerFundsDeclaration">
          Oświadczam, że jestem beneficjentem rzeczywistym właścicielem środków
          przeznaczonych na grę.
        </label>
      </FormElement>
      <FormElement
        validationStatus={errors.fundsSource ? 'invalid' : 'not-validated'}
        validationMessage={errors.fundsSource ? errors.fundsSource : ''}
      >
        <label className="form-element__label" htmlFor="fundsSource">
          Źródło środków przeznaczonych na grę
        </label>
        <Field id="fundsSource" component="select" name="fundsSource">
          <option value="select_label">Wybierz źródło środków</option>
          <option value="COMPANY">Działalność gospodarcza</option>
          <option value="CONTRACT">Umowa o dzieło lub umowa zlecenia</option>
          <option value="EMPLOYMENT">Umowa o pracę</option>
          <option value="FALL_OR_DONATION">Spadek, darowizna</option>
          <option value="FREELANCE">Wykonywanie wolnego zawodu</option>
          <option value="RENT">Emerytura lub renta</option>
          <option value="WIN_OR_PRIZE">Wygrana lub nagroda</option>
        </Field>
      </FormElement>
      <FormElement>
        <p className="form-element__label form-element__label--funds-source">
          Oświadczam, że środki pieniężne przeznaczone na grę będą pochodziły z
          legalnego źródła.
        </p>
      </FormElement>
      <FormElement extraClasses="form-element--full">
        <Field
          id="privateBankingDeclaration"
          type="checkbox"
          name="privateBankingDeclaration"
          checked={privateBankingDeclaration}
        />
        <label htmlFor="privateBankingDeclaration">
          <strong>Oświadczam, że korzystam z usług bankowości prywatnej</strong>{' '}
          (ogół usług świadczonych dla najbardziej zamożnych klientów
          indywidualnych obejmujących przede wszystkim długoterminowe
          zarządzanie aktywami finansowymi oraz obsługę ich bieżących potrzeb
          finansowych).
        </label>
      </FormElement>
      <FormElement extraClasses="form-element--full">
        <Field
          id="politicalVipDeclaration"
          type="checkbox"
          name="politicalVipDeclaration"
          checked={politicalVipDeclaration}
        />
        <label htmlFor="politicalVipDeclaration">
          <strong>
            Oświadczam, że jestem osobą pełniącą eksponowane stanowisko
            polityczne
          </strong>
          , członkiem rodziny lub też osobą znaną jako bliski współpracownik
          osoby pełniącej eksponowane stanowisko polityczne w myśl ustawy z dn.
          1 marca 2018 r. o przeciwdziałaniu praniu pieniędzy oraz finansowaniu
          terroryzmu. Jestem świadomy odpowiedzialności karnej za złożenie
          fałszywego oświadczenia.
        </label>
      </FormElement>
    </FormGroup>
  );
};

export default EditPlayerDeclarationsFormGroup;
