import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-navy-500 py-3 ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-brand-600 transition-colors text-navy-600 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 rounded"
          >
            <Home className="w-3.5 h-3.5 text-navy-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-navy-300 shrink-0" aria-hidden="true" />
              {isLast || !item.path ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="font-semibold text-navy-900 truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-600 transition-colors text-navy-600 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 rounded"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
