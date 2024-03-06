'use client';
import React, { useState } from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
} from '@carbon/react';
import { Add, Search } from '@carbon/icons-react';
import WarehouseTable from '@/components/Table/WarehouseTable';
import CreateWarehouseModal from '@/components/Modal/CreateWarehouseModal';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'id', header: 'ID' },
  { key: 'isActive', header: 'Is Active' },
  { key: 'type', header: 'Type' },
  { key: 'manager', header: 'Manager' },
  { key: 'shelfLocation', header: 'Shelf Location' },
];
const rows = [
  {
    id: '1',
    name: 'Warehouse01',
    code: 'house#1',
    isActive: 'Active',
    type: 'Serial',
    manager: 'Mick',
    shelfLocation: 'All Shelves',
  },
  {
    id: '2',
    name: 'Warehouse02',
    code: 'house#2',
    isActive: 'Active',
    type: 'Serial',
    manager: 'Frank',
    shelfLocation: 'All Shelves',
  },
];

function Page() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const handleModalClose = () => {
    setCreateModalOpen(false);
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse Management</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Warehouse Structure
          </Heading>
          <Heading className="mt-1 text-sm">
            Description of warehouse view goes here.
          </Heading>
        </div>
        <Button
          onClick={() => {
            setCreateModalOpen(true);
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Warehouse
        </Button>
        <CreateWarehouseModal
          isOpen={isCreateModalOpen}
          onClose={handleModalClose}
        />
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto w-5"
          labelText="Warehouse Id"
          id="filter-1"
          placeholder="Id"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Name"
          id="filter-2"
          placeholder="Name"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Type"
          id="filter-3"
          placeholder="Type"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Manager"
          id="filter-4"
          placeholder="Manager"
        />
        <HeaderGlobalAction aria-label="Search">
          <Search size={15} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <WarehouseTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default Page;