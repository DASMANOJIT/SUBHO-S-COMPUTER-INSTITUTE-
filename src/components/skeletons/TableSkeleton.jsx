import React from 'react';
import Skeleton from './Skeleton.jsx';

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="table-skeleton" aria-hidden="true">
      <div className="table-skeleton-header">
        <Skeleton height="16px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" />
      </div>
      <div className="table-skeleton-body">
        {Array.from({ length: rows }).map((_, index) => (
          <div className="table-skeleton-row" key={index}>
            <Skeleton height="14px" />
            <Skeleton height="14px" />
            <Skeleton height="14px" />
            <Skeleton height="14px" />
            <Skeleton height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
