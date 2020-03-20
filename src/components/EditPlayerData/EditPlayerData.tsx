import React, { useContext } from 'react';
import EditBasicDataForm from 'components/EditPlayerData/EditBasicDataForm';
import EditPlayerDeclarationsForm from 'components/EditPlayerData/EditPlayerDeclarationsForm';
import EditPasswordFormGroup from 'components/PlayerProfile/EditPasswordFormGroup';
import { editPlayerDataHelper } from 'helpers/editPlayerData.helper';
import { AppContextShape } from 'interfaces/interfaces';
import { AppContext } from 'components/AppState/AppState';

const EditPlayerData: React.FC = () => {
  const { state } = useContext<AppContextShape>(AppContext);

  if (
    !state ||
    !state.user ||
    !state.user.details ||
    !state.user.details.optionalConsentsData ||
    !state.user.details.basicData
  )
    return null;

  const basicDataInitialValues = editPlayerDataHelper.mapEditBasicDataFromState(
    state.user.details.basicData
  );
  const playerDeclarationsInitialValues = editPlayerDataHelper.mapOptionalConsentsFromState(
    state.user.details.optionalConsentsData
  );

  return (
    <div className="edit-player-data-form">
      <p>
        Dane poniżej możesz edytować - pamiętaj, że dane będą weryfikowane przez
        nasz system.
      </p>
      <EditBasicDataForm initialValues={basicDataInitialValues} />
      <EditPlayerDeclarationsForm
        initialValues={playerDeclarationsInitialValues}
      />
      <EditPasswordFormGroup />
    </div>
  );
};

export default EditPlayerData;
