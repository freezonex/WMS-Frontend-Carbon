'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/analysis">Analysis</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Analysis</Heading>
          <Heading className="mt-1 text-sm">
            Analysis dashboard view goes here.
          </Heading>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <iframe
          title="dashboard"
          width="1800"
          height="1120.5"
          src="https://app.powerbi.com/view?r=eyJrIjoiOWIyYzA0OTUtZGNkYS00MWZhLTkwZWQtZWU5YmYxODkwZmNkIiwidCI6ImFhNGU1ODM1LWU3YjctNDQ3NC1hZTE1LWQ3OTA0OTYwZDY2NCIsImMiOjEwfQ%3D%3D"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default page;
