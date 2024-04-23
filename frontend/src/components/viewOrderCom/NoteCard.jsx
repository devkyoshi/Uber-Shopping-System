import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

export function NoteCard() {
  return (
    <Card className="mt-6 w-96 bg-gray-300 rounded-lg shadow-lg">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4 text-2xl font-bold text-center">
          Important Notices
        </Typography>
        <div className="mb-4">
          <Typography variant="paragraph" color="gray" className="text-base font-medium">
            <span className="text-red-600 font-bold">⚠️ Please note:</span> When deleting an item, make sure to do it within 60 minutes to avoid any issues.
          </Typography>
          <Typography variant="paragraph" color="gray" className="text-base font-medium mt-2">
            <span className="text-red-600 font-bold">⚠️ Please note:</span> When editing an item, ensure to complete the changes within 60 minutes to avoid any problems.
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}