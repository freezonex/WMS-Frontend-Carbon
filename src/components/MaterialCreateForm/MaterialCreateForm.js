'use client';
import React, { useState } from 'react';
import { TextInput, Grid, Column, TextArea, Button, Tag } from '@carbon/react';
import { IbmDb2Warehouse } from '@carbon/icons-react';
import './_materialcreateform.scss';
import { useRouter } from 'next/navigation';
import { addMaterial } from '@/actions/actions';
import ExpectLocationModal from '@/components/Modal/ExpectLocationModal';
import { tagColors } from '@/utils/constants';

function MaterialCreateForm() {
  const router = useRouter();
  const [fieldValidation, setFieldValidation] = useState({
    codeInvalid: false,
    nameInvalid: false,
  });

  const defaultFormValue = {
    expect_storage_locations: '',
    expect_wh_id: '',
    id: '',
    material_code: '',
    material_type: '',
    max: '',
    min: '',
    name: '',
    note: '',
    specification: '',
    status: '',
    suggested_storage_location_id: '',
    suggested_storage_location_name: '',
    unit: '',
  };
  const [selectLocations, setSelectLocations] = useState([]);
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [isOpenExpect, setIsOpenExpect] = useState(false);

  console.log(
    formValue,
    selectedWarehouseInfo,
    process.env.PATH_PREFIX + '/warehouse/material'
  );

  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidation = {
      codeInvalid: formValue.material_code === '',
      nameInvalid: formValue.name === '',
    };
    setFieldValidation(newValidation);
    console.log(newValidation, formValue);

    if (Object.values(newValidation).some((v) => v)) {
      return;
    }
    addMaterial(formValue).then(() => {
      setFormValue({
        material_code: '',
        material_type: '',
        max: '',
        min: '',
        name: '',
        note: '',
      });
      setFieldValidation({
        codeInvalid: false,
        nameInvalid: false,
      });
    });
    router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
  };
  const onSelectExpectLocation = () => {
    setIsOpenExpect(true);
  };
  const onCloseExpectLocationModal = () => {
    setIsOpenExpect(false);
  };
  const onConfirmExpectLocationModal = (data) => {
    setSelectLocations([]);
    setFormValue((prevData) => ({
      ...prevData,
      expect_wh_id: data.warehouseInfo?.id,
      expect_storage_locations: data.shelves.join(','),
    }));
    setSelectLocations(data.shelves);
    setSelectedWarehouseInfo(data.warehouseInfo);
    // console.log(formValue);
    setIsOpenExpect(false);
  };
  return (
    <div>
      <div className=" mt-8">
        <Grid className="pl-0">
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Code"
              id="material_code"
              placeholder="Material Code"
              invalid={fieldValidation.codeInvalid}
              invalidText="This field cannot be empty"
              value={formValue.material_code}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Name"
              id="name"
              placeholder="Material Name"
              invalid={fieldValidation.nameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.name}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Type"
              id="material_type"
              placeholder="Material Type"
              value={formValue.material_type}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Unit"
              id="unit"
              placeholder="Unit"
              value={formValue.unit}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Specification"
              id="specification"
              placeholder="Specification"
              value={formValue.specification}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Maximum safty stock"
              id="max"
              placeholder="Maximum safty stock"
              value={formValue.max}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Minimum safty stock"
              id="min"
              placeholder="Minimum safty stock"
              value={formValue.min}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Status"
              id="status"
              placeholder="Status"
              value={formValue.status}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={8} lg={16}>
            <div>
              <span className="text-xs" style={{ color: '#525252' }}>
                Expect Location
              </span>
            </div>
            <div className="flex flex-row mt-2 mb-5">
              <div>
                <Button
                  onClick={onSelectExpectLocation}
                  kind="tertiary"
                  size="sm"
                  renderIcon={IbmDb2Warehouse}
                >
                  {selectedWarehouseInfo?.name
                    ? selectedWarehouseInfo?.name
                    : 'Warehouse'}
                </Button>
              </div>
              <div className="ml-5">
                {selectLocations?.map((shelf, index) => {
                  return (
                    <Tag
                      key={index}
                      type={tagColors[index % tagColors.length]}
                      className="ml-0"
                    >
                      <div className="flex w-10 justify-center">{shelf}</div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          </Column>
          <Column sm={4} md={8} lg={16}>
            <TextArea
              className="mb-8 w-full"
              labelText="Note"
              rows={4}
              id="note"
              value={formValue.note}
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </div>
      <div className="flex space-x-4 mt-4 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          size="sm"
          kind="tertiary"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
          }}
        >
          Cancel
        </Button>
      </div>
      <ExpectLocationModal
        isOpen={isOpenExpect}
        onClose={onCloseExpectLocationModal}
        onConfirm={onConfirmExpectLocationModal}
      ></ExpectLocationModal>
    </div>
  );
}

export default MaterialCreateForm;
