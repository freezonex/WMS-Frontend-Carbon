import { Modal, ComboBox, TextInput } from '@carbon/react';
import { useEffect, useState } from 'react';
import { resourceTypes } from '@/utils/constants';
import { addResource, updateResource } from '@/actions/actions';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';

export default function AddEditResourceModal({
  isOpen,
  onRefresh,
  onClose,
  isEdit = false,
  defaultValue = {},
}) {
  const [msgOpen, setMsgOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [resourceName, setResourceName] = useState('');

  useEffect(() => {
    if (!defaultValue || !isEdit) {
      return;
    }
    setSelectedType(defaultValue.type || '');
    setResourceName(defaultValue.name || '');
  }, [defaultValue, isEdit]);

  const onSelectResourceType = (e) => {
    setSelectedType(e.selectedItem);
  };
  const onSubmit = () => {
    if (isEdit) {
      updateResource({
        id: defaultValue.id,
        name: resourceName,
        type: selectedType,
      })
        .then(() => {
          onRefresh();
          ShowMessageModal.showSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      addResource({
        name: resourceName,
        type: selectedType,
      })
        .then(() => {
          onRefresh();
          setSelectedType('');
          setResourceName('');
          ShowMessageModal.showSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const onCancel = () => {
    onClose();
  };
  return (
    <>
      <Modal
        open={isOpen}
        modalHeading={isEdit ? 'Edit Resource' : 'New Resource'}
        modalLabel=""
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        onRequestClose={onCancel}
        onRequestSubmit={onSubmit}
        isFullWidth={true}
        size="sm"
      >
        <div className="p-3 pb-12">
          <ComboBox
            titleText="Resource Type"
            items={resourceTypes}
            itemToString={(item) => item || ''}
            placeholder="Choose Resource Type"
            selectedItem={selectedType}
            onChange={(selectedItem) => onSelectResourceType(selectedItem)}
          />
          <TextInput
            className="mt-4"
            light
            labelText="Resource Name"
            placeholder="Resource Name"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value || '')}
          />
        </div>
      </Modal>
      <Modal
        open={msgOpen}
        onRequestClose={() => {
          setMsgOpen(false);
          setErrMsg('');
        }}
        passiveModal
        modalHeading={errMsg}
      />
    </>
  );
}
