import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

export function NoteCard() {
  return (
    <Card className="mt-6 w-96 bg-gray-300">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Important Notices
        </Typography>
        <div className="mb-4">
          <Typography variant="subtitle1" color="gray">
            <span className="text-red-600">⚠️ Please note:</span> When deleting an item, make sure to do it within 60 minutes to avoid any issues.
          </Typography>
          <Typography variant="subtitle1" color="gray">
          <span className="text-red-600">⚠️ Please note:</span> When editing an item, ensure to complete the changes within 60 minutes to avoid any problems.
        </Typography>
        </div>
 
      </CardBody>
    </Card>
  );
}