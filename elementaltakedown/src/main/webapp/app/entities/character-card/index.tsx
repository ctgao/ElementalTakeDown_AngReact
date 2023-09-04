import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CharacterCard from './character-card';
import CharacterCardDetail from './character-card-detail';
import CharacterCardUpdate from './character-card-update';
import CharacterCardDeleteDialog from './character-card-delete-dialog';

const CharacterCardRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CharacterCard />} />
    <Route path="new" element={<CharacterCardUpdate />} />
    <Route path=":id">
      <Route index element={<CharacterCardDetail />} />
      <Route path="edit" element={<CharacterCardUpdate />} />
      <Route path="delete" element={<CharacterCardDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CharacterCardRoutes;
