import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface TableProps {
  children: ReactNode;
  className?: string;
}

export interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <thead className={cn('[&_tr]:border-b', className)}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr className={cn('border-b transition-colors hover:bg-gray-100/50', className)}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <th className={cn('h-12 px-4 text-left align-middle font-medium text-gray-500', className)}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={cn('p-4 align-middle', className)}>
      {children}
    </td>
  );
};
