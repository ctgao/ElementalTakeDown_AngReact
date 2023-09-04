import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/character-card">
        <Translate contentKey="global.menu.entities.characterCard" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/basic-atk">
        <Translate contentKey="global.menu.entities.basicAtk" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/skill-atk">
        <Translate contentKey="global.menu.entities.skillAtk" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ultimate-atk">
        <Translate contentKey="global.menu.entities.ultimateAtk" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/damage">
        <Translate contentKey="global.menu.entities.damage" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/user-profile">
        <Translate contentKey="global.menu.entities.userProfile" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
