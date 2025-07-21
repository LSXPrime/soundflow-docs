import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useTableOfContents } from '../../hooks/useTableOfContents.ts';
import { Icon } from "@iconify/react";

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const { toc, activeId, scrollToHeading } = useTableOfContents(content);

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-24 w-64 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:menu-book" className="text-lg text-gray-600 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              On this page
            </h3>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <nav className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  activeId === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border-l-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                } ${
                  item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : ''
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </CardBody>
      </Card>
    </div>
  );
};

export default TableOfContents;