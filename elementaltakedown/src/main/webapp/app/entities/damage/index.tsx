import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Damage from './damage';
import DamageDetail from './damage-detail';
import DamageUpdate from './damage-update';
import DamageDeleteDialog from './damage-delete-dialog';

const DamageRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Damage />} />
    <Route path="new" element={<DamageUpdate />} />
    <Route path=":id">
      <Route index element={<DamageDetail />} />
      <Route path="edit" element={<DamageUpdate />} />
      <Route path="delete" element={<DamageDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DamageRoutes;
