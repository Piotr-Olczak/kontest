import React from 'react';
import { Field } from 'formik';
import FormGroup from 'components/FormGroup/FormGroup';
import FormElement from 'components/FormElements/FormElement';

export const playerDeclarationsInitialValues = {
  privateBankingDeclaration: false,
  politicalVipDeclaration: false
};

const PlayerDeclarationsFormGroup: React.FC = () => {
  return (
    <FormGroup title="Oświadczenia">
      <FormElement extraClasses="form-element--full">
        <Field
          id="privateBankingDeclaration"
          type="checkbox"
          name="privateBankingDeclaration"
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

export default PlayerDeclarationsFormGroup;
