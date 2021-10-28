import * as React from "react";

import { UsersTable, CartTable } from "..";

export function AdminTable() {
  return (
    <div>
      <UsersTable />
      <CartTable />
    </div>
  );
}
