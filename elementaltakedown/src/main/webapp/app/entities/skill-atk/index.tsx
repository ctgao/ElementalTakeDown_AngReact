import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SkillATK from './skill-atk';
import SkillATKDetail from './skill-atk-detail';
import SkillATKUpdate from './skill-atk-update';
import SkillATKDeleteDialog from './skill-atk-delete-dialog';

const SkillATKRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SkillATK />} />
    <Route path="new" element={<SkillATKUpdate />} />
    <Route path=":id">
      <Route index element={<SkillATKDetail />} />
      <Route path="edit" element={<SkillATKUpdate />} />
      <Route path="delete" element={<SkillATKDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SkillATKRoutes;
