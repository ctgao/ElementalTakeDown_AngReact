import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BasicATK from './basic-atk';
import BasicATKDetail from './basic-atk-detail';
import BasicATKUpdate from './basic-atk-update';
import BasicATKDeleteDialog from './basic-atk-delete-dialog';

const BasicATKRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BasicATK />} />
    <Route path="new" element={<BasicATKUpdate />} />
    <Route path=":id">
      <Route index element={<BasicATKDetail />} />
      <Route path="edit" element={<BasicATKUpdate />} />
      <Route path="delete" element={<BasicATKDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BasicATKRoutes;
