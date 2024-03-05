'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import ProductCreateForm from '@/components/ProductCreateForm/ProductCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse Management</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/product">Product</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/product/create">Create</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a Product
        </Heading>
      </div>
      <ProductCreateForm />
    </div>
  );
}

export default page;
