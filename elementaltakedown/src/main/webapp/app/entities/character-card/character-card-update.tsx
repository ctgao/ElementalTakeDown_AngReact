import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBasicATK } from 'app/shared/model/basic-atk.model';
import { getEntities as getBasicAtks } from 'app/entities/basic-atk/basic-atk.reducer';
import { ISkillATK } from 'app/shared/model/skill-atk.model';
import { getEntities as getSkillAtks } from 'app/entities/skill-atk/skill-atk.reducer';
import { IUltimateATK } from 'app/shared/model/ultimate-atk.model';
import { getEntities as getUltimateAtks } from 'app/entities/ultimate-atk/ultimate-atk.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { ICharacterCard } from 'app/shared/model/character-card.model';
import { ElementType } from 'app/shared/model/enumerations/element-type.model';
import { getEntity, updateEntity, createEntity, reset } from './character-card.reducer';

export const CharacterCardUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const basicATKS = useAppSelector(state => state.basicATK.entities);
  const skillATKS = useAppSelector(state => state.skillATK.entities);
  const ultimateATKS = useAppSelector(state => state.ultimateATK.entities);
  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const characterCardEntity = useAppSelector(state => state.characterCard.entity);
  const loading = useAppSelector(state => state.characterCard.loading);
  const updating = useAppSelector(state => state.characterCard.updating);
  const updateSuccess = useAppSelector(state => state.characterCard.updateSuccess);
  const elementTypeValues = Object.keys(ElementType);

  const handleClose = () => {
    navigate('/character-card');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBasicAtks({}));
    dispatch(getSkillAtks({}));
    dispatch(getUltimateAtks({}));
    dispatch(getUserProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...characterCardEntity,
      ...values,
      basic: basicATKS.find(it => it.id.toString() === values.basic.toString()),
      skill: skillATKS.find(it => it.id.toString() === values.skill.toString()),
      ultimate: ultimateATKS.find(it => it.id.toString() === values.ultimate.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          element: 'WATER',
          ...characterCardEntity,
          basic: characterCardEntity?.basic?.id,
          skill: characterCardEntity?.skill?.id,
          ultimate: characterCardEntity?.ultimate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="elementaltakedownApp.characterCard.home.createOrEditLabel" data-cy="CharacterCardCreateUpdateHeading">
            <Translate contentKey="elementaltakedownApp.characterCard.home.createOrEditLabel">Create or edit a CharacterCard</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="character-card-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('elementaltakedownApp.characterCard.name')}
                id="character-card-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('elementaltakedownApp.characterCard.element')}
                id="character-card-element"
                name="element"
                data-cy="element"
                type="select"
              >
                {elementTypeValues.map(elementType => (
                  <option value={elementType} key={elementType}>
                    {translate('elementaltakedownApp.ElementType.' + elementType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="character-card-basic"
                name="basic"
                data-cy="basic"
                label={translate('elementaltakedownApp.characterCard.basic')}
                type="select"
                required
              >
                <option value="" key="0" />
                {basicATKS
                  ? basicATKS.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="character-card-skill"
                name="skill"
                data-cy="skill"
                label={translate('elementaltakedownApp.characterCard.skill')}
                type="select"
                required
              >
                <option value="" key="0" />
                {skillATKS
                  ? skillATKS.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="character-card-ultimate"
                name="ultimate"
                data-cy="ultimate"
                label={translate('elementaltakedownApp.characterCard.ultimate')}
                type="select"
                required
              >
                <option value="" key="0" />
                {ultimateATKS
                  ? ultimateATKS.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/character-card" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CharacterCardUpdate;
