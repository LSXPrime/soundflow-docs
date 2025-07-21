import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import {Icon} from "@iconify/react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center p-8">
          <Icon icon="lucide:alert-triangle" className="text-6xl text-warning mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            404 - Page Not Found
          </h1>
          <p className="text-default-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as={Link}
              to="/"
              color="primary"
              className="px-6"
            >
              Go Home
            </Button>
            <Button
              as={Link}
              to="/docs"
              variant="bordered"
              className="px-6"
            >
              View Docs
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFoundPage;