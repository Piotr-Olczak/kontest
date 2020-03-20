import React from 'react';
import FormGroup from 'components/FormGroup/FormGroup';

const SampleFormGroup: React.FC = () => {
  return (
    <FormGroup
      title="Zgody informacyjne"
      header="Wyrazam zgody na pozyskiwanie moich danych osobowych etc."
      footer="Odwołanie kazdej z powyzszych zgód moe nastąpić w dowolnej chwili z poziomu konta gracza"
    >
      <h5>Przykładowe dziecko</h5>
      <div>Przykładowe dziecko 2</div>
      <input type="text" placeholder="Przykładowy input jako dziecko" />
    </FormGroup>
  );
};

export default SampleFormGroup;
