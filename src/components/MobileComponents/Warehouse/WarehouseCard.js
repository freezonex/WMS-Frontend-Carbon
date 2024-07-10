import React from 'react';
import { Heading, Link } from '@carbon/react';
import { OverflowMenuVertical } from '@carbon/icons-react';

function WarehouseCard({ warehouse }) {
  console.log(warehouse);
  return (
    <div className="border border-solid border-[#E0E0E0] shadow-md">
      <div className="w-full flex justify-between items-start inline-flex p-2 pl-3 pr-3 bg-[#E0E0E0]">
        <Heading className="text-sm font-semibold">Warehouse ID</Heading>
        <OverflowMenuVertical />
      </div>
      <div className="space-y-[-8px]">
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Name</Heading>
          <Heading className="text-sm ">{warehouse?.name || 'N/A'}</Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Type</Heading>
          <Heading className="text-sm ">{warehouse?.type || 'N/A'}</Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Manager</Heading>
          <Heading className="text-sm ">{warehouse?.manager || 'N/A'}</Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Project Group</Heading>
          <Heading className="text-sm ">
            {warehouse?.project_group || 'N/A'}
          </Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Department</Heading>
          <Heading className="text-sm ">
            {warehouse?.department || 'N/A'}
          </Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Email</Heading>
          <Heading className="text-sm ">{warehouse?.email || 'N/A'}</Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Storage Location</Heading>
          <Link onClick={() => {}}>All Locations</Link>
        </div>
      </div>
    </div>
  );
}

export default WarehouseCard;
