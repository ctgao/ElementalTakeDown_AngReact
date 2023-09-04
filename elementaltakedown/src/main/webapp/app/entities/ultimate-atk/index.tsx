import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UltimateATK from './ultimate-atk';
import UltimateATKDetail from './ultimate-atk-detail';
import UltimateATKUpdate from './ultimate-atk-update';
import UltimateATKDeleteDialog from './ultimate-atk-delete-dialog';

const UltimateATKRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UltimateATK />} />
    <Route path="new" element={<UltimateATKUpdate />} />
    <Route path=":id">
      <Route index element={<UltimateATKDetail />} />
      <Route path="edit" element={<UltimateATKUpdate />} />
      <Route path="delete" element={<UltimateATKDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UltimateATKRoutes;
