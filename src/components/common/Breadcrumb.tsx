import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";

const Breadcrumb: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="ml-4 px-2">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path}>
            <Link
              to={breadcrumb.path}
              className="text-blue-500 hover:underline"
            >
              {breadcrumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
